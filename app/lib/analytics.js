import posthog from 'posthog-js';

export default function captureEvent(eventName, properties = {}) {
	if (!process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) return;
	if (typeof window === 'undefined') return;

	posthog.capture(eventName, properties);
}
