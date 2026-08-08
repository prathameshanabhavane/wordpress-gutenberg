<?php
/**
 * Child render — same custom HTML helper as the parent uses.
 *
 * @var array $attributes Block attributes.
 */

if ( ! function_exists( 'gutenberg_lab_render_field_ui' ) ) {
	require_once dirname( __DIR__, 2 ) . '/includes/lab-field-ui-display.php';
}

echo gutenberg_lab_render_field_ui( $attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
