export const languages = [
	{ code: 'en', label: 'English', short: 'EN' },
	{ code: 'ru', label: 'Русский', short: 'RU' },
	{ code: 'ka', label: 'ქართული', short: 'GE' },
	{ code: 'pl', label: 'Polski', short: 'PL' },
	{ code: 'de', label: 'Deutsch', short: 'DE' },
	{ code: 'es', label: 'Español', short: 'ES' },
];

export const defaultLanguage = 'en';

export const content = {
	en: {
		role: 'Frontend Developer',
		name: 'Matvey Pavlov',
		intro: 'React-focused developer building responsive, performance-minded interfaces for booking platforms, web games, and real estate products.',
		nav: ['About', 'Skills', 'Experience', 'Projects', 'Work', 'Contact'],
		kickers: [
			'Profile',
			'Core Stack',
			'Recent Work',
			'Selected Build',
			'Product Work',
			'Contact',
		],
		sections: [
			{
				id: 'about',
				title: 'Clean interfaces, fast flows, thoughtful architecture.',
				body: [
					'Motivated frontend developer with a solid foundation in building responsive web applications, optimizing performance, and delivering user-centric digital products.',
					'Experienced with modern React ecosystems, refactoring legacy code bases, and translating complex requirements into clean, maintainable code.',
				],
			},
			{
				id: 'skills',
				title: 'React, JavaScript, state, performance.',
				skills: [
					'React',
					'JavaScript',
					'TypeScript',
					'Next.js',
					'Redux',
					'Zustand',
					'Tailwind CSS',
					'Webpack / Babel',
					'REST API',
					'Formik',
					'i18next',
					'Git',
				],
			},
			{
				id: 'experience',
				title: 'Private booking platform',
				meta: 'Frontend Developer · May 2025 - Present',
				body: [
					'Swedish corporate booking platform for business travel and accommodation management.',
					'Developed booking flows, refactored legacy React / Redux code, reduced unnecessary re-renders, and improved initial page loading speed by roughly 2-3x.',
				],
			},
			{
				id: 'projects',
				title: 'Telegram Mini App / Web Game',
				meta: 'Frontend Developer · Nov 2024 - May 2025',
				body: [
					'Interactive web game integrated into Telegram as a Mini App, focused on lightweight logic and strong mobile performance.',
					'Built game loops with Zustand, integrated Telegram Web Apps API, and optimized assets for stable WebView performance.',
				],
			},
			{
				id: 'work',
				title: 'Real estate rental platform',
				meta: 'Frontend Developer · Jun 2024 - Nov 2024',
				body: [
					'Marketplace and rental platform for residential and commercial real estate.',
					'Launched MVP features, interactive search, filtering, map-based discovery, REST API integrations, JWT auth, and booking flows.',
				],
			},
			{
				id: 'contact',
				title: 'Available for frontend product work.',
				body: [
					'Minsk, Belarus',
					'Phone: +375 25 517 7471',
					'Email: mmm135gmmm@gmail.com',
					'Languages: English, Russian',
				],
			},
		],
	},
};

content.ru = {
	...content.en,
	role: 'Frontend-разработчик',
	intro: 'React-разработчик, который создаёт отзывчивые и быстрые интерфейсы для booking-платформ, web games и real estate продуктов.',
	nav: ['Обо мне', 'Навыки', 'Опыт', 'Проекты', 'Работа', 'Контакты'],
	kickers: ['Профиль', 'Стек', 'Опыт', 'Проект', 'Продукт', 'Контакты'],
	sections: [
		{
			...content.en.sections[0],
			title: 'Чистые интерфейсы, быстрые сценарии, продуманная архитектура.',
			body: [
				'Frontend-разработчик с сильной базой в создании адаптивных веб-приложений, оптимизации производительности и разработке удобных цифровых продуктов.',
				'Работаю с современным React-стеком, рефакторю legacy-код и перевожу сложные требования в поддерживаемую архитектуру.',
			],
		},
		{
			...content.en.sections[1],
			title: 'React, JavaScript, состояние, производительность.',
		},
		{
			...content.en.sections[2],
			title: 'Закрытая booking-платформа',
			meta: 'Frontend-разработчик · · Май 2025 - настоящее время',
			body: [
				'Шведская корпоративная платформа для бронирования бизнес-поездок и размещения.',
				'Дорабатывал booking-сценарии, рефакторил React / Redux код, сокращал лишние ререндеры и ускорил начальную загрузку примерно в 2-3 раза.',
			],
		},
		{
			...content.en.sections[3],
			title: 'Telegram Mini App / Web Game',
			meta: 'Frontend-разработчик · Ноябрь 2024 - Май 2025',
			body: [
				'Интерактивная веб-игра внутри Telegram Mini App с фокусом на лёгкую логику и мобильную производительность.',
				'Строил игровые циклы на Zustand, интегрировал Telegram Web Apps API и оптимизировал ассеты для стабильной работы в WebView.',
			],
		},
		{
			...content.en.sections[4],
			title: 'Платформа аренды недвижимости',
			meta: 'Frontend-разработчик · Июнь 2024 - Ноябрь 2024',
			body: [
				'Маркетплейс аренды жилой и коммерческой недвижимости.',
				'Запускал MVP, интерактивный поиск, фильтры, карты, REST API, JWT-авторизацию и booking-flow.',
			],
		},
		{
			...content.en.sections[5],
			title: 'Открыт к frontend product work.',
			body: [
				'Минск, Беларусь',
				'Телефон: +375 25 517 7471',
				'Email: mmm135gmmm@gmail.com',
				'Языки: английский, русский',
			],
		},
	],
};

