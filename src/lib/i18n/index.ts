import { browser } from '$app/environment';
import { init, addMessages } from 'svelte-i18n';
import en from './locales/en.json';
import id from './locales/id.json';
import zhCN from './locales/zh-CN.json';
import zhTW from './locales/zh-TW.json';

addMessages('en', en);
addMessages('id', id);
addMessages('zh-CN', zhCN);
addMessages('zh-TW', zhTW);

export const supportedLocales = ['en', 'id', 'zh-CN', 'zh-TW'] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

export function detectClientLocale(): SupportedLocale {
	if (!browser) return 'en';

	const saved = localStorage.getItem('lang');
	if (saved && (supportedLocales as readonly string[]).includes(saved))
		return saved as SupportedLocale;

	const navLang = window.navigator.language;
	if ((supportedLocales as readonly string[]).includes(navLang)) return navLang as SupportedLocale;

	const prefix = navLang.split('-')[0];
	if (prefix === 'zh') {
		if (/tw|hk|mo|hant/i.test(navLang)) {
			return 'zh-TW';
		}
		return 'zh-CN';
	}

	if ((supportedLocales as readonly string[]).includes(prefix)) return prefix as SupportedLocale;

	return 'en';
}

export function initI18n(serverLocale?: string) {
	const locale = browser ? detectClientLocale() : (serverLocale ?? 'en');

	init({
		fallbackLocale: 'en',
		initialLocale: locale
	});
}
