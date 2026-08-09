/**
 * Search + add/remove/reorder terms for include or exclude lists.
 */
import { __, sprintf } from '@wordpress/i18n';
import { SearchControl, Button, Spinner } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useMemo, useState } from '@wordpress/element';
import { getTermName } from './utils';
import { SOURCE_EXCLUDE, SOURCE_INCLUDE } from './source';

/**
 * @param {Object}   props
 * @param {string}   props.taxonomy
 * @param {string}   props.mode            include|exclude
 * @param {string}   props.pluralLabel
 * @param {number[]} props.value
 * @param {Function} props.onChange
 * @return {Element}
 */
export default function TermPickerControl( {
	taxonomy,
	mode,
	pluralLabel,
	value = [],
	onChange,
} ) {
	const [ termSearch, setTermSearch ] = useState( '' );
	const selectedTermIds = value;
	const isExclude = mode === SOURCE_EXCLUDE;

	const { searchedTerms, selectedTerms, isSearching } = useSelect(
		( select ) => {
			const { getEntityRecords, isResolving } = select( 'core' );

			const searchQuery = {
				per_page: 12,
				hide_empty: false,
				_fields: [ 'id', 'name', 'count', 'description' ],
			};
			if ( termSearch ) {
				searchQuery.search = termSearch;
			}

			return {
				searchedTerms:
					getEntityRecords( 'taxonomy', taxonomy, searchQuery ) ||
					[],
				selectedTerms: selectedTermIds.length
					? getEntityRecords( 'taxonomy', taxonomy, {
							include: selectedTermIds,
							per_page: selectedTermIds.length,
							hide_empty: false,
							_fields: [ 'id', 'name' ],
					  } ) || []
					: [],
				isSearching: isResolving( 'getEntityRecords', [
					'taxonomy',
					taxonomy,
					searchQuery,
				] ),
			};
		},
		[ taxonomy, termSearch, selectedTermIds ]
	);

	const idToName = useMemo( () => {
		const map = {};
		[ ...( selectedTerms || [] ), ...( searchedTerms || [] ) ].forEach(
			( term ) => {
				map[ term.id ] = getTermName( term ) || `#${ term.id }`;
			}
		);
		return map;
	}, [ selectedTerms, searchedTerms ] );

	const mappedTerms = useMemo(
		() =>
			selectedTermIds.map( ( id ) => ( {
				id,
				name: idToName[ id ] || `#${ id }`,
			} ) ),
		[ selectedTermIds, idToName ]
	);

	const searchResults = useMemo(
		() =>
			( searchedTerms || [] ).filter(
				( term ) => ! selectedTermIds.includes( term.id )
			),
		[ searchedTerms, selectedTermIds ]
	);

	const addTerm = ( id ) => {
		if ( selectedTermIds.includes( id ) ) {
			return;
		}
		onChange( [ ...selectedTermIds, id ] );
	};

	const removeTerm = ( id ) => {
		onChange( selectedTermIds.filter( ( termId ) => termId !== id ) );
	};

	const moveTerm = ( id, direction ) => {
		const index = selectedTermIds.indexOf( id );
		if ( index < 0 ) {
			return;
		}
		const next = index + direction;
		if ( next < 0 || next >= selectedTermIds.length ) {
			return;
		}
		const ids = [ ...selectedTermIds ];
		[ ids[ index ], ids[ next ] ] = [ ids[ next ], ids[ index ] ];
		onChange( ids );
	};

	const listTitle =
		mode === SOURCE_INCLUDE
			? __( 'Included terms', 'gutenberg-lab' )
			: __( 'Excluded terms', 'gutenberg-lab' );

	const help =
		mode === SOURCE_INCLUDE
			? sprintf(
					/* translators: %s: categories or tags */
					__(
						'Only these %s will appear as cards. Order is preserved.',
						'gutenberg-lab'
					),
					pluralLabel.toLowerCase()
			  )
			: sprintf(
					/* translators: %s: categories or tags */
					__(
						'Show all %s except the ones listed here.',
						'gutenberg-lab'
					),
					pluralLabel.toLowerCase()
			  );

	return (
		<div className="lab-term-cards__picker">
			<p className="lab-term-cards__help">{ help }</p>
			<SearchControl
				label={ sprintf(
					/* translators: %s: categories or tags */
					__( 'Search %s', 'gutenberg-lab' ),
					pluralLabel.toLowerCase()
				) }
				value={ termSearch }
				onChange={ setTermSearch }
				placeholder={ __( 'Type to find…', 'gutenberg-lab' ) }
				__nextHasNoMarginBottom
			/>

			{ isSearching && (
				<div className="lab-term-cards__search-status">
					<Spinner />
				</div>
			) }

			{ ! isSearching && searchResults.length > 0 && (
				<ul className="lab-term-cards__search-results">
					{ searchResults.map( ( term ) => {
						const name = getTermName( term ) || `#${ term.id }`;
						return (
							<li key={ term.id }>
								<span
									className="lab-term-cards__result-title"
									title={ name }
								>
									{ name }
								</span>
								<Button
									variant="secondary"
									size="small"
									onClick={ () => addTerm( term.id ) }
								>
									{ isExclude
										? __( 'Exclude', 'gutenberg-lab' )
										: __( 'Add', 'gutenberg-lab' ) }
								</Button>
							</li>
						);
					} ) }
				</ul>
			) }

			{ mappedTerms.length > 0 && (
				<>
					<div className="lab-term-cards__mapped-header">
						<strong>
							{ listTitle } ({ mappedTerms.length })
						</strong>
						<Button
							variant="link"
							isDestructive
							onClick={ () => onChange( [] ) }
						>
							{ __( 'Clear all', 'gutenberg-lab' ) }
						</Button>
					</div>
					<ul className="lab-term-cards__mapped-list">
						{ mappedTerms.map( ( item, index ) => (
							<li key={ item.id }>
								<span
									className="lab-term-cards__mapped-title"
									title={ item.name }
								>
									{ item.name }
								</span>
								<div className="lab-term-cards__mapped-actions">
									{ mode === SOURCE_INCLUDE && (
										<>
											<Button
												size="small"
												variant="tertiary"
												disabled={ index === 0 }
												onClick={ () =>
													moveTerm( item.id, -1 )
												}
												label={ __(
													'Move up',
													'gutenberg-lab'
												) }
												showTooltip
											>
												↑
											</Button>
											<Button
												size="small"
												variant="tertiary"
												disabled={
													index ===
													mappedTerms.length - 1
												}
												onClick={ () =>
													moveTerm( item.id, 1 )
												}
												label={ __(
													'Move down',
													'gutenberg-lab'
												) }
												showTooltip
											>
												↓
											</Button>
										</>
									) }
									<Button
										size="small"
										variant="tertiary"
										isDestructive
										onClick={ () => removeTerm( item.id ) }
									>
										{ __( 'Remove', 'gutenberg-lab' ) }
									</Button>
								</div>
							</li>
						) ) }
					</ul>
				</>
			) }
		</div>
	);
}
