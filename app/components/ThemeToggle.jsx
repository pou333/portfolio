export default function ThemeToggle({ onToggle }) {
	return (
		<button
			aria-label="Toggle color theme"
			className="theme-toggle"
			onClick={onToggle}
			type="button"
		>
			<svg aria-hidden="true" viewBox="0 0 32 32">
				<path d="M16 3.5a11.6 11.6 0 0 0 0 23.2c5.7 0 10.4-4.1 11.4-9.5-1.6 1.5-3.8 2.4-6.2 2.4A8.9 8.9 0 0 1 12.3 10c0-2.5 1-4.7 2.6-6.3-.3 0-.6 0-.9 0Z" />
				<path d="M22.7 5.7 24 3l1.3 2.7L28 7l-2.7 1.3L24 11l-1.3-2.7L20 7l2.7-1.3Z" />
			</svg>
		</button>
	);
}
