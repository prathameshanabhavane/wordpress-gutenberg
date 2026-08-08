import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import { FIELD_VARIATIONS } from './field-types';

registerBlockType( metadata.name, {
	edit: Edit,
	save,
	variations: FIELD_VARIATIONS,
} );
