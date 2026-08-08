import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const props = useBlockProps.save();
    console.log('save', props);
	return (
		<div {...props}>
			<RichText.Content tagName="p" value={attributes.message} />
		</div>
	);
}