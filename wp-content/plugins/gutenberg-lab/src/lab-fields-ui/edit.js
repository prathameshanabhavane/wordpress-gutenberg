/**
 * Parent: add Lab Field UI children (display content, not a form).
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
} from '@wordpress/block-editor';
import './editor.scss';

const ALLOWED_BLOCKS = [ 'create-block/lab-field-ui' ];
const TEMPLATE = [ [ 'create-block/lab-field-ui', { fieldType: 'text' } ] ];

/**
 * @return {Element} Element to render.
 */
export default function Edit() {
	const blockProps = useBlockProps( {
		className: 'lab-fields-ui',
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'lab-fields-ui__list',
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: false,
			renderAppender: InnerBlocks.ButtonBlockAppender,
		}
	);

	return (
		<div { ...blockProps }>
			<p className="lab-fields-ui__hint">
				{ __(
					'Lab Fields UI — configure values in admin. Frontend shows content only (not form inputs).',
					'gutenberg-lab'
				) }
			</p>
			<div { ...innerBlocksProps } />
		</div>
	);
}
