<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { Tooltip } from 'bits-ui';
	import { Sparkles, LockOpen, Brain, Package } from '@lucide/svelte';

	const features = [
		{ icon: Sparkles, adv: 'advBeginner', desc: 'descBeginner' },
		{ icon: LockOpen, adv: 'advAccurate', desc: 'descAccurate' },
		{ icon: Brain, adv: 'advAdaptive', desc: 'descAdaptive' },
		{ icon: Package, adv: 'advPortable', desc: 'descPortable' }
	];
</script>

<section class="grid-line-right flex h-full flex-col pr-6 md:col-span-4">
	<h2 class="mt-2 mb-4 col-header">{$_('abstract')}</h2>
	<p class="mb-6 font-sans text-sm leading-relaxed text-ink/80 md:text-base">
		{$_('description_prefix')}<span class="bg-line px-1 py-0.5 font-mono whitespace-nowrap text-ink"
			>bench.sh</span
		>{$_('description_suffix')}
	</p>

	<ul class="mt-4 flex cursor-default flex-wrap gap-2 select-none md:mt-auto" aria-label="Features">
		{#each features as { icon: Icon, adv, desc } (adv)}
			<Tooltip.Provider delayDuration={200}>
				<Tooltip.Root>
					<Tooltip.Trigger>
						{#snippet child({ props })}
							<li {...props} class="feature-badge cursor-help transition-transform hover:scale-105">
								<Icon class="h-3.5 w-3.5 opacity-70" />
								{$_(adv)}
							</li>
						{/snippet}
					</Tooltip.Trigger>
					<Tooltip.Content
						sideOffset={8}
						class="z-50 w-64 rounded-lg border border-ink/15 bg-white/95 p-3 shadow-lg backdrop-blur-xl animate-tooltip dark:bg-[#151518]/95"
					>
						<p class="font-sans text-sm leading-relaxed text-ink/80">{$_(desc)}</p>
					</Tooltip.Content>
				</Tooltip.Root>
			</Tooltip.Provider>
		{/each}
	</ul>
</section>
