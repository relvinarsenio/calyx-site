import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ url }) => {
	const origin = url.origin;

	const robotsConfig = `User-agent: *
Disallow:

Sitemap: ${origin}/sitemap.xml`;

	return new Response(robotsConfig.trim(), {
		headers: {
			'content-type': 'text/plain; charset=utf-8',
			'cache-control': 'public, max-age=3600, s-maxage=86400'
		}
	});
};
