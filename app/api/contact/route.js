/* eslint-disable import/prefer-default-export */

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

function jsonError(message, status) {
	return Response.json({ message }, { status });
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
	const token = process.env.TELEGRAM_BOT_TOKEN;
	const chatId = process.env.TELEGRAM_CHAT_ID;
	const contentLength = Number(request.headers.get('content-length') || 0);
	const contentType = request.headers.get('content-type') || '';

	if (!token || !chatId) {
		return jsonError('Telegram delivery is not configured yet.', 500);
	}

	if (!contentType.includes('application/json')) {
		return jsonError('Unsupported request format.', 415);
	}

	if (contentLength > maxBodySize) {
		return jsonError('Message is too large.', 413);
	}

	if (isRateLimited(request)) {
		return jsonError('Too many requests. Please try again later.', 429);
	}

	let payload;

	try {
		payload = await request.json();
	} catch {
		return jsonError('Invalid form payload.', 400);
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
		return jsonError('Message is too large.', 400);
	}

	if (!values.name) {
		return jsonError('Name is required.', 400);
	}

	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
		return jsonError('Enter a valid email.', 400);
	}

	if (values.message.length < 10) {
		return jsonError('Message should be at least 10 characters.', 400);
	}

	const telegramResponse = await fetch(
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

	if (!telegramResponse.ok) {
		return jsonError(
			'Message could not be sent. Please try again later.',
			502,
		);
	}

	return Response.json({ message: 'Message sent. I will reply soon.' });
}
