<script lang="ts">
	import './layout.css';
	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import { locale, _ } from 'svelte-i18n';
	import { initI18n } from '$lib/i18n';
	import { GOOGLE_VERIFICATION_META_TOKEN } from '$lib/config';
	import { MetaTags } from 'svelte-meta-tags';
	import { JsonLd } from 'svelte-meta-tags';

	interface Props {
		children: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	initI18n(page.data.locale);

	$effect(() => {
		if (browser && $locale) {
			document.documentElement.lang = $locale;
		}
	});

	const seo = $derived({
		title: `${$_('appName')} - ${$_('appTitle')}`,
		description: `${$_('description_prefix')}bench.sh${$_('description_suffix')}`,
		url: page.url.origin,
		siteName: 'Calyx'
	});

	const ogLocale = $derived(
		$locale === 'id'
			? 'id_ID'
			: $locale === 'zh-CN'
				? 'zh_CN'
				: $locale === 'zh-TW'
					? 'zh_TW'
					: 'en_US'
	);
</script>

<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: seo.siteName,
		description: seo.description,
		url: seo.url,
		operatingSystem: 'Linux',
		applicationCategory: 'BenchmarkApplication',
		applicationSuite: 'Shell',
		contentRating: 'Everyone',
		inLanguage: $locale,
		installUrl: `${seo.url}/run`
	}}
/>

<MetaTags
	title={seo.title}
	description={seo.description}
	canonical={seo.url}
	openGraph={{
		type: 'website',
		url: seo.url,
		title: seo.title,
		description: seo.description,
		images: [
			{
				url: `${seo.url}/social-preview.webp`,
				alt: seo.title
			}
		],
		siteName: seo.siteName,
		locale: ogLocale
	}}
	twitter={{
		cardType: 'summary_large_image',
		title: seo.title,
		description: seo.description,
		image: `${seo.url}/social-preview.webp`,
		imageAlt: seo.title
	}}
	additionalMetaTags={[
		{
			name: 'google-site-verification',
			content: GOOGLE_VERIFICATION_META_TOKEN
		}
	]}
	additionalLinkTags={[
		{
			rel: 'icon',
			href: '/favicon.svg'
		}
	]}
/>

{@render children()}
