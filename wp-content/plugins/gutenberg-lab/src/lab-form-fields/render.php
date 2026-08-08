<?php
/**
 * Parent wraps child fields in a real <form> on the frontend.
 *
 * @var string $content Rendered inner Lab Form Field HTML.
 */

$wrapper = get_block_wrapper_attributes(
	array(
		'class' => 'lab-form-fields',
	)
);
?>
<div <?php echo $wrapper; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<form class="lab-form-fields__form" method="post" action="#">
		<div class="lab-form-fields__list">
			<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</div>
		<p class="lab-form-fields__actions">
			<button type="submit" class="lab-form-fields__submit">
				<?php echo esc_html__( 'Submit (demo)', 'gutenberg-lab' ); ?>
			</button>
		</p>
	</form>
</div>
