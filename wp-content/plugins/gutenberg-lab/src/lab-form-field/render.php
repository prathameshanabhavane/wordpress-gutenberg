<?php
/**
 * Frontend: render the SAME control type chosen in admin
 * (text → input, select → select, checkbox → checkbox, etc.).
 *
 * Markup uses real form controls + CSS hooks so styles stay custom
 * and consistent across Chrome, Firefox, Safari, and Edge.
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
	'checkbox' => __( 'Checkbox group', 'gutenberg-lab' ),
	'radio'    => __( 'Radio', 'gutenberg-lab' ),
	'range'    => __( 'Range', 'gutenberg-lab' ),
	'tokens'   => __( 'Tokens (tags)', 'gutenberg-lab' ),
	'image'    => __( 'Image upload', 'gutenberg-lab' ),
	'file'     => __( 'File upload', 'gutenberg-lab' ),
);

$display_label = $label !== '' ? $label : ( $type_labels[ $field_type ] ?? $field_type );
$field_id      = 'lab-field-' . uniqid( '', false );
$field_name    = 'lab_form[' . sanitize_key( $field_type ) . '_' . substr( md5( $field_id ), 0, 6 ) . ']';

/**
 * Build choice list from block attribute `options` (admin-editable).
 * Falls back to Option A/B/C.
 *
 * @param array $raw_options Attribute options.
 * @return array<string,string> value => label
 */
$lab_form_field_choices = static function ( $raw_options ) {
	$defaults = array(
		'option-a' => __( 'Option A', 'gutenberg-lab' ),
		'option-b' => __( 'Option B', 'gutenberg-lab' ),
		'option-c' => __( 'Option C', 'gutenberg-lab' ),
	);

	if ( ! is_array( $raw_options ) || empty( $raw_options ) ) {
		return $defaults;
	}

	$choices = array();
	foreach ( $raw_options as $index => $item ) {
		if ( ! is_array( $item ) ) {
			continue;
		}
		$opt_label = isset( $item['label'] ) ? trim( (string) $item['label'] ) : '';
		$opt_value = isset( $item['value'] ) ? trim( (string) $item['value'] ) : '';
		if ( $opt_label === '' ) {
			$opt_label = sprintf(
				/* translators: %d: option index */
				__( 'Option %d', 'gutenberg-lab' ),
				(int) $index + 1
			);
		}
		if ( $opt_value === '' ) {
			$opt_value = sanitize_title( $opt_label );
			if ( $opt_value === '' ) {
				$opt_value = 'option-' . ( (int) $index + 1 );
			}
		}
		$choices[ $opt_value ] = $opt_label;
	}

	return ! empty( $choices ) ? $choices : $defaults;
};

