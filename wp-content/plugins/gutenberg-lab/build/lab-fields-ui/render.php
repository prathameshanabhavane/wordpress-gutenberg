<?php
/**
 * Parent builds custom HTML for every child from attributes
 * (does not dump InnerBlocks $content as-is).
 *
 * @var array    $attributes Parent attributes.
 * @var string   $content    Unused — we rebuild from $block->inner_blocks.
 * @var WP_Block $block      Parent block instance.
 */

if ( ! function_exists( 'gutenberg_lab_render_field_ui' ) ) {
	require_once dirname( __DIR__, 2 ) . '/includes/lab-field-ui-display.php';
}

$wrapper = get_block_wrapper_attributes(
	array(
		'class' => 'lab-fields-ui',
	)
);
?>
<div <?php echo $wrapper; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="lab-fields-ui__list">
		<?php
		if ( ! empty( $block->inner_blocks ) ) {
			foreach ( $block->inner_blocks as $inner_block ) {
				$child_attrs = array();
				if ( $inner_block instanceof WP_Block ) {
					$child_attrs = $inner_block->attributes;
				} elseif ( is_array( $inner_block ) && isset( $inner_block['attrs'] ) ) {
					$child_attrs = $inner_block['attrs'];
				}
				echo gutenberg_lab_render_field_ui( $child_attrs ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
		}
		?>
	</div>
</div>
