<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content.
 * @var WP_Block $block      Block instance.
 */

echo '<pre>';
print_r( $attributes );
echo '</pre>';

// print_r( $attributes );
// var_dump( $content );
// print_r( $block->parsed_block ); 

$wrapper = get_block_wrapper_attributes();
$message = $attributes['message'] ?? '';
?>
<div <?php echo $wrapper; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<p><?php echo esc_html( $message ); ?></p>
	<time><?php echo esc_html( current_time( 'mysql' ) ); ?></time>
</div>
