import type { LayoutServerLoad } from './$types';
import layoutCss from './layout.css?raw';

const bgMatch = layoutCss.match(/--color-bg:\s*light-dark\(([^,]+),\s*([^)]+)\)/);
const themeColorLight = bgMatch ? bgMatch[1].trim() : '#ffffff';
const themeColorDark = bgMatch ? bgMatch[2].trim() : '#000000';

export const load: LayoutServerLoad = ({ locals }) => {
	return {
		locale: locals.locale,
		themeColorLight,
		themeColorDark
	};
};
