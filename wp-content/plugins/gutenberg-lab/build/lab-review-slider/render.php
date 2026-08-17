<?php
/**
 * Frontend: review slider shell.
 *
 * @var array  $attributes Attributes.
 * @var string $content    Review cards HTML.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$autoplay  = ! empty( $attributes['autoplay'] );
$show_dots = ! isset( $attributes['showDots'] ) || (bool) $attributes['showDots'];

$wrapper = get_block_wrapper_attributes(
	array(
		'class' => 'lab-review-slider',
	)
);
?>
<div
	<?php echo $wrapper; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	data-lab-review-slider
	data-autoplay="<?php echo $autoplay ? '1' : '0'; ?>"
	data-show-dots="<?php echo $show_dots ? '1' : '0'; ?>"
>
	<div class="lab-review-slider__viewport">
		<div class="lab-review-slider__track" data-lab-review-track>
			<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</div>
	</div>
	<div class="lab-review-slider__controls">
		<button type="button" class="lab-review-slider__prev" data-lab-review-prev aria-label="<?php echo esc_attr__( 'Previous review', 'gutenberg-lab' ); ?>">
			‹
		</button>
		<?php if ( $show_dots ) : ?>
			<div class="lab-review-slider__dots" data-lab-review-dots></div>
		<?php endif; ?>
		<button type="button" class="lab-review-slider__next" data-lab-review-next aria-label="<?php echo esc_attr__( 'Next review', 'gutenberg-lab' ); ?>">
			›
		</button>
	</div>
</div>
