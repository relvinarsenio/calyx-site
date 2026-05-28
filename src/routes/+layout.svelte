<script lang="ts">
	import './layout.css';
	import { page } from '$app/state';

	interface Props {
		children: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	const seo = $derived({
		title: 'Calyx - Server Benchmark Utility',
		description:
			'A modern alternative to bench.sh. Calyx runs directly in your terminal to check server specs, RAM usage, disk speed, and actual internet speed instantly.',
		url: page.url.origin,
		siteName: 'Calyx'
	});
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
