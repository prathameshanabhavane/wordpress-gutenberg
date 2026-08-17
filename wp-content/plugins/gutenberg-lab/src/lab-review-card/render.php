<?php
/**
 * Frontend: one review card.
 *
 * @var array $attributes Attributes.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$name   = isset( $attributes['name'] ) ? sanitize_text_field( $attributes['name'] ) : '';
$quote  = isset( $attributes['quote'] ) ? wp_kses_post( $attributes['quote'] ) : '';
$rating = isset( $attributes['rating'] ) ? max( 1, min( 5, (int) $attributes['rating'] ) ) : 5;
$stars  = str_repeat( '★', $rating );

$wrapper = get_block_wrapper_attributes(
	array(
		'class' => 'lab-review-card',
	)
);
?>
<article
	<?php echo $wrapper; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	data-lab-review-card
>
	<?php if ( $quote ) : ?>
		<div class="lab-review-card__quote"><?php echo $quote; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></div>
	<?php endif; ?>
	<div class="lab-review-card__meta">
		<?php if ( $name ) : ?>
			<p class="lab-review-card__name"><?php echo esc_html( $name ); ?></p>
		<?php endif; ?>
		<p class="lab-review-card__rating" aria-label="<?php echo esc_attr( sprintf( /* translators: %d: star count */ __( '%d out of 5 stars', 'gutenberg-lab' ), $rating ) ); ?>">
			<?php echo esc_html( $stars ); ?>
		</p>
	</div>
</article>
