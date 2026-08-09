/**
 * Pick specific categories/tags to show as badges (optional allowlist).
 */
import { __ } from '@wordpress/i18n';
import {
	SearchControl,
	Button,
	Spinner,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useMemo, useState } from '@wordpress/element';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * @param {Object}   props
 * @param {number[]} props.value            Selected term IDs.
 * @param {Function} props.onChange
 * @param {boolean}  props.showCategories
 * @param {boolean}  props.showTags
 * @return {Element|null}
 */
export default function TermAllowlistControl( {
	value = [],
	onChange,
	showCategories,
	showTags,
} ) {
	const [ termSearch, setTermSearch ] = useState( '' );
	const selectedTermIds = value;

	const { searchedTerms, selectedTerms, isSearching } = useSelect(
		( select ) => {
			const { getEntityRecords, isResolving } = select( 'core' );
			const results = [];
			let searching = false;

			const searchArgs = {
				per_page: 12,
				hide_empty: false,
				_fields: [ 'id', 'name', 'taxonomy' ],
			};
			if ( termSearch ) {
				searchArgs.search = termSearch;
			}

			if ( showCategories ) {
				const cats =
					getEntityRecords( 'taxonomy', 'category', searchArgs ) ||
					[];
				results.push( ...cats.map( ( t ) => ( { ...t, taxonomy: 'category' } ) ) );
				searching =
					searching ||
					isResolving( 'getEntityRecords', [
						'taxonomy',
						'category',
						searchArgs,
					] );
			}

			if ( showTags ) {
				const tags =
					getEntityRecords( 'taxonomy', 'post_tag', searchArgs ) ||
					[];
				results.push(
					...tags.map( ( t ) => ( { ...t, taxonomy: 'post_tag' } ) )
				);
				searching =
					searching ||
					isResolving( 'getEntityRecords', [
						'taxonomy',
						'post_tag',
						searchArgs,
					] );
			}

			const selected = [];
			if ( selectedTermIds.length ) {
				if ( showCategories ) {
					const cats =
						getEntityRecords( 'taxonomy', 'category', {
							include: selectedTermIds,
							per_page: selectedTermIds.length,
							_fields: [ 'id', 'name' ],
							hide_empty: false,
						} ) || [];
					selected.push(
						...cats.map( ( t ) => ( {
							...t,
							taxonomy: 'category',
						} ) )
					);
				}
				if ( showTags ) {
					const tags =
						getEntityRecords( 'taxonomy', 'post_tag', {
							include: selectedTermIds,
							per_page: selectedTermIds.length,
							_fields: [ 'id', 'name' ],
							hide_empty: false,
						} ) || [];
					selected.push(
						...tags.map( ( t ) => ( {
							...t,
							taxonomy: 'post_tag',
						} ) )
					);
				}
			}

			return {
				searchedTerms: results,
				selectedTerms: selected,
				isSearching: searching,
			};
		},
		[ termSearch, selectedTermIds, showCategories, showTags ]
	);

	const idToTerm = useMemo( () => {
		const map = {};
		[ ...selectedTerms, ...searchedTerms ].forEach( ( term ) => {
			map[ term.id ] = {
				id: term.id,
				name: decodeEntities( term.name || '' ),
				taxonomy: term.taxonomy,
			};
		} );
		return map;
	}, [ selectedTerms, searchedTerms ] );

	const mappedTerms = useMemo(
		() =>
			selectedTermIds.map( ( id ) => {
				const term = idToTerm[ id ];
				return (
					term || {
						id,
						name: `#${ id }`,
						taxonomy: 'term',
					}
				);
			} ),
		[ selectedTermIds, idToTerm ]
	);

	const searchResults = useMemo(
		() =>
			searchedTerms.filter(
				( term ) => ! selectedTermIds.includes( term.id )
			),
		[ searchedTerms, selectedTermIds ]
	);

	if ( ! showCategories && ! showTags ) {
		return null;
	}

	const addTerm = ( id ) => {
		if ( selectedTermIds.includes( id ) ) {
			return;
		}
		onChange( [ ...selectedTermIds, id ] );
	};

	const removeTerm = ( id ) => {
		onChange( selectedTermIds.filter( ( termId ) => termId !== id ) );
	};

	const clearAll = () => onChange( [] );

	const typeLabel = ( taxonomy ) =>
		taxonomy === 'post_tag'
			? __( 'Tag', 'gutenberg-lab' )
			: __( 'Category', 'gutenberg-lab' );

	return (
		<div className="lab-post-cards__term-allowlist">
			<p className="lab-post-cards__help">
				{ __(
					'Optional allowlist for both categories and tags. Leave empty to show all assigned terms. Add terms like “Featured” to show only those badges when a post has them.',
					'gutenberg-lab'
				) }
			</p>
			<SearchControl
				label={ __( 'Search categories and tags', 'gutenberg-lab' ) }
				value={ termSearch }
				onChange={ setTermSearch }
				placeholder={ __( 'Type to find a term…', 'gutenberg-lab' ) }
				__nextHasNoMarginBottom
			/>

			{ isSearching && (
				<div className="lab-post-cards__search-status">
					<Spinner />
				</div>
			) }

			{ ! isSearching && searchResults.length > 0 && (
				<ul className="lab-post-cards__search-results">
					{ searchResults.map( ( term ) => {
						const name = decodeEntities( term.name || '' );
						return (
							<li key={ `${ term.taxonomy }-${ term.id }` }>
								<span
									className="lab-post-cards__result-title"
									title={ name }
								>
									{ name }{ ' ' }
									<span className="lab-post-cards__term-type">
										({ typeLabel( term.taxonomy ) })
									</span>
								</span>
								<Button
									variant="secondary"
									size="small"
									onClick={ () => addTerm( term.id ) }
								>
									{ __( 'Add', 'gutenberg-lab' ) }
								</Button>
							</li>
						);
					} ) }
				</ul>
			) }

			{ mappedTerms.length > 0 && (
				<>
					<div className="lab-post-cards__mapped-header">
						<strong>
							{ __( 'Show only these terms', 'gutenberg-lab' ) }{ ' ' }
							({ mappedTerms.length })
						</strong>
						<Button
							variant="link"
							isDestructive
							onClick={ clearAll }
						>
							{ __( 'Clear', 'gutenberg-lab' ) }
						</Button>
					</div>
					<ul className="lab-post-cards__mapped-list">
						{ mappedTerms.map( ( term ) => (
							<li key={ term.id }>
								<span
									className="lab-post-cards__mapped-title"
									title={ term.name }
								>
									{ term.name }{ ' ' }
									<span className="lab-post-cards__term-type">
										({ typeLabel( term.taxonomy ) })
									</span>
								</span>
								<Button
									size="small"
									variant="tertiary"
									isDestructive
									onClick={ () => removeTerm( term.id ) }
								>
									{ __( 'Remove', 'gutenberg-lab' ) }
								</Button>
							</li>
						) ) }
					</ul>
				</>
			) }
		</div>
	);
}
