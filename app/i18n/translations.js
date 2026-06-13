const skills = [
	'TypeScript',
	'React',
	'Vue.js',
	'Next.js',
	'Nuxt.js',
	'Vite',
	'Redux / Zustand',
	'Tailwind CSS',
	'Sass',
	'Git',
];

export const languages = [
	{ code: 'en', label: 'English', short: 'EN' },
	{ code: 'ru', label: 'Русский', short: 'RU' },
	{ code: 'ka', label: 'ქართული', short: 'GE' },
	{ code: 'pl', label: 'Polski', short: 'PL' },
	{ code: 'de', label: 'Deutsch', short: 'DE' },
	{ code: 'es', label: 'Español', short: 'ES' },
];

export const defaultLanguage = 'en';

export const translations = {
	en: {
		role: 'Frontend Developer',
		name: 'Matvey Pavlov',
		intro: 'Frontend developer building fast, responsive interfaces across modern JavaScript stacks, including React and Vue.',
		nav: [
			'About',
			'Skills',
			'Last Work',
			'Game Project',
			'Real Estate UI',
			'Contact',
		],
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
				title: 'Frontend for clean product journeys.',
				body: [
					'I build responsive web applications with attention to performance, maintainability, and everyday product usability.',
					'I work across React, Vue, and adjacent JavaScript ecosystems: shaping reliable UI flows, connecting product logic, and turning requirements into clear interfaces.',
				],
			},
			{
				id: 'skills',
				title: 'A practical frontend toolkit.',
				body: [
					'I am strongest around component-driven development, state management, API integration, and polished product screens.',
				],
				skills,
			},
			{
				id: 'experience',
				title: 'Car rental inside a corporate booking platform.',
				meta: 'Frontend Developer · Apr 2025 - May 2026',
				body: [
					'Corporate booking platform with travel, accommodation, and mobility services.',
					'I implemented the car rental feature end to end on the frontend, then continued with product refinements, UI fixes, and bug fixing across existing booking flows.',
				],
			},
			{
				id: 'projects',
				title: 'Telegram game updates for mobile WebView.',
				meta: 'Frontend Developer · Nov 2024 - May 2025',
				body: [
					'Interactive web game integrated into Telegram as a Mini App, focused on frequent content and interface updates.',
					'I built new screens and UI states, connected them with existing game logic, worked with Zustand, and kept the WebView experience smooth on mobile.',
				],
			},
			{
				id: 'work',
				title: 'Rental housing interface with search logic.',
				meta: 'Frontend Developer · Jun 2024 - Nov 2024',
				body: [
					'Marketplace and rental platform for residential and commercial real estate.',
					'I built responsive layouts for listing, search, and property pages, and added client-side interaction logic for filters, form states, and booking-related UI flows.',
				],
			},
			{
				id: 'contact',
				title: 'Open to frontend product teams.',
				form: {
					button: 'Message me',
					close: 'Close contact form',
					email: 'Email',
					emailError: 'Enter a valid email.',
					message: 'Message',
					messageError: 'Message should be at least 10 characters.',
					messagePlaceholder:
						'Tell me briefly about the role, project, or question.',
					name: 'Name',
					nameError: 'Name is required.',
					namePlaceholder: 'Your name',
					sending: 'Sending...',
					sendError:
						'Message could not be sent. Please try again or email me directly.',
					sendSuccess: 'Message sent. I will reply soon.',
					status: 'Please wait a moment before sending again.',
					submit: 'Send request',
					title: "Let's collaborate",
				},
				body: [
					'Minsk, Belarus',
					'Phone: +375 25 517 7471',
					'Email: mmm135gmmm@gmail.com',
					'Languages: English, Russian',
				],
			},
		],
	},
	ru: {
		role: 'Frontend-разработчик',
		name: 'Matvey Pavlov',
		intro: 'Frontend-разработчик с опытом создания адаптивных веб-интерфейсов в современной frontend-экосистеме, включая проекты на React и Vue.',
		nav: [
			'About',
			'Skills',
			'Last Work',
			'Game Project',
			'Real Estate UI',
			'Contact',
		],
		kickers: ['Профиль', 'Стек', 'Опыт', 'Проект', 'Продукт', 'Контакты'],
		sections: [
			{
				id: 'about',
				title: 'Frontend-разработка для продуктовых интерфейсов.',
				body: [
					'Разрабатываю адаптивные веб-приложения с вниманием к производительности, поддерживаемости кода и удобству пользовательских сценариев.',
					'Работал с React, Vue и современной frontend-экосистемой: реализовывал интерфейсы, подключал бизнес-логику и дорабатывал существующие пользовательские сценарии.',
				],
			},
			{
				id: 'skills',
				title: 'Практический frontend-стек.',
				body: [
					'Основные направления: компонентная разработка, управление состоянием, интеграция с API и работа с интерфейсами реальных продуктов.',
				],
				skills,
			},
			{
				id: 'experience',
				title: 'Модуль аренды автомобилей в платформе бронирования.',
				meta: 'Frontend-разработчик · Апрель 2025 - Май 2026',
				body: [
					'Корпоративная платформа для бронирования поездок, проживания и дополнительных сервисов.',
					'Реализовал frontend-часть модуля аренды автомобилей: основные экраны, состояния интерфейса и связанный пользовательский сценарий. После запуска занимался доработками, исправлением ошибок и небольшими улучшениями существующих разделов.',
				],
			},
			{
				id: 'projects',
				title: 'Обновления Telegram-игры для мобильного WebView.',
				meta: 'Frontend-разработчик · Ноябрь 2024 - Май 2025',
				body: [
					'Интерактивная веб-игра внутри Telegram Mini App с регулярными интерфейсными обновлениями и доработками игровых разделов.',
					'Разрабатывал новые страницы и состояния интерфейса, связывал их с существующей игровой логикой, работал с Zustand и адаптировал интерфейс под мобильный WebView.',
				],
			},
			{
				id: 'work',
				title: 'Интерфейс платформы аренды недвижимости.',
				meta: 'Frontend-разработчик · Июнь 2024 - Ноябрь 2024',
				body: [
					'Платформа для аренды жилой и коммерческой недвижимости.',
					'Разрабатывал адаптивные страницы каталога, поиска и карточек объектов. Добавлял клиентскую логику для фильтров, состояний форм и элементов сценария бронирования.',
				],
			},
			{
				id: 'contact',
				title: 'Рассматриваю позиции в frontend-разработке.',
				form: {
					button: 'Написать',
					close: 'Закрыть форму',
					email: 'Email',
					emailError: 'Введите корректный email.',
					message: 'Сообщение',
					messageError:
						'Сообщение должно быть не короче 10 символов.',
					messagePlaceholder:
						'Коротко опишите вакансию, проект или вопрос.',
					name: 'Имя',
					nameError: 'Укажите имя.',
					namePlaceholder: 'Ваше имя',
					sending: 'Отправляю...',
					sendError:
						'Сообщение не удалось отправить. Попробуйте ещё раз или напишите мне напрямую на email.',
					sendSuccess: 'Сообщение отправлено. Я скоро отвечу.',
					status: 'Подождите немного перед повторной отправкой.',
					submit: 'Отправить',
					title: 'Давайте сотрудничать',
				},
				body: [
					'Минск, Беларусь',
					'Телефон: +375 25 517 7471',
					'Email: mmm135gmmm@gmail.com',
					'Языки: английский, русский',
				],
			},
		],
	},
	ka: {
		role: 'Frontend დეველოპერი',
		name: 'Matvey Pavlov',
		intro: 'Frontend დეველოპერი, რომელიც ქმნის სწრაფ და ადაპტურ ინტერფეისებს თანამედროვე JavaScript სტეკებზე, მათ შორის React-სა და Vue-ზე.',
		nav: [
			'About',
			'Skills',
			'Last Work',
			'Game Project',
			'Real Estate UI',
			'Contact',
		],
		kickers: [
			'პროფილი',
			'სტეკი',
			'გამოცდილება',
			'პროექტი',
			'პროდუქტი',
			'კონტაქტი',
		],
		sections: [
			{
				id: 'about',
				title: 'ფრონტენდი მკაფიო პროდუქტის გზებისთვის.',
				body: [
					'ვქმნი ადაპტურ ვებ-აპლიკაციებს სისწრაფის, მხარდაჭერადი კოდის და ყოველდღიური გამოყენების კომფორტის გათვალისწინებით.',
					'ვმუშაობ React-თან, Vue-თან და JavaScript-ის ეკოსისტემასთან: ვაწყობ საიმედო UI სცენარებს, ვაკავშირებ პროდუქტის ლოგიკას და მოთხოვნებს მკაფიო ინტერფეისებად ვაქცევ.',
				],
			},
			{
				id: 'skills',
				title: 'პრაქტიკული frontend სტეკი.',
				body: [
					'ჩემი ძლიერი მხარეა კომპონენტებზე დაფუძნებული frontend განვითარება, მდგომარეობის მართვა, API ინტეგრაცია და კარგად დამუშავებული პროდუქტის ეკრანები.',
				],
				skills,
			},
			{
				id: 'experience',
				title: 'ავტომობილების გაქირავება booking პლატფორმაში.',
				meta: 'Frontend დეველოპერი · აპრილი 2025 - მაისი 2026',
				body: [
					'კორპორაციული პლატფორმა მოგზაურობის, განთავსებისა და დამატებითი travel სერვისების დასაჯავშნად.',
					'სრულად განვახორციელე ავტომობილების გაქირავების frontend ფუნქცია, შემდეგ კი ვმუშაობდი პროდუქტის გაუმჯობესებებზე, UI შესწორებებსა და bug fixing-ზე არსებულ booking სცენარებში.',
				],
			},
			{
				id: 'projects',
				title: 'Telegram თამაშის განახლებები მობილური WebView-სთვის.',
				meta: 'Frontend დეველოპერი · ნოემბერი 2024 - მაისი 2025',
				body: [
					'ინტერაქტიული ვებ-თამაში Telegram Mini App-ში, რომელიც რეგულარულად ახლდებოდა ახალი ეკრანებით, მდგომარეობებით და თამაშის სექციებით.',
					'ვაწყობდი ახალ გვერდებსა და UI მდგომარეობებს, ვაკავშირებდი მათ არსებულ თამაშის ლოგიკასთან, ვმუშაობდი Zustand-თან და ვზრუნავდი მობილურ WebView-ში გლუვ მუშაობაზე.',
				],
			},
			{
				id: 'work',
				title: 'საცხოვრებლის ქირაობის ინტერფეისი ძიების ლოგიკით.',
				meta: 'Frontend დეველოპერი · ივნისი 2024 - ნოემბერი 2024',
				body: [
					'საცხოვრებელი და კომერციული უძრავი ქონების ქირავნობის marketplace.',
					'ვაწყობდი ადაპტურ layout-ებს listing-ის, ძიებისა და ობიექტების გვერდებისთვის, ასევე ვამატებდი client-side ლოგიკას ფილტრებისთვის, ფორმების მდგომარეობებისთვის და booking-თან დაკავშირებული UI სცენარებისთვის.',
				],
			},
			{
				id: 'contact',
				title: 'ღია ვარ frontend product გუნდებისთვის.',
				form: {
					button: 'მომწერეთ',
					close: 'ფორმის დახურვა',
					email: 'Email',
					emailError: 'შეიყვანეთ სწორი email.',
					message: 'შეტყობინება',
					messageError: 'შეტყობინება უნდა იყოს მინიმუმ 10 სიმბოლო.',
					messagePlaceholder:
						'მოკლედ აღწერეთ ვაკანსია, პროექტი ან კითხვა.',
					name: 'სახელი',
					nameError: 'მიუთითეთ სახელი.',
					namePlaceholder: 'თქვენი სახელი',
					sending: 'იგზავნება...',
					sendError:
						'შეტყობინების გაგზავნა ვერ მოხერხდა. სცადეთ ხელახლა ან მომწერეთ პირდაპირ email-ზე.',
					sendSuccess: 'შეტყობინება გაიგზავნა. მალე გიპასუხებთ.',
					status: 'გთხოვთ, ცოტა ხანი მოიცადოთ ხელახლა გაგზავნამდე.',
					submit: 'გაგზავნა',
					title: 'ვითანამშრომლოთ',
				},
				body: [
					'მინსკი, ბელარუსი',
					'ტელეფონი: +375 25 517 7471',
					'Email: mmm135gmmm@gmail.com',
					'ენები: ინგლისური, რუსული',
				],
			},
		],
	},
	pl: {
		role: 'Frontend Developer',
		name: 'Matvey Pavlov',
		intro: 'Frontend developer tworzący szybkie, responsywne interfejsy w nowoczesnych stackach JavaScript, w tym React i Vue.',
		nav: [
			'About',
			'Skills',
			'Last Work',
			'Game Project',
			'Real Estate UI',
			'Contact',
		],
		kickers: [
			'Profil',
			'Stack',
			'Doświadczenie',
			'Projekt',
			'Produkt',
			'Kontakt',
		],
		sections: [
			{
				id: 'about',
				title: 'Frontend dla czytelnych ścieżek produktu.',
				body: [
					'Tworzę responsywne aplikacje webowe z naciskiem na szybkość, utrzymywalny kod i wygodę codziennego użycia.',
					'Pracuję z React, Vue i szerszym ekosystemem JavaScript: buduję stabilne przepływy UI, podłączam logikę produktu i przekładam wymagania na klarowne interfejsy.',
				],
			},
			{
				id: 'skills',
				title: 'Praktyczny stack frontendowy.',
				body: [
					'Najmocniej pracuję przy komponentowym frontendzie, zarządzaniu stanem, integracjach API i dopracowanych ekranach produktowych.',
				],
				skills,
			},
			{
				id: 'experience',
				title: 'Wynajem aut w platformie bookingowej.',
				meta: 'Frontend Developer · kwiecień 2025 - maj 2026',
				body: [
					'Platforma korporacyjna do rezerwacji podróży, zakwaterowania i dodatkowych usług travel.',
					'Zaimplementowałem frontend funkcji wynajmu samochodów end to end, a następnie pracowałem nad usprawnieniami produktu, poprawkami UI i bug fixingiem w istniejących flow rezerwacji.',
				],
			},
			{
				id: 'projects',
				title: 'Aktualizacje gry Telegram dla mobilnego WebView.',
				meta: 'Frontend Developer · listopad 2024 - maj 2025',
				body: [
					'Interaktywna gra webowa jako Telegram Mini App, rozwijana przez regularne aktualizacje ekranów, stanów i sekcji gry.',
					'Budowałem nowe strony i stany UI, łączyłem je z istniejącą logiką gry, pracowałem z Zustand i dbałem o płynne działanie w mobilnym WebView.',
				],
			},
			{
				id: 'work',
				title: 'Interfejs najmu mieszkań z logiką wyszukiwania.',
				meta: 'Frontend Developer · czerwiec 2024 - listopad 2024',
				body: [
					'Marketplace wynajmu nieruchomości mieszkaniowych i komercyjnych.',
					'Tworzyłem responsywne layouty listingu, wyszukiwania i stron obiektów oraz dodawałem logikę klienta dla filtrów, stanów formularzy i UI związanych z rezerwacją.',
				],
			},
			{
				id: 'contact',
				title: 'Otwarty na frontend product work.',
				form: {
					button: 'Napisz do mnie',
					close: 'Zamknij formularz',
					email: 'Email',
					emailError: 'Wpisz poprawny email.',
					message: 'Wiadomość',
					messageError:
						'Wiadomość powinna mieć co najmniej 10 znaków.',
					messagePlaceholder:
						'Krótko opisz rolę, projekt albo pytanie.',
					name: 'Imię',
					nameError: 'Podaj imię.',
					namePlaceholder: 'Twoje imię',
					sending: 'Wysyłanie...',
					sendError:
						'Nie udało się wysłać wiadomości. Spróbuj ponownie albo napisz bezpośrednio na email.',
					sendSuccess: 'Wiadomość wysłana. Odpowiem wkrótce.',
					status: 'Poczekaj chwilę przed ponowną wysyłką.',
					submit: 'Wyślij',
					title: 'Porozmawiajmy',
				},
				body: [
					'Mińsk, Białoruś',
					'Telefon: +375 25 517 7471',
					'Email: mmm135gmmm@gmail.com',
					'Języki: angielski, rosyjski',
				],
			},
		],
	},
	de: {
		role: 'Frontend Entwickler',
		name: 'Matvey Pavlov',
		intro: 'Frontend Entwickler für schnelle, responsive Interfaces in modernen JavaScript-Stacks, darunter React und Vue.',
		nav: [
			'About',
			'Skills',
			'Last Work',
			'Game Project',
			'Real Estate UI',
			'Contact',
		],
		kickers: [
			'Profil',
			'Stack',
			'Erfahrung',
			'Projekt',
			'Produkt',
			'Kontakt',
		],
		sections: [
			{
				id: 'about',
				title: 'Frontend für klare Produktwege.',
				body: [
					'Ich entwickle responsive Webanwendungen mit Fokus auf Performance, wartbaren Code und eine gute Nutzung im Produktalltag.',
					'Ich arbeite mit React, Vue und dem breiteren JavaScript-Ökosystem: robuste UI-Flows bauen, Produktlogik anbinden und Anforderungen in klare Interfaces übersetzen.',
				],
			},
			{
				id: 'skills',
				title: 'Ein praxisnaher Frontend-Stack.',
				body: [
					'Am stärksten bin ich in komponentenbasierter Frontend-Entwicklung, State Management, API-Integration und sauberen Produktoberflächen.',
				],
				skills,
			},
			{
				id: 'experience',
				title: 'Autovermietung in einer Booking-Plattform.',
				meta: 'Frontend Entwickler · April 2025 - Mai 2026',
				body: [
					'Unternehmensplattform für Reisen, Unterkünfte und zusätzliche Travel-Services.',
					'Ich implementierte die Frontend-Funktion für Autovermietung end to end und arbeitete danach an Produktverbesserungen, UI-Korrekturen und Bugfixes in bestehenden Booking-Flows.',
				],
			},
			{
				id: 'projects',
				title: 'Telegram-Spiel-Updates für mobile WebViews.',
				meta: 'Frontend Entwickler · November 2024 - Mai 2025',
				body: [
					'Interaktives Web Game als Telegram Mini App mit regelmäßigen Updates für Screens, Zustände und Spielbereiche.',
					'Ich baute neue Seiten und UI-Zustände, verband sie mit bestehender Spiellogik, arbeitete mit Zustand und hielt die mobile WebView-Erfahrung flüssig.',
				],
			},
			{
				id: 'work',
				title: 'Mietwohnungs-Interface mit Suchlogik.',
				meta: 'Frontend Entwickler · Juni 2024 - November 2024',
				body: [
					'Marketplace für die Vermietung von Wohn- und Gewerbeimmobilien.',
					'Ich erstellte responsive Layouts für Listings, Suche und Objektseiten und ergänzte clientseitige Logik für Filter, Formularzustände und buchungsbezogene UI-Flows.',
				],
			},
			{
				id: 'contact',
				title: 'Offen für Frontend-Produktteams.',
				form: {
					button: 'Nachricht senden',
					close: 'Formular schließen',
					email: 'Email',
					emailError: 'Bitte gib eine gültige Email ein.',
					message: 'Nachricht',
					messageError:
						'Die Nachricht sollte mindestens 10 Zeichen lang sein.',
					messagePlaceholder:
						'Beschreibe kurz die Rolle, das Projekt oder deine Frage.',
					name: 'Name',
					nameError: 'Bitte gib deinen Namen ein.',
					namePlaceholder: 'Dein Name',
					sending: 'Wird gesendet...',
					sendError:
						'Die Nachricht konnte nicht gesendet werden. Bitte versuche es erneut oder schreibe mir direkt per Email.',
					sendSuccess: 'Nachricht gesendet. Ich antworte bald.',
					status: 'Bitte warte einen Moment, bevor du erneut sendest.',
					submit: 'Anfrage senden',
					title: 'Lass uns zusammenarbeiten',
				},
				body: [
					'Minsk, Belarus',
					'Telefon: +375 25 517 7471',
					'Email: mmm135gmmm@gmail.com',
					'Sprachen: Englisch, Russisch',
				],
			},
		],
	},
	es: {
		role: 'Desarrollador Frontend',
		name: 'Matvey Pavlov',
		intro: 'Desarrollador frontend que crea interfaces rápidas y responsivas con stacks modernos de JavaScript, incluidos React y Vue.',
		nav: [
			'About',
			'Skills',
			'Last Work',
			'Game Project',
			'Real Estate UI',
			'Contact',
		],
		kickers: [
			'Perfil',
			'Stack',
			'Experiencia',
			'Proyecto',
			'Producto',
			'Contacto',
		],
		sections: [
			{
				id: 'about',
				title: 'Frontend para recorridos de producto claros.',
				body: [
					'Construyo aplicaciones web responsivas con foco en rendimiento, código mantenible y una experiencia de uso cuidada.',
					'Trabajo con React, Vue y el ecosistema JavaScript cercano: diseño flujos UI estables, conecto lógica de producto y convierto requisitos en interfaces claras.',
				],
			},
			{
				id: 'skills',
				title: 'Un stack frontend práctico.',
				body: [
					'Mi punto fuerte está en el desarrollo frontend por componentes, gestión de estado, integración de APIs y pantallas de producto bien pulidas.',
				],
				skills,
			},
			{
				id: 'experience',
				title: 'Alquiler de coches dentro de una plataforma de reservas.',
				meta: 'Desarrollador Frontend · abril 2025 - mayo 2026',
				body: [
					'Plataforma corporativa para viajes, alojamiento y servicios adicionales de travel.',
					'Implementé end to end en frontend la función de alquiler de coches y después seguí con mejoras de producto, ajustes de UI y corrección de bugs en flujos de reserva existentes.',
				],
			},
			{
				id: 'projects',
				title: 'Actualizaciones de juego Telegram para WebView móvil.',
				meta: 'Desarrollador Frontend · noviembre 2024 - mayo 2025',
				body: [
					'Juego web interactivo integrado como Telegram Mini App, desarrollado mediante actualizaciones frecuentes de pantallas, estados y secciones de juego.',
					'Construí nuevas páginas y estados UI, los conecté con la lógica de juego existente, trabajé con Zustand y mantuve fluida la experiencia en WebView móvil.',
				],
			},
			{
				id: 'work',
				title: 'Interfaz de alquiler de vivienda con lógica de búsqueda.',
				meta: 'Desarrollador Frontend · junio 2024 - noviembre 2024',
				body: [
					'Marketplace de alquiler para inmuebles residenciales y comerciales.',
					'Construí layouts responsivos para listados, búsqueda y páginas de propiedades, además de lógica cliente para filtros, estados de formularios y flujos UI relacionados con reservas.',
				],
			},
			{
				id: 'contact',
				title: 'Disponible para equipos frontend de producto.',
				form: {
					button: 'Escríbeme',
					close: 'Cerrar formulario',
					email: 'Email',
					emailError: 'Introduce un email válido.',
					message: 'Mensaje',
					messageError:
						'El mensaje debe tener al menos 10 caracteres.',
					messagePlaceholder:
						'Cuéntame brevemente sobre el puesto, proyecto o pregunta.',
					name: 'Nombre',
					nameError: 'Indica tu nombre.',
					namePlaceholder: 'Tu nombre',
					sending: 'Enviando...',
					sendError:
						'No se pudo enviar el mensaje. Inténtalo de nuevo o escríbeme directamente por email.',
					sendSuccess: 'Mensaje enviado. Responderé pronto.',
					status: 'Espera un momento antes de enviar de nuevo.',
					submit: 'Enviar solicitud',
					title: 'Colaboremos',
				},
				body: [
					'Minsk, Bielorrusia',
					'Teléfono: +375 25 517 7471',
					'Email: mmm135gmmm@gmail.com',
					'Idiomas: inglés, ruso',
				],
			},
		],
	},
};
