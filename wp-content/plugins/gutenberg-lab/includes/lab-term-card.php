<?php
/**
 * Shared helpers for Lab Category Cards / Lab Tag Cards.
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Query terms for a taxonomy card grid.
 *
 * Modes (mutually exclusive):
 * - all:     every term (optional hide_empty / limit / order)
 * - include: only term_ids (order preserved)
 * - exclude: all except term_ids
 * - manual:  legacy alias of include
 *
 * @param string $taxonomy Taxonomy name.
 * @param array  $args {
 *     @type string $source      all|include|exclude|manual
 *     @type int[]  $term_ids    Include or exclude IDs depending on source.
 *     @type int    $number      Max terms for all/exclude modes.
 *     @type string $orderby     name|count|term_id
 *     @type string $order       ASC|DESC
 *     @type bool   $hide_empty  Hide empty terms.
 * }
 * @return WP_Term[]
 */
function gutenberg_lab_query_term_cards( $taxonomy, $args = array() ) {
	$args = wp_parse_args(
		$args,
		array(
			'source'     => 'all',
			'term_ids'   => array(),
			'number'     => 12,
			'orderby'    => 'name',
			'order'      => 'ASC',
			'hide_empty' => true,
		)
	);

	$source = sanitize_key( $args['source'] );
	if ( 'manual' === $source ) {
		$source = 'include';
	}
	if ( ! in_array( $source, array( 'all', 'include', 'exclude' ), true ) ) {
		$source = 'all';
	}

	$ids = array_values( array_filter( array_map( 'absint', (array) $args['term_ids'] ) ) );

	$query = array(
		'taxonomy'   => $taxonomy,
		'hide_empty' => (bool) $args['hide_empty'],
	);

	$allowed_orderby = array( 'name', 'count', 'term_id' );
	$orderby         = in_array( $args['orderby'], $allowed_orderby, true ) ? $args['orderby'] : 'name';
	$order           = ( 'DESC' === strtoupper( (string) $args['order'] ) ) ? 'DESC' : 'ASC';

	if ( 'include' === $source ) {
		if ( empty( $ids ) ) {
			return array();
		}
		$query['include']    = $ids;
		$query['orderby']    = 'include';
		$query['number']     = count( $ids );
		$query['hide_empty'] = false;
	} elseif ( 'exclude' === $source ) {
		$query['number']  = max( 1, min( 48, (int) $args['number'] ) );
		$query['orderby'] = $orderby;
		$query['order']   = $order;
		if ( ! empty( $ids ) ) {
			$query['exclude'] = $ids;
		}
	} else {
		$query['number']  = max( 1, min( 48, (int) $args['number'] ) );
		$query['orderby'] = $orderby;
		$query['order']   = $order;
	}

	$terms = get_terms( $query );
	if ( empty( $terms ) || is_wp_error( $terms ) ) {
		return array();
	}

	return array_values( $terms );
}

/**
 * Render one taxonomy term as a card.
 *
 * @param WP_Term|int $term Term object or ID.
 * @param array       $args {
 *     @type bool   $show_description
 *     @type bool   $show_count
 *     @type bool   $show_cta
 *     @type string $cta_text
 *     @type int    $description_lines
 * }
 * @return string HTML.
 */
