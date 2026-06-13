'use client';

import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { usePathname, useRouter } from 'next/navigation';

import ContentSections from './components/ContentSections';
import IntroSection from './components/IntroSection';
import LanguageMenu from './components/LanguageMenu';
import SiteHeader from './components/SiteHeader';
import ThemeToggle from './components/ThemeToggle';
import WebGLShape from './components/WebGLShape';
import { defaultLanguage, languages, translations } from './i18n/translations';
import captureEvent from './lib/analytics';

const languageStorageKey = 'portfolio-language';
const supportedLanguages = languages.map((item) => item.code);
const scrollEase = (progress) => 1 - (1 - progress) ** 4;
const mobileNavQuery = '(max-width: 820px)';

function getSupportedLanguage(language) {
	return supportedLanguages.includes(language) ? language : defaultLanguage;
}

function clamp(value, min, max) {
	return Math.min(Math.max(value, min), max);
}

function getTranslateY(element) {
	const { transform } = window.getComputedStyle(element);

	if (transform === 'none') return 0;

	const matrix3d = transform.match(/^matrix3d\((.+)\)$/);
	if (matrix3d) {
		const [, rawValues] = matrix3d;
		const values = rawValues.split(',').map(Number);
		return values[13] || 0;
	}

	const matrix = transform.match(/^matrix\((.+)\)$/);
	if (matrix) {
		const [, rawValues] = matrix;
		const values = rawValues.split(',').map(Number);
		return values[5] || 0;
	}

	return 0;
}

function getElementScrollTarget(element, block = 'center') {
	const rect = element.getBoundingClientRect();
	const currentScroll = window.scrollY;
	const maxScroll = Math.max(
		0,
		document.documentElement.scrollHeight - window.innerHeight,
	);

	if (block !== 'start' && window.matchMedia(mobileNavQuery).matches) {
		const card = element.querySelector('.content-card') || element;
		const cardRect = card.getBoundingClientRect();
		const navRect = document
			.querySelector('.site-header')
			?.getBoundingClientRect();
		const navTop =
			navRect && navRect.top > window.innerHeight / 2
				? navRect.top
				: window.innerHeight - 76;
		const idealTop = clamp(window.innerHeight * 0.17, 92, 146);
		const readableTop = navTop - cardRect.height - 28;
		const minTop = window.innerHeight < 720 ? 64 : 88;
		const revealOffset = Math.max(0, getTranslateY(element));
		const cardTop =
			Math.max(minTop, Math.min(idealTop, readableTop)) + revealOffset;

		return Math.min(
			Math.max(currentScroll + cardRect.top - cardTop, 0),
			maxScroll,
		);
	}

	const rawTarget =
		block === 'start'
			? currentScroll + rect.top
			: currentScroll + rect.top - (window.innerHeight - rect.height) / 2;

	return Math.min(Math.max(rawTarget, 0), maxScroll);
}

