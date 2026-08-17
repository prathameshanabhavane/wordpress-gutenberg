/**
 * Review slider — repeating review cards.
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
	InspectorControls,
	BlockControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { plus } from '@wordpress/icons';
import './editor.scss';

const ALLOWED_BLOCKS = [ 'create-block/lab-review-card' ];

const TEMPLATE = [
	[
		'create-block/lab-review-card',
		{
			name: 'Alex Rivera',
			quote: 'Great experience — clear and easy to use.',
			rating: 5,
		},
	],
	[
		'create-block/lab-review-card',
		{
			name: 'Sam Chen',
			quote: 'The layout made editing simple for our team.',
			rating: 5,
		},
	],
];

function SliderAppender() {
	return (
		<div className="lab-review-slider__appender">
			<span className="lab-review-slider__appender-label">
				{ __( 'Add review', 'gutenberg-lab' ) }
			</span>
			<InnerBlocks.ButtonBlockAppender />
		</div>
	);
}

/**
 * @param {Object}   props
 * @param {Object}   props.attributes
 * @param {Function} props.setAttributes
 * @param {string}   props.clientId
 * @return {Element}
 */
export default function Edit( { attributes, setAttributes, clientId } ) {
	const { autoplay, showDots } = attributes;
	const { insertBlock } = useDispatch( 'core/block-editor' );
	const count = useSelect(
		( select ) => select( 'core/block-editor' ).getBlockCount( clientId ),
		[ clientId ]
	);

	const blockProps = useBlockProps( {
		className: 'lab-review-slider lab-review-slider--editor',
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'lab-review-slider__track' },
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: false,
			renderAppender: SliderAppender,
			orientation: 'horizontal',
		}
	);

	const addReview = () => {
		insertBlock(
			createBlock( 'create-block/lab-review-card', {
				name: `Reviewer ${ count + 1 }`,
				quote: '',
				rating: 5,
			} ),
			count,
			clientId,
			false
		);
	};

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={ plus }
						label={ __( 'Add review', 'gutenberg-lab' ) }
						onClick={ addReview }
					/>
				</ToolbarGroup>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={ __( 'Slider', 'gutenberg-lab' ) }>
					<ToggleControl
						label={ __( 'Autoplay', 'gutenberg-lab' ) }
						checked={ !! autoplay }
						onChange={ ( value ) =>
							setAttributes( { autoplay: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Show dots', 'gutenberg-lab' ) }
						checked={ !! showDots }
						onChange={ ( value ) =>
							setAttributes( { showDots: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<p className="lab-review-slider__hint">
					{ __(
						'Review slider — add cards, they slide on the frontend.',
						'gutenberg-lab'
					) }
				</p>
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
