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

<section class="flex flex-col pt-2 md:col-span-8 md:pl-4">
	<h2 class="mb-4 col-header">{$_('execProtocol')}</h2>

	<figure class="group relative mt-2 glass-panel">
		<figcaption
			class="relative flex items-center justify-center border-b border-line/40 bg-ink/[0.03] px-4 py-2"
		>
			<div class="absolute left-4 flex gap-1.5" aria-hidden="true">
				<div class="h-3 w-3 rounded-full bg-[#ff5f57]"></div>
				<div class="h-3 w-3 rounded-full bg-[#febc2e]"></div>
				<div class="h-3 w-3 rounded-full bg-[#28c840]"></div>
			</div>
			<p class="col-header">
				{$_('terminalCommand')}
			</p>
		</figcaption>

		<div class="w-full p-6 md:p-8">
			<pre
				class="scrollbar-hide flex w-full min-w-0 items-center overflow-x-auto whitespace-nowrap"><span
					class="mr-4 shrink-0 font-mono text-ink/40 select-none">$</span
				><code
					style="--length: {command.length}"
					class="typewriter-command shrink-0 font-mono text-base font-semibold text-ink md:text-lg"
					>{command}</code
				></pre>
		</div>

		<menu aria-label="Command Actions" class="m-0 flex list-none border-t border-line/40 p-0">
			<li class="flex flex-1">
				<button
					id="copy-command-btn"
					onclick={handleCopy}
					class="grid w-full flex-1 place-items-center overflow-hidden font-mono text-sm tracking-widest uppercase transition-all duration-300 outline-none active:scale-[0.98]
						{copied ? 'bg-ink text-bg' : 'bg-transparent text-ink hover:bg-ink/5 active:bg-ink/10'}"
				>
					{#if copied}
						<span
							in:fly={{ y: 20, duration: 250, delay: 150 }}
							out:fly={{ y: -20, duration: 250 }}
							class="col-start-1 row-start-1 flex cursor-default items-center gap-2 px-6 py-4 select-none"
						>
							<Check class="h-4 w-4" />
							{$_('commandCopied')}
						</span>
					{:else}
						<span
							in:fly={{ y: 20, duration: 250, delay: 150 }}
							out:fly={{ y: -20, duration: 250 }}
							class="col-start-1 row-start-1 flex cursor-default items-center gap-2 px-6 py-4 select-none"
						>
							<Copy class="h-4 w-4" />
							{$_('copyCommand')}
						</span>
					{/if}
				</button>
			</li>

			<Separator.Root orientation="vertical" class="h-auto w-[1px] bg-line/40" />

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
												class="grid w-16 cursor-pointer place-items-center bg-transparent text-ink/70 transition-colors outline-none hover:bg-ink/5 hover:text-ink active:bg-ink/10"
											>
												<Eye class="h-4 w-4" />
											</button>
										{/snippet}
									</Dialog.Trigger>
								{/snippet}
							</Tooltip.Trigger>
							<Tooltip.Portal>
								<Tooltip.Content
									sideOffset={6}
									class="z-50 rounded border border-ink/15 bg-white/95 px-2 py-1 font-mono text-[9px] tracking-widest text-ink uppercase shadow-lg backdrop-blur-xl animate-tooltip dark:bg-[#151518]/95"
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
							class="fixed top-[50%] left-[50%] z-50 grid w-full max-w-3xl animate-dialog translate-x-[-50%] translate-y-[-50%] gap-4 border border-line bg-bg p-6 shadow-xl sm:rounded-xl"
						>
							<header class="flex flex-col space-y-1.5 text-center sm:text-left">
								<Dialog.Title class="font-mono text-lg leading-none font-semibold tracking-tight">
									{$_('sourceCode')}
								</Dialog.Title>
								<Dialog.Description class="font-sans text-sm text-ink/60">
									<code class="font-mono text-xs">curl -fsL {page.url.origin}/run</code>
								</Dialog.Description>
							</header>
							<section
								aria-label="Source code content"
								class="relative max-h-[60vh] overflow-hidden overflow-y-auto rounded-md border border-line/40 bg-ink/5 p-4"
							>
								<pre class="font-mono text-xs whitespace-pre-wrap text-ink/90"><code
										>{scriptContent}</code
									></pre>
							</section>
							<Dialog.Close>
								{#snippet child({ props })}
									<button
										{...props}
										class="absolute top-4 right-4 cursor-pointer rounded-sm opacity-70 ring-offset-bg transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ink focus:ring-offset-2 focus:outline-none disabled:pointer-events-none"
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
