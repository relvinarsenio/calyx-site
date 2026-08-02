import layoutCss from '../layout.css?raw';
import enLocale from '$lib/i18n/locales/en.json';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
	const bgMatch = layoutCss.match(/--color-bg:\s*light-dark\(([^,]+),\s*([^)]+)\)/);
	const bgColor = bgMatch ? bgMatch[2].trim() : '#121214';

	const manifest = {
		name: enLocale.appName,
		short_name: enLocale.appName,
		description: `${enLocale.description_prefix}bench.sh${enLocale.description_suffix}`,
		start_url: '/',
		display: 'standalone',
		categories: ['utilities', 'developer'],
		background_color: bgColor,
		theme_color: bgColor,
		icons: [
			{
				src: '/apple-touch-icon.png',
				sizes: '180x180',
				type: 'image/png'
			}
		]
	};

	return new Response(JSON.stringify(manifest), {
		headers: {
			'Content-Type': 'application/manifest+json'
		}
	});
};
