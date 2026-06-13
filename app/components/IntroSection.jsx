export default function IntroSection({ intro, name, role }) {
	return (
		<section className="intro-screen" id="intro">
			<div className="intro-panel">
				<p className="intro-kicker">{role}</p>
				<h1>{name}</h1>
				<p className="intro-copy">{intro}</p>
			</div>
		</section>
	);
}
