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

<section class="md:col-span-4 flex flex-col h-full grid-line-right pr-6">
	<h2 class="col-header mb-4 mt-2">{$_('abstract')}</h2>
	<p class="font-sans text-sm md:text-base leading-relaxed text-ink/80 mb-6">
		{$_('description_prefix')}<span class="font-mono bg-line px-1 py-0.5 whitespace-nowrap text-ink"
			>bench.sh</span
		>{$_('description_suffix')}
	</p>

	<ul class="flex flex-wrap gap-2 mt-4 md:mt-auto select-none cursor-default" aria-label="Features">
		{#each features as { icon: Icon, adv, desc } (adv)}
			<Tooltip.Provider delayDuration={200}>
				<Tooltip.Root>
					<Tooltip.Trigger>
						{#snippet child({ props })}
							<li {...props} class="feature-badge cursor-help hover:scale-105 transition-transform">
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
