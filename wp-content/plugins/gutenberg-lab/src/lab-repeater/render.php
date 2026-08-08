<?php
/**
 * Lab Repeater — loop rows like ACF have_rows().
 *
 * @var array    $attributes Parent attributes.
 * @var string   $content    Unused (rebuild from inner blocks).
 * @var WP_Block $block      Parent block.
 */

if ( ! function_exists( 'gutenberg_lab_render_field_ui' ) ) {
	require_once dirname( __DIR__, 2 ) . '/includes/lab-field-ui-display.php';
}

$wrapper = get_block_wrapper_attributes(
	array(
		'class' => 'lab-repeater',
	)
);
?>
<section <?php echo $wrapper; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="lab-repeater__rows">
		<?php
		$rows = ! empty( $block->inner_blocks ) ? $block->inner_blocks : array();

		if ( empty( $rows ) ) :
			?>
			<p class="lab-repeater__empty"><?php echo esc_html__( 'No rows yet.', 'gutenberg-lab' ); ?></p>
			<?php
		else :
			foreach ( $rows as $row_block ) :
				if ( ! ( $row_block instanceof WP_Block ) ) {
					continue;
				}
				?>
				<div class="lab-repeater__row">
					<div class="lab-repeater__row-fields">
						<?php
						$fields = ! empty( $row_block->inner_blocks ) ? $row_block->inner_blocks : array();
						foreach ( $fields as $field_block ) {
							if ( ! ( $field_block instanceof WP_Block ) ) {
								continue;
							}
							echo gutenberg_lab_render_field_ui( $field_block->attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
						}
						?>
					</div>
				</div>
				<?php
			endforeach;
		endif;
		?>
	</div>
</section>
