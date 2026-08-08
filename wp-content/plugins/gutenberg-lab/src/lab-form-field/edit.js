/**
 * Single Lab Form Field — pick a type, edit only that control.
 * Select / Radio choices are editable from the sidebar.
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	TextControl,
	TextareaControl,
	ToggleControl,
	CheckboxControl,
	RadioControl,
	RangeControl,
	FormTokenField,
	Button,
	ResponsiveWrapper,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import './editor.scss';
import { FIELD_TYPES, TYPE_LABELS } from './field-types';

const DEFAULT_OPTIONS = [
	{ label: __( 'Option A', 'gutenberg-lab' ), value: 'option-a' },
	{ label: __( 'Option B', 'gutenberg-lab' ), value: 'option-b' },
	{ label: __( 'Option C', 'gutenberg-lab' ), value: 'option-c' },
];

const TOKEN_SUGGESTIONS = [
	'WordPress',
	'Gutenberg',
	'React',
	'PHP',
	'CSS',
	'JavaScript',
];

/**
 * Turn a label into a stable option value.
 *
 * @param {string} label
 * @param {number} index
 * @return {string} Slug value.
 */
function slugifyOptionValue( label, index ) {
	const base = String( label || '' )
		.toLowerCase()
		.trim()
		.replace( /[^a-z0-9]+/g, '-' )
		.replace( /^-+|-+$/g, '' );
	return base || `option-${ index + 1 }`;
}

/**
 * Normalize stored options for SelectControl / RadioControl / frontend.
 *
 * @param {Array} options
 * @return {Array<{label:string,value:string}>} Options.
 */
function normalizeOptions( options ) {
	if ( ! Array.isArray( options ) || ! options.length ) {
		return DEFAULT_OPTIONS.map( ( item ) => ( { ...item } ) );
	}
	return options.map( ( item, index ) => {
		const label =
			typeof item?.label === 'string' && item.label.trim() !== ''
				? item.label
				: `Option ${ index + 1 }`;
		const value =
			typeof item?.value === 'string' && item.value.trim() !== ''
				? item.value
				: slugifyOptionValue( label, index );
		return { label, value };
	} );
}

