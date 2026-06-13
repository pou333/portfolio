import Portfolio from '../portfolio';
import { defaultLanguage, languages } from '../i18n/translations';

export function generateStaticParams() {
	return languages.map((language) => ({ lang: language.code }));
}

export default async function LanguagePage({ params }) {
	const { lang } = await params;
	const language = languages.some((item) => item.code === lang)
		? lang
		: defaultLanguage;

	return <Portfolio initialLanguage={language} />;
}
