/* eslint-disable import/prefer-default-export, no-console */

const telegramApiBase = 'https://api.telegram.org/bot';
const maxBodySize = 6000;
const maxFieldLength = {
	email: 120,
	message: 1500,
	name: 80,
	website: 120,
};
const rateLimitWindow = 10 * 60 * 1000;
const maxRequestsPerWindow = 5;
const rateLimitStore = new Map();

function cleanEnv(value) {
	return String(value || '')
		.trim()
		.replace(/^['"]|['"]$/g, '');
}

function cleanField(value) {
	return String(value || '')
		.replaceAll('\0', '')
		.replace(/\r\n?/g, '\n')
		.trim();
}

function escapeHtml(value) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;');
}

function buildTelegramMessage({ email, message, name }) {
	return [
		'<b>New portfolio contact</b>',
		'',
		`<b>Name:</b> ${escapeHtml(name)}`,
		`<b>Email:</b> ${escapeHtml(email)}`,
		'',
		'<b>Message:</b>',
		escapeHtml(message),
	].join('\n');
}

function truncate(value, maxLength = 500) {
	const text = String(value || '');

	return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

function jsonError(message, status, error = {}) {
	return Response.json(
		{
			error: {
				status,
				...error,
			},
			message,
		},
		{ status },
	);
}

function logDeliveryError(details) {
	console.error('[contact] Telegram delivery failed', details);
}

function parseTelegramError(body) {
	if (!body) {
		return { telegramBody: '' };
	}

	try {
		const parsed = JSON.parse(body);

		return {
			telegramDescription: parsed.description || null,
			telegramErrorCode: parsed.error_code || null,
			telegramOk: parsed.ok === true,
		};
	} catch {
		return { telegramBody: truncate(body) };
	}
}

function getClientKey(request) {
	return (
		request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
		request.headers.get('x-real-ip') ||
		'unknown'
	);
}

function isRateLimited(request) {
	const now = Date.now();
	const clientKey = getClientKey(request);
	const recentRequests = (rateLimitStore.get(clientKey) || []).filter(
		(timestamp) => now - timestamp < rateLimitWindow,
	);

	if (recentRequests.length >= maxRequestsPerWindow) {
		rateLimitStore.set(clientKey, recentRequests);
		return true;
	}

	recentRequests.push(now);
	rateLimitStore.set(clientKey, recentRequests);
	return false;
}

function isTooLong(values) {
	return Object.entries(maxFieldLength).some(
		([field, maxLength]) => values[field].length > maxLength,
	);
}

export async function POST(request) {
	const token = cleanEnv(process.env.TELEGRAM_BOT_TOKEN);
	const chatId = cleanEnv(process.env.TELEGRAM_CHAT_ID);
	const contentLength = Number(request.headers.get('content-length') || 0);
	const contentType = request.headers.get('content-type') || '';

	if (!token || !chatId) {
		logDeliveryError({
			reason: 'missing_env',
			hasChatId: Boolean(chatId),
			hasToken: Boolean(token),
		});

		return jsonError('Telegram delivery is not configured yet.', 503, {
			code: 'telegram_env_missing',
			hasChatId: Boolean(chatId),
			hasToken: Boolean(token),
			hint: 'Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in hosting environment variables, then redeploy.',
		});
	}

	if (!contentType.includes('application/json')) {
		return jsonError('Unsupported request format.', 415, {
			code: 'unsupported_content_type',
			contentType,
			expectedContentType: 'application/json',
		});
	}

	if (contentLength > maxBodySize) {
		return jsonError('Message is too large.', 413, {
			code: 'body_too_large',
			contentLength,
			maxBodySize,
		});
	}

	if (isRateLimited(request)) {
		return jsonError('Too many requests. Please try again later.', 429, {
			code: 'rate_limited',
			retryAfterMs: rateLimitWindow,
		});
	}

	let payload;

	try {
		payload = await request.json();
	} catch {
		return jsonError('Invalid form payload.', 400, {
			code: 'invalid_json',
		});
	}

	const values = {
		email: cleanField(payload.email),
		message: cleanField(payload.message),
		name: cleanField(payload.name),
		website: cleanField(payload.website),
	};

	if (values.website) {
		return Response.json({ message: 'Message sent. I will reply soon.' });
	}

	if (isTooLong(values)) {
		return jsonError('Message is too large.', 400, {
			code: 'field_too_large',
			maxFieldLength,
		});
	}

	if (!values.name) {
		return jsonError('Name is required.', 400, {
			code: 'missing_name',
			field: 'name',
		});
	}

	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
		return jsonError('Enter a valid email.', 400, {
			code: 'invalid_email',
			field: 'email',
		});
	}

	if (values.message.length < 10) {
		return jsonError('Message should be at least 10 characters.', 400, {
			code: 'message_too_short',
			field: 'message',
			minLength: 10,
		});
	}

	let telegramResponse;

	try {
		telegramResponse = await fetch(
			`${telegramApiBase}${token}/sendMessage`,
			{
				body: JSON.stringify({
					chat_id: chatId,
					disable_web_page_preview: true,
					parse_mode: 'HTML',
					text: buildTelegramMessage(values),
				}),
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
			},
		);
	} catch (error) {
		logDeliveryError({
			message: error instanceof Error ? error.message : String(error),
			reason: 'fetch_failed',
		});

		return jsonError(
			'Message could not be sent. Please try again later.',
			502,
			{
				code: 'telegram_fetch_failed',
				detail: truncate(
					error instanceof Error ? error.message : String(error),
				),
				hint: 'Hosting may be unable to reach https://api.telegram.org, or outbound requests may be blocked.',
			},
		);
	}

	if (!telegramResponse.ok) {
		const telegramBody = await telegramResponse.text().catch(() => '');
		const telegramError = parseTelegramError(telegramBody);

		logDeliveryError({
			body: telegramBody,
			reason: 'telegram_response_not_ok',
			status: telegramResponse.status,
		});

		return jsonError(
			'Message could not be sent. Please try again later.',
			502,
			{
				code: 'telegram_response_not_ok',
				hint: 'Check TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, and whether the bot can message this chat.',
				telegramStatus: telegramResponse.status,
				...telegramError,
			},
		);
	}

	return Response.json({ message: 'Message sent. I will reply soon.' });
}
