export default function SiteHeader({ navItems, sections, onNavigate }) {
	return (
		<header className="site-header" aria-label="Site sections">
			<nav className="site-nav">
				<div className="nav-wing nav-wing-left">
					{navItems.slice(0, 3).map((label, index) => (
						<button
							data-target={sections[index].id}
							key={label}
							onClick={() => onNavigate(sections[index].id)}
							type="button"
						>
							{label}
						</button>
					))}
				</div>
				<button
					className="brand-mark"
					onClick={() => onNavigate('intro')}
					type="button"
				>
					P
				</button>
				<div className="nav-wing nav-wing-right">
					{navItems.slice(3).map((label, offset) => {
						const index = offset + 3;
						return (
							<button
								data-target={sections[index].id}
								key={label}
								onClick={() => onNavigate(sections[index].id)}
								type="button"
							>
								{label}
							</button>
						);
					})}
				</div>
			</nav>
		</header>
	);
}
