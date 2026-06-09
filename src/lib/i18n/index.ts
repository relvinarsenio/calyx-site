import { browser } from '$app/environment';
import { init, addMessages } from 'svelte-i18n';
import en from './locales/en.json';
import id from './locales/id.json';
import zhCN from './locales/zh-CN.json';
import zhTW from './locales/zh-TW.json';
import { supportedLocales, isSupportedLocale, parseChineseVariant } from './locales';
import type { SupportedLocale } from './locales';

addMessages('en', en);
addMessages('id', id);
addMessages('zh-CN', zhCN);
addMessages('zh-TW', zhTW);

export { supportedLocales };
export type { SupportedLocale };

export function detectClientLocale(): SupportedLocale {
	if (!browser) return 'en';

	const saved = localStorage.getItem('lang');
	if (saved && isSupportedLocale(saved)) return saved;

	const navLang = window.navigator.language;
	if (isSupportedLocale(navLang)) return navLang;

	const prefix = navLang.split('-')[0];
	if (prefix === 'zh') {
		return parseChineseVariant(navLang);
	}

	if (isSupportedLocale(prefix)) return prefix;

	return 'en';
}

export function initI18n(serverLocale?: string) {
	const locale = browser ? detectClientLocale() : (serverLocale ?? 'en');

	init({
		fallbackLocale: 'en',
		initialLocale: locale
	});
}
