import Flag from './Flag';

export default function LanguageMenu({
	currentLanguage,
	isOpen,
	languages,
	onSelect,
	onToggle,
}) {
	return (
		<div className={`language-control ${isOpen ? 'is-open' : ''}`}>
			<button
				aria-expanded={isOpen}
				aria-label="Select language"
				className="language-trigger"
				onClick={onToggle}
				type="button"
			>
				<Flag code={currentLanguage.code} />
				<span>{currentLanguage.label}</span>
				<svg aria-hidden="true" className="chevron" viewBox="0 0 12 8">
					<path
						d="m1 1.5 5 5 5-5"
						fill="none"
						stroke="currentColor"
						strokeLinecap="round"
						strokeWidth="1.6"
					/>
				</svg>
			</button>
			<div className="language-menu">
				{languages.map((item) => (
					<button
						className={
							item.code === currentLanguage.code
								? 'is-active'
								: ''
						}
						key={item.code}
						onClick={() => onSelect(item.code)}
						type="button"
					>
						<Flag code={item.code} />
						<span>{item.label}</span>
					</button>
				))}
			</div>
		</div>
	);
}
