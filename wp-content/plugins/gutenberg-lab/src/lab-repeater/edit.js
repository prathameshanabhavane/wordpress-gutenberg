/**
 * Lab Repeater — add / reorder rows (ACF Repeater-style).
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import './editor.scss';

const ALLOWED_BLOCKS = [ 'create-block/lab-repeater-row' ];

const TEMPLATE = [
	[
		'create-block/lab-repeater-row',
		{},
		[ [ 'create-block/lab-field-ui', { fieldType: 'text' } ] ],
	],
];

function RepeaterAppender() {
	return (
		<div className="lab-repeater__appender">
			<span className="lab-repeater__appender-label">
				{ __( 'Add row', 'gutenberg-lab' ) }
			</span>
			<InnerBlocks.ButtonBlockAppender />
		</div>
	);
}

/**
 * @param {Object}   props
 * @param {Object}   props.attributes
 * @param {Function} props.setAttributes
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { buttonLabel } = attributes;

	const blockProps = useBlockProps( {
		className: 'lab-repeater',
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'lab-repeater__rows',
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: false,
			renderAppender: RepeaterAppender,
		}
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Repeater', 'gutenberg-lab' ) }>
					<TextControl
						label={ __( 'Add row label (hint)', 'gutenberg-lab' ) }
						help={ __(
							'Shown in the editor hint. Use + to add rows.',
							'gutenberg-lab'
						) }
						value={ buttonLabel }
						onChange={ ( value ) =>
							setAttributes( { buttonLabel: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
