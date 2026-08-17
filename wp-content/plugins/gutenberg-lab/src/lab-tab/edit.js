/**
 * One tab — label + accordion inside.
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import './editor.scss';

const ALLOWED_BLOCKS = [ 'create-block/lab-accordion' ];

const TEMPLATE = [
	[
		'create-block/lab-accordion',
		{},
		[
			[
				'create-block/lab-accordion-item',
				{ title: 'Accordion item' },
				[ [ 'core/paragraph', { placeholder: 'Add content…' } ] ],
			],
		],
	],
];

/**
 * @param {Object}   props
 * @param {Object}   props.attributes
 * @param {Function} props.setAttributes
 * @return {Element}
 */
export default function Edit( { attributes, setAttributes } ) {
	const { tabLabel } = attributes;

	const blockProps = useBlockProps( {
		className: 'lab-tab lab-tab--editor',
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'lab-tab__body' },
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: false,
			renderAppender: false,
		}
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Tab', 'gutenberg-lab' ) }>
					<TextControl
						label={ __( 'Tab label', 'gutenberg-lab' ) }
						help={ __(
							'Shown on the frontend tab button.',
							'gutenberg-lab'
						) }
						value={ tabLabel }
						onChange={ ( value ) =>
							setAttributes( { tabLabel: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<div className="lab-layer-badge">
					<span className="lab-layer-badge__step">2</span>
					<strong>{ __( 'Tab', 'gutenberg-lab' ) }</strong>
					<span className="lab-layer-badge__hint">
						{ __( 'Name this tab, then edit its accordion below', 'gutenberg-lab' ) }
					</span>
				</div>
				<RichText
					tagName="h3"
					className="lab-tab__label"
					value={ tabLabel }
					onChange={ ( value ) =>
						setAttributes( { tabLabel: value } )
					}
					placeholder={ __( 'Tab label…', 'gutenberg-lab' ) }
					allowedFormats={ [] }
				/>
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
