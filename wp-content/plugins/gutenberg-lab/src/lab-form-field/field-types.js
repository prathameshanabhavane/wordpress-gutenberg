/**
 * Field type options + variations (shared).
 */
import { __ } from '@wordpress/i18n';

export const FIELD_TYPES = [
	{ label: __( 'Text input', 'gutenberg-lab' ), value: 'text' },
	{ label: __( 'Textarea', 'gutenberg-lab' ), value: 'textarea' },
	{ label: __( 'Toggle', 'gutenberg-lab' ), value: 'toggle' },
	{ label: __( 'Select', 'gutenberg-lab' ), value: 'select' },
	{ label: __( 'Checkbox', 'gutenberg-lab' ), value: 'checkbox' },
	{ label: __( 'Radio', 'gutenberg-lab' ), value: 'radio' },
	{ label: __( 'Range', 'gutenberg-lab' ), value: 'range' },
	{ label: __( 'Tokens (tags)', 'gutenberg-lab' ), value: 'tokens' },
	{ label: __( 'Image upload', 'gutenberg-lab' ), value: 'image' },
	{ label: __( 'File upload', 'gutenberg-lab' ), value: 'file' },
];

export const TYPE_LABELS = Object.fromEntries(
	FIELD_TYPES.map( ( item ) => [ item.value, item.label ] )
);

export const FIELD_VARIATIONS = FIELD_TYPES.map( ( item, index ) => ( {
	name: item.value,
	title: item.label,
	description: __( 'Single form control for reference.', 'gutenberg-lab' ),
	attributes: {
		fieldType: item.value,
		label: '',
	},
	isDefault: index === 0,
	scope: [ 'inserter', 'block', 'transform' ],
} ) );
