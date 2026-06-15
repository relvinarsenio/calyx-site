<script lang="ts">
	import { springFly } from '$lib/transitions';
	import { locale, _ } from 'svelte-i18n';
	import { supportedLocales } from '$lib/i18n';
	import { DropdownMenu, Tooltip, Separator } from 'bits-ui';
	import { ChevronDown, Check } from '@lucide/svelte';
	import GithubIcon from '$lib/components/GithubIcon.svelte';

	let systemTime = $state('');

	$effect(() => {
		const updateTime = () => {
			systemTime = new Date().toLocaleString($locale ?? 'en');
		};
		updateTime();
		const interval = setInterval(updateTime, 1000);

		return () => clearInterval(interval);
	});

	function selectLang(langCode: string) {
		locale.set(langCode);
		localStorage.setItem('lang', langCode);
		document.cookie = `lang=${langCode};path=/;max-age=31536000;SameSite=Lax;Secure`;
	}
</script>

<header
	in:springFly={{ y: -15, duration: 550, delay: 100, scale: 0.98 }}
	class="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 grid-line-bottom pb-4 px-2"
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
								<GithubIcon class="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
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
