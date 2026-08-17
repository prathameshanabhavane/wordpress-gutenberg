/**
 * Field type registry for Lab Tab Suite.
 */
import { __ } from '@wordpress/i18n';

export const FIELD_TYPES = [
	{ value: 'richtext', label: __( 'Rich text (editor)', 'gutenberg-lab' ) },
	{ value: 'text', label: __( 'Text', 'gutenberg-lab' ) },
	{ value: 'textarea', label: __( 'Textarea', 'gutenberg-lab' ) },
	{ value: 'checkbox', label: __( 'Checkbox', 'gutenberg-lab' ) },
	{ value: 'radio', label: __( 'Radio', 'gutenberg-lab' ) },
	{ value: 'select', label: __( 'Dropdown', 'gutenberg-lab' ) },
	{ value: 'toggle', label: __( 'Toggle', 'gutenberg-lab' ) },
	{ value: 'image', label: __( 'Image', 'gutenberg-lab' ) },
];

export const FIELD_TYPE_LABELS = Object.fromEntries(
	FIELD_TYPES.map( ( type ) => [ type.value, type.label ] )
);

export function makeId( prefix = 'lts' ) {
	return `${ prefix }-${ Math.random().toString( 36 ).slice( 2, 9 ) }-${ Date.now().toString( 36 ) }`;
}

export function defaultField( type = 'text' ) {
	const base = {
		id: makeId( 'f' ),
		type,
		label: '',
	};

	switch ( type ) {
		case 'richtext':
			return { ...base, label: 'Content', value: '' };
		case 'textarea':
			return { ...base, label: 'Note', value: '' };
		case 'checkbox':
			return { ...base, label: 'I agree', value: false };
		case 'toggle':
			return { ...base, label: 'Enable', value: false };
		case 'radio':
			return {
				...base,
				label: 'Choose one',
				value: 'a',
				options: [
					{ value: 'a', label: 'Option A' },
					{ value: 'b', label: 'Option B' },
				],
			};
		case 'select':
			return {
				...base,
				label: 'Pick one',
				value: '',
				options: [
					{ value: '', label: '— Select —' },
					{ value: 'a', label: 'Option A' },
					{ value: 'b', label: 'Option B' },
				],
			};
		case 'image':
			return {
				...base,
				label: 'Image',
				value: { id: 0, url: '', alt: '' },
			};
		case 'text':
		default:
			return { ...base, label: 'Label', value: '' };
	}
}

export function defaultItem() {
	return {
		id: makeId( 'i' ),
		title: 'Accordion item',
		openByDefault: false,
		fields: [],
	};
}

export function defaultTab( index = 0 ) {
	return {
		id: makeId( 't' ),
		label: `Tab ${ index + 1 }`,
		items: [ defaultItem() ],
	};
}
