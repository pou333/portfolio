export default function Flag({ code }) {
	const id = code === 'ka' ? 'ge' : code;

	return (
		<svg aria-hidden="true" className="flag-svg" viewBox="0 0 24 16">
			{id === 'en' ? (
				<>
					<rect fill="#1f3f8b" height="16" width="24" />
					<path
						d="M0 0 24 16M24 0 0 16"
						stroke="#fff"
						strokeWidth="3"
					/>
					<path
						d="M0 0 24 16M24 0 0 16"
						stroke="#c51f3a"
						strokeWidth="1.4"
					/>
					<path d="M12 0v16M0 8h24" stroke="#fff" strokeWidth="5" />
					<path
						d="M12 0v16M0 8h24"
						stroke="#c51f3a"
						strokeWidth="2.4"
					/>
				</>
			) : null}
			{id === 'ru' ? (
				<>
					<rect fill="#fff" height="16" width="24" />
					<rect fill="#2452a4" height="5.33" width="24" y="5.33" />
					<rect fill="#d52b1e" height="5.33" width="24" y="10.67" />
				</>
			) : null}
			{id === 'ge' ? (
				<>
					<rect fill="#fff" height="16" width="24" />
					<path
						d="M12 0v16M0 8h24"
						stroke="#d21f2b"
						strokeWidth="2.4"
					/>
					<path
						d="M5 3v3M3.5 4.5h3M19 3v3M17.5 4.5h3M5 10v3M3.5 11.5h3M19 10v3M17.5 11.5h3"
						stroke="#d21f2b"
						strokeWidth="1.1"
					/>
				</>
			) : null}
			{id === 'pl' ? (
				<>
					<rect fill="#fff" height="8" width="24" />
					<rect fill="#dc143c" height="8" width="24" y="8" />
				</>
			) : null}
			{id === 'de' ? (
				<>
					<rect fill="#111" height="5.33" width="24" />
					<rect fill="#dd0000" height="5.33" width="24" y="5.33" />
					<rect fill="#ffce00" height="5.33" width="24" y="10.67" />
				</>
			) : null}
			{id === 'es' ? (
				<>
					<rect fill="#aa151b" height="16" width="24" />
					<rect fill="#f1bf00" height="8" width="24" y="4" />
				</>
			) : null}
		</svg>
	);
}
