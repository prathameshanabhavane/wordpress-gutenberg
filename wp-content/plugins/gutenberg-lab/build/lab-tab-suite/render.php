<?php
/**
 * Frontend renderer for Lab Tab Suite.
 *
 * @package CreateBlock
 *
 * @var array $attributes Block attributes.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$tabs                = isset( $attributes['tabs'] ) && is_array( $attributes['tabs'] ) ? $attributes['tabs'] : array();
$allow_multiple_open = ! empty( $attributes['allowMultipleOpen'] );

if ( empty( $tabs ) ) {
	return;
}

$uid = wp_unique_id( 'lts-' );

$wrapper = get_block_wrapper_attributes(
	array(
		'class' => 'lts',
	)
);

/**
 * Render one field row (frontend, display-only).
 *
 * @param array $field Field data.
 */
$render_field = static function ( $field ) {
	$type    = isset( $field['type'] ) ? sanitize_key( $field['type'] ) : 'text';
	$label   = isset( $field['label'] ) ? sanitize_text_field( $field['label'] ) : '';
	$options = isset( $field['options'] ) && is_array( $field['options'] ) ? $field['options'] : array();

	echo '<div class="lts-field lts-field--' . esc_attr( $type ) . '">';

	if ( '' !== $label && ! in_array( $type, array( 'checkbox', 'toggle' ), true ) ) {
		echo '<div class="lts-field__label">' . esc_html( $label ) . '</div>';
	}

	switch ( $type ) {
		case 'richtext':
			$value = isset( $field['value'] ) ? wp_kses_post( $field['value'] ) : '';
			echo '<div class="lts-field__richtext">' . $value . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			break;

		case 'text':
			$value = isset( $field['value'] ) ? sanitize_text_field( $field['value'] ) : '';
			if ( '' !== $value ) {
				echo '<p class="lts-field__text">' . esc_html( $value ) . '</p>';
			}
			break;

		case 'textarea':
			$value = isset( $field['value'] ) ? wp_kses_post( $field['value'] ) : '';
			if ( '' !== $value ) {
				echo '<p class="lts-field__textarea">' . nl2br( esc_html( wp_strip_all_tags( $value ) ) ) . '</p>';
			}
			break;

		case 'checkbox':
			$checked = ! empty( $field['value'] );
			echo '<label class="lts-field__checkbox">';
			echo '<span class="lts-field__box' . ( $checked ? ' is-checked' : '' ) . '" aria-hidden="true"></span>';
			echo '<span class="lts-field__checkbox-label">' . esc_html( $label ) . '</span>';
			echo '</label>';
			break;

		case 'toggle':
			$on = ! empty( $field['value'] );
			echo '<label class="lts-field__toggle">';
			echo '<span class="lts-field__switch' . ( $on ? ' is-on' : '' ) . '" aria-hidden="true"></span>';
			echo '<span class="lts-field__toggle-label">' . esc_html( $label ) . '</span>';
			echo '</label>';
			break;

		case 'radio':
			$selected = isset( $field['value'] ) ? (string) $field['value'] : '';
			echo '<ul class="lts-field__radios">';
			foreach ( $options as $option ) {
				$opt_value = isset( $option['value'] ) ? (string) $option['value'] : '';
				$opt_label = isset( $option['label'] ) ? sanitize_text_field( $option['label'] ) : $opt_value;
				$is_on     = $selected === $opt_value;
				echo '<li class="lts-field__radio-item">';
				echo '<span class="lts-field__radio' . ( $is_on ? ' is-on' : '' ) . '" aria-hidden="true"></span>';
				echo '<span class="lts-field__radio-label">' . esc_html( $opt_label ) . '</span>';
				echo '</li>';
			}
			echo '</ul>';
			break;

		case 'image':
			$image    = is_array( $field['value'] ?? null ) ? $field['value'] : array();
			$image_id = isset( $image['id'] ) ? (int) $image['id'] : 0;
			$image_url = isset( $image['url'] ) ? esc_url( $image['url'] ) : '';
			$image_alt = isset( $image['alt'] ) ? sanitize_text_field( $image['alt'] ) : '';

			if ( $image_id ) {
				$html = wp_get_attachment_image(
					$image_id,
					'large',
					false,
					array(
						'class' => 'lts-field__image-img',
						'alt'   => $image_alt,
					)
				);
				if ( $html ) {
					echo '<figure class="lts-field__image">' . $html . '</figure>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
					break;
				}
			}

			if ( $image_url ) {
				echo '<figure class="lts-field__image"><img class="lts-field__image-img" src="' . esc_url( $image_url ) . '" alt="' . esc_attr( $image_alt ) . '" loading="lazy" /></figure>';
			}
			break;

		case 'select':
			$selected = isset( $field['value'] ) ? (string) $field['value'] : '';
			$match    = '';
			foreach ( $options as $option ) {
				$opt_value = isset( $option['value'] ) ? (string) $option['value'] : '';
				if ( $opt_value === $selected ) {
					$match = isset( $option['label'] ) ? sanitize_text_field( $option['label'] ) : $opt_value;
					break;
				}
			}
			if ( '' !== $match ) {
				echo '<p class="lts-field__select">' . esc_html( $match ) . '</p>';
			}
			break;
	}

	echo '</div>';
};
?>
<div
	<?php echo $wrapper; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	data-lts
	data-allow-multiple="<?php echo $allow_multiple_open ? '1' : '0'; ?>"
