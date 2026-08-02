<script lang="ts">
	import { springFly } from '$lib/transitions';
	import Header from '$lib/components/Header.svelte';
	import Abstract from '$lib/components/Abstract.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<main class="relative flex min-h-[100dvh] flex-col px-4 pt-8 pb-4 md:px-8">
	<div class="mx-auto w-full max-w-6xl flex-1">
		<Header />

		<div
			in:springFly={{ y: 25, duration: 600, delay: 200, scale: 0.98 }}
			class="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-4"
		>
			<Abstract />
			<Terminal />
		</div>
	</div>

	<Footer />
</main>
