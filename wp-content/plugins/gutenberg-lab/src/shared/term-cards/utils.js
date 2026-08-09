/**
 * Shared helpers for term card editor preview.
 */
import { decodeEntities } from '@wordpress/html-entities';

/**
 * @param {Object} term
 * @return {string}
 */
export function getTermName( term ) {
	return decodeEntities( term?.name || '' );
}

/**
 * @param {Object} term
 * @return {string}
 */
export function getTermDescription( term ) {
	return decodeEntities( term?.description || '' );
}
