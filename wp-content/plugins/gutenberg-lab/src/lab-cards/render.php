<?php
/**
 * Frontend: wrap rendered child Lab Cards in a grid (the "loop" container).
 *
 * $content already contains each child card's HTML from lab-card/render.php.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Rendered inner blocks HTML.
 * @var WP_Block $block      Block instance.
 */

$columns = isset( $attributes['columns'] ) ? (int) $attributes['columns'] : 3;
$columns = max( 1, min( 4, $columns ) );

$wrapper = get_block_wrapper_attributes(
	array(
		'class' => sprintf( 'lab-cards lab-cards--columns-%d', $columns ),
	)
);
?>
<div <?php echo $wrapper; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="lab-cards__grid">
		<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</div>
</div>
