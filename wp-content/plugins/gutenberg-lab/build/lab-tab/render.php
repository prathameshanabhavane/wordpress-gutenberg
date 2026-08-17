<?php
/**
 * Frontend: tab panel body (chrome comes from parent Lab Tabs).
 *
 * @var array  $attributes Attributes.
 * @var string $content    Inner blocks HTML.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<div class="lab-tab__content">
	<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</div>
