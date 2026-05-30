import type { ParamMatcher } from '@sveltejs/kit';
import { GOOGLE_VERIFICATION_FILE_TOKEN } from '$lib/config';

export const GOOGLE_VERIFY_TOKEN = GOOGLE_VERIFICATION_FILE_TOKEN;

export const match: ParamMatcher = (param) => {
	return param === GOOGLE_VERIFY_TOKEN || param === `${GOOGLE_VERIFY_TOKEN}.html`;
};
