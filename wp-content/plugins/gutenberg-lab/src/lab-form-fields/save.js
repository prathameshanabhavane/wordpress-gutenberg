/**
 * Save inner field blocks; wrapper comes from render.php.
 */
import { InnerBlocks } from '@wordpress/block-editor';

export default function save() {
	return <InnerBlocks.Content />;
}