function gutenberg_lab_render_term_card( $term, $args = array() ) {
	$term = get_term( $term );
	if ( ! $term instanceof WP_Term || is_wp_error( $term ) ) {
		return '';
	}

	$args = wp_parse_args(
		$args,
		array(
			'show_description'  => true,
			'show_count'        => true,
			'show_cta'          => true,
			'cta_text'          => '',
			'description_lines' => 3,
		)
	);

	$url  = get_term_link( $term );
	$name = $term->name;
	$desc = $term->description;
	$count = (int) $term->count;

	if ( is_wp_error( $url ) ) {
		$url = '';
	}

	$cta_text = (string) $args['cta_text'];
	if ( $args['show_cta'] && $cta_text === '' ) {
		$cta_text = __( 'View posts', 'gutenberg-lab' );
	}

	$lines = max( 1, min( 12, (int) $args['description_lines'] ) );

	ob_start();
	?>
	<article class="lab-card lab-term-card" style="<?php echo esc_attr( '--lab-term-card-desc-lines: ' . $lines . ';' ); ?>">
		<div class="lab-card__body">
			<?php if ( $name ) : ?>
				<h3 class="lab-card__title">
					<?php if ( $url ) : ?>
						<a class="lab-term-card__title-link" href="<?php echo esc_url( $url ); ?>">
							<?php echo esc_html( $name ); ?>
						</a>
					<?php else : ?>
						<?php echo esc_html( $name ); ?>
					<?php endif; ?>
				</h3>
			<?php endif; ?>

			<?php if ( ! empty( $args['show_count'] ) ) : ?>
				<p class="lab-term-card__count">
					<?php
					printf(
						/* translators: %d: number of posts */
						esc_html( _n( '%d post', '%d posts', $count, 'gutenberg-lab' ) ),
						$count
					);
					?>
				</p>
			<?php endif; ?>

			<?php if ( ! empty( $args['show_description'] ) && $desc ) : ?>
				<div class="lab-card__description lab-term-card__description">
					<?php echo wp_kses_post( wpautop( $desc ) ); ?>
				</div>
			<?php endif; ?>

			<?php if ( ! empty( $args['show_cta'] ) && $url && $cta_text ) : ?>
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

/**
 * Render a term cards block grid from attributes.
 *
 * @param string $taxonomy Taxonomy slug.
 * @param array  $attributes Block attributes.
 * @param string $empty_message Message when no terms.
 * @return string HTML.
 */
function gutenberg_lab_render_term_cards_block( $taxonomy, $attributes, $empty_message = '' ) {
	$columns = isset( $attributes['columns'] ) ? max( 1, min( 4, (int) $attributes['columns'] ) ) : 3;
	$source  = isset( $attributes['source'] ) ? sanitize_key( $attributes['source'] ) : 'all';
	$term_ids = isset( $attributes['selectedTermIds'] ) && is_array( $attributes['selectedTermIds'] )
		? array_values( array_filter( array_map( 'absint', $attributes['selectedTermIds'] ) ) )
		: array();

	$terms = gutenberg_lab_query_term_cards(
		$taxonomy,
		array(
			'source'     => $source,
			'term_ids'   => $term_ids,
			'number'     => isset( $attributes['termsToShow'] ) ? (int) $attributes['termsToShow'] : 12,
			'orderby'    => isset( $attributes['orderBy'] ) ? sanitize_key( $attributes['orderBy'] ) : 'name',
			'order'      => isset( $attributes['order'] ) ? $attributes['order'] : 'ASC',
			'hide_empty' => ! isset( $attributes['hideEmpty'] ) || (bool) $attributes['hideEmpty'],
		)
	);

	$card_args = array(
		'show_description'  => ! isset( $attributes['showDescription'] ) || (bool) $attributes['showDescription'],
		'show_count'        => ! isset( $attributes['showCount'] ) || (bool) $attributes['showCount'],
		'show_cta'          => ! isset( $attributes['showCta'] ) || (bool) $attributes['showCta'],
		'cta_text'          => isset( $attributes['ctaText'] ) ? sanitize_text_field( $attributes['ctaText'] ) : '',
		'description_lines' => isset( $attributes['descriptionLines'] ) ? (int) $attributes['descriptionLines'] : 3,
	);

	if ( $empty_message === '' ) {
		$empty_message = __( 'No terms found.', 'gutenberg-lab' );
	}

	$wrapper_attributes = get_block_wrapper_attributes(
		array(
			'class' => sprintf(
				'lab-term-cards lab-cards lab-cards--columns-%d',
				$columns
			),
		)
	);

	ob_start();
	?>
	<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
		<?php if ( $terms ) : ?>
			<div class="lab-cards__grid">
				<?php
				foreach ( $terms as $term ) {
					echo gutenberg_lab_render_term_card( $term, $card_args ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				}
				?>
			</div>
		<?php else : ?>
			<p class="lab-term-cards__empty"><?php echo esc_html( $empty_message ); ?></p>
		<?php endif; ?>
	</div>
	<?php
	return (string) ob_get_clean();
}
