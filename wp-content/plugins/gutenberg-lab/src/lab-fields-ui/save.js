/**
 * Save inner field-ui blocks; wrapper from render.php.
 */
import { InnerBlocks } from '@wordpress/block-editor';

export default function save() {
	return <InnerBlocks.Content />;
}
