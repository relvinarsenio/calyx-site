<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import {
		Sparkles,
		LockOpen,
		Brain,
		Package,
		Copy,
		Check,
		ChevronDown,
		Eye,
		X
	} from '@lucide/svelte';
	import GithubIcon from '$lib/components/GithubIcon.svelte';
	import { page } from '$app/state';
	import { locale, _ } from 'svelte-i18n';
	import { supportedLocales } from '$lib/i18n';
	import { DropdownMenu, Tooltip, Dialog, Separator, mergeProps } from 'bits-ui';
	import { getRunScript } from '$lib/utils/runScript';

	let copied = $state(false);
	let systemTime = $state('');

	let command = $derived(`bash <(curl -fsL ${page.url.origin}/run)`);
	const scriptContent = getRunScript();

	const features = [
		{ icon: Sparkles, adv: 'advBeginner', desc: 'descBeginner' },
		{ icon: LockOpen, adv: 'advAccurate', desc: 'descAccurate' },
		{ icon: Brain, adv: 'advAdaptive', desc: 'descAdaptive' },
		{ icon: Package, adv: 'advPortable', desc: 'descPortable' }
	];

	onMount(() => {
		const updateTime = () => {
			systemTime = new Date().toLocaleString();
		};
		updateTime();
		const interval = setInterval(updateTime, 1000);

		return () => {
			clearInterval(interval);
		};
	});

	let copyTimeout: ReturnType<typeof setTimeout>;
	function handleCopy() {
		navigator.clipboard.writeText(command);
		copied = true;
		clearTimeout(copyTimeout);
		copyTimeout = setTimeout(() => {
			copied = false;
		}, 2000);
	}

	let dialogOffsetX = $state(0);
	let dialogOffsetY = $state(0);

	function updateDialogOrigin(e: Event) {
		const target = e.currentTarget as HTMLElement;
		if (!target) return;
		const rect = target.getBoundingClientRect();
		dialogOffsetX = rect.left + rect.width / 2 - window.innerWidth / 2;
		dialogOffsetY = rect.top + rect.height / 2 - window.innerHeight / 2;
	}

	function selectLang(langCode: string) {
		locale.set(langCode);
		localStorage.setItem('lang', langCode);
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
				<nav aria-label="Site Utilities" class="flex items-center gap-4 mb-6 md:mb-5">
					<Tooltip.Provider delayDuration={150}>
						<Tooltip.Root>
							<Tooltip.Trigger>
								{#snippet child({ props })}
									<a
										{...props}
										id="github-repo-link"
										href="https://github.com/relvinarsenio/calyx/"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="GitHub Repository"
										class="text-ink/40 hover:text-ink transition-colors group flex items-center gap-2"
									>
										<GithubIcon
											className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform"
										/>
									</a>
								{/snippet}
							</Tooltip.Trigger>
							<Tooltip.Content
								sideOffset={6}
								class="z-50 px-2 py-1 text-[9px] font-mono tracking-widest uppercase rounded border border-ink/15 bg-white/95 dark:bg-[#151518]/95 backdrop-blur-xl shadow-lg text-ink animate-tooltip"
							>
								GitHub Repository
							</Tooltip.Content>
						</Tooltip.Root>
					</Tooltip.Provider>
					<Separator.Root orientation="vertical" class="w-[1px] h-4 bg-ink/15" />
					<div class="relative">
						<DropdownMenu.Root>
							<DropdownMenu.Trigger
								id="lang-selector-btn"
								aria-label="Change language"
								class="flex items-center gap-1 px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase rounded border border-ink/15 hover:border-ink/40 text-ink/50 hover:text-ink bg-transparent transition-all duration-200 cursor-pointer select-none active:scale-[0.97]"
							>
								<span>{$locale || 'en'}</span>
								<ChevronDown
									class="w-3 h-3 transition-transform duration-200 data-[state=open]:rotate-180"
								/>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content
								class="mt-1 w-24 rounded border border-ink/15 bg-white/95 dark:bg-[#151518]/95 backdrop-blur-xl shadow-lg z-50 py-0.5 overflow-hidden animate-popover"
								align="end"
								sideOffset={4}
							>
								{#each supportedLocales as lang (lang)}
									<DropdownMenu.Item
										onclick={() => selectLang(lang)}
										class="w-full text-left px-2 py-1 text-[9px] font-mono tracking-widest uppercase transition-all duration-150 flex items-center justify-between outline-none cursor-pointer
											{lang === $locale
											? 'bg-ink text-bg font-bold'
											: 'text-ink/70 data-[highlighted]:bg-ink/5 dark:data-[highlighted]:bg-white/5 data-[highlighted]:text-ink'}"
									>
										<span>{lang}</span>
										{#if lang === $locale}
											<Check class="w-2.5 h-2.5" />
										{/if}
									</DropdownMenu.Item>
								{/each}
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</div>
				</nav>
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
					class="flex flex-wrap gap-2 mt-4 md:mt-auto select-none cursor-default"
					aria-label="Features"
				>
					{#each features as { icon: Icon, adv, desc } (adv)}
						<Tooltip.Provider delayDuration={200}>
							<Tooltip.Root>
								<Tooltip.Trigger>
									{#snippet child({ props })}
										<li
											{...props}
											class="feature-badge cursor-help hover:scale-105 transition-transform"
										>
											<Icon class="w-3.5 h-3.5 opacity-70" />
											{$_(adv)}
										</li>
									{/snippet}
								</Tooltip.Trigger>
								<Tooltip.Content
									sideOffset={8}
									class="z-50 w-64 p-3 rounded-lg border border-ink/15 bg-white/95 dark:bg-[#151518]/95 backdrop-blur-xl shadow-lg animate-tooltip"
								>
									<p class="text-sm text-ink/80 leading-relaxed font-sans">{$_(desc)}</p>
								</Tooltip.Content>
							</Tooltip.Root>
						</Tooltip.Provider>
					{/each}
				</ul>
			</section>

			<!-- Right Column Command Execution -->
			<section class="md:col-span-8 flex flex-col pt-2 md:pl-4">
				<h2 class="col-header mb-4">{$_('execProtocol')}</h2>

				<figure class="glass-panel mt-2 animate-float-card group relative">
					<figcaption
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
					</figcaption>

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

					<div role="group" aria-label="Command Actions" class="border-t border-line/40 flex">
						<button
							id="copy-command-btn"
							onclick={handleCopy}
							class="flex-1 w-full text-sm font-mono tracking-widest uppercase transition-all duration-300 outline-none grid place-items-center overflow-hidden active:scale-[0.98]
								{copied ? 'bg-ink text-bg' : 'bg-transparent text-ink hover:bg-ink/5 active:bg-ink/10'}"
						>
							{#if copied}
								<span
									in:fly={{ y: 20, duration: 250, delay: 150 }}
									out:fly={{ y: -20, duration: 250 }}
									class="col-start-1 row-start-1 py-4 px-6 flex items-center gap-2 select-none cursor-default"
								>
									<Check class="w-4 h-4" />
									{$_('commandCopied')}
								</span>
							{:else}
								<span
									in:fly={{ y: 20, duration: 250, delay: 150 }}
									out:fly={{ y: -20, duration: 250 }}
									class="col-start-1 row-start-1 py-4 px-6 flex items-center gap-2 select-none cursor-default"
								>
									<Copy class="w-4 h-4" />
									{$_('copyCommand')}
								</span>
							{/if}
						</button>

						<Separator.Root orientation="vertical" class="w-[1px] bg-line/40 h-auto" />

						<Dialog.Root>
							<Tooltip.Provider delayDuration={150}>
								<Tooltip.Root>
									<Tooltip.Trigger>
										{#snippet child({ props: tooltipProps })}
											<Dialog.Trigger>
												{#snippet child({ props: dialogProps })}
													<button
														{...mergeProps(tooltipProps, dialogProps, {
															onmouseenter: updateDialogOrigin,
															onfocus: updateDialogOrigin,
															onpointerdown: updateDialogOrigin
														})}
														aria-label="View Source"
														class="w-16 grid place-items-center bg-transparent text-ink/70 hover:text-ink hover:bg-ink/5 active:bg-ink/10 transition-colors outline-none cursor-pointer"
													>
														<Eye class="w-4 h-4" />
													</button>
												{/snippet}
											</Dialog.Trigger>
										{/snippet}
									</Tooltip.Trigger>
									<Tooltip.Portal>
										<Tooltip.Content
											sideOffset={6}
											class="z-50 px-2 py-1 text-[9px] font-mono tracking-widest uppercase rounded border border-ink/15 bg-white/95 dark:bg-[#151518]/95 backdrop-blur-xl shadow-lg text-ink animate-tooltip"
										>
											{$_('viewSource')}
										</Tooltip.Content>
									</Tooltip.Portal>
								</Tooltip.Root>
							</Tooltip.Provider>

							<Dialog.Portal>
								<Dialog.Overlay
									class="fixed inset-0 z-50 bg-bg/80 backdrop-blur-sm animate-dialog-overlay"
								/>
								<Dialog.Content
									style="--dialog-offset-x: {dialogOffsetX}px; --dialog-offset-y: {dialogOffsetY}px"
									class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] gap-4 border border-line bg-bg p-6 shadow-xl sm:rounded-xl animate-dialog"
								>
									<div class="flex flex-col space-y-1.5 text-center sm:text-left">
										<Dialog.Title
											class="text-lg font-semibold leading-none tracking-tight font-mono"
										>
											{$_('sourceCode')}
										</Dialog.Title>
										<Dialog.Description class="text-sm text-ink/60 font-sans">
											<code class="font-mono text-xs">curl -fsL {page.url.origin}/run</code>
										</Dialog.Description>
									</div>
									<div
										class="relative overflow-hidden rounded-md border border-line/40 bg-ink/5 p-4 max-h-[60vh] overflow-y-auto"
									>
										<pre class="text-xs font-mono text-ink/90 whitespace-pre-wrap"><code
												>{scriptContent}</code
											></pre>
									</div>
									<Dialog.Close>
										{#snippet child({ props })}
											<button
												{...props}
												class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-bg transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2 disabled:pointer-events-none cursor-pointer"
											>
												<X class="h-4 w-4" />
												<span class="sr-only">{$_('close')}</span>
											</button>
										{/snippet}
									</Dialog.Close>
								</Dialog.Content>
							</Dialog.Portal>
						</Dialog.Root>
					</div>
				</figure>
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
