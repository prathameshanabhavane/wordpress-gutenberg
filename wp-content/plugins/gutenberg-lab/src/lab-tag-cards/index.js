import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import '../shared/term-cards/style.scss';
import createTermCardsEdit from '../shared/term-cards/edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	edit: createTermCardsEdit( {
		taxonomy: 'post_tag',
		pluralLabel: __( 'Tags', 'gutenberg-lab' ),
	} ),
	save,
} );
