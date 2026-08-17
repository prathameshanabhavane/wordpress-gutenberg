/**
 * Editor UI for a single field row inside an accordion item.
 */
import { __ } from '@wordpress/i18n';
import {
	RichText,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	Button,
	TextControl,
	TextareaControl,
	CheckboxControl,
	SelectControl,
	RadioControl,
	ToggleControl,
	Flex,
	FlexItem,
} from '@wordpress/components';
import { chevronUp, chevronDown, trash } from '@wordpress/icons';
import { FIELD_TYPES, FIELD_TYPE_LABELS, defaultField } from './field-types';

function OptionsEditor( { options = [], onChange } ) {
	const update = ( next ) => onChange( next );

	const setOption = ( index, patch ) => {
		const next = options.map( ( opt, i ) =>
			i === index ? { ...opt, ...patch } : opt
		);
		update( next );
	};

	const addOption = () => {
		const nextIndex = options.length;
		update( [
			...options,
			{
				value: `opt-${ nextIndex + 1 }`,
				label: `Option ${ nextIndex + 1 }`,
			},
		] );
	};

	const removeOption = ( index ) => {
		update( options.filter( ( _, i ) => i !== index ) );
	};

	return (
		<div className="lts-field__options">
			<p className="lts-field__options-title">
				{ __( 'Options', 'gutenberg-lab' ) }
			</p>
			{ options.map( ( option, index ) => (
				<Flex
					key={ index }
					align="center"
					gap={ 2 }
					className="lts-field__option"
				>
					<FlexItem isBlock>
						<TextControl
							label={ __( 'Label', 'gutenberg-lab' ) }
							hideLabelFromVision
							value={ option.label }
							onChange={ ( value ) =>
								setOption( index, { label: value } )
							}
							placeholder={ __( 'Label', 'gutenberg-lab' ) }
							__nextHasNoMarginBottom
						/>
					</FlexItem>
					<FlexItem isBlock>
						<TextControl
							label={ __( 'Value', 'gutenberg-lab' ) }
							hideLabelFromVision
							value={ option.value }
							onChange={ ( value ) =>
								setOption( index, { value } )
							}
							placeholder={ __( 'value', 'gutenberg-lab' ) }
							__nextHasNoMarginBottom
						/>
					</FlexItem>
					<FlexItem>
						<Button
							icon={ trash }
							label={ __( 'Remove option', 'gutenberg-lab' ) }
							size="small"
							isDestructive
							onClick={ () => removeOption( index ) }
						/>
					</FlexItem>
				</Flex>
			) ) }
			<Button variant="secondary" size="small" onClick={ addOption }>
				{ __( 'Add option', 'gutenberg-lab' ) }
			</Button>
		</div>
	);
}

/**
 * @param {Object}   props
 * @param {Object}   props.field
 * @param {Function} props.onChange
 * @param {Function} props.onRemove
 * @param {Function} props.onMoveUp
 * @param {Function} props.onMoveDown
 * @param {boolean}  props.canMoveUp
 * @param {boolean}  props.canMoveDown
 * @return {Element}
 */
