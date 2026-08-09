/**
 * Shared source modes for Category / Tag cards.
 * Keep include and exclude mutually exclusive for clear UX.
 */

export const SOURCE_ALL = 'all';
export const SOURCE_INCLUDE = 'include';
export const SOURCE_EXCLUDE = 'exclude';

/**
 * Normalize legacy "manual" → "include".
 *
 * @param {string} source
 * @return {string}
 */
export function normalizeSource( source ) {
	if ( source === 'manual' ) {
		return SOURCE_INCLUDE;
	}
	if (
		source === SOURCE_ALL ||
		source === SOURCE_INCLUDE ||
		source === SOURCE_EXCLUDE
	) {
		return source;
	}
	return SOURCE_ALL;
}

/**
 * @param {string} source
 * @return {boolean}
 */
export function usesTermPicker( source ) {
	const mode = normalizeSource( source );
	return mode === SOURCE_INCLUDE || mode === SOURCE_EXCLUDE;
}
