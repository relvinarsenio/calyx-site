import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), ViteImageOptimizer()],
	define: {
		__BUILD_DATE__: JSON.stringify(new Date().toISOString().split('T')[0])
	}
});
