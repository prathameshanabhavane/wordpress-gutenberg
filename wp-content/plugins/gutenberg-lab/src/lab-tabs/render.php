<?php
/**
 * Frontend: Lab Tabs — tab list + panels from inner lab-tab blocks.
 *
 * @package CreateBlock
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Rendered inner blocks HTML.
 * @var WP_Block $block      Block instance.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$tabs = array();
if ( ! empty( $block->inner_blocks ) ) {
	foreach ( $block->inner_blocks as $inner ) {
		if ( ! ( $inner instanceof WP_Block ) ) {
			continue;
		}
		if ( 'create-block/lab-tab' !== $inner->name ) {
			continue;
		}
		$label = isset( $inner->attributes['tabLabel'] )
			? sanitize_text_field( $inner->attributes['tabLabel'] )
			: '';
		if ( '' === $label ) {
			$label = __( 'Tab', 'gutenberg-lab' );
		}
		$tabs[] = array(
			'label'   => $label,
			'content' => $inner->render(),
		);
	}
}

$uid = wp_unique_id( 'lab-tabs-' );

$wrapper = get_block_wrapper_attributes(
	array(
		'class' => 'lab-tabs',
	)
);
?>
<div <?php echo $wrapper; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> data-lab-tabs>
	<?php if ( empty( $tabs ) ) : ?>
		<p class="lab-tabs__empty"><?php echo esc_html__( 'No tabs yet.', 'gutenberg-lab' ); ?></p>
	<?php else : ?>
		<div class="lab-tabs__list" role="tablist" aria-label="<?php echo esc_attr__( 'Tabs', 'gutenberg-lab' ); ?>">
			<?php foreach ( $tabs as $index => $tab ) : ?>
				<?php
				$tab_id    = $uid . '-tab-' . $index;
				$panel_id  = $uid . '-panel-' . $index;
				$is_active = 0 === $index;
				?>
				<button
					type="button"
					class="lab-tabs__tab<?php echo $is_active ? ' is-active' : ''; ?>"
					role="tab"
					id="<?php echo esc_attr( $tab_id ); ?>"
					aria-controls="<?php echo esc_attr( $panel_id ); ?>"
					aria-selected="<?php echo $is_active ? 'true' : 'false'; ?>"
					tabindex="<?php echo $is_active ? '0' : '-1'; ?>"
					data-lab-tab
				>
					<?php echo esc_html( $tab['label'] ); ?>
				</button>
			<?php endforeach; ?>
		</div>
		<div class="lab-tabs__panels">
			<?php foreach ( $tabs as $index => $tab ) : ?>
				<?php
				$tab_id    = $uid . '-tab-' . $index;
				$panel_id  = $uid . '-panel-' . $index;
				$is_active = 0 === $index;
				?>
				<div
					class="lab-tabs__panel<?php echo $is_active ? ' is-active' : ''; ?>"
					role="tabpanel"
					id="<?php echo esc_attr( $panel_id ); ?>"
					aria-labelledby="<?php echo esc_attr( $tab_id ); ?>"
					<?php echo $is_active ? '' : 'hidden'; ?>
					data-lab-tab-panel
				>
					<?php echo $tab['content']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</div>
			<?php endforeach; ?>
		</div>
	<?php endif; ?>
</div>
