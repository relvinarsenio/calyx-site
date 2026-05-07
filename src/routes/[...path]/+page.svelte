<script lang="ts">
  import { onMount } from 'svelte';
  import { Terminal, Cpu, HardDrive, Copy, Check } from 'lucide-svelte';
  import GithubIcon from '$lib/components/GithubIcon.svelte';
  import { page } from '$app/state';

  const PUBLIC_SITE_URL = page.url.origin;

  let copied = $state(false);
  let systemTime = $state('');

  const command = `bash <(curl -fsL ${PUBLIC_SITE_URL}/run)`;

  onMount(() => {
    const updateTime = () => {
      systemTime = new Date().toLocaleString();
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  });

  function handleCopy() {
    navigator.clipboard.writeText(command);
    copied = true;
    setTimeout(() => {
      copied = false;
    }, 2000);
  }
</script>

<main class="flex flex-col min-h-[100dvh] pt-8 pb-4 px-4 md:px-8 relative">
  <div class="flex-1 max-w-6xl w-full mx-auto">
    <!-- Top Bar Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 grid-line-bottom pb-4 px-2 delay-100 animate-[fade-in-down_0.5s_ease-out_both]">
      <div>
        <div class="col-header mb-2 leading-none">Benchmark Utility</div>
        <h1 class="text-4xl md:text-5xl font-mono font-bold tracking-tighter uppercase text-ink mt-1">
          Calyx
        </h1>
      </div>
      <div class="mt-4 md:mt-0 flex flex-col md:items-end w-full md:w-auto">
        <div class="flex items-center mb-6 md:mb-5">
          <a 
            href="https://github.com/relvinarsenio/calyx/" 
            target="_blank" 
            rel="noopener noreferrer"
            class="text-ink/40 hover:text-ink transition-colors group flex items-center gap-2"
            title="GitHub Repository"
          >
            <GithubIcon className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
        <div class="col-header mb-2">Live Local Time</div>
        <div class="font-mono text-sm tracking-tight text-ink tabular-nums">
          {systemTime || '...'}
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 animate-[fade-in-up_0.5s_ease-out_both] delay-200">
      
      <!-- Left Column Constraints -->
      <div class="md:col-span-4 flex flex-col h-full grid-line-right pr-6">
        <div class="col-header mb-4 mt-2">Abstract</div>
        <p class="font-sans text-sm md:text-base leading-relaxed text-ink/80 mb-6">
          The modern alternative to <span class="font-mono bg-[#e0e0e0] px-1 py-0.5 whitespace-nowrap text-[#111]">bench.sh</span>. Calyx is a cli tool to check your server's specs and test exactly how fast your disk and internet are.
        </p>

        <div class="grid grid-cols-1 gap-2 mt-4 md:mt-auto border border-[#e0e0e0] p-4 bg-white/30 backdrop-blur-sm">
          <div class="flex items-center gap-3 w-full border-b border-[#e0e0e0] pb-2 mb-2">
            <Cpu class="w-4 h-4 text-ink/70" />
            <span class="font-mono text-xs uppercase tracking-widest text-ink/80">System Information</span>
          </div>
          <div class="flex items-center gap-3 w-full border-b border-[#e0e0e0] pb-2 mb-2">
            <HardDrive class="w-4 h-4 text-ink/70" />
            <span class="font-mono text-xs uppercase tracking-widest text-ink/80">Disk Benchmark</span>
          </div>
          <div class="flex items-center gap-3 w-full">
            <Terminal class="w-4 h-4 text-ink/70" />
            <span class="font-mono text-xs uppercase tracking-widest text-ink/80">Network Speed</span>
          </div>
        </div>
      </div>

      <!-- Right Column Command Execution -->
      <div class="md:col-span-8 flex flex-col pt-2 md:pl-4">
        <div class="col-header mb-4">Execution Protocol</div>
        
        <div class="border border-[#e0e0e0] bg-white shadow-sm mt-2 transition-all hover:border-ink group">
          <div class="relative flex items-center justify-center border-b border-[#e0e0e0] px-4 py-2 bg-black/5">
            <div class="absolute left-4 flex gap-1.5">
              <div class="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
              <div class="w-3 h-3 rounded-full bg-[#febc2e]"></div>
              <div class="w-3 h-3 rounded-full bg-[#28c840]"></div>
            </div>
            <div class="col-header opacity-60 uppercase tracking-widest text-[10px]">Terminal Command</div>
          </div>

          <div class="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
            <div class="flex w-full items-center overflow-x-auto whitespace-nowrap scrollbar-hide">
              <span class="font-mono text-ink/40 mr-4 select-none shrink-0">$</span>
              <code class="font-mono text-base md:text-lg text-ink font-semibold flex-1">
                {command}
              </code>
            </div>
          </div>

          <div class="border-t border-[#e0e0e0]">
            <button
              onclick={handleCopy}
              class="w-full py-4 px-6 text-sm font-mono tracking-widest uppercase transition-all duration-200 outline-none flex items-center justify-center gap-2
                {copied 
                  ? 'bg-ink text-[#f2f2f2]' 
                  : 'bg-transparent text-ink hover:bg-black/5 active:bg-black/10'
                }"
            >
              {#if copied}
                <Check class="w-4 h-4" /> Command Copied
              {:else}
                <Copy class="w-4 h-4" /> Copy Command
              {/if}
            </button>
          </div>
        </div>

      </div>
    </div>

  </div>
  
  <footer class="mt-12 md:mt-16 w-full max-w-6xl mx-auto border-t border-[#e0e0e0] pt-6 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] text-ink/50 uppercase tracking-widest animate-[fade-in-up_0.5s_ease-out_0.5s_both]">
    <p>Copyright © 2025-2026 Alfie Ardinata.</p>
    <a href="https://github.com/relvinarsenio/calyx" target="_blank" rel="noopener noreferrer" class="hover:text-ink transition-colors underline underline-offset-4 decoration-[#e0e0e0] hover:decoration-ink">
      Open Source (MPL-2.0)
    </a>
  </footer>
</main>
