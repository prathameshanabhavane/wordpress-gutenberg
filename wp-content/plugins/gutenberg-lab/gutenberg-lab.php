<?php
/**
 * Plugin Name:       Gutenberg Lab
 * Version:           0.3.0
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gutenberg-lab
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once __DIR__ . '/includes/lab-field-ui-display.php';
require_once __DIR__ . '/includes/lab-post-card.php';
require_once __DIR__ . '/includes/lab-term-card.php';
require_once __DIR__ . '/includes/lab-search.php';

/**
 * Register Gutenberg Lab blocks.
 */
function create_block_gutenberg_lab_block_init() {
	$manifest = __DIR__ . '/build/blocks-manifest.php';

	if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) && file_exists( $manifest ) ) {
		wp_register_block_types_from_metadata_collection( __DIR__ . '/build', $manifest );
		return;
	}

	// Fallback: register each built block folder.
	$blocks = array(
		'lab-cards',
		'lab-card',
		'lab-form-fields',
		'lab-form-field',
		'lab-fields-ui',
		'lab-field-ui',
		'lab-repeater',
		'lab-repeater-row',
		'lab-post-cards',
		'lab-category-cards',
		'lab-tag-cards',
		'lab-search',
		'lab-tabs',
		'lab-tab',
		'lab-accordion',
		'lab-accordion-item',
		'lab-review-slider',
		'lab-review-card',
		'lab-tab-suite',
	);
	foreach ( $blocks as $block ) {
		$block_path = __DIR__ . '/build/' . $block;
		if ( file_exists( $block_path . '/block.json' ) ) {
			register_block_type( $block_path );
		}
	}
}
add_action( 'init', 'create_block_gutenberg_lab_block_init' );
