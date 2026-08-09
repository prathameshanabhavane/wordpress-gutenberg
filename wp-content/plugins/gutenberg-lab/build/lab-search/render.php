<?php
/**
 * Frontend: Lab Search form.
 *
 * @package CreateBlock
 *
 * @var array $attributes Block attributes.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$label         = isset( $attributes['label'] ) ? sanitize_text_field( $attributes['label'] ) : __( 'Search', 'gutenberg-lab' );
$show_label    = ! empty( $attributes['showLabel'] );
$placeholder   = isset( $attributes['placeholder'] ) ? sanitize_text_field( $attributes['placeholder'] ) : __( 'Search…', 'gutenberg-lab' );
$button_text   = isset( $attributes['buttonText'] ) ? sanitize_text_field( $attributes['buttonText'] ) : __( 'Search', 'gutenberg-lab' );
$scope         = isset( $attributes['scope'] ) ? sanitize_key( $attributes['scope'] ) : 'default';
$live_results  = ! isset( $attributes['liveResults'] ) || (bool) $attributes['liveResults'];
$results_mode  = isset( $attributes['resultsMode'] ) ? sanitize_key( $attributes['resultsMode'] ) : 'limited';
$results_limit = isset( $attributes['resultsLimit'] ) ? max( 3, min( 20, (int) $attributes['resultsLimit'] ) ) : 8;
$excluded_post_ids = gutenberg_lab_search_sanitize_ids(
	isset( $attributes['excludedPostIds'] ) ? $attributes['excludedPostIds'] : array()
);
$excluded_term_ids = gutenberg_lab_search_sanitize_ids(
	isset( $attributes['excludedTermIds'] ) ? $attributes['excludedTermIds'] : array()
);

if ( 'all' !== $results_mode ) {
	$results_mode = 'limited';
}

// REST API hard-caps around 100; "all" uses that ceiling + scrollable UI.
$fetch_limit = ( 'all' === $results_mode ) ? 100 : $results_limit;

$post_types = gutenberg_lab_search_sanitize_targets(
	isset( $attributes['postTypes'] ) ? $attributes['postTypes'] : array(),
	'post_type'
);
$taxonomies = gutenberg_lab_search_sanitize_targets(
	isset( $attributes['taxonomies'] ) ? $attributes['taxonomies'] : array(),
	'taxonomy'
);

if ( 'custom' !== $scope ) {
	$scope      = 'default';
	$post_types = array();
	$taxonomies = array();
}

$taxonomy_rest_map = array();
$labels_map        = array(
	'post'       => __( 'Post', 'gutenberg-lab' ),
	'page'       => __( 'Page', 'gutenberg-lab' ),
	'category'   => __( 'Category', 'gutenberg-lab' ),
	'post_tag'   => __( 'Tag', 'gutenberg-lab' ),
	'attachment' => __( 'Media', 'gutenberg-lab' ),
	'result'     => __( 'Result', 'gutenberg-lab' ),
);

foreach ( gutenberg_lab_search_allowed_post_types() as $post_type ) {
	$obj = get_post_type_object( $post_type );
	if ( $obj ) {
		$labels_map[ $post_type ] = $obj->labels->singular_name;
	}
}

foreach ( $taxonomies as $taxonomy ) {
	$tax_obj = get_taxonomy( $taxonomy );
	if ( ! $tax_obj ) {
		continue;
	}
	$labels_map[ $taxonomy ] = $tax_obj->labels->singular_name;
	if ( ! empty( $tax_obj->show_in_rest ) ) {
		$taxonomy_rest_map[ $taxonomy ] = $tax_obj->rest_base ? $tax_obj->rest_base : $taxonomy;
	}
}

$input_id = wp_unique_id( 'lab-search-' );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'lab-search',
	)
);
?>
<div
	<?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	data-lab-search
	data-scope="<?php echo esc_attr( $scope ); ?>"
	data-post-types="<?php echo esc_attr( implode( ',', $post_types ) ); ?>"
	data-taxonomies="<?php echo esc_attr( wp_json_encode( $taxonomy_rest_map ) ); ?>"
	data-labels="<?php echo esc_attr( wp_json_encode( $labels_map ) ); ?>"
	data-live="<?php echo $live_results ? '1' : '0'; ?>"
	data-results-mode="<?php echo esc_attr( $results_mode ); ?>"
	data-limit="<?php echo esc_attr( (string) $fetch_limit ); ?>"
	data-exclude-posts="<?php echo esc_attr( implode( ',', $excluded_post_ids ) ); ?>"
	data-exclude-terms="<?php echo esc_attr( implode( ',', $excluded_term_ids ) ); ?>"
	data-rest-url="<?php echo esc_url( rest_url( 'wp/v2/search' ) ); ?>"
	data-rest-root="<?php echo esc_url( rest_url( 'wp/v2/' ) ); ?>"
	data-i18n-loading="<?php echo esc_attr__( 'Searching…', 'gutenberg-lab' ); ?>"
	data-i18n-empty="<?php echo esc_attr__( 'No matches yet. Try another keyword.', 'gutenberg-lab' ); ?>"
	data-i18n-hint="<?php echo esc_attr__( 'Keep typing to search…', 'gutenberg-lab' ); ?>"
>
	<form class="lab-search__form" role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>">
		<?php if ( $show_label ) : ?>
			<label class="lab-search__label" for="<?php echo esc_attr( $input_id ); ?>">
				<?php echo esc_html( $label ); ?>
			</label>
		<?php else : ?>
			<label class="screen-reader-text" for="<?php echo esc_attr( $input_id ); ?>">
				<?php echo esc_html( $label ); ?>
			</label>
		<?php endif; ?>

		<div class="lab-search__row">
			<input
				id="<?php echo esc_attr( $input_id ); ?>"
				class="lab-search__input"
				type="search"
				name="s"
				value="<?php echo esc_attr( get_search_query() ); ?>"
				placeholder="<?php echo esc_attr( $placeholder ); ?>"
				autocomplete="off"
				aria-autocomplete="list"
				aria-controls="<?php echo esc_attr( $input_id ); ?>-results"
				aria-expanded="false"
			/>
			<?php if ( 'custom' === $scope && $post_types ) : ?>
				<input type="hidden" name="lab_pt" value="<?php echo esc_attr( implode( ',', $post_types ) ); ?>" />
			<?php endif; ?>
			<?php if ( 'custom' === $scope && $taxonomies ) : ?>
				<input type="hidden" name="lab_tax" value="<?php echo esc_attr( implode( ',', $taxonomies ) ); ?>" />
			<?php endif; ?>
			<?php if ( $excluded_post_ids ) : ?>
				<input type="hidden" name="lab_ex_p" value="<?php echo esc_attr( implode( ',', $excluded_post_ids ) ); ?>" />
			<?php endif; ?>
			<?php if ( $excluded_term_ids ) : ?>
				<input type="hidden" name="lab_ex_t" value="<?php echo esc_attr( implode( ',', $excluded_term_ids ) ); ?>" />
			<?php endif; ?>
			<button class="lab-search__button" type="submit">
				<?php echo esc_html( $button_text ); ?>
			</button>
		</div>
	</form>

	<?php if ( $live_results ) : ?>
		<p class="lab-search__hint" data-lab-search-hint hidden>
			<?php esc_html_e( 'Keep typing to search…', 'gutenberg-lab' ); ?>
		</p>
		<div
			id="<?php echo esc_attr( $input_id ); ?>-results"
			class="lab-search__results<?php echo 'all' === $results_mode ? ' lab-search__results--scroll' : ''; ?>"
			hidden
			data-lab-search-results
			role="listbox"
			aria-label="<?php echo esc_attr__( 'Search results', 'gutenberg-lab' ); ?>"
		>
			<div class="lab-search__results-status" data-lab-search-status hidden>
				<span class="lab-search__results-status-icon" aria-hidden="true"></span>
				<span class="lab-search__results-status-text"></span>
			</div>
			<ul class="lab-search__results-list" data-lab-search-list></ul>
		</div>
	<?php endif; ?>
</div>
