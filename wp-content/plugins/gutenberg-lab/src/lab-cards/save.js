/**
 * Save only the inner cards. The grid wrapper comes from render.php on the frontend.
 */
import { InnerBlocks } from '@wordpress/block-editor';

export default function save() {
	return <InnerBlocks.Content />;
}
