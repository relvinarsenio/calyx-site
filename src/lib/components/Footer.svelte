<script lang="ts">
	import { springFly } from '$lib/transitions';
	import { _ } from 'svelte-i18n';
	import { GITHUB_REPO_URL } from '$lib/config';
</script>

<footer
	in:springFly={{ y: 15, duration: 550, delay: 100, scale: 0.98 }}
	class="mx-auto mt-12 flex w-full max-w-6xl flex-col items-center justify-between gap-4 border-t border-ink/25 pt-6 font-mono text-[10px] tracking-widest text-ink/65 uppercase md:mt-16 md:flex-row"
>
	<p>
		{$_('copyright')}
		<span class="font-sans text-xs normal-case select-none">&copy;</span>
		2025–{new Date().getFullYear()} Alfie Ardinata.
	</p>
	<!-- eslint-disable svelte/no-navigation-without-resolve -->
	<a
		id="footer-license-link"
		href="{GITHUB_REPO_URL}/blob/master/LICENSE"
		target="_blank"
		rel="noopener noreferrer"
		class="underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
	>
		{$_('openSource')}
	</a>
	<!-- eslint-enable svelte/no-navigation-without-resolve -->
</footer>
