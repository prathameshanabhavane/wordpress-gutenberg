<?php
/**
 * Frontend: one accordion item (trigger + panel).
 *
 * @var array  $attributes Attributes.
 * @var string $content    Inner content HTML.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$title           = isset( $attributes['title'] ) ? sanitize_text_field( $attributes['title'] ) : '';
$open_by_default = ! empty( $attributes['openByDefault'] );

if ( '' === $title ) {
	$title = __( 'Section', 'gutenberg-lab' );
}

$uid       = wp_unique_id( 'lab-acc-item-' );
$trigger_id = $uid . '-trigger';
$panel_id   = $uid . '-panel';

$wrapper = get_block_wrapper_attributes(
	array(
		'class' => 'lab-accordion-item' . ( $open_by_default ? ' is-open' : '' ),
	)
);
?>
<div
	<?php echo $wrapper; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	data-lab-accordion-item
>
	<button
		type="button"
		class="lab-accordion-item__trigger"
		id="<?php echo esc_attr( $trigger_id ); ?>"
		aria-expanded="<?php echo $open_by_default ? 'true' : 'false'; ?>"
		aria-controls="<?php echo esc_attr( $panel_id ); ?>"
		data-lab-accordion-trigger
	>
		<span class="lab-accordion-item__label"><?php echo esc_html( $title ); ?></span>
		<span class="lab-accordion-item__icon" aria-hidden="true"></span>
	</button>
	<div
		class="lab-accordion-item__panel"
		id="<?php echo esc_attr( $panel_id ); ?>"
		role="region"
		aria-labelledby="<?php echo esc_attr( $trigger_id ); ?>"
		<?php echo $open_by_default ? '' : 'hidden'; ?>
		data-lab-accordion-panel
	>
		<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</div>
</div>
