import { backOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

interface SpringOptions {
	delay?: number;
	duration?: number;
	x?: number;
	y?: number;
	scale?: number;
}

/**
 * A custom spring-like fly transition that combines sliding, opacity fade, and scaling.
 * Using Svelte's native `backOut` easing function to create a subtle, snappy overshoot
 * before locking into position (without multiple bouncy oscillations).
 */
export function springFly(
	node: HTMLElement,
	{ delay = 0, duration = 600, x = 0, y = 0, scale = 1 }: SpringOptions = {}
): TransitionConfig {
	const style = getComputedStyle(node);
	const opacity = +style.opacity;
	const transform = style.transform === 'none' ? '' : style.transform;

	return {
		delay,
		duration,
		easing: backOut,
		css: (t, u) => {
			const currentOpacity = t * opacity;
			const targetScale = 1 - u * (1 - scale);

			return `
				opacity: ${Math.max(0, Math.min(1, currentOpacity))};
				transform: ${transform} translate(${u * x}px, ${u * y}px) scale(${targetScale});
			`;
		}
	};
}