$choice_options = $lab_form_field_choices( $attributes['options'] ?? array() );

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
				class="lab-form-field__control lab-form-field__control--textarea"
				id="<?php echo esc_attr( $field_id ); ?>"
				name="<?php echo esc_attr( $field_name ); ?>"
				rows="4"
			><?php echo esc_textarea( $raw ); ?></textarea>
			<?php
			break;

		case 'toggle':
			$checked = ! empty( $attributes['toggleValue'] );
			?>
			<label class="lab-form-field__option" for="<?php echo esc_attr( $field_id ); ?>">
				<input
					class="lab-form-field__native"
					type="checkbox"
					id="<?php echo esc_attr( $field_id ); ?>"
					name="<?php echo esc_attr( $field_name ); ?>"
					value="1"
					<?php checked( $checked ); ?>
				/>
				<span class="lab-form-field__switch" aria-hidden="true">
					<span class="lab-form-field__switch-thumb"></span>
				</span>
				<span class="lab-form-field__option-text"><?php echo esc_html( $display_label ); ?></span>
			</label>
			<?php
			break;

		case 'select':
			$choice_keys = array_keys( $choice_options );
			$selected    = $attributes['selectValue'] ?? ( $choice_keys[0] ?? 'option-a' );
			if ( ! isset( $choice_options[ $selected ] ) ) {
				$selected = $choice_keys[0] ?? 'option-a';
			}
			$selected_label = $choice_options[ $selected ] ?? '';
			$list_id        = $field_id . '-list';
			?>
			<span class="lab-form-field__label" id="<?php echo esc_attr( $field_id ); ?>-label">
				<?php echo esc_html( $display_label ); ?>
			</span>
			<div class="lab-form-field__custom-select" data-lab-select>
				<?php /* Native <select> = no-JS / progressive-enhancement fallback */ ?>
				<select
					class="lab-form-field__fallback-select"
					id="<?php echo esc_attr( $field_id ); ?>"
					name="<?php echo esc_attr( $field_name ); ?>"
					aria-labelledby="<?php echo esc_attr( $field_id ); ?>-label"
				>
					<?php foreach ( $choice_options as $value => $opt_label ) : ?>
						<option value="<?php echo esc_attr( $value ); ?>" <?php selected( $selected, $value ); ?>>
							<?php echo esc_html( $opt_label ); ?>
						</option>
					<?php endforeach; ?>
				</select>

				<?php /* Custom UI (activated by view.js — same look in all browsers) */ ?>
				<div class="lab-form-field__select-ui" hidden>
					<input
						type="hidden"
						class="lab-form-field__select-input"
						value="<?php echo esc_attr( $selected ); ?>"
						disabled
					/>
					<button
						type="button"
						class="lab-form-field__select-trigger"
						aria-haspopup="listbox"
						aria-expanded="false"
						aria-controls="<?php echo esc_attr( $list_id ); ?>"
						aria-labelledby="<?php echo esc_attr( $field_id ); ?>-label <?php echo esc_attr( $field_id ); ?>-value"
					>
						<span class="lab-form-field__select-value" id="<?php echo esc_attr( $field_id ); ?>-value">
							<?php echo esc_html( $selected_label ); ?>
						</span>
						<span class="lab-form-field__select-chevron" aria-hidden="true"></span>
					</button>
					<ul
						class="lab-form-field__select-list"
						id="<?php echo esc_attr( $list_id ); ?>"
						role="listbox"
						aria-labelledby="<?php echo esc_attr( $field_id ); ?>-label"
						hidden
					>
						<?php foreach ( $choice_options as $value => $opt_label ) : ?>
							<li
								class="lab-form-field__select-option"
								role="option"
								tabindex="-1"
								data-value="<?php echo esc_attr( $value ); ?>"
								aria-selected="<?php echo $selected === $value ? 'true' : 'false'; ?>"
							>
								<span class="lab-form-field__select-option-label"><?php echo esc_html( $opt_label ); ?></span>
								<span class="lab-form-field__select-option-check" aria-hidden="true"></span>
							</li>
						<?php endforeach; ?>
					</ul>
				</div>
			</div>
			<?php
			break;

		case 'checkbox':
			$raw_checked = $attributes['checkboxValue'] ?? array();
			if ( is_bool( $raw_checked ) ) {
				$choice_keys = array_keys( $choice_options );
				$checked_values = $raw_checked && ! empty( $choice_keys )
					? array( $choice_keys[0] )
					: array();
			} elseif ( is_array( $raw_checked ) ) {
				$checked_values = array_values(
					array_filter(
						array_map( 'strval', $raw_checked ),
						static function ( $value ) use ( $choice_options ) {
							return isset( $choice_options[ $value ] );
						}
					)
				);
			} else {
				$checked_values = array();
			}
			?>
			<span class="lab-form-field__label" id="<?php echo esc_attr( $field_id ); ?>-legend">
				<?php echo esc_html( $display_label ); ?>
			</span>
			<div
				class="lab-form-field__checkbox-group"
				role="group"
				aria-labelledby="<?php echo esc_attr( $field_id ); ?>-legend"
			>
				<?php foreach ( $choice_options as $value => $opt_label ) : ?>
					<?php $check_id = $field_id . '-' . sanitize_html_class( $value ); ?>
					<label class="lab-form-field__option" for="<?php echo esc_attr( $check_id ); ?>">
						<input
							class="lab-form-field__native"
							type="checkbox"
							id="<?php echo esc_attr( $check_id ); ?>"
							name="<?php echo esc_attr( $field_name ); ?>[]"
							value="<?php echo esc_attr( $value ); ?>"
							<?php checked( in_array( $value, $checked_values, true ) ); ?>
						/>
						<span class="lab-form-field__box" aria-hidden="true"></span>
						<span class="lab-form-field__option-text"><?php echo esc_html( $opt_label ); ?></span>
					</label>
				<?php endforeach; ?>
			</div>
			<?php
			break;

		case 'radio':
			$choice_keys = array_keys( $choice_options );
			$selected    = $attributes['radioValue'] ?? ( $choice_keys[0] ?? 'option-a' );
			if ( ! isset( $choice_options[ $selected ] ) ) {
				$selected = $choice_keys[0] ?? 'option-a';
			}
			?>
			<span class="lab-form-field__label" id="<?php echo esc_attr( $field_id ); ?>-legend">
				<?php echo esc_html( $display_label ); ?>
			</span>
			<div
				class="lab-form-field__radio-group"
				role="radiogroup"
				aria-labelledby="<?php echo esc_attr( $field_id ); ?>-legend"
			>
				<?php foreach ( $choice_options as $value => $opt_label ) : ?>
					<?php $radio_id = $field_id . '-' . sanitize_html_class( $value ); ?>
					<label class="lab-form-field__option" for="<?php echo esc_attr( $radio_id ); ?>">
						<input
							class="lab-form-field__native"
							type="radio"
							id="<?php echo esc_attr( $radio_id ); ?>"
							name="<?php echo esc_attr( $field_name ); ?>"
							value="<?php echo esc_attr( $value ); ?>"
							<?php checked( $selected, $value ); ?>
						/>
						<span class="lab-form-field__radio" aria-hidden="true"></span>
						<span class="lab-form-field__option-text"><?php echo esc_html( $opt_label ); ?></span>
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
			<?php if ( ! empty( $tokens ) ) : ?>
				<ul class="lab-form-field__tokens" aria-hidden="true">
					<?php foreach ( $tokens as $token ) : ?>
						<li class="lab-form-field__token"><?php echo esc_html( (string) $token ); ?></li>
					<?php endforeach; ?>
				</ul>
			<?php endif; ?>
			<input
				class="lab-form-field__control lab-form-field__control--text"
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
			<div class="lab-form-field__upload" data-lab-upload="image">
				<?php if ( $url ) : ?>
					<figure class="lab-form-field__upload-preview is-visible">
						<img
							class="lab-form-field__upload-thumb"
							src="<?php echo esc_url( $url ); ?>"
							alt="<?php echo esc_attr( $alt ); ?>"
							loading="lazy"
						/>
						<span class="lab-form-field__upload-meta">
							<span class="lab-form-field__upload-name">
								<?php echo esc_html( $alt !== '' ? $alt : __( 'Selected image', 'gutenberg-lab' ) ); ?>
							</span>
							<span class="lab-form-field__upload-sub">
								<?php echo esc_html__( 'Image ready', 'gutenberg-lab' ); ?>
							</span>
						</span>
					</figure>
				<?php else : ?>
					<label class="lab-form-field__dropzone" for="<?php echo esc_attr( $field_id ); ?>">
						<input
							class="lab-form-field__native-file"
							type="file"
							id="<?php echo esc_attr( $field_id ); ?>"
							name="<?php echo esc_attr( $field_name ); ?>"
							accept="image/*"
						/>
						<span class="lab-form-field__dropzone-visual" aria-hidden="true">
							<span class="lab-form-field__dropzone-icon lab-form-field__dropzone-icon--image"></span>
						</span>
						<span class="lab-form-field__dropzone-copy">
							<span class="lab-form-field__dropzone-title">
								<?php echo esc_html__( 'Click to upload image', 'gutenberg-lab' ); ?>
							</span>
							<span class="lab-form-field__dropzone-hint">
								<?php echo esc_html__( 'PNG, JPG, or WebP', 'gutenberg-lab' ); ?>
							</span>
						</span>
						<span class="lab-form-field__dropzone-btn">
							<?php echo esc_html__( 'Browse', 'gutenberg-lab' ); ?>
						</span>
					</label>
					<div class="lab-form-field__upload-preview" hidden>
						<img class="lab-form-field__upload-thumb" alt="" />
						<span class="lab-form-field__upload-meta">
							<span class="lab-form-field__upload-name"></span>
							<span class="lab-form-field__upload-sub"></span>
						</span>
						<button type="button" class="lab-form-field__upload-change">
							<?php echo esc_html__( 'Change', 'gutenberg-lab' ); ?>
						</button>
					</div>
				<?php endif; ?>
			</div>
			<?php
			break;

		case 'file':
			$url  = $attributes['fileUrl'] ?? '';
			$name = $attributes['fileName'] ?? '';
			?>
			<span class="lab-form-field__label"><?php echo esc_html( $display_label ); ?></span>
			<div class="lab-form-field__upload" data-lab-upload="file">
				<?php if ( $url ) : ?>
					<a class="lab-form-field__upload-preview lab-form-field__upload-preview--file is-visible" href="<?php echo esc_url( $url ); ?>" target="_blank" rel="noopener noreferrer">
						<span class="lab-form-field__upload-file-icon" aria-hidden="true"></span>
						<span class="lab-form-field__upload-meta">
							<span class="lab-form-field__upload-name">
								<?php echo esc_html( $name !== '' ? $name : __( 'Selected file', 'gutenberg-lab' ) ); ?>
							</span>
							<span class="lab-form-field__upload-sub">
								<?php echo esc_html__( 'Click to open', 'gutenberg-lab' ); ?>
							</span>
						</span>
						<span class="lab-form-field__upload-change">
							<?php echo esc_html__( 'Open', 'gutenberg-lab' ); ?>
						</span>
					</a>
				<?php else : ?>
					<label class="lab-form-field__dropzone" for="<?php echo esc_attr( $field_id ); ?>">
						<input
							class="lab-form-field__native-file"
							type="file"
							id="<?php echo esc_attr( $field_id ); ?>"
							name="<?php echo esc_attr( $field_name ); ?>"
						/>
						<span class="lab-form-field__dropzone-visual" aria-hidden="true">
							<span class="lab-form-field__dropzone-icon lab-form-field__dropzone-icon--file"></span>
						</span>
						<span class="lab-form-field__dropzone-copy">
							<span class="lab-form-field__dropzone-title">
								<?php echo esc_html__( 'Click to upload file', 'gutenberg-lab' ); ?>
							</span>
							<span class="lab-form-field__dropzone-hint">
								<?php echo esc_html__( 'Any file type', 'gutenberg-lab' ); ?>
							</span>
						</span>
						<span class="lab-form-field__dropzone-btn">
							<?php echo esc_html__( 'Browse', 'gutenberg-lab' ); ?>
						</span>
					</label>
					<div class="lab-form-field__upload-preview lab-form-field__upload-preview--file" hidden>
						<span class="lab-form-field__upload-file-icon" aria-hidden="true"></span>
						<span class="lab-form-field__upload-meta">
							<span class="lab-form-field__upload-name"></span>
							<span class="lab-form-field__upload-sub"></span>
						</span>
						<button type="button" class="lab-form-field__upload-change">
							<?php echo esc_html__( 'Change', 'gutenberg-lab' ); ?>
						</button>
					</div>
				<?php endif; ?>
			</div>
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
				class="lab-form-field__control lab-form-field__control--text"
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
