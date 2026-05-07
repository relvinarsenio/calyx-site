<script lang="ts">
	import './layout.css';
	import { env } from '$env/dynamic/public';

	const PUBLIC_SITE_URL = env.PUBLIC_SITE_URL;

	let { children } = $props();

	const seo = {
		title: 'Calyx - Benchmark Utility',
		description: "The modern alternative to bench.sh. Calyx is a cli tool to check your server's specs and test exactly how fast your disk and internet are.",
		url: PUBLIC_SITE_URL,
		siteName: 'Calyx'
	};
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
	<meta name="google-site-verification" content="byTbTMZY1oGzcAopzU_sya1rc11mgEHtaKLHOp89uSY" />
	<link rel="icon" href="/favicon.svg" />
	<link rel="canonical" href={seo.url} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={seo.url} />
	<meta property="og:title" content={seo.title} />
	<meta property="og:description" content={seo.description} />
	<meta property="og:image" content="{seo.url}/social-preview.webp" />
	<meta property="og:site_name" content={seo.siteName} />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={seo.url} />
	<meta name="twitter:title" content={seo.title} />
	<meta name="twitter:description" content={seo.description} />
	<meta name="twitter:image" content="{seo.url}/social-preview.webp" />
</svelte:head>

{@render children()}
