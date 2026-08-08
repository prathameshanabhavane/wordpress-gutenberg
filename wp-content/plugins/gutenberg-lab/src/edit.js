/**
 * Editor UI: image + title + description + CTA link.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	MediaUpload,
	MediaUploadCheck,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	Button,
	ResponsiveWrapper,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import './editor.scss';

/**
 * @param {Object}   props
 * @param {Object}   props.attributes
 * @param {Function} props.setAttributes
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		imageId,
		imageUrl,
		imageAlt,
		title,
		description,
		ctaText,
		ctaUrl,
		ctaOpensInNewTab,
	} = attributes;

	const blockProps = useBlockProps( {
		className: 'lab-card',
	} );

	const image = useSelect(
		( select ) =>
			imageId ? select( 'core' ).getMedia( imageId ) : null,
		[ imageId ]
	);

	const onSelectImage = ( media ) => {
		setAttributes( {
			imageId: media?.id,
			imageUrl: media?.url,
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

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Image', 'gutenberg-lab' ) } initialOpen={ true }>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ onSelectImage }
							allowedTypes={ [ 'image' ] }
							value={ imageId }
							render={ ( { open } ) => (
								<div className="lab-card-inspector-image">
									{ imageUrl ? (
										<>
											<ResponsiveWrapper
												naturalWidth={ image?.media_details?.width || 640 }
												naturalHeight={ image?.media_details?.height || 360 }
											>
												<img src={ imageUrl } alt={ imageAlt } />
											</ResponsiveWrapper>
											<Button
												onClick={ open }
												variant="secondary"
												style={ { marginTop: '8px' } }
											>
												{ __( 'Replace image', 'gutenberg-lab' ) }
											</Button>
											<Button
												onClick={ onRemoveImage }
												isDestructive
												variant="link"
											>
												{ __( 'Remove image', 'gutenberg-lab' ) }
											</Button>
										</>
									) : (
										<Button onClick={ open } variant="secondary">
											{ __( 'Select image', 'gutenberg-lab' ) }
										</Button>
									) }
								</div>
							) }
						/>
					</MediaUploadCheck>
					{ imageUrl && (
						<TextControl
							label={ __( 'Image alt text', 'gutenberg-lab' ) }
							value={ imageAlt }
							onChange={ ( value ) => setAttributes( { imageAlt: value } ) }
							help={ __( 'Describe the image for screen readers.', 'gutenberg-lab' ) }
						/>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Call to action', 'gutenberg-lab' ) } initialOpen={ true }>
					<TextControl
						label={ __( 'Button text', 'gutenberg-lab' ) }
						value={ ctaText }
						onChange={ ( value ) => setAttributes( { ctaText: value } ) }
					/>
					<TextControl
						label={ __( 'Button URL', 'gutenberg-lab' ) }
						value={ ctaUrl }
						onChange={ ( value ) => setAttributes( { ctaUrl: value } ) }
						type="url"
						placeholder="https://"
					/>
					<ToggleControl
						label={ __( 'Open in new tab', 'gutenberg-lab' ) }
						checked={ !! ctaOpensInNewTab }
						onChange={ ( value ) =>
							setAttributes( { ctaOpensInNewTab: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="lab-card__media">
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ onSelectImage }
							allowedTypes={ [ 'image' ] }
							value={ imageId }
							render={ ( { open } ) =>
								imageUrl ? (
									<button
										type="button"
										className="lab-card__image-button"
										onClick={ open }
									>
										<img
											className="lab-card__image"
											src={ imageUrl }
											alt={ imageAlt }
										/>
										<span className="lab-card__image-hint">
											{ __( 'Click to replace image', 'gutenberg-lab' ) }
										</span>
									</button>
								) : (
									<Button
										className="lab-card__image-placeholder"
										onClick={ open }
										variant="secondary"
									>
										{ __( 'Upload / select image', 'gutenberg-lab' ) }
									</Button>
								)
							}
						/>
					</MediaUploadCheck>
				</div>

				<div className="lab-card__body">
					<RichText
						tagName="h3"
						className="lab-card__title"
						placeholder={ __( 'Add title…', 'gutenberg-lab' ) }
						value={ title }
						onChange={ ( value ) => setAttributes( { title: value } ) }
						allowedFormats={ [] }
					/>
					<RichText
						tagName="p"
						className="lab-card__description"
						placeholder={ __( 'Add description…', 'gutenberg-lab' ) }
						value={ description }
						onChange={ ( value ) => setAttributes( { description: value } ) }
					/>
					{ ctaText && (
						<span className="lab-card__cta lab-card__cta--preview">
							{ ctaText }
						</span>
					) }
					{ ! ctaUrl && (
						<p className="lab-card__cta-hint">
							{ __(
								'Set the button URL in the sidebar → Call to action.',
								'gutenberg-lab'
							) }
						</p>
					) }
				</div>
			</div>
		</>
	);
}