content.ka = {
	...content.en,
	role: 'Frontend დეველოპერი',
	intro: 'React-ზე ორიენტირებული დეველოპერი, რომელიც ქმნის სწრაფ და ადაპტურ ინტერფეისებს booking პლატფორმებისთვის, თამაშებისთვის და real estate პროდუქტებისთვის.',
	nav: [
		'ჩემ შესახებ',
		'უნარები',
		'გამოცდილება',
		'პროექტები',
		'სამუშაო',
		'კონტაქტი',
	],
	kickers: [
		'პროფილი',
		'სტეკი',
		'გამოცდილება',
		'პროექტი',
		'პროდუქტი',
		'კონტაქტი',
	],
	sections: content.en.sections.map((section, index) => {
		const titles = [
			'სუფთა ინტერფეისები, სწრაფი ნაკადები, გააზრებული არქიტექტურა.',
			'React, JavaScript, state, performance.',
			'Private booking პლატფორმა',
			'Telegram Mini App / Web Game',
			'Real estate rental პლატფორმა',
			'ღია ვარ frontend product work-ისთვის.',
		];
		return { ...section, title: titles[index] };
	}),
};

content.pl = {
	...content.en,
	role: 'Frontend Developer',
	intro: 'Developer React tworzący responsywne, wydajne interfejsy dla platform bookingowych, gier webowych i produktów real estate.',
	nav: [
		'O mnie',
		'Umiejętności',
		'Doświadczenie',
		'Projekty',
		'Praca',
		'Kontakt',
	],
	kickers: [
		'Profil',
		'Stack',
		'Doświadczenie',
		'Projekt',
		'Produkt',
		'Kontakt',
	],
	sections: content.en.sections.map((section, index) => {
		const titles = [
			'Czyste interfejsy, szybkie przepływy, przemyślana architektura.',
			'React, JavaScript, stan aplikacji, wydajność.',
			'Prywatna platforma bookingowa',
			'Telegram Mini App / Web Game',
			'Platforma wynajmu nieruchomości',
			'Dostępny do pracy frontendowej nad produktem.',
		];
		return { ...section, title: titles[index] };
	}),
};

content.de = {
	...content.en,
	role: 'Frontend Entwickler',
	intro: 'React-fokussierter Entwickler für responsive, performante Interfaces in Booking-Plattformen, Web Games und Real-Estate-Produkten.',
	nav: ['Über mich', 'Skills', 'Erfahrung', 'Projekte', 'Arbeit', 'Kontakt'],
	kickers: ['Profil', 'Stack', 'Erfahrung', 'Projekt', 'Produkt', 'Kontakt'],
	sections: content.en.sections.map((section, index) => {
		const titles = [
			'Klare Interfaces, schnelle Flows, durchdachte Architektur.',
			'React, JavaScript, State, Performance.',
			'Private Booking-Plattform',
			'Telegram Mini App / Web Game',
			'Plattform für Immobilienvermietung',
			'Bereit für Frontend-Produktarbeit.',
		];
		return { ...section, title: titles[index] };
	}),
};

content.es = {
	...content.en,
	role: 'Desarrollador Frontend',
	intro: 'Desarrollador centrado en React que crea interfaces responsivas y rápidas para plataformas de reservas, juegos web y productos inmobiliarios.',
	nav: [
		'Sobre mí',
		'Skills',
		'Experiencia',
		'Proyectos',
		'Trabajo',
		'Contacto',
	],
	kickers: [
		'Perfil',
		'Stack',
		'Experiencia',
		'Proyecto',
		'Producto',
		'Contacto',
	],
	sections: content.en.sections.map((section, index) => {
		const titles = [
			'Interfaces limpias, flujos rápidos, arquitectura cuidada.',
			'React, JavaScript, estado, rendimiento.',
			'Plataforma privada de reservas',
			'Telegram Mini App / Web Game',
			'Plataforma de alquiler inmobiliario',
			'Disponible para trabajo frontend de producto.',
		];
		return { ...section, title: titles[index] };
	}),
};
