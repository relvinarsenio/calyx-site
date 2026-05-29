<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { Gauge, Cpu, HardDrive, Copy, Check } from '@lucide/svelte';
	import GithubIcon from '$lib/components/GithubIcon.svelte';
	import { page } from '$app/state';
	import { locale, _ } from 'svelte-i18n';

	let copied = $state(false);
	let systemTime = $state('');
	let showLangDropdown = $state(false);

	let command = $derived(`bash <(curl -fsL ${page.url.origin}/run)`);

	onMount(() => {
		const updateTime = () => {
			systemTime = new Date().toLocaleString();
		};
		updateTime();
		const interval = setInterval(updateTime, 1000);

		const closeDropdown = () => {
			showLangDropdown = false;
		};
		window.addEventListener('click', closeDropdown);

		return () => {
			clearInterval(interval);
			window.removeEventListener('click', closeDropdown);
		};
	});

	function handleCopy() {
		navigator.clipboard.writeText(command);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2000);
	}

	function toggleDropdown(e: MouseEvent) {
		e.stopPropagation();
		showLangDropdown = !showLangDropdown;
	}

	function selectLang(langCode: string, e: MouseEvent) {
		e.stopPropagation();
		locale.set(langCode);
		localStorage.setItem('lang', langCode);
		showLangDropdown = false;
	}
</script>

