<?php
/**
 * Map a WP_Post into Lab Card HTML.
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Render one post as a lab-card markup.
 *
 * @param WP_Post|int $post     Post object or ID.
 * @param string      $cta_text CTA label.
 * @param bool        $show_cta Whether to render the CTA button.
 * @return string HTML.
 */
function gutenberg_lab_render_post_card( $post, $cta_text = '', $show_cta = true ) {
	$post = get_post( $post );
	if ( ! $post instanceof WP_Post ) {
		return '';
	}

	if ( $show_cta && $cta_text === '' ) {
		$cta_text = __( 'Read more', 'gutenberg-lab' );
	}

	if ( ! $show_cta ) {
		$cta_text = '';
	}

	$title       = get_the_title( $post );
	$url         = get_permalink( $post );
	$excerpt     = get_the_excerpt( $post );
	$thumb_id    = get_post_thumbnail_id( $post );
	$image_html  = '';
	$image_alt   = '';

	if ( $thumb_id ) {
		$image_alt  = get_post_meta( $thumb_id, '_wp_attachment_image_alt', true );
		$image_html = wp_get_attachment_image(
			$thumb_id,
			'medium_large',
			false,
			array(
				'class'   => 'lab-card__image',
				'loading' => 'lazy',
				'alt'     => $image_alt ? $image_alt : $title,
			)
		);
	}

	ob_start();
	?>
	<article class="lab-card lab-post-card">
		<?php if ( $image_html ) : ?>
			<div class="lab-card__media">
				<?php echo $image_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</div>
		<?php endif; ?>
		<div class="lab-card__body">
			<?php if ( $title ) : ?>
				<h3 class="lab-card__title">
					<a class="lab-post-card__title-link" href="<?php echo esc_url( $url ); ?>">
						<?php echo esc_html( $title ); ?>
					</a>
				</h3>
			<?php endif; ?>
			<?php if ( $excerpt ) : ?>
				<div class="lab-card__description"><?php echo wp_kses_post( wpautop( $excerpt ) ); ?></div>
			<?php endif; ?>
			<?php if ( $show_cta && $url && $cta_text ) : ?>
				<p class="lab-card__cta-wrap">
					<a class="lab-card__cta" href="<?php echo esc_url( $url ); ?>">
						<?php echo esc_html( $cta_text ); ?>
					</a>
				</p>
			<?php endif; ?>
		</div>
	</article>
	<?php
	return (string) ob_get_clean();
}
