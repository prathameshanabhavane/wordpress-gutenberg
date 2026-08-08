<?php
/**
 * Frontend: render the SAME control type chosen in admin
 * (text → input, select → select, checkbox → checkbox, etc.).
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
$field_id      = 'lab-field-' . uniqid( '', false );
$field_name    = 'lab_form[' . sanitize_key( $field_type ) . '_' . substr( md5( $field_id ), 0, 6 ) . ']';

$select_options = array(
	'option-a' => __( 'Option A', 'gutenberg-lab' ),
	'option-b' => __( 'Option B', 'gutenberg-lab' ),
	'option-c' => __( 'Option C', 'gutenberg-lab' ),
);

$radio_options = array(
	'red'   => __( 'Red', 'gutenberg-lab' ),
	'green' => __( 'Green', 'gutenberg-lab' ),
	'blue'  => __( 'Blue', 'gutenberg-lab' ),
);

$wrapper = get_block_wrapper_attributes(
	array(
		'class' => sprintf( 'lab-form-field lab-form-field--%s', sanitize_html_class( $field_type ) ),
	)
);
?>
<div <?php echo $wrapper; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<span class="lab-form-field__badge"><?php echo esc_html( $type_labels[ $field_type ] ?? $field_type ); ?></span>

	<?php
	switch ( $field_type ) :
		case 'textarea':
			$raw = $attributes['textareaValue'] ?? '';
			?>
			<label class="lab-form-field__label" for="<?php echo esc_attr( $field_id ); ?>">
				<?php echo esc_html( $display_label ); ?>
			</label>
			<textarea
				class="lab-form-field__control"
				id="<?php echo esc_attr( $field_id ); ?>"
				name="<?php echo esc_attr( $field_name ); ?>"
				rows="4"
			><?php echo esc_textarea( $raw ); ?></textarea>
			<?php
			break;

		case 'toggle':
			$checked = ! empty( $attributes['toggleValue'] );
			?>
			<label class="lab-form-field__label lab-form-field__label--inline" for="<?php echo esc_attr( $field_id ); ?>">
				<input
					class="lab-form-field__control lab-form-field__control--toggle"
					type="checkbox"
					id="<?php echo esc_attr( $field_id ); ?>"
					name="<?php echo esc_attr( $field_name ); ?>"
					value="1"
					<?php checked( $checked ); ?>
				/>
				<span><?php echo esc_html( $display_label ); ?></span>
			</label>
			<?php
			break;

		case 'select':
			$selected = $attributes['selectValue'] ?? 'option-a';
			?>
			<label class="lab-form-field__label" for="<?php echo esc_attr( $field_id ); ?>">
				<?php echo esc_html( $display_label ); ?>
			</label>
			<select
				class="lab-form-field__control"
				id="<?php echo esc_attr( $field_id ); ?>"
				name="<?php echo esc_attr( $field_name ); ?>"
			>
				<?php foreach ( $select_options as $value => $opt_label ) : ?>
					<option value="<?php echo esc_attr( $value ); ?>" <?php selected( $selected, $value ); ?>>
						<?php echo esc_html( $opt_label ); ?>
					</option>
				<?php endforeach; ?>
			</select>
			<?php
			break;

		case 'checkbox':
			$checked = ! empty( $attributes['checkboxValue'] );
			?>
			<label class="lab-form-field__label lab-form-field__label--inline" for="<?php echo esc_attr( $field_id ); ?>">
				<input
					class="lab-form-field__control"
					type="checkbox"
					id="<?php echo esc_attr( $field_id ); ?>"
					name="<?php echo esc_attr( $field_name ); ?>"
					value="1"
					<?php checked( $checked ); ?>
				/>
				<span><?php echo esc_html( $display_label ); ?></span>
			</label>
			<?php
			break;

		case 'radio':
			$selected = $attributes['radioValue'] ?? 'red';
			?>
			<span class="lab-form-field__label"><?php echo esc_html( $display_label ); ?></span>
			<div class="lab-form-field__radio-group" role="radiogroup" aria-label="<?php echo esc_attr( $display_label ); ?>">
				<?php foreach ( $radio_options as $value => $opt_label ) : ?>
					<?php $radio_id = $field_id . '-' . sanitize_html_class( $value ); ?>
					<label class="lab-form-field__label lab-form-field__label--inline" for="<?php echo esc_attr( $radio_id ); ?>">
						<input
							class="lab-form-field__control"
							type="radio"
							id="<?php echo esc_attr( $radio_id ); ?>"
							name="<?php echo esc_attr( $field_name ); ?>"
							value="<?php echo esc_attr( $value ); ?>"
							<?php checked( $selected, $value ); ?>
						/>
						<span><?php echo esc_html( $opt_label ); ?></span>
					</label>
				<?php endforeach; ?>
			</div>
			<?php
			break;

		case 'range':
			$range = isset( $attributes['rangeValue'] ) ? (int) $attributes['rangeValue'] : 40;
			?>
			<label class="lab-form-field__label" for="<?php echo esc_attr( $field_id ); ?>">
				<?php echo esc_html( $display_label ); ?>
				<span class="lab-form-field__range-value"><?php echo esc_html( (string) $range ); ?></span>
			</label>
			<input
				class="lab-form-field__control lab-form-field__control--range"
				type="range"
				id="<?php echo esc_attr( $field_id ); ?>"
				name="<?php echo esc_attr( $field_name ); ?>"
				min="0"
				max="100"
				value="<?php echo esc_attr( (string) $range ); ?>"
			/>
			<?php
			break;

		case 'tokens':
			$tokens = $attributes['tokensValue'] ?? array();
			if ( ! is_array( $tokens ) ) {
				$tokens = array();
			}
			$tokens_text = implode( ', ', $tokens );
			?>
			<label class="lab-form-field__label" for="<?php echo esc_attr( $field_id ); ?>">
				<?php echo esc_html( $display_label ); ?>
			</label>
			<input
				class="lab-form-field__control"
				type="text"
				id="<?php echo esc_attr( $field_id ); ?>"
				name="<?php echo esc_attr( $field_name ); ?>"
				value="<?php echo esc_attr( $tokens_text ); ?>"
				placeholder="<?php echo esc_attr__( 'Comma-separated tags', 'gutenberg-lab' ); ?>"
			/>
			<?php
			break;

		case 'image':
			$url = $attributes['imageUrl'] ?? '';
			$alt = $attributes['imageAlt'] ?? '';
			?>
			<span class="lab-form-field__label"><?php echo esc_html( $display_label ); ?></span>
			<?php if ( $url ) : ?>
				<figure class="lab-form-field__figure">
					<img
						class="lab-form-field__thumb"
						src="<?php echo esc_url( $url ); ?>"
						alt="<?php echo esc_attr( $alt ); ?>"
						loading="lazy"
					/>
				</figure>
			<?php else : ?>
				<p class="lab-form-field__empty"><?php echo esc_html__( 'No image selected.', 'gutenberg-lab' ); ?></p>
			<?php endif; ?>
			<?php
			break;

		case 'file':
			$url  = $attributes['fileUrl'] ?? '';
			$name = $attributes['fileName'] ?? '';
			?>
			<span class="lab-form-field__label"><?php echo esc_html( $display_label ); ?></span>
			<?php if ( $url ) : ?>
				<p class="lab-form-field__file">
					<a href="<?php echo esc_url( $url ); ?>" target="_blank" rel="noopener noreferrer">
						<?php echo esc_html( $name !== '' ? $name : __( 'Download file', 'gutenberg-lab' ) ); ?>
					</a>
				</p>
			<?php else : ?>
				<p class="lab-form-field__empty"><?php echo esc_html__( 'No file selected.', 'gutenberg-lab' ); ?></p>
			<?php endif; ?>
			<?php
			break;

		case 'text':
		default:
			$raw = $attributes['textValue'] ?? '';
			?>
			<label class="lab-form-field__label" for="<?php echo esc_attr( $field_id ); ?>">
				<?php echo esc_html( $display_label ); ?>
			</label>
			<input
				class="lab-form-field__control"
				type="text"
				id="<?php echo esc_attr( $field_id ); ?>"
				name="<?php echo esc_attr( $field_name ); ?>"
				value="<?php echo esc_attr( $raw ); ?>"
				placeholder="<?php echo esc_attr__( 'Type something…', 'gutenberg-lab' ); ?>"
			/>
			<?php
			break;
	endswitch;
	?>
</div>
