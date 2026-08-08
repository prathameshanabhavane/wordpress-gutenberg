/**
 * Parent block: repeating Lab Cards grid (InnerBlocks loop).
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
	InnerBlocks,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import './editor.scss';

const ALLOWED_BLOCKS = [ 'create-block/lab-card' ];

const TEMPLATE = [
	[ 'create-block/lab-card', {} ],
	[ 'create-block/lab-card', {} ],
	[ 'create-block/lab-card', {} ],
];

/**
 * @param {Object}   props
 * @param {Object}   props.attributes
 * @param {Function} props.setAttributes
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { columns } = attributes;

	const blockProps = useBlockProps( {
		className: `lab-cards lab-cards--columns-${ columns }`,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'lab-cards__grid',
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: false,
			renderAppender: InnerBlocks.ButtonBlockAppender,
			orientation: 'horizontal',
		}
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Layout', 'gutenberg-lab' ) } initialOpen={ true }>
					<RangeControl
						label={ __( 'Columns', 'gutenberg-lab' ) }
						value={ columns }
						onChange={ ( value ) => setAttributes( { columns: value } ) }
						min={ 1 }
						max={ 4 }
						help={ __(
							'How many cards per row on the frontend (and editor preview).',
							'gutenberg-lab'
						) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<p className="lab-cards__hint">
					{ __(
						'Lab Cards — click + below to add another card.',
						'gutenberg-lab'
					) }
				</p>
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
