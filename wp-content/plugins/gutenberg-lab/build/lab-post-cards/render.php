<?php
/**
 * Frontend: query posts and map into Lab Card UI.
 *
 * @package CreateBlock
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block content (unused).
 * @var WP_Block $block      Block instance.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$columns       = isset( $attributes['columns'] ) ? max( 1, min( 4, (int) $attributes['columns'] ) ) : 3;
$posts_to_show = isset( $attributes['postsToShow'] ) ? max( 1, min( 24, (int) $attributes['postsToShow'] ) ) : 6;
$orderby       = isset( $attributes['orderBy'] ) ? sanitize_key( $attributes['orderBy'] ) : 'date';
$order         = isset( $attributes['order'] ) && strtolower( $attributes['order'] ) === 'asc' ? 'ASC' : 'DESC';
$search        = isset( $attributes['search'] ) ? sanitize_text_field( $attributes['search'] ) : '';
$category_id   = isset( $attributes['categoryId'] ) ? (int) $attributes['categoryId'] : 0;
$tag_id        = isset( $attributes['tagId'] ) ? (int) $attributes['tagId'] : 0;
$selected_ids  = isset( $attributes['selectedPostIds'] ) && is_array( $attributes['selectedPostIds'] )
	? array_values( array_filter( array_map( 'absint', $attributes['selectedPostIds'] ) ) )
	: array();
$source        = isset( $attributes['source'] ) ? sanitize_key( $attributes['source'] ) : 'query';
$is_manual     = ( 'manual' === $source );
$cta_text      = isset( $attributes['ctaText'] ) ? sanitize_text_field( $attributes['ctaText'] ) : __( 'Read more', 'gutenberg-lab' );
$show_cta      = ! isset( $attributes['showCta'] ) || (bool) $attributes['showCta'];
$show_terms    = ! empty( $attributes['showTerms'] );
$show_cats     = ! isset( $attributes['showCategories'] ) || (bool) $attributes['showCategories'];
$show_tags     = ! isset( $attributes['showTags'] ) || (bool) $attributes['showTags'];
$max_terms     = isset( $attributes['maxTerms'] ) ? max( 0, min( 20, (int) $attributes['maxTerms'] ) ) : 3;
$term_ids      = isset( $attributes['selectedTermIds'] ) && is_array( $attributes['selectedTermIds'] )
	? array_values( array_filter( array_map( 'absint', $attributes['selectedTermIds'] ) ) )
	: array();
$excerpt_lines = isset( $attributes['excerptLines'] ) ? max( 1, min( 12, (int) $attributes['excerptLines'] ) ) : 3;

$allowed_orderby = array( 'date', 'title', 'modified' );
if ( ! in_array( $orderby, $allowed_orderby, true ) ) {
	$orderby = 'date';
}

$query_args = array(
	'post_type'           => 'post',
	'post_status'         => 'publish',
	'ignore_sticky_posts' => true,
	'no_found_rows'       => true,
);

if ( $is_manual ) {
	if ( empty( $selected_ids ) ) {
		$query_args['post__in']       = array( 0 );
		$query_args['posts_per_page'] = 1;
	} else {
		$query_args['post__in']       = $selected_ids;
		$query_args['orderby']        = 'post__in';
		$query_args['posts_per_page'] = count( $selected_ids );
	}
} else {
	$query_args['posts_per_page'] = $posts_to_show;
	$query_args['orderby']        = $orderby;
	$query_args['order']          = $order;

	if ( $search !== '' ) {
		$query_args['s'] = $search;
	}
	if ( $category_id > 0 ) {
		$query_args['cat'] = $category_id;
	}
	if ( $tag_id > 0 ) {
		$query_args['tag_id'] = $tag_id;
	}
}

$query = new WP_Query( $query_args );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => sprintf(
			'lab-post-cards lab-cards lab-cards--columns-%d',
			$columns
		),
		'style' => sprintf(
			'--lab-post-card-excerpt-lines: %d;',
			$excerpt_lines
		),
	)
);
?>
<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php if ( $query->have_posts() ) : ?>
		<div class="lab-cards__grid">
			<?php
			while ( $query->have_posts() ) {
				$query->the_post();
				echo gutenberg_lab_render_post_card(
					get_post(),
					array(
						'cta_text'        => $cta_text,
						'show_cta'        => $show_cta,
						'show_terms'      => $show_terms,
						'show_categories' => $show_cats,
						'show_tags'       => $show_tags,
						'max_terms'       => $max_terms,
						'term_ids'        => $term_ids,
					)
				); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
			wp_reset_postdata();
			?>
		</div>
	<?php else : ?>
		<p class="lab-post-cards__empty">
			<?php
			echo esc_html(
				$is_manual
					? __( 'No posts mapped yet.', 'gutenberg-lab' )
					: __( 'No posts found.', 'gutenberg-lab' )
			);
			?>
		</p>
	<?php endif; ?>
</div>
