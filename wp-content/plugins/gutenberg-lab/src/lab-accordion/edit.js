/**
 * Lab Accordion — add / reorder items inside a tab.
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

const ALLOWED_BLOCKS = [ 'create-block/lab-accordion-item' ];

const TEMPLATE = [
	[
		'create-block/lab-accordion-item',
		{ title: 'Accordion item' },
		[ [ 'core/paragraph', { placeholder: 'Add content…' } ] ],
	],
];

function AccordionAppender() {
	return (
		<div className="lab-accordion__appender">
			<span className="lab-accordion__appender-label">
				{ __( 'Add accordion item', 'gutenberg-lab' ) }
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
	const { allowMultiple } = attributes;
	const { insertBlock } = useDispatch( 'core/block-editor' );
	const itemCount = useSelect(
		( select ) => select( 'core/block-editor' ).getBlockCount( clientId ),
		[ clientId ]
	);

	const blockProps = useBlockProps( {
		className: 'lab-accordion lab-accordion--editor',
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'lab-accordion__items' },
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: false,
			renderAppender: AccordionAppender,
		}
	);

	const addItem = () => {
		insertBlock(
			createBlock(
				'create-block/lab-accordion-item',
				{ title: `Item ${ itemCount + 1 }` },
				[ createBlock( 'core/paragraph' ) ]
			),
			itemCount,
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
						label={ __( 'Add accordion item', 'gutenberg-lab' ) }
						onClick={ addItem }
					/>
				</ToolbarGroup>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={ __( 'Accordion', 'gutenberg-lab' ) }>
					<ToggleControl
						label={ __( 'Allow multiple open', 'gutenberg-lab' ) }
						help={ __(
							'If off, opening one item closes the others.',
							'gutenberg-lab'
						) }
						checked={ !! allowMultiple }
						onChange={ ( value ) =>
							setAttributes( { allowMultiple: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<div className="lab-layer-badge">
					<span className="lab-layer-badge__step">3</span>
					<strong>{ __( 'Accordion', 'gutenberg-lab' ) }</strong>
					<span className="lab-layer-badge__hint">
						{ __(
							'Add items, then put cards / slider / fields inside each',
							'gutenberg-lab'
						) }
					</span>
				</div>
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
