import type { RequestHandler } from './$types';
import { GITHUB_REPO_URL } from '$lib/config';
import en from '$lib/i18n/locales/en.json';

export const GET: RequestHandler = ({ url }) => {
	const origin = url.origin;

	const content = `# ${en.appName} - ${en.appTitle}

> ${en.description_prefix}bench.sh${en.description_suffix}

### Features

- **${en.advBeginner}**: ${en.descBeginner}
- **${en.advAccurate}**: ${en.descAccurate}
- **${en.advAdaptive}**: ${en.descAdaptive}
- **${en.advPortable}**: ${en.descPortable}

## Links

- [GitHub Repository](${GITHUB_REPO_URL}): The official ${en.appName} repository for source code and contributions.
- [Home](${origin}/): The homepage of ${en.appName}.
- [Run script](${origin}/run): The endpoint to run the script.
`;

	return new Response(content.trim(), {
		headers: {
			'content-type': 'text/plain; charset=utf-8',
			'cache-control': 'public, max-age=3600, s-maxage=86400'
		}
	});
};
