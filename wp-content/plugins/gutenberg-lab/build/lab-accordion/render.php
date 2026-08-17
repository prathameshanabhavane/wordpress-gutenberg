<?php
/**
 * Frontend: Lab Accordion wrapper.
 *
 * @var array  $attributes Attributes.
 * @var string $content    Inner items HTML.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$allow_multiple = ! empty( $attributes['allowMultiple'] );

$wrapper = get_block_wrapper_attributes(
	array(
		'class' => 'lab-accordion',
	)
);
?>
<div
	<?php echo $wrapper; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	data-lab-accordion
	data-allow-multiple="<?php echo $allow_multiple ? '1' : '0'; ?>"
>
	<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</div>
