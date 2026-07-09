<script lang="ts">
	import { fly } from 'svelte/transition';
	import { Copy, Check, Eye, X } from '@lucide/svelte';
	import { page } from '$app/state';
	import { _ } from 'svelte-i18n';
	import { Tooltip, Dialog, Separator, mergeProps } from 'bits-ui';
	import { getRunScript } from '$lib/utils/runScript';

	let copied = $state(false);
	let command = $derived(`bash <(curl -fsL ${page.url.origin}/run)`);
	const scriptContent = getRunScript();

	let copyTimeout: ReturnType<typeof setTimeout>;

	$effect(() => {
		return () => clearTimeout(copyTimeout);
	});

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
</script>

<section class="md:col-span-8 flex flex-col pt-2 md:pl-4">
	<h2 class="col-header mb-4">{$_('execProtocol')}</h2>

	<figure class="glass-panel mt-2 group relative">
		<figcaption
			class="relative flex items-center justify-center border-b border-line/40 px-4 py-2 bg-ink/[0.03]"
		>
			<div class="absolute left-4 flex gap-1.5" aria-hidden="true">
				<div class="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
				<div class="w-3 h-3 rounded-full bg-[#febc2e]"></div>
				<div class="w-3 h-3 rounded-full bg-[#28c840]"></div>
			</div>
			<p class="col-header">
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

		<menu aria-label="Command Actions" class="border-t border-line/40 flex m-0 p-0 list-none">
			<li class="flex-1 flex">
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
			</li>

			<Separator.Root orientation="vertical" class="w-[1px] bg-line/40 h-auto" />

			<li class="flex">
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
							<header class="flex flex-col space-y-1.5 text-center sm:text-left">
								<Dialog.Title class="text-lg font-semibold leading-none tracking-tight font-mono">
									{$_('sourceCode')}
								</Dialog.Title>
								<Dialog.Description class="text-sm text-ink/60 font-sans">
									<code class="font-mono text-xs">curl -fsL {page.url.origin}/run</code>
								</Dialog.Description>
							</header>
							<section
								aria-label="Source code content"
								class="relative overflow-hidden rounded-md border border-line/40 bg-ink/5 p-4 max-h-[60vh] overflow-y-auto"
							>
								<pre class="text-xs font-mono text-ink/90 whitespace-pre-wrap"><code
										>{scriptContent}</code
									></pre>
							</section>
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
			</li>
		</menu>
	</figure>
</section>
