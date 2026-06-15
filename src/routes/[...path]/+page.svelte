<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Abstract from '$lib/components/Abstract.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<main class="flex flex-col min-h-[100dvh] pt-8 pb-4 px-4 md:px-8 relative">
	<div class="flex-1 max-w-6xl w-full mx-auto">
		<Header />

		<div
			class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 animate-[fade-in-up_0.5s_ease-out_both] delay-600"
		>
			<Abstract />
			<Terminal />
		</div>
	</div>

	<Footer />
</main>