export default function FieldEditor( {
	field,
	onChange,
	onRemove,
	onMoveUp,
	onMoveDown,
	canMoveUp,
	canMoveDown,
} ) {
	const update = ( patch ) => onChange( { ...field, ...patch } );

	const changeType = ( nextType ) => {
		if ( nextType === field.type ) {
			return;
		}
		const fresh = defaultField( nextType );
		onChange( { ...fresh, id: field.id, label: field.label || fresh.label } );
	};

	return (
		<div className="lts-field">
			<div className="lts-field__header">
				<span className="lts-field__badge">
					{ FIELD_TYPE_LABELS[ field.type ] || field.type }
				</span>
				<div className="lts-field__actions">
					<Button
						icon={ chevronUp }
						label={ __( 'Move up', 'gutenberg-lab' ) }
						size="small"
						disabled={ ! canMoveUp }
						onClick={ onMoveUp }
					/>
					<Button
						icon={ chevronDown }
						label={ __( 'Move down', 'gutenberg-lab' ) }
						size="small"
						disabled={ ! canMoveDown }
						onClick={ onMoveDown }
					/>
					<Button
						icon={ trash }
						label={ __( 'Remove field', 'gutenberg-lab' ) }
						size="small"
						isDestructive
						onClick={ onRemove }
					/>
				</div>
			</div>

			<div className="lts-field__body">
				<Flex align="flex-start" gap={ 3 } wrap>
					<FlexItem isBlock>
						<TextControl
							label={ __( 'Field label', 'gutenberg-lab' ) }
							value={ field.label || '' }
							onChange={ ( value ) => update( { label: value } ) }
							placeholder={ __(
								'Shown above the field',
								'gutenberg-lab'
							) }
							__nextHasNoMarginBottom
						/>
					</FlexItem>
					<FlexItem isBlock>
						<SelectControl
							label={ __( 'Field type', 'gutenberg-lab' ) }
							value={ field.type }
							options={ FIELD_TYPES }
							onChange={ changeType }
							__nextHasNoMarginBottom
						/>
					</FlexItem>
				</Flex>

				<div className="lts-field__value">
					{ field.type === 'text' && (
						<TextControl
							label={ __( 'Value', 'gutenberg-lab' ) }
							value={ field.value || '' }
							onChange={ ( value ) =>
								update( { value } )
							}
							__nextHasNoMarginBottom
						/>
					) }

					{ field.type === 'textarea' && (
						<TextareaControl
							label={ __( 'Value', 'gutenberg-lab' ) }
							value={ field.value || '' }
							onChange={ ( value ) =>
								update( { value } )
							}
							rows={ 4 }
							__nextHasNoMarginBottom
						/>
					) }

					{ field.type === 'richtext' && (
						<div className="lts-field__richtext">
							<p className="lts-field__hint">
								{ __(
									'Rich text — supports bold, italic, links, lists.',
									'gutenberg-lab'
								) }
							</p>
							<RichText
								tagName="div"
								className="lts-field__richtext-input"
								value={ field.value || '' }
								onChange={ ( value ) =>
									update( { value } )
								}
								placeholder={ __(
									'Write content…',
									'gutenberg-lab'
								) }
								multiline="p"
							/>
						</div>
					) }

					{ field.type === 'checkbox' && (
						<CheckboxControl
							label={ field.label || __( 'Checked', 'gutenberg-lab' ) }
							checked={ !! field.value }
							onChange={ ( value ) =>
								update( { value } )
							}
							__nextHasNoMarginBottom
						/>
					) }

					{ field.type === 'toggle' && (
						<ToggleControl
							label={ field.label || __( 'On', 'gutenberg-lab' ) }
							checked={ !! field.value }
							onChange={ ( value ) =>
								update( { value } )
							}
							__nextHasNoMarginBottom
						/>
					) }

					{ field.type === 'radio' && (
						<>
							<RadioControl
								label={ __(
									'Preview: selected option',
									'gutenberg-lab'
								) }
								selected={ field.value || '' }
								options={ ( field.options || [] ).map(
									( opt ) => ( {
										label: opt.label,
										value: opt.value,
									} )
								) }
								onChange={ ( value ) =>
									update( { value } )
								}
							/>
							<OptionsEditor
								options={ field.options || [] }
								onChange={ ( options ) =>
									update( { options } )
								}
							/>
						</>
					) }

					{ field.type === 'image' && (
						<div className="lts-field__image">
							<MediaUploadCheck>
								<MediaUpload
									onSelect={ ( media ) =>
										update( {
											value: {
												id: media.id || 0,
												url: media.url || '',
												alt: media.alt || '',
											},
										} )
									}
									allowedTypes={ [ 'image' ] }
									value={ field.value?.id || 0 }
									render={ ( { open } ) => (
										<div className="lts-field__image-picker">
											{ field.value?.url ? (
												<div className="lts-field__image-preview">
													<img
														src={ field.value.url }
														alt={
															field.value.alt || ''
														}
													/>
												</div>
											) : (
												<div className="lts-field__image-empty">
													{ __(
														'No image selected.',
														'gutenberg-lab'
													) }
												</div>
											) }
											<Flex gap={ 2 } wrap>
												<FlexItem>
													<Button
														variant="secondary"
														size="small"
														onClick={ open }
													>
														{ field.value?.url
															? __(
																	'Replace image',
																	'gutenberg-lab'
															  )
															: __(
																	'Select image',
																	'gutenberg-lab'
															  ) }
													</Button>
												</FlexItem>
												{ field.value?.url && (
													<FlexItem>
														<Button
															variant="tertiary"
															size="small"
															isDestructive
															onClick={ () =>
																update( {
																	value: {
																		id: 0,
																		url: '',
																		alt: '',
																	},
																} )
															}
														>
															{ __(
																'Remove',
																'gutenberg-lab'
															) }
														</Button>
													</FlexItem>
												) }
											</Flex>
										</div>
									) }
								/>
							</MediaUploadCheck>
							<TextControl
								label={ __( 'Alt text', 'gutenberg-lab' ) }
								help={ __(
									'Describe the image for screen readers.',
									'gutenberg-lab'
								) }
								value={ field.value?.alt || '' }
								onChange={ ( value ) =>
									update( {
										value: {
											...( field.value || {} ),
											alt: value,
										},
									} )
								}
								__nextHasNoMarginBottom
							/>
						</div>
					) }

					{ field.type === 'select' && (
						<>
							<SelectControl
								label={ __(
									'Preview: selected option',
									'gutenberg-lab'
								) }
								value={ field.value || '' }
								options={ ( field.options || [] ).map(
									( opt ) => ( {
										label: opt.label,
										value: opt.value,
									} )
								) }
								onChange={ ( value ) =>
									update( { value } )
								}
								__nextHasNoMarginBottom
							/>
							<OptionsEditor
								options={ field.options || [] }
								onChange={ ( options ) =>
									update( { options } )
								}
							/>
						</>
					) }
				</div>
			</div>
		</div>
	);
}