/**
 * @param {Object}   props
 * @param {Object}   props.attributes
 * @param {Function} props.setAttributes
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		fieldType,
		label,
		textValue,
		textareaValue,
		toggleValue,
		selectValue,
		checkboxValue,
		radioValue,
		options,
		rangeValue,
		tokensValue,
		imageId,
		imageUrl,
		imageAlt,
		fileId,
		fileUrl,
		fileName,
	} = attributes;

	const blockProps = useBlockProps( {
		className: `lab-form-field lab-form-field--${ fieldType }`,
	} );

	const image = useSelect(
		( select ) => ( imageId ? select( 'core' ).getMedia( imageId ) : null ),
		[ imageId ]
	);

	const choiceOptions = normalizeOptions( options );
	const needsChoices =
		fieldType === 'select' ||
		fieldType === 'radio' ||
		fieldType === 'checkbox';
	const fieldLabel =
		label || TYPE_LABELS[ fieldType ] || __( 'Field', 'gutenberg-lab' );

	const selectedChecks = Array.isArray( checkboxValue )
		? checkboxValue
		: checkboxValue
		? [ choiceOptions[ 0 ]?.value ].filter( Boolean )
		: [];

	const updateOptions = ( nextOptions ) => {
		const normalized = normalizeOptions( nextOptions );
		const patch = { options: normalized };
		if ( fieldType === 'select' ) {
			const values = normalized.map( ( item ) => item.value );
			if ( ! values.includes( selectValue ) ) {
				patch.selectValue = values[ 0 ] || '';
			}
		}
		if ( fieldType === 'radio' ) {
			const values = normalized.map( ( item ) => item.value );
			if ( ! values.includes( radioValue ) ) {
				patch.radioValue = values[ 0 ] || '';
			}
		}
		if ( fieldType === 'checkbox' ) {
			const values = normalized.map( ( item ) => item.value );
			patch.checkboxValue = selectedChecks.filter( ( value ) =>
				values.includes( value )
			);
		}
		setAttributes( patch );
	};

	const onAddOption = () => {
		const nextIndex = choiceOptions.length;
		updateOptions( [
			...choiceOptions,
			{
				label: `Option ${ nextIndex + 1 }`,
				value: `option-${ nextIndex + 1 }`,
			},
		] );
	};

	const onUpdateOptionLabel = ( index, nextLabel ) => {
		const next = choiceOptions.map( ( item, i ) => {
			if ( i !== index ) {
				return item;
			}
			return {
				label: nextLabel,
				value: slugifyOptionValue( nextLabel, index ),
			};
		} );
		updateOptions( next );
	};

	const onRemoveOption = ( index ) => {
		if ( choiceOptions.length <= 1 ) {
			return;
		}
		updateOptions( choiceOptions.filter( ( _, i ) => i !== index ) );
	};

	const onSelectImage = ( media ) => {
		setAttributes( {
			imageId: media?.id,
			imageUrl: media?.url || '',
			imageAlt: media?.alt || '',
		} );
	};

	const onRemoveImage = () => {
		setAttributes( {
			imageId: undefined,
			imageUrl: '',
			imageAlt: '',
		} );
	};

	const onSelectFile = ( media ) => {
		setAttributes( {
			fileId: media?.id,
			fileUrl: media?.url || '',
			fileName: media?.filename || media?.title || media?.url || '',
		} );
	};

	const onRemoveFile = () => {
		setAttributes( {
			fileId: undefined,
			fileUrl: '',
			fileName: '',
		} );
	};

	const onChangeFieldType = ( value ) => {
		const next = { fieldType: value, label: '' };
		if (
			( value === 'select' ||
				value === 'radio' ||
				value === 'checkbox' ) &&
			! options?.length
		) {
			next.options = DEFAULT_OPTIONS.map( ( item ) => ( { ...item } ) );
		}
		if ( value === 'select' ) {
			const first = normalizeOptions( next.options || options )[ 0 ]?.value;
			next.selectValue = first || 'option-a';
		}
		if ( value === 'radio' ) {
			const first = normalizeOptions( next.options || options )[ 0 ]?.value;
			next.radioValue = first || 'option-a';
		}
		if ( value === 'checkbox' ) {
			next.checkboxValue = [];
		}
		setAttributes( next );
	};

	let control = null;
	let previewValue = '—';

	switch ( fieldType ) {
		case 'textarea':
			control = (
				<TextareaControl
					label={ fieldLabel }
					value={ textareaValue }
					onChange={ ( value ) =>
						setAttributes( { textareaValue: value } )
					}
					rows={ 4 }
				/>
			);
			previewValue = textareaValue || '—';
			break;
		case 'toggle':
			control = (
				<ToggleControl
					label={ fieldLabel }
					checked={ !! toggleValue }
					onChange={ ( value ) =>
						setAttributes( { toggleValue: value } )
					}
				/>
			);
			previewValue = toggleValue ? 'true' : 'false';
			break;
		case 'select':
			control = (
				<SelectControl
					label={ fieldLabel }
					value={ selectValue }
					options={ choiceOptions }
					onChange={ ( value ) =>
						setAttributes( { selectValue: value } )
					}
				/>
			);
			previewValue =
				choiceOptions.find( ( item ) => item.value === selectValue )
					?.label || selectValue;
			break;
		case 'checkbox':
			control = (
				<div className="lab-form-field__checkbox-group">
					<p className="lab-form-field__control-label">{ fieldLabel }</p>
					{ choiceOptions.map( ( item ) => (
						<CheckboxControl
							key={ item.value }
							label={ item.label }
							checked={ selectedChecks.includes( item.value ) }
							onChange={ ( checked ) => {
								const next = checked
									? [ ...selectedChecks, item.value ]
									: selectedChecks.filter(
											( value ) => value !== item.value
									  );
								setAttributes( { checkboxValue: next } );
							} }
						/>
					) ) }
				</div>
			);
			previewValue = selectedChecks.length
				? selectedChecks
						.map(
							( value ) =>
								choiceOptions.find( ( item ) => item.value === value )
									?.label || value
						)
						.join( ', ' )
				: '—';
			break;
		case 'radio':
			control = (
				<RadioControl
					label={ fieldLabel }
					selected={ radioValue }
					options={ choiceOptions }
					onChange={ ( value ) =>
						setAttributes( { radioValue: value } )
					}
				/>
			);
			previewValue =
				choiceOptions.find( ( item ) => item.value === radioValue )
					?.label || radioValue;
			break;
		case 'range':
			control = (
				<RangeControl
					label={ fieldLabel }
					value={ rangeValue }
					onChange={ ( value ) =>
						setAttributes( { rangeValue: value } )
					}
					min={ 0 }
					max={ 100 }
				/>
			);
			previewValue = String( rangeValue );
			break;
		case 'tokens':
			control = (
				<FormTokenField
					label={ fieldLabel }
					value={ tokensValue }
					suggestions={ TOKEN_SUGGESTIONS }
					onChange={ ( value ) =>
						setAttributes( { tokensValue: value } )
					}
					placeholder={ __( 'Add tags…', 'gutenberg-lab' ) }
				/>
			);
			previewValue = tokensValue?.length
				? tokensValue.join( ', ' )
				: '—';
			break;
		case 'image':
			control = (
				<div className="lab-form-field__media">
					<p className="lab-form-field__control-label">{ fieldLabel }</p>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ onSelectImage }
							allowedTypes={ [ 'image' ] }
							value={ imageId }
							render={ ( { open } ) =>
								imageUrl ? (
									<>
										<ResponsiveWrapper
											naturalWidth={
												image?.media_details?.width || 640
											}
											naturalHeight={
												image?.media_details?.height || 360
											}
										>
											<img src={ imageUrl } alt={ imageAlt } />
										</ResponsiveWrapper>
										<Button variant="secondary" onClick={ open }>
											{ __( 'Replace image', 'gutenberg-lab' ) }
										</Button>
										<Button
											variant="link"
											isDestructive
											onClick={ onRemoveImage }
										>
											{ __( 'Remove image', 'gutenberg-lab' ) }
										</Button>
									</>
								) : (
									<Button variant="secondary" onClick={ open }>
										{ __( 'Select image', 'gutenberg-lab' ) }
									</Button>
								)
							}
						/>
					</MediaUploadCheck>
					{ imageUrl && (
						<TextControl
							label={ __( 'Alt text', 'gutenberg-lab' ) }
							value={ imageAlt }
							onChange={ ( value ) =>
								setAttributes( { imageAlt: value } )
							}
						/>
					) }
				</div>
			);
			previewValue = imageUrl ? imageUrl : '—';
			break;
		case 'file':
			control = (
				<div className="lab-form-field__media">
					<p className="lab-form-field__control-label">{ fieldLabel }</p>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ onSelectFile }
							allowedTypes={ [
								'application/pdf',
								'application/msword',
								'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
								'text/plain',
							] }
							value={ fileId }
							render={ ( { open } ) =>
								fileUrl ? (
									<>
										<p>
											<strong>
												{ fileName ||
													__( 'Selected file', 'gutenberg-lab' ) }
											</strong>
										</p>
										<Button variant="secondary" onClick={ open }>
											{ __( 'Replace file', 'gutenberg-lab' ) }
										</Button>
										<Button
											variant="link"
											isDestructive
											onClick={ onRemoveFile }
										>
											{ __( 'Remove file', 'gutenberg-lab' ) }
										</Button>
									</>
								) : (
									<Button variant="secondary" onClick={ open }>
										{ __(
											'Select file (PDF / doc / txt)',
											'gutenberg-lab'
										) }
									</Button>
								)
							}
						/>
					</MediaUploadCheck>
				</div>
			);
			previewValue = fileName || fileUrl || '—';
			break;
		case 'text':
		default:
			control = (
				<TextControl
					label={ fieldLabel }
					value={ textValue }
					onChange={ ( value ) => setAttributes( { textValue: value } ) }
					placeholder={ __( 'Type something…', 'gutenberg-lab' ) }
				/>
			);
			previewValue = textValue || '—';
			break;
	}

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Field type', 'gutenberg-lab' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Which control?', 'gutenberg-lab' ) }
						help={ __(
							'Or click + on the parent and pick Text / Toggle / Select / Image…',
							'gutenberg-lab'
						) }
						value={ fieldType }
						options={ FIELD_TYPES }
						onChange={ onChangeFieldType }
					/>
					<TextControl
						label={ __( 'Custom label (optional)', 'gutenberg-lab' ) }
						value={ label }
						onChange={ ( value ) => setAttributes( { label: value } ) }
						placeholder={ TYPE_LABELS[ fieldType ] }
					/>
				</PanelBody>

				{ needsChoices && (
					<PanelBody
						title={ __( 'Choices', 'gutenberg-lab' ) }
						initialOpen={ true }
					>
						<p className="lab-form-field__choices-help">
							{ __(
								'Add choices (e.g. Red, Green, Blue). Works for Select, Radio, and Checkbox group.',
								'gutenberg-lab'
							) }
						</p>
						{ choiceOptions.map( ( item, index ) => (
							<div
								className="lab-form-field__choice-row"
								key={ `${ item.value }-${ index }` }
							>
								<TextControl
									label={ __(
										`Choice ${ index + 1 }`,
										'gutenberg-lab'
									) }
									value={ item.label }
									onChange={ ( value ) =>
										onUpdateOptionLabel( index, value )
									}
								/>
								<Button
									variant="link"
									isDestructive
									disabled={ choiceOptions.length <= 1 }
									onClick={ () => onRemoveOption( index ) }
								>
									{ __( 'Remove', 'gutenberg-lab' ) }
								</Button>
							</div>
						) ) }
						<Button variant="secondary" onClick={ onAddOption }>
							{ __( 'Add choice', 'gutenberg-lab' ) }
						</Button>
					</PanelBody>
				) }
			</InspectorControls>

			<div { ...blockProps }>
				<div className="lab-form-field__type-picker">
					<SelectControl
						label={ __( 'Field type', 'gutenberg-lab' ) }
						value={ fieldType }
						options={ FIELD_TYPES }
						onChange={ onChangeFieldType }
					/>
				</div>
				<div className="lab-form-field__badge">
					{ TYPE_LABELS[ fieldType ] || fieldType }
				</div>
				<div className="lab-form-field__control">{ control }</div>
				<p className="lab-form-field__preview-line">
					<strong>{ __( 'Value:', 'gutenberg-lab' ) }</strong>{ ' ' }
					{ fieldType === 'image' && imageUrl ? (
						<img
							className="lab-form-field__thumb"
							src={ imageUrl }
							alt={ imageAlt }
						/>
					) : (
						<span>{ previewValue }</span>
					) }
				</p>
			</div>
		</>
	);
}