export default function Portfolio({ initialLanguage = defaultLanguage }) {
	const router = useRouter();
	const pathname = usePathname();
	const [language, setLanguage] = useState(
		getSupportedLanguage(initialLanguage),
	);
	const [theme, setTheme] = useState('dark');
	const [ready, setReady] = useState(false);
	const [opened, setOpened] = useState(false);
	const [navVisible, setNavVisible] = useState(false);
	const [activeSection, setActiveSection] = useState(0);
	const [languageOpen, setLanguageOpen] = useState(false);
	const lenisRef = useRef(null);
	const openedRef = useRef(opened);
	const programmaticScroll = useRef(false);
	const programmaticScrollTimer = useRef(null);
	const settleTimer = useRef(null);
	const viewedSections = useRef(new Set());
	const data = translations[language] || translations[defaultLanguage];
	const currentLanguage =
		languages.find((item) => item.code === language) || languages[0];

	useEffect(() => {
		const timer = window.setTimeout(() => setReady(true), 2650);
		return () => window.clearTimeout(timer);
	}, []);

	useEffect(() => {
		const prefersReducedMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)',
		);

		if (prefersReducedMotion.matches) return undefined;

		const settleToNearbySection = () => {
			if (!openedRef.current || programmaticScroll.current) return;
			if (document.body.classList.contains('contact-form-open')) return;
			if (!window.matchMedia('(min-width: 821px)').matches) return;

			const sections = Array.from(
				document.querySelectorAll('[data-section]'),
			);
			const viewportCenter = window.innerHeight / 2;
			const settleDistance = Math.min(window.innerHeight * 0.2, 180);
			const nearest = sections.reduce(
				(current, section) => {
					const rect = section.getBoundingClientRect();
					const distance = Math.abs(
						rect.top + rect.height / 2 - viewportCenter,
					);

					return distance < current.distance
						? { distance, section }
						: current;
				},
				{ distance: Number.POSITIVE_INFINITY, section: null },
			);

			if (!nearest.section) return;
			if (nearest.distance < 12 || nearest.distance > settleDistance) {
				return;
			}

			programmaticScroll.current = true;
			window.clearTimeout(programmaticScrollTimer.current);
			programmaticScrollTimer.current = window.setTimeout(() => {
				programmaticScroll.current = false;
			}, 650);

			lenisRef.current?.scrollTo(
				getElementScrollTarget(nearest.section),
				{
					duration: 0.52,
					easing: scrollEase,
					lock: false,
					onComplete: () => {
						programmaticScroll.current = false;
						window.clearTimeout(programmaticScrollTimer.current);
					},
				},
			);
		};

		const lenis = new Lenis({
			autoRaf: true,
			duration: 0.82,
			easing: scrollEase,
			overscroll: false,
			prevent: (node) => Boolean(node.closest?.('[data-lenis-prevent]')),
			smoothWheel: true,
			touchMultiplier: 1.04,
			wheelMultiplier: 1.16,
		});

		lenisRef.current = lenis;
		if (!openedRef.current) lenis.stop();

		lenis.on('scroll', () => {
			window.clearTimeout(settleTimer.current);
			settleTimer.current = window.setTimeout(settleToNearbySection, 170);
		});

		return () => {
			window.clearTimeout(settleTimer.current);
			window.clearTimeout(programmaticScrollTimer.current);
			lenis.destroy();
			lenisRef.current = null;
		};
	}, []);

	useEffect(() => {
		openedRef.current = opened;

		if (!lenisRef.current) return;
		if (opened) {
			lenisRef.current.start();
			window.requestAnimationFrame(() => lenisRef.current?.resize());
			return;
		}

		lenisRef.current.stop();
	}, [opened]);

	useEffect(() => {
		const routeLanguage = getSupportedLanguage(initialLanguage);

		if (routeLanguage !== defaultLanguage || pathname !== '/') {
			setLanguage(routeLanguage);
			return;
		}

		const savedLanguage = window.localStorage.getItem(languageStorageKey);
		const nextLanguage = getSupportedLanguage(savedLanguage);

		setLanguage(nextLanguage);
		router.replace(`/${nextLanguage}`, { scroll: false });
	}, [initialLanguage, pathname, router]);

	useEffect(() => {
		document.documentElement.lang = language;
		window.localStorage.setItem(languageStorageKey, language);
	}, [language]);

	useEffect(() => {
		captureEvent('portfolio_language_viewed', { language });
	}, [language]);

	useEffect(() => {
		document.documentElement.classList.toggle(
			'theme-ivory',
			theme === 'ivory',
		);

		return () => {
			document.documentElement.classList.remove('theme-ivory');
		};
	}, [theme]);

	useEffect(() => {
		document.body.classList.toggle('scroll-locked', !opened);

		return () => {
			document.body.classList.remove('scroll-locked');
		};
	}, [opened]);

	useEffect(() => {
		if (!opened) return undefined;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					entry.target.classList.toggle(
						'is-visible',
						entry.isIntersecting,
					);

					if (entry.isIntersecting) {
						const nextIndex = Number(entry.target.dataset.index);

						setActiveSection(nextIndex);

						if (!viewedSections.current.has(entry.target.id)) {
							viewedSections.current.add(entry.target.id);
							captureEvent('portfolio_section_viewed', {
								language,
								section_id: entry.target.id,
								section_index: nextIndex,
							});
						}
					}
				});
			},
			{ threshold: 0.36 },
		);

		document
			.querySelectorAll('[data-section]')
			.forEach((section) => observer.observe(section));

		return () => observer.disconnect();
	}, [language, opened]);

	const openPortfolio = () => {
		if (!ready || opened) return;

		setOpened(true);
		captureEvent('portfolio_opened', { language });
		window.setTimeout(() => setNavVisible(true), 1000);
	};

	const scrollToSection = (targetId) => {
		const runScroll = () => {
			captureEvent('portfolio_nav_clicked', { section_id: targetId });

			const target = document.getElementById(targetId);
			if (target) {
				const block = targetId === 'intro' ? 'start' : 'center';
				const lenis = lenisRef.current;

				programmaticScroll.current = true;
				window.clearTimeout(programmaticScrollTimer.current);
				programmaticScrollTimer.current = window.setTimeout(() => {
					programmaticScroll.current = false;
				}, 900);

				if (lenis) {
					lenis.scrollTo(getElementScrollTarget(target, block), {
						duration: 0.72,
						easing: scrollEase,
						lock: false,
						onComplete: () => {
							programmaticScroll.current = false;
							window.clearTimeout(
								programmaticScrollTimer.current,
							);
						},
					});
					return;
				}

				window.scrollTo({
					behavior: window.matchMedia(
						'(prefers-reduced-motion: reduce)',
					).matches
						? 'auto'
						: 'smooth',
					top: getElementScrollTarget(target, block),
				});
			}
		};

		if (!opened) {
			openPortfolio();
			window.setTimeout(runScroll, 1150);
			return;
		}

		runScroll();
	};

	const selectLanguage = (nextLanguage) => {
		const supportedLanguage = getSupportedLanguage(nextLanguage);

		setLanguage(supportedLanguage);
		setLanguageOpen(false);
		captureEvent('portfolio_language_changed', {
			from: language,
			to: supportedLanguage,
		});
		router.replace(`/${supportedLanguage}`, { scroll: false });
	};

	return (
		<main
			className={[
				'page',
				`theme-${theme}`,
				ready ? 'is-ready' : 'is-loading',
				opened ? 'is-open is-brand-visible' : '',
				navVisible ? 'is-nav-visible' : '',
			].join(' ')}
			onPointerDown={(event) => {
				if (event.target.closest('button')) return;
				openPortfolio();
			}}
		>
			<ThemeToggle
				onToggle={() =>
					setTheme((current) => {
						const nextTheme = current === 'dark' ? 'ivory' : 'dark';

						captureEvent('portfolio_theme_changed', {
							from: current,
							to: nextTheme,
						});
						return nextTheme;
					})
				}
			/>

			<LanguageMenu
				currentLanguage={currentLanguage}
				isOpen={languageOpen}
				languages={languages}
				onSelect={selectLanguage}
				onToggle={() => setLanguageOpen((value) => !value)}
			/>

			<SiteHeader
				navItems={data.nav}
				onNavigate={scrollToSection}
				sections={data.sections}
			/>

			<div className="click-aura" aria-hidden="true" />
			<WebGLShape
				activeSection={activeSection}
				opened={opened}
				theme={theme}
			/>

			<IntroSection
				intro={data.intro}
				name={data.name}
				role={data.role}
			/>
			<ContentSections
				kickers={data.kickers}
				language={language}
				sections={data.sections}
				theme={theme}
			/>
		</main>
	);
}
