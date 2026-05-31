import type { RequestHandler } from './$types';

class RobotsBuilder {
	readonly #groups: Array<{
		userAgents: string[];
		rules: Array<{ directive: string; value: string }>;
	}> = [];
	readonly #globals: Array<{ directive: string; value: string }> = [];

	#currentGroup() {
		if (this.#groups.length === 0) {
			this.#groups.push({ userAgents: ['*'], rules: [] });
		}
		return this.#groups[this.#groups.length - 1];
	}

	/** Adds a new User-agent group. Subsequent rules apply to this group. */
	userAgent(ua: string | string[]): this {
		const uas = Array.isArray(ua) ? ua : [ua];
		this.#groups.push({ userAgents: uas, rules: [] });
		return this;
	}

	/** Generic method to add any rule (e.g., Crawl-delay) to the current User-agent group. */
	rule(directive: string, value: string): this {
		this.#currentGroup().rules.push({ directive, value });
		return this;
	}

	allow(path: string): this {
		return this.rule('Allow', path);
	}

	disallow(path: string): this {
		return this.rule('Disallow', path);
	}

	/** Generic method to add any global rule (e.g., Sitemap, Host) outside of User-agent groups. */
	globalRule(directive: string, value: string): this {
		this.#globals.push({ directive, value });
		return this;
	}

	sitemap(url: string): this {
		return this.globalRule('Sitemap', url);
	}

	host(domain: string): this {
		return this.globalRule('Host', domain);
	}

	build(): string {
		const lines: string[] = [];

		for (const group of this.#groups) {
			if (group.userAgents.length === 0) continue;

			for (const ua of group.userAgents) {
				lines.push(`User-agent: ${ua}`);
			}
			for (const { directive, value } of group.rules) {
				lines.push(`${directive}: ${value}`);
			}
			lines.push('');
		}

		for (const { directive, value } of this.#globals) {
			lines.push(`${directive}: ${value}`);
		}

		return lines.join('\n').trim();
	}
}

export const GET: RequestHandler = ({ url }) => {
	const origin = url.origin;

	const builder = new RobotsBuilder();

	builder.userAgent('*').disallow('').sitemap(`${origin}/sitemap.xml`);

	const robotsConfig = builder.build();

	return new Response(robotsConfig, {
		headers: {
			'content-type': 'text/plain; charset=utf-8',
			'cache-control': 'public, max-age=3600, s-maxage=86400'
		}
	});
};
