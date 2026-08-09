/**
 * Shared helpers for Lab Post Cards editor preview.
 */
import { decodeEntities } from '@wordpress/html-entities';

/**
 * @param {Object} post
 * @return {string} Plain title.
 */
export function getPostTitle( post ) {
	return decodeEntities(
		post?.title?.rendered?.replace( /<[^>]+>/g, '' ) || ''
	);
}

/**
 * @param {Object} post
 * @return {string} Plain excerpt.
 */
export function getPostExcerpt( post ) {
	return decodeEntities(
		post?.excerpt?.rendered?.replace( /<[^>]+>/g, '' ) || ''
	);
}

/**
 * Collect embedded terms for the selected taxonomies.
 * Returns [] when the post has none — caller should skip rendering.
 *
 * @param {Object}  post
 * @param {Object}  options
 * @param {boolean} options.showCategories
 * @param {boolean} options.showTags
 * @param {number}  options.maxTerms
 * @return {Array<{ id: number, name: string, taxonomy: string }>}
 */
export function getPostTerms(
	post,
	{ showCategories = false, showTags = false, maxTerms = 3 } = {}
) {
	if ( ! showCategories && ! showTags ) {
		return [];
	}

	const embedded = post?._embedded?.[ 'wp:term' ];
	if ( ! Array.isArray( embedded ) ) {
		return [];
	}

	const allowed = new Set();
	if ( showCategories ) {
		allowed.add( 'category' );
	}
	if ( showTags ) {
		allowed.add( 'post_tag' );
	}

	const counts = { category: 0, post_tag: 0 };
	const terms = [];

	embedded.flat().forEach( ( term ) => {
		if ( ! term?.taxonomy || ! allowed.has( term.taxonomy ) ) {
			return;
		}
		if ( maxTerms > 0 && counts[ term.taxonomy ] >= maxTerms ) {
			return;
		}
		counts[ term.taxonomy ] += 1;
		terms.push( {
			id: term.id,
			name: decodeEntities( term.name || '' ),
			taxonomy: term.taxonomy,
		} );
	} );

	return terms;
}
