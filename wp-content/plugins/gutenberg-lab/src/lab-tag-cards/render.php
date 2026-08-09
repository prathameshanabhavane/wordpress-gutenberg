<?php
/**
 * Frontend: Lab Tag Cards.
 *
 * @package CreateBlock
 *
 * @var array $attributes Block attributes.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

echo gutenberg_lab_render_term_cards_block( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	'post_tag',
	$attributes,
	__( 'No tags found.', 'gutenberg-lab' )
);
