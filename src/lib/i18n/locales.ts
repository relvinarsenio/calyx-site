export const supportedLocales = ['en', 'id', 'zh-CN', 'zh-TW'] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

export function isSupportedLocale(lang: string): lang is SupportedLocale {
	return (supportedLocales as readonly string[]).includes(lang);
}

export function parseChineseVariant(lang: string): SupportedLocale {
	return /tw|hk|mo|hant/i.test(lang) ? 'zh-TW' : 'zh-CN';
}
