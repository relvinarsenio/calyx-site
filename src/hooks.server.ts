import type { Handle } from '@sveltejs/kit';

const SUPPORTED_LOCALES = ['en', 'id', 'zh-CN', 'zh-TW'];

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
		if (SUPPORTED_LOCALES.includes(lang)) return lang;

		const prefix = lang.split('-')[0];
		if (prefix === 'zh') {
			return /tw|hk|mo|hant/i.test(lang) ? 'zh-TW' : 'zh-CN';
		}
		if (SUPPORTED_LOCALES.includes(prefix)) return prefix;
	}

	return 'en';
}

export const handle: Handle = async ({ event, resolve }) => {
	const cookieLang = event.cookies.get('lang');
	const headerLang = resolveLocaleFromHeader(event.request.headers.get('accept-language'));

	event.locals.locale =
		cookieLang && SUPPORTED_LOCALES.includes(cookieLang) ? cookieLang : headerLang;

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('lang="en"', `lang="${event.locals.locale}"`)
	});
};
