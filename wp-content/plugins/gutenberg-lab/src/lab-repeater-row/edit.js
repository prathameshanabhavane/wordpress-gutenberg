/**
 * One repeater row — holds Lab Field UI children.
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

const ALLOWED_BLOCKS = [ 'create-block/lab-field-ui' ];
const TEMPLATE = [ [ 'create-block/lab-field-ui', { fieldType: 'text' } ] ];

function RowAppender() {
	return (
		<div className="lab-repeater-row__appender">
			<span className="lab-repeater-row__appender-label">
				{ __( 'Add field', 'gutenberg-lab' ) }
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
	const { rowLabel } = attributes;

	const blockProps = useBlockProps( {
		className: 'lab-repeater-row',
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'lab-repeater-row__fields',
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: false,
			renderAppender: RowAppender,
		}
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Row', 'gutenberg-lab' ) }>
					<TextControl
						label={ __( 'Row label (editor only)', 'gutenberg-lab' ) }
						value={ rowLabel }
						onChange={ ( value ) =>
							setAttributes( { rowLabel: value } )
						}
						placeholder={ __( 'e.g. Slide 1', 'gutenberg-lab' ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<p className="lab-repeater-row__title">
					{ rowLabel || __( 'Row', 'gutenberg-lab' ) }
				</p>
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
