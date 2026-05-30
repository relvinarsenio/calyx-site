import type { RequestHandler } from './$types';
import { getRunScript } from '$lib/utils/runScript';

export const GET: RequestHandler = () => {
	const script = getRunScript();

	return new Response(script.trim(), {
		headers: {
			'content-type': 'text/plain; charset=utf-8',
			'cache-control': 'public, max-age=3600, s-maxage=86400'
		}
	});
};
