<?php
/**
 * Frontend for one Lab Form Field.
 *
 * @var array $attributes Block attributes.
 */

$field_type = $attributes['fieldType'] ?? 'text';
$label      = $attributes['label'] ?? '';

$type_labels = array(
	'text'     => __( 'Text input', 'gutenberg-lab' ),
	'textarea' => __( 'Textarea', 'gutenberg-lab' ),
	'toggle'   => __( 'Toggle', 'gutenberg-lab' ),
	'select'   => __( 'Select', 'gutenberg-lab' ),
	'checkbox' => __( 'Checkbox', 'gutenberg-lab' ),
	'radio'    => __( 'Radio', 'gutenberg-lab' ),
	'range'    => __( 'Range', 'gutenberg-lab' ),
	'tokens'   => __( 'Tokens (tags)', 'gutenberg-lab' ),
	'image'    => __( 'Image upload', 'gutenberg-lab' ),
	'file'     => __( 'File upload', 'gutenberg-lab' ),
);

$display_label = $label !== '' ? $label : ( $type_labels[ $field_type ] ?? $field_type );
$value_html    = '—';

switch ( $field_type ) {
	case 'textarea':
		$raw = $attributes['textareaValue'] ?? '';
		$value_html = $raw !== '' ? nl2br( esc_html( $raw ) ) : '—';
		break;
	case 'toggle':
		$value_html = ! empty( $attributes['toggleValue'] ) ? 'true' : 'false';
		break;
	case 'select':
		$value_html = esc_html( $attributes['selectValue'] ?? '' );
		break;
	case 'checkbox':
		$value_html = ! empty( $attributes['checkboxValue'] ) ? 'true' : 'false';
		break;
	case 'radio':
		$value_html = esc_html( $attributes['radioValue'] ?? '' );
		break;
	case 'range':
		$value_html = esc_html( (string) (int) ( $attributes['rangeValue'] ?? 0 ) );
		break;
	case 'tokens':
		$tokens = $attributes['tokensValue'] ?? array();
		if ( ! is_array( $tokens ) ) {
			$tokens = array();
		}
		$value_html = $tokens ? esc_html( implode( ', ', $tokens ) ) : '—';
		break;
	case 'image':
		$url = $attributes['imageUrl'] ?? '';
		$alt = $attributes['imageAlt'] ?? '';
		if ( $url ) {
			$value_html = sprintf(
				'<img class="lab-form-field__thumb" src="%s" alt="%s" loading="lazy" />',
				esc_url( $url ),
				esc_attr( $alt )
			);
		}
		break;
	case 'file':
		$url  = $attributes['fileUrl'] ?? '';
		$name = $attributes['fileName'] ?? '';
		if ( $url ) {
			$value_html = sprintf(
				'<a href="%s" target="_blank" rel="noopener noreferrer">%s</a>',
				esc_url( $url ),
				esc_html( $name !== '' ? $name : $url )
			);
		}
		break;
	case 'text':
	default:
		$raw = $attributes['textValue'] ?? '';
		$value_html = $raw !== '' ? esc_html( $raw ) : '—';
		break;
}

$wrapper = get_block_wrapper_attributes(
	array(
		'class' => sprintf( 'lab-form-field lab-form-field--%s', sanitize_html_class( $field_type ) ),
	)
);
?>
<div <?php echo $wrapper; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="lab-form-field__badge"><?php echo esc_html( $type_labels[ $field_type ] ?? $field_type ); ?></div>
	<p class="lab-form-field__label"><strong><?php echo esc_html( $display_label ); ?></strong></p>
	<div class="lab-form-field__value"><?php echo $value_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></div>
</div>
