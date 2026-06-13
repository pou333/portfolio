'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';

const posthogProjectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const posthogHost =
	process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

function getCurrentUrl() {
	return `${window.location.origin}${window.location.pathname}${window.location.search}`;
}

export default function PostHogProvider() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [initialized, setInitialized] = useState(false);

	useEffect(() => {
		if (!posthogProjectToken) return;

		posthog.init(posthogProjectToken, {
			api_host: posthogHost,
			capture_pageview: false,
			defaults: '2026-01-30',
			disable_session_recording: false,
			loaded: (posthogInstance) => {
				if (process.env.NODE_ENV === 'development') {
					posthogInstance.debug();
				}
				setInitialized(true);
			},
		});
	}, []);

	useEffect(() => {
		if (!posthogProjectToken) return;
		if (!initialized) return;

		posthog.capture('$pageview', {
			$current_url: getCurrentUrl(),
		});
	}, [initialized, pathname, searchParams]);

	return null;
}
