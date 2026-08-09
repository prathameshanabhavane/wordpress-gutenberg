<?php
/**
 * Frontend: Lab Category Cards.
 *
 * @package CreateBlock
 *
 * @var array $attributes Block attributes.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

echo gutenberg_lab_render_term_cards_block( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	'category',
	$attributes,
	__( 'No categories found.', 'gutenberg-lab' )
);
