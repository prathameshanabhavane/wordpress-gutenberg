<?php
/**
 * Parent wrapper for Lab Form Field children.
 *
 * @var string $content Rendered inner blocks HTML.
 */

$wrapper = get_block_wrapper_attributes(
	array(
		'class' => 'lab-form-fields',
	)
);
?>
<div <?php echo $wrapper; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="lab-form-fields__list">
		<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</div>
</div>
