import type { RequestHandler } from './$types';
import { getRunScript } from '$lib/utils/runScript';

export const GET: RequestHandler = () => {
	const script = getRunScript();

	return new Response(script.trim(), {
		headers: {
			'content-type': 'application/x-sh; charset=utf-8',
			'cache-control': 'no-cache, no-store, must-revalidate'
		}
	});
};
