<?php
/**
 * Frontend render: Lab Card (image, title, description, CTA).
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content.
 * @var WP_Block $block      Block instance.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#render
 */

$image_url  = $attributes['imageUrl'] ?? '';
$image_alt  = $attributes['imageAlt'] ?? '';
$title      = $attributes['title'] ?? '';
$description = $attributes['description'] ?? '';
$cta_text   = $attributes['ctaText'] ?? '';
$cta_url    = $attributes['ctaUrl'] ?? '';
$new_tab    = ! empty( $attributes['ctaOpensInNewTab'] );

$wrapper = get_block_wrapper_attributes(
	array(
		'class' => 'lab-card',
	)
);
?>
<div <?php echo $wrapper; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php if ( $image_url ) : ?>
		<div class="lab-card__media">
			<img
				class="lab-card__image"
				src="<?php echo esc_url( $image_url ); ?>"
				alt="<?php echo esc_attr( $image_alt ); ?>"
				loading="lazy"
			/>
		</div>
	<?php endif; ?>

	<div class="lab-card__body">
		<?php if ( $title ) : ?>
			<h3 class="lab-card__title"><?php echo wp_kses_post( $title ); ?></h3>
		<?php endif; ?>

		<?php if ( $description ) : ?>
			<div class="lab-card__description"><?php echo wp_kses_post( $description ); ?></div>
		<?php endif; ?>

		<?php if ( $cta_text && $cta_url ) : ?>
			<p class="lab-card__cta-wrap">
				<a
					class="lab-card__cta"
					href="<?php echo esc_url( $cta_url ); ?>"
					<?php echo $new_tab ? 'target="_blank" rel="noopener noreferrer"' : ''; ?>
				>
					<?php echo esc_html( $cta_text ); ?>
				</a>
			</p>
		<?php endif; ?>
	</div>
</div>
