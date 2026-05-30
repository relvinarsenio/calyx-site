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

export const supportedLocales: readonly string[] = ['en', 'id', 'zh-CN', 'zh-TW'];

function detectInitialLocale(): string {
	if (!browser) return 'en';

	const saved = localStorage.getItem('lang');
	if (saved && supportedLocales.includes(saved)) return saved;

	const navLang = window.navigator.language;
	if (supportedLocales.includes(navLang)) return navLang;

	const prefix = navLang.split('-')[0];
	if (prefix === 'zh') {
		if (/tw|hk|mo|hant/i.test(navLang)) {
			return 'zh-TW';
		}
		return 'zh-CN';
	}

	if (supportedLocales.includes(prefix)) return prefix;

	return 'en';
}

init({
	fallbackLocale: 'en',
	initialLocale: detectInitialLocale()
});
