/**
 * Parent: add Lab Form Field children one at a time (+).
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
} from '@wordpress/block-editor';
import './editor.scss';

const ALLOWED_BLOCKS = [ 'create-block/lab-form-field' ];

const TEMPLATE = [ [ 'create-block/lab-form-field', { fieldType: 'text' } ] ];

/**
 * @return {Element} Element to render.
 */
export default function Edit() {
	const blockProps = useBlockProps( {
		className: 'lab-form-fields',
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'lab-form-fields__list',
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
			<p className="lab-form-fields__hint">
				{ __(
					'Lab Form Fields — click + and choose Text, Toggle, Select, Image, File… Each row is one control.',
					'gutenberg-lab'
				) }
			</p>
			<div { ...innerBlocksProps } />
		</div>
	);
}
