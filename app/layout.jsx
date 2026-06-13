import 'lenis/dist/lenis.css';
import './globals.css';

import { Suspense } from 'react';

import PostHogProvider from './components/PostHogProvider';

export const metadata = {
	title: 'Matvey Pavlov | Frontend Developer',
	description:
		'Frontend developer portfolio with interactive WebGL navigation.',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<Suspense fallback={null}>
					<PostHogProvider />
				</Suspense>
				{children}
			</body>
		</html>
	);
}
