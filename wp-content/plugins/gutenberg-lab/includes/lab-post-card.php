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
 * Collect post terms for card display.
 *
 * @param int    $post_id  Post ID.
 * @param string $taxonomy Taxonomy name.
 * @param int    $limit    Max terms (0 = all).
 * @return WP_Term[]
 */
function gutenberg_lab_get_post_card_terms( $post_id, $taxonomy, $limit = 0 ) {
	$terms = get_the_terms( $post_id, $taxonomy );
	if ( empty( $terms ) || is_wp_error( $terms ) ) {
		return array();
	}

	$terms = array_values( $terms );
	if ( $limit > 0 ) {
		$terms = array_slice( $terms, 0, $limit );
	}

	return $terms;
}

/**
 * Render taxonomy chips for a post (skips empty taxonomies).
 *
 * @param int   $post_id Post ID.
 * @param array $args {
 *     @type bool $show_categories Show category terms.
 *     @type bool $show_tags       Show tag terms.
 *     @type int  $max_terms       Max terms per taxonomy (0 = all).
 * }
 * @return string HTML or empty string.
 */
function gutenberg_lab_render_post_card_terms( $post_id, $args = array() ) {
	$args = wp_parse_args(
		$args,
		array(
			'show_categories' => false,
			'show_tags'       => false,
			'max_terms'       => 3,
		)
	);

	$groups = array();

	if ( $args['show_categories'] ) {
		$categories = gutenberg_lab_get_post_card_terms( $post_id, 'category', (int) $args['max_terms'] );
		if ( $categories ) {
			$groups['category'] = $categories;
		}
	}

	if ( $args['show_tags'] ) {
		$tags = gutenberg_lab_get_post_card_terms( $post_id, 'post_tag', (int) $args['max_terms'] );
		if ( $tags ) {
			$groups['post_tag'] = $tags;
		}
	}

	if ( empty( $groups ) ) {
		return '';
	}

	ob_start();
	?>
	<ul class="lab-post-card__terms">
		<?php foreach ( $groups as $taxonomy => $terms ) : ?>
			<?php foreach ( $terms as $term ) : ?>
				<li class="lab-post-card__term lab-post-card__term--<?php echo esc_attr( $taxonomy ); ?>">
					<a href="<?php echo esc_url( get_term_link( $term ) ); ?>">
						<?php echo esc_html( $term->name ); ?>
					</a>
				</li>
			<?php endforeach; ?>
		<?php endforeach; ?>
	</ul>
	<?php
	return (string) ob_get_clean();
}

/**
 * Render one post as a lab-card markup.
 *
 * @param WP_Post|int $post Post object or ID.
 * @param array       $args {
 *     @type string $cta_text         CTA label.
 *     @type bool   $show_cta         Whether to render the CTA button.
 *     @type bool   $show_terms       Master toggle for taxonomies.
 *     @type bool   $show_categories  Show categories when show_terms is on.
 *     @type bool   $show_tags        Show tags when show_terms is on.
 *     @type int    $max_terms        Max terms per taxonomy (0 = all).
 * }
 * @return string HTML.
 */
function gutenberg_lab_render_post_card( $post, $args = array() ) {
	// Back-compat: older callers passed ($post, $cta_text, $show_cta).
	if ( is_string( $args ) ) {
		$legacy_show_cta = func_num_args() > 2 ? (bool) func_get_arg( 2 ) : true;
		$args            = array(
			'cta_text' => $args,
			'show_cta' => $legacy_show_cta,
		);
	}

	$args = wp_parse_args(
		$args,
		array(
			'cta_text'        => '',
			'show_cta'        => true,
			'show_terms'      => false,
			'show_categories' => true,
			'show_tags'       => false,
			'max_terms'       => 3,
		)
	);

	$post = get_post( $post );
	if ( ! $post instanceof WP_Post ) {
		return '';
	}

	$show_cta = (bool) $args['show_cta'];
	$cta_text = $show_cta ? (string) $args['cta_text'] : '';
	if ( $show_cta && $cta_text === '' ) {
		$cta_text = __( 'Read more', 'gutenberg-lab' );
	}

	$title      = get_the_title( $post );
	$url        = get_permalink( $post );
	$excerpt    = get_the_excerpt( $post );
	$thumb_id   = get_post_thumbnail_id( $post );
	$image_html = '';

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

	$terms_html = '';
	if ( ! empty( $args['show_terms'] ) && ( ! empty( $args['show_categories'] ) || ! empty( $args['show_tags'] ) ) ) {
		$terms_html = gutenberg_lab_render_post_card_terms(
			$post->ID,
			array(
				'show_categories' => (bool) $args['show_categories'],
				'show_tags'       => (bool) $args['show_tags'],
				'max_terms'       => (int) $args['max_terms'],
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
			<?php
			if ( $terms_html ) {
				echo $terms_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
			?>
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
