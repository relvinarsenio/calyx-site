<script lang="ts">
	import { springFly } from '$lib/transitions';
	import { locale, _ } from 'svelte-i18n';
	import { supportedLocales } from '$lib/i18n';
	import { DropdownMenu, Tooltip, Separator } from 'bits-ui';
	import { ChevronDown, Check } from '@lucide/svelte';
	import GithubIcon from '$lib/components/GithubIcon.svelte';
	import { GITHUB_REPO_URL } from '$lib/config';

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
	class="grid-line-bottom mb-16 flex flex-col items-start justify-between px-2 pb-4 md:flex-row md:items-end"
>
	<hgroup>
		<p class="mb-2 col-header leading-none">{$_('appTitle')}</p>
		<h1
			class="mt-1 flex items-center font-mono text-4xl font-bold tracking-tighter text-ink uppercase md:text-5xl"
		>
			<span class="typewriter-calyx">Calyx</span>
		</h1>
	</hgroup>
	<div class="mt-4 flex w-full flex-col md:mt-0 md:w-auto md:items-end">
		<nav aria-label="Site Utilities" class="mb-6 flex items-center gap-4 md:mb-5">
			<Tooltip.Provider delayDuration={150}>
				<Tooltip.Root>
					<Tooltip.Trigger>
						{#snippet child({ props })}
							<!-- eslint-disable svelte/no-navigation-without-resolve -->
							<a
								{...props}
								id="github-repo-link"
								href={GITHUB_REPO_URL}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="GitHub Repository"
								class="group flex items-center gap-2 text-ink/40 transition-colors hover:text-ink"
							>
								<GithubIcon class="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
							</a>
							<!-- eslint-enable svelte/no-navigation-without-resolve -->
						{/snippet}
					</Tooltip.Trigger>
					<Tooltip.Content
						sideOffset={6}
						class="z-50 rounded border border-ink/15 bg-white/95 px-2 py-1 font-mono text-[9px] tracking-widest text-ink uppercase shadow-lg backdrop-blur-xl animate-tooltip dark:bg-[#151518]/95"
					>
						GitHub Repository
					</Tooltip.Content>
				</Tooltip.Root>
			</Tooltip.Provider>
			<Separator.Root orientation="vertical" class="h-4 w-[1px] bg-ink/15" />
			<div class="relative">
				<DropdownMenu.Root>
					<DropdownMenu.Trigger
						id="lang-selector-btn"
						aria-label="Change language"
						class="flex cursor-pointer items-center gap-1 rounded border border-ink/15 bg-transparent px-2 py-0.5 font-mono text-[9px] tracking-widest text-ink/50 uppercase transition-all duration-200 select-none hover:border-ink/40 hover:text-ink active:scale-[0.97]"
					>
						<span>{$locale || 'en'}</span>
						<ChevronDown
							class="h-3 w-3 transition-transform duration-200 data-[state=open]:rotate-180"
						/>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content
						class="z-50 mt-1 w-24 overflow-hidden rounded border border-ink/15 bg-white/95 py-0.5 shadow-lg backdrop-blur-xl animate-popover dark:bg-[#151518]/95"
						align="end"
						sideOffset={4}
					>
						{#each supportedLocales as lang (lang)}
							<DropdownMenu.Item
								onclick={() => selectLang(lang)}
								class="flex w-full cursor-pointer items-center justify-between px-2 py-1 text-left font-mono text-[9px] tracking-widest uppercase transition-all duration-150 outline-none
									{lang === $locale
									? 'bg-ink font-bold text-bg'
									: 'text-ink/70 data-[highlighted]:bg-ink/5 data-[highlighted]:text-ink dark:data-[highlighted]:bg-white/5'}"
							>
								<span>{lang}</span>
								{#if lang === $locale}
									<Check class="h-2.5 w-2.5" />
								{/if}
							</DropdownMenu.Item>
						{/each}
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		</nav>
		<p class="mb-2 col-header">{$_('liveTime')}</p>
		<time class="font-mono text-sm tracking-tight text-ink tabular-nums">
			{systemTime || '...'}
		</time>
	</div>
</header>
