<?php
/**
 * Lab Search — helpers + classic search fallback hooks.
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Public post types editors may target.
 *
 * @return string[]
 */
function gutenberg_lab_search_allowed_post_types() {
	$types = get_post_types(
		array(
			'public' => true,
		),
		'names'
	);
	return array_values( array_filter( (array) $types ) );
}

/**
 * Public taxonomies editors may target.
 *
 * @return string[]
 */
function gutenberg_lab_search_allowed_taxonomies() {
	$taxes = get_taxonomies(
		array(
			'public' => true,
		),
		'names'
	);
	return array_values( array_filter( (array) $taxes ) );
}

/**
 * Sanitize a list of post type / taxonomy slugs against allowlists.
 *
 * @param array  $values   Raw values.
 * @param string $kind     post_type|taxonomy
 * @return string[]
 */
function gutenberg_lab_search_sanitize_targets( $values, $kind = 'post_type' ) {
	if ( ! is_array( $values ) ) {
		return array();
	}

	$allowed = 'taxonomy' === $kind
		? gutenberg_lab_search_allowed_taxonomies()
		: gutenberg_lab_search_allowed_post_types();

	$clean = array();
	foreach ( $values as $value ) {
		$slug = sanitize_key( (string) $value );
		if ( $slug && in_array( $slug, $allowed, true ) ) {
			$clean[] = $slug;
		}
	}

	return array_values( array_unique( $clean ) );
}

/**
 * Parse comma-separated query var into sanitized slugs.
 *
 * @param string $raw  Raw query var.
 * @param string $kind post_type|taxonomy
 * @return string[]
 */
function gutenberg_lab_search_parse_query_list( $raw, $kind = 'post_type' ) {
	if ( ! is_string( $raw ) || $raw === '' ) {
		return array();
	}
	$parts = array_map( 'trim', explode( ',', $raw ) );
	return gutenberg_lab_search_sanitize_targets( $parts, $kind );
}

/**
 * Sanitize a list of positive integer IDs.
 *
 * @param mixed $values Raw values (array or CSV string).
 * @return int[]
 */
function gutenberg_lab_search_sanitize_ids( $values ) {
	if ( is_string( $values ) ) {
		$values = '' === $values ? array() : explode( ',', $values );
	}
	if ( ! is_array( $values ) ) {
		return array();
	}

	$clean = array();
	foreach ( $values as $value ) {
		$id = absint( $value );
		if ( $id > 0 ) {
			$clean[] = $id;
		}
	}

	return array_values( array_unique( $clean ) );
}

/**
 * Register custom query vars for classic form fallback.
 *
 * @param string[] $vars Query vars.
 * @return string[]
 */
function gutenberg_lab_search_query_vars( $vars ) {
	$vars[] = 'lab_pt';
	$vars[] = 'lab_tax';
	$vars[] = 'lab_ex_p';
	$vars[] = 'lab_ex_t';
	return $vars;
}
add_filter( 'query_vars', 'gutenberg_lab_search_query_vars' );

/**
 * Limit main search query to selected post types + exclude posts (classic fallback).
 *
 * @param WP_Query $query Query.
 */
function gutenberg_lab_search_pre_get_posts( $query ) {
	if ( is_admin() || ! $query->is_main_query() || ! $query->is_search() ) {
		return;
	}

	$post_types = gutenberg_lab_search_parse_query_list(
		(string) get_query_var( 'lab_pt' ),
		'post_type'
	);

	if ( ! empty( $post_types ) ) {
		$query->set( 'post_type', $post_types );
	}

	$excluded_posts = gutenberg_lab_search_sanitize_ids(
		(string) get_query_var( 'lab_ex_p' )
	);

	if ( empty( $excluded_posts ) ) {
		return;
	}

	$existing = $query->get( 'post__not_in' );
	$existing = is_array( $existing ) ? array_map( 'absint', $existing ) : array();
	$query->set( 'post__not_in', array_values( array_unique( array_merge( $existing, $excluded_posts ) ) ) );
}
add_action( 'pre_get_posts', 'gutenberg_lab_search_pre_get_posts' );

/**
 * Render matching taxonomy terms above search results (classic fallback).
 *
 * @param WP_Query $query Query.
 */
function gutenberg_lab_search_loop_start( $query ) {
	if ( is_admin() || ! $query->is_main_query() || ! $query->is_search() ) {
		return;
	}

	$taxonomies = gutenberg_lab_search_parse_query_list(
		(string) get_query_var( 'lab_tax' ),
		'taxonomy'
	);
	$search = get_search_query();

	if ( empty( $taxonomies ) || $search === '' ) {
		return;
	}

	$excluded_terms = gutenberg_lab_search_sanitize_ids(
		(string) get_query_var( 'lab_ex_t' )
	);

	$terms = get_terms(
		array(
			'taxonomy'   => $taxonomies,
			'hide_empty' => false,
			'number'     => 12,
			'search'     => $search,
			'exclude'    => $excluded_terms,
		)
	);

	if ( empty( $terms ) || is_wp_error( $terms ) ) {
		return;
	}

	echo '<section class="lab-search-term-results" aria-label="' . esc_attr__( 'Matching terms', 'gutenberg-lab' ) . '">';
	echo '<h2 class="lab-search-term-results__title">' . esc_html__( 'Matching categories & tags', 'gutenberg-lab' ) . '</h2>';
	echo '<ul class="lab-search-term-results__list">';
	foreach ( $terms as $term ) {
		if ( in_array( (int) $term->term_id, $excluded_terms, true ) ) {
			continue;
		}
		$link = get_term_link( $term );
		if ( is_wp_error( $link ) ) {
			continue;
		}
		$tax_obj = get_taxonomy( $term->taxonomy );
		$tax_label = $tax_obj ? $tax_obj->labels->singular_name : $term->taxonomy;
		echo '<li><a href="' . esc_url( $link ) . '">' . esc_html( $term->name ) . '</a>';
		echo ' <span class="lab-search-term-results__type">(' . esc_html( $tax_label ) . ')</span></li>';
	}
	echo '</ul></section>';
}
add_action( 'loop_start', 'gutenberg_lab_search_loop_start' );
