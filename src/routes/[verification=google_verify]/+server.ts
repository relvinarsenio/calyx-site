import { GOOGLE_VERIFY_TOKEN } from '../../params/google_verify';
import type { RequestHandler, EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
	return [{ verification: GOOGLE_VERIFY_TOKEN }, { verification: `${GOOGLE_VERIFY_TOKEN}.html` }];
};

export const GET: RequestHandler = ({ params }) => {
	const filename = params.verification;
	const cleanFilename = filename.endsWith('.html') ? filename : `${filename}.html`;

	return new Response(`google-site-verification: ${cleanFilename}`, {
		headers: {
			'content-type': 'text/html; charset=utf-8'
		}
	});
};