>
	<div class="lts__tabs" role="tablist" aria-label="<?php echo esc_attr__( 'Tabs', 'gutenberg-lab' ); ?>">
		<?php foreach ( $tabs as $tab_index => $tab ) : ?>
			<?php
			$tab_id      = $uid . '-tab-' . $tab_index;
			$panel_id    = $uid . '-panel-' . $tab_index;
			$is_active   = 0 === $tab_index;
			$label       = isset( $tab['label'] ) ? sanitize_text_field( $tab['label'] ) : '';
			if ( '' === $label ) {
				$label = sprintf( /* translators: %d: tab index */ __( 'Tab %d', 'gutenberg-lab' ), $tab_index + 1 );
			}
			?>
			<button
				type="button"
				class="lts__tab-button<?php echo $is_active ? ' is-active' : ''; ?>"
				role="tab"
				id="<?php echo esc_attr( $tab_id ); ?>"
				aria-controls="<?php echo esc_attr( $panel_id ); ?>"
				aria-selected="<?php echo $is_active ? 'true' : 'false'; ?>"
				tabindex="<?php echo $is_active ? '0' : '-1'; ?>"
				data-lts-tab
			>
				<?php echo esc_html( $label ); ?>
			</button>
		<?php endforeach; ?>
	</div>

	<div class="lts__panels">
		<?php foreach ( $tabs as $tab_index => $tab ) : ?>
			<?php
			$tab_id    = $uid . '-tab-' . $tab_index;
			$panel_id  = $uid . '-panel-' . $tab_index;
			$is_active = 0 === $tab_index;
			$items     = isset( $tab['items'] ) && is_array( $tab['items'] ) ? $tab['items'] : array();
			?>
			<div
				class="lts__panel<?php echo $is_active ? ' is-active' : ''; ?>"
				role="tabpanel"
				id="<?php echo esc_attr( $panel_id ); ?>"
				aria-labelledby="<?php echo esc_attr( $tab_id ); ?>"
				<?php echo $is_active ? '' : 'hidden'; ?>
				data-lts-panel
			>
				<?php if ( empty( $items ) ) : ?>
					<p class="lts__empty"><?php echo esc_html__( 'Nothing here yet.', 'gutenberg-lab' ); ?></p>
				<?php else : ?>
					<div class="lts__accordion" data-lts-accordion>
						<?php foreach ( $items as $item_index => $item ) :
							$item_uid     = $uid . '-t' . $tab_index . '-i' . $item_index;
							$trigger_id   = $item_uid . '-trigger';
							$body_id      = $item_uid . '-body';
							$open_default = ! empty( $item['openByDefault'] );
							$title        = isset( $item['title'] ) ? sanitize_text_field( $item['title'] ) : '';
							if ( '' === $title ) {
								$title = __( 'Section', 'gutenberg-lab' );
							}
							$fields = isset( $item['fields'] ) && is_array( $item['fields'] ) ? $item['fields'] : array();
							?>
							<section class="lts-acc-item<?php echo $open_default ? ' is-open' : ''; ?>" data-lts-acc-item>
								<button
									type="button"
									class="lts-acc-item__trigger"
									id="<?php echo esc_attr( $trigger_id ); ?>"
									aria-controls="<?php echo esc_attr( $body_id ); ?>"
									aria-expanded="<?php echo $open_default ? 'true' : 'false'; ?>"
									data-lts-acc-trigger
								>
									<span class="lts-acc-item__title"><?php echo esc_html( $title ); ?></span>
									<span class="lts-acc-item__icon" aria-hidden="true"></span>
								</button>
								<div
									class="lts-acc-item__body"
									id="<?php echo esc_attr( $body_id ); ?>"
									role="region"
									aria-labelledby="<?php echo esc_attr( $trigger_id ); ?>"
									<?php echo $open_default ? '' : 'hidden'; ?>
									data-lts-acc-body
								>
									<?php if ( empty( $fields ) ) : ?>
										<p class="lts__empty lts__empty--small"><?php echo esc_html__( 'No fields.', 'gutenberg-lab' ); ?></p>
									<?php else : ?>
										<div class="lts-fields">
											<?php foreach ( $fields as $field ) : ?>
												<?php $render_field( $field ); ?>
											<?php endforeach; ?>
										</div>
									<?php endif; ?>
								</div>
							</section>
						<?php endforeach; ?>
					</div>
				<?php endif; ?>
			</div>
		<?php endforeach; ?>
	</div>
</div>
