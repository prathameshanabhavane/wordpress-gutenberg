<?php
/**
 * Shared display HTML for Lab Field UI (content only, not form controls).
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Normalize choice options from block attributes.
 *
 * @param array $raw_options Raw options attribute.
 * @return array<string,string> value => label
 */
function gutenberg_lab_field_ui_choices( $raw_options ) {
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
}

/**
 * Build custom display HTML for one field from admin attributes.
 *
 * @param array $attributes Block attributes.
 * @return string HTML.
 */
function gutenberg_lab_render_field_ui( $attributes ) {
	$attributes = is_array( $attributes ) ? $attributes : array();
	$field_type = $attributes['fieldType'] ?? 'text';
	$label      = $attributes['label'] ?? '';

	$type_labels = array(
		'text'     => __( 'Text', 'gutenberg-lab' ),
		'textarea' => __( 'Textarea', 'gutenberg-lab' ),
		'toggle'   => __( 'Toggle', 'gutenberg-lab' ),
		'select'   => __( 'Select', 'gutenberg-lab' ),
		'checkbox' => __( 'Checkbox group', 'gutenberg-lab' ),
		'radio'    => __( 'Radio', 'gutenberg-lab' ),
		'range'    => __( 'Range', 'gutenberg-lab' ),
		'tokens'   => __( 'Tokens (tags)', 'gutenberg-lab' ),
		'image'    => __( 'Image', 'gutenberg-lab' ),
		'file'     => __( 'File', 'gutenberg-lab' ),
	);

	$display_label  = $label !== '' ? $label : ( $type_labels[ $field_type ] ?? $field_type );
	$choice_options = gutenberg_lab_field_ui_choices( $attributes['options'] ?? array() );

	$wrapper = get_block_wrapper_attributes(
		array(
			'class' => sprintf( 'lab-field-ui lab-field-ui--%s', sanitize_html_class( $field_type ) ),
		)
	);

	ob_start();
	?>
	<article <?php echo $wrapper; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
		<h3 class="lab-field-ui__label"><?php echo esc_html( $display_label ); ?></h3>
		<div class="lab-field-ui__content">
			<?php
			switch ( $field_type ) :
				case 'textarea':
					$raw = $attributes['textareaValue'] ?? '';
					if ( $raw === '' ) :
						?>
						<p class="lab-field-ui__empty"><?php echo esc_html__( 'No content.', 'gutenberg-lab' ); ?></p>
					<?php else : ?>
						<div class="lab-field-ui__text"><?php echo nl2br( esc_html( $raw ) ); ?></div>
					<?php endif;
					break;

				case 'toggle':
					$on = ! empty( $attributes['toggleValue'] );
					?>
					<span class="lab-field-ui__pill <?php echo $on ? 'is-on' : 'is-off'; ?>">
						<?php echo esc_html( $on ? __( 'On', 'gutenberg-lab' ) : __( 'Off', 'gutenberg-lab' ) ); ?>
					</span>
					<?php
					break;

				case 'select':
					$choice_keys = array_keys( $choice_options );
					$selected    = $attributes['selectValue'] ?? ( $choice_keys[0] ?? '' );
					if ( ! isset( $choice_options[ $selected ] ) ) {
						$selected = $choice_keys[0] ?? '';
					}
					?>
					<p class="lab-field-ui__value"><?php echo esc_html( $choice_options[ $selected ] ?? '—' ); ?></p>
					<?php
					break;

				case 'checkbox':
					$raw_checked = $attributes['checkboxValue'] ?? array();
					if ( is_bool( $raw_checked ) ) {
						$keys           = array_keys( $choice_options );
						$checked_values = $raw_checked && ! empty( $keys ) ? array( $keys[0] ) : array();
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
					if ( empty( $checked_values ) ) :
						?>
						<p class="lab-field-ui__empty"><?php echo esc_html__( 'None selected.', 'gutenberg-lab' ); ?></p>
					<?php else : ?>
						<ul class="lab-field-ui__list">
							<?php foreach ( $checked_values as $value ) : ?>
								<li><?php echo esc_html( $choice_options[ $value ] ); ?></li>
							<?php endforeach; ?>
						</ul>
					<?php endif;
					break;

				case 'radio':
					$choice_keys = array_keys( $choice_options );
					$selected    = $attributes['radioValue'] ?? ( $choice_keys[0] ?? '' );
					if ( ! isset( $choice_options[ $selected ] ) ) {
						$selected = $choice_keys[0] ?? '';
					}
					?>
					<p class="lab-field-ui__value"><?php echo esc_html( $choice_options[ $selected ] ?? '—' ); ?></p>
					<?php
					break;

				case 'range':
					$range = isset( $attributes['rangeValue'] ) ? (int) $attributes['rangeValue'] : 0;
					$range = max( 0, min( 100, $range ) );
					?>
					<div class="lab-field-ui__meter" role="img" aria-label="<?php echo esc_attr( (string) $range ); ?>">
						<span class="lab-field-ui__meter-fill" style="width: <?php echo esc_attr( (string) $range ); ?>%;"></span>
					</div>
					<p class="lab-field-ui__value"><?php echo esc_html( (string) $range ); ?></p>
					<?php
					break;

				case 'tokens':
					$tokens = $attributes['tokensValue'] ?? array();
					if ( ! is_array( $tokens ) ) {
						$tokens = array();
					}
					if ( empty( $tokens ) ) :
						?>
						<p class="lab-field-ui__empty"><?php echo esc_html__( 'No tags.', 'gutenberg-lab' ); ?></p>
					<?php else : ?>
						<ul class="lab-field-ui__tokens">
							<?php foreach ( $tokens as $token ) : ?>
								<li class="lab-field-ui__token"><?php echo esc_html( (string) $token ); ?></li>
							<?php endforeach; ?>
						</ul>
					<?php endif;
					break;

				case 'image':
					$url = $attributes['imageUrl'] ?? '';
					$alt = $attributes['imageAlt'] ?? '';
					if ( $url ) :
						?>
						<figure class="lab-field-ui__figure">
							<img class="lab-field-ui__thumb" src="<?php echo esc_url( $url ); ?>" alt="<?php echo esc_attr( $alt ); ?>" loading="lazy" />
							<?php if ( $alt !== '' ) : ?>
								<figcaption class="lab-field-ui__caption"><?php echo esc_html( $alt ); ?></figcaption>
							<?php endif; ?>
						</figure>
					<?php else : ?>
						<p class="lab-field-ui__empty"><?php echo esc_html__( 'No image.', 'gutenberg-lab' ); ?></p>
					<?php endif;
					break;

				case 'file':
					$url  = $attributes['fileUrl'] ?? '';
					$name = $attributes['fileName'] ?? '';
					if ( $url ) :
						?>
						<p class="lab-field-ui__file">
							<a href="<?php echo esc_url( $url ); ?>" target="_blank" rel="noopener noreferrer">
								<?php echo esc_html( $name !== '' ? $name : __( 'Download file', 'gutenberg-lab' ) ); ?>
							</a>
						</p>
					<?php else : ?>
						<p class="lab-field-ui__empty"><?php echo esc_html__( 'No file.', 'gutenberg-lab' ); ?></p>
					<?php endif;
					break;

				case 'text':
				default:
					$raw = $attributes['textValue'] ?? '';
					if ( $raw === '' ) :
						?>
						<p class="lab-field-ui__empty"><?php echo esc_html__( 'No content.', 'gutenberg-lab' ); ?></p>
					<?php else : ?>
						<p class="lab-field-ui__value"><?php echo esc_html( $raw ); ?></p>
					<?php endif;
					break;
			endswitch;
			?>
		</div>
	</article>
	<?php
	return (string) ob_get_clean();
}
