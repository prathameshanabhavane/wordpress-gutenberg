/**
 * Single Lab Form Field — pick a type, edit only that control.
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

const SELECT_OPTIONS = [
	{ label: __( 'Option A', 'gutenberg-lab' ), value: 'option-a' },
	{ label: __( 'Option B', 'gutenberg-lab' ), value: 'option-b' },
	{ label: __( 'Option C', 'gutenberg-lab' ), value: 'option-c' },
];

const RADIO_OPTIONS = [
	{ label: __( 'Red', 'gutenberg-lab' ), value: 'red' },
	{ label: __( 'Green', 'gutenberg-lab' ), value: 'green' },
	{ label: __( 'Blue', 'gutenberg-lab' ), value: 'blue' },
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

	const fieldLabel =
		label || TYPE_LABELS[ fieldType ] || __( 'Field', 'gutenberg-lab' );

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
		setAttributes( {
			fieldType: value,
			// Reset label so badge/control use the new type name.
			label: '',
		} );
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
					options={ SELECT_OPTIONS }
					onChange={ ( value ) =>
						setAttributes( { selectValue: value } )
					}
				/>
			);
			previewValue = selectValue;
			break;
		case 'checkbox':
			control = (
				<CheckboxControl
					label={ fieldLabel }
					checked={ !! checkboxValue }
					onChange={ ( value ) =>
						setAttributes( { checkboxValue: value } )
					}
				/>
			);
			previewValue = checkboxValue ? 'true' : 'false';
			break;
		case 'radio':
			control = (
				<RadioControl
					label={ fieldLabel }
					selected={ radioValue }
					options={ RADIO_OPTIONS }
					onChange={ ( value ) =>
						setAttributes( { radioValue: value } )
					}
				/>
			);
			previewValue = radioValue;
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
