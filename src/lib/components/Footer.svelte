<script lang="ts">
	import { _ } from 'svelte-i18n';
</script>

<footer
	class="mt-12 md:mt-16 w-full max-w-6xl mx-auto border-t border-ink/25 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] text-ink/65 uppercase tracking-widest animate-[fade-in-up_0.5s_ease-out_0.1s_both]"
>
	<p>
		{$_('copyright')}
		<span class="font-sans text-xs normal-case select-none">&copy;</span>
		2025–{new Date().getFullYear()} Alfie Ardinata.
	</p>
	<a
		id="footer-license-link"
		href="https://github.com/relvinarsenio/calyx/blob/master/LICENSE"
		target="_blank"
		rel="noopener noreferrer"
		class="hover:text-ink transition-colors underline underline-offset-4 decoration-line hover:decoration-ink"
	>
		{$_('openSource')}
	</a>
</footer>