<main class="flex flex-col min-h-[100dvh] pt-8 pb-4 px-4 md:px-8 relative">
	<div class="flex-1 max-w-6xl w-full mx-auto">
		<!-- Top Bar Header -->
		<header
			class="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 grid-line-bottom pb-4 px-2 delay-100 animate-[fade-in-down_0.5s_ease-out_both]"
		>
			<hgroup>
				<p class="col-header mb-2 leading-none">{$_('appTitle')}</p>
				<h1
					class="text-4xl md:text-5xl font-mono font-bold tracking-tighter uppercase text-ink mt-1 flex items-center"
				>
					<span class="typewriter-calyx">Calyx</span>
				</h1>
			</hgroup>
			<div class="mt-4 md:mt-0 flex flex-col md:items-end w-full md:w-auto">
				<div class="flex items-center gap-4 mb-6 md:mb-5">
					<a
						id="github-repo-link"
						href="https://github.com/relvinarsenio/calyx/"
						target="_blank"
						rel="noopener noreferrer"
						class="text-ink/40 hover:text-ink transition-colors group flex items-center gap-2"
						title="GitHub Repository"
					>
						<GithubIcon className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
					</a>
					<div class="w-[1px] h-4 bg-ink/15"></div>
					<div class="relative">
						<button
							id="lang-selector-btn"
							onclick={toggleDropdown}
							class="flex items-center gap-1 px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase rounded border border-ink/15 hover:border-ink/40 text-ink/50 hover:text-ink bg-transparent transition-all duration-200 cursor-pointer select-none active:scale-[0.97]"
							aria-haspopup="listbox"
							aria-expanded={showLangDropdown}
						>
							<span>{$locale || 'en'}</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								class="w-3 h-3 transition-transform duration-200 {showLangDropdown
									? 'rotate-180'
									: 'rotate-0'}"
							>
								<path
									fill-rule="evenodd"
									d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>

						{#if showLangDropdown}
							<div
								in:fade={{ duration: 100 }}
								out:fade={{ duration: 75 }}
								class="absolute right-0 mt-1 w-24 rounded border border-ink/15 bg-white/95 dark:bg-[#151518]/95 backdrop-blur-xl shadow-lg z-50 py-0.5 overflow-hidden"
								role="listbox"
							>
								{#each ['en', 'id', 'zh-CN', 'zh-TW'] as lang (lang)}
									<button
										onclick={(e) => selectLang(lang, e)}
										class="w-full text-left px-2 py-1 text-[9px] font-mono tracking-widest uppercase transition-all duration-150 flex items-center justify-between
											{lang === $locale
											? 'bg-ink text-bg font-bold'
											: 'text-ink/70 hover:bg-ink/5 dark:hover:bg-white/5 hover:text-ink'}"
										role="option"
										aria-selected={lang === $locale}
									>
										<span>{lang}</span>
										{#if lang === $locale}
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
												class="w-2.5 h-2.5"
											>
												<path
													fill-rule="evenodd"
													d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
													clip-rule="evenodd"
												/>
											</svg>
										{/if}
									</button>
								{/each}
							</div>
						{/if}
					</div>
				</div>
				<p class="col-header mb-2">{$_('liveTime')}</p>
				<time class="font-mono text-sm tracking-tight text-ink tabular-nums">
					{systemTime || '...'}
				</time>
			</div>
		</header>

		<div
			class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 animate-[fade-in-up_0.5s_ease-out_both] delay-600"
		>
			<!-- Left Column Constraints -->
			<section class="md:col-span-4 flex flex-col h-full grid-line-right pr-6">
				<h2 class="col-header mb-4 mt-2">{$_('abstract')}</h2>
				<p class="font-sans text-sm md:text-base leading-relaxed text-ink/80 mb-6">
					{$_('description_prefix')}<span
						class="font-mono bg-line px-1 py-0.5 whitespace-nowrap text-ink">bench.sh</span
					>{$_('description_suffix')}
				</p>

				<ul
					class="grid grid-cols-1 gap-2 mt-4 md:mt-auto border border-line/40 p-4 rounded-2xl bg-white/45 dark:bg-[#1e1e23]/45 backdrop-blur-[24px] backdrop-saturate-[180%] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.6),0_10px_30px_-10px_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.1),0_10px_30px_-10px_rgba(0,0,0,0.3)] will-change-transform translate-y-0 scale-100 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:scale-[1.01] hover:shadow-[0_20px_30px_-10px_rgba(0,0,0,0.08)] hover:border-ink"
				>
					<li class="flex items-center gap-3 w-full border-b border-line/40 pb-2 mb-2">
						<Cpu class="w-4 h-4 text-ink/70" />
						<span class="font-mono text-xs uppercase tracking-widest text-ink/80"
							>{$_('systemInfo')}</span
						>
					</li>
					<li class="flex items-center gap-3 w-full border-b border-line/40 pb-2 mb-2">
						<HardDrive class="w-4 h-4 text-ink/70" />
						<span class="font-mono text-xs uppercase tracking-widest text-ink/80"
							>{$_('diskBenchmark')}</span
						>
					</li>
					<li class="flex items-center gap-3 w-full">
						<Gauge class="w-4 h-4 text-ink/70" />
						<span class="font-mono text-xs uppercase tracking-widest text-ink/80"
							>{$_('networkSpeed')}</span
						>
					</li>
				</ul>
			</section>

			<!-- Right Column Command Execution -->
			<section class="md:col-span-8 flex flex-col pt-2 md:pl-4">
				<h2 class="col-header mb-4">{$_('execProtocol')}</h2>

				<div
					class="border border-line/40 rounded-2xl mt-2 bg-white/45 dark:bg-[#1e1e23]/45 backdrop-blur-[24px] backdrop-saturate-[180%] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.6),0_10px_30px_-10px_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.1),0_10px_30px_-10px_rgba(0,0,0,0.3)] will-change-transform translate-y-0 scale-100 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:scale-[1.01] hover:shadow-[0_20px_30px_-10px_rgba(0,0,0,0.08)] hover:border-ink animate-float-card group overflow-hidden relative"
				>
					<div
						class="relative flex items-center justify-center border-b border-line/40 px-4 py-2 bg-ink/[0.03]"
					>
						<div class="absolute left-4 flex gap-1.5">
							<div class="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
							<div class="w-3 h-3 rounded-full bg-[#febc2e]"></div>
							<div class="w-3 h-3 rounded-full bg-[#28c840]"></div>
						</div>
						<p class="col-header opacity-60 uppercase tracking-widest text-[10px]">
							{$_('terminalCommand')}
						</p>
					</div>

					<div class="p-6 md:p-8 w-full">
						<pre
							class="flex w-full min-w-0 items-center overflow-x-auto whitespace-nowrap scrollbar-hide"><span
								class="font-mono text-ink/40 mr-4 select-none shrink-0">$</span
							><code
								style="--length: {command.length}"
								class="font-mono text-base md:text-lg text-ink font-semibold typewriter-command shrink-0"
								>{command}</code
							></pre>
					</div>

					<div class="border-t border-line/40">
						<button
							id="copy-command-btn"
							onclick={handleCopy}
							class="w-full py-4 px-6 text-sm font-mono tracking-widest uppercase transition-all duration-200 outline-none flex items-center justify-center gap-2 active:scale-[0.98]
								{copied ? 'bg-ink text-bg' : 'bg-transparent text-ink hover:bg-ink/5 active:bg-ink/10'}"
						>
							{#if copied}
								<span in:fade={{ duration: 120 }} class="flex items-center gap-2">
									<Check class="w-4 h-4" />
									{$_('commandCopied')}
								</span>
							{:else}
								<span in:fade={{ duration: 120 }} class="flex items-center gap-2">
									<Copy class="w-4 h-4" />
									{$_('copyCommand')}
								</span>
							{/if}
						</button>
					</div>
				</div>
			</section>
		</div>
	</div>

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
</main>
