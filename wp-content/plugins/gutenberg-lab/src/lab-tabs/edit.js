/**
 * Lab Tabs — add / reorder tabs. Clear layer labels for editors.
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
	InspectorControls,
	BlockControls,
} from '@wordpress/block-editor';
import { PanelBody, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { plus } from '@wordpress/icons';
import './editor.scss';

const ALLOWED_BLOCKS = [ 'create-block/lab-tab' ];

const TEMPLATE = [
	[
		'create-block/lab-tab',
		{ tabLabel: 'Tab 1' },
		[
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
		],
	],
	[
		'create-block/lab-tab',
		{ tabLabel: 'Tab 2' },
		[
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
		],
	],
];

function TabsAppender() {
	return (
		<div className="lab-tabs__appender">
			<span className="lab-tabs__appender-label">
				{ __( 'Add tab', 'gutenberg-lab' ) }
			</span>
			<InnerBlocks.ButtonBlockAppender />
		</div>
	);
}

/**
 * @param {Object} props
 * @param {string} props.clientId
 * @return {Element}
 */
export default function Edit( { clientId } ) {
	const { insertBlock } = useDispatch( 'core/block-editor' );
	const tabCount = useSelect(
		( select ) => select( 'core/block-editor' ).getBlockCount( clientId ),
		[ clientId ]
	);

	const blockProps = useBlockProps( {
		className: 'lab-tabs lab-tabs--editor',
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'lab-tabs__panels' },
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: false,
			renderAppender: TabsAppender,
			orientation: 'horizontal',
		}
	);

	const addTab = () => {
		const next = tabCount + 1;
		insertBlock(
			createBlock(
				'create-block/lab-tab',
				{ tabLabel: `Tab ${ next }` },
				[
					createBlock( 'create-block/lab-accordion', {}, [
						createBlock(
							'create-block/lab-accordion-item',
							{ title: 'Accordion item' },
							[ createBlock( 'core/paragraph' ) ]
						),
					] ),
				]
			),
			tabCount,
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
						label={ __( 'Add tab', 'gutenberg-lab' ) }
						onClick={ addTab }
					/>
				</ToolbarGroup>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={ __( 'How this works', 'gutenberg-lab' ) }>
					<p className="lab-tabs__help">
						{ __(
							'1) Add tabs → 2) Open a tab → 3) Add accordion items → 4) Inside each item add cards, review slider, text, or fields.',
							'gutenberg-lab'
						) }
					</p>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<div className="lab-layer-badge">
					<span className="lab-layer-badge__step">1</span>
					<strong>{ __( 'Tabs', 'gutenberg-lab' ) }</strong>
					<span className="lab-layer-badge__hint">
						{ __( 'Click + or toolbar to add another tab', 'gutenberg-lab' ) }
					</span>
				</div>
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
