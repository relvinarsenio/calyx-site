import type { Handle } from '@sveltejs/kit';
import { isSupportedLocale, parseChineseVariant } from '$lib/i18n/locales';

/** Resolve locale from Accept-Language header for SSR-correct initial rendering. */
function resolveLocaleFromHeader(acceptLanguage: string | null): string {
	if (!acceptLanguage) return 'en';

	const languages = acceptLanguage
		.split(',')
		.map((entry) => {
			const [lang, q] = entry.trim().split(';q=');
			return { lang: lang.trim(), quality: q ? parseFloat(q) : 1.0 };
		})
		.sort((a, b) => b.quality - a.quality);

	for (const { lang } of languages) {
		if (isSupportedLocale(lang)) return lang;

		const prefix = lang.split('-')[0];
		if (prefix === 'zh') {
			return parseChineseVariant(lang);
		}
		if (isSupportedLocale(prefix)) return prefix;
	}

	return 'en';
}

export const handle: Handle = async ({ event, resolve }) => {
	const cookieLang = event.cookies.get('lang');
	const headerLang = resolveLocaleFromHeader(event.request.headers.get('accept-language'));

	event.locals.locale = cookieLang && isSupportedLocale(cookieLang) ? cookieLang : headerLang;

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('lang="en"', `lang="${event.locals.locale}"`)
	});
};
