/**
 * Accordion item — title + curated InnerBlocks.
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import './editor.scss';

const ALLOWED_BLOCKS = [
	'core/paragraph',
	'core/heading',
	'create-block/lab-cards',
	'create-block/lab-review-slider',
	'create-block/lab-fields-ui',
	'create-block/lab-form-fields',
];

const TEMPLATE = [
	[ 'core/paragraph', { placeholder: __( 'Add text, or insert cards / slider / fields…', 'gutenberg-lab' ) } ],
];

function ItemAppender() {
	return (
		<div className="lab-accordion-item__appender">
			<span className="lab-accordion-item__appender-label">
				{ __(
					'Add: text · cards · review slider · fields',
					'gutenberg-lab'
				) }
			</span>
			<InnerBlocks.ButtonBlockAppender />
		</div>
	);
}

/**
 * @param {Object}   props
 * @param {Object}   props.attributes
 * @param {Function} props.setAttributes
 * @return {Element}
 */
export default function Edit( { attributes, setAttributes } ) {
	const { title, openByDefault } = attributes;

	const blockProps = useBlockProps( {
		className: 'lab-accordion-item lab-accordion-item--editor',
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'lab-accordion-item__body' },
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: false,
			renderAppender: ItemAppender,
		}
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Accordion item', 'gutenberg-lab' ) }>
					<ToggleControl
						label={ __( 'Open by default', 'gutenberg-lab' ) }
						checked={ !! openByDefault }
						onChange={ ( value ) =>
							setAttributes( { openByDefault: value } )
						}
					/>
					<p className="lab-accordion-item__help">
						{ __(
							'Inside this item you can add: Heading/Paragraph, Lab Cards, Review Slider, Fields UI (display), or Form Fields (checkbox, radio, etc.).',
							'gutenberg-lab'
						) }
					</p>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<div className="lab-layer-badge">
					<span className="lab-layer-badge__step">4</span>
					<strong>{ __( 'Item content', 'gutenberg-lab' ) }</strong>
				</div>
				<RichText
					tagName="h4"
					className="lab-accordion-item__title"
					value={ title }
					onChange={ ( value ) => setAttributes( { title: value } ) }
					placeholder={ __( 'Accordion title…', 'gutenberg-lab' ) }
					allowedFormats={ [] }
				/>
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
