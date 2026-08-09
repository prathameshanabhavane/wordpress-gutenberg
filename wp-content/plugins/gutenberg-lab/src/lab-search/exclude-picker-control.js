/**
 * Pick posts/pages/terms to exclude from Lab Search results.
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
 * @param {Object} item
 * @return {string}
 */
function itemKey( item ) {
	return `${ item.kind }:${ item.id }`;
}

/**
 * @param {Object}   props
 * @param {number[]} props.excludedPostIds
 * @param {number[]} props.excludedTermIds
 * @param {Function} props.onChangePosts
 * @param {Function} props.onChangeTerms
 * @param {string[]} props.postTypes      Active post type targets (custom scope)
 * @param {string[]} props.taxonomies     Active taxonomy targets
 * @param {string}   props.scope
 * @return {Element}
 */
export default function ExcludePickerControl( {
	excludedPostIds = [],
	excludedTermIds = [],
	onChangePosts,
	onChangeTerms,
	postTypes = [],
	taxonomies = [],
	scope = 'default',
} ) {
	const [ search, setSearch ] = useState( '' );

	const searchPostTypes =
		scope === 'custom' && postTypes.length
			? postTypes
			: [ 'post', 'page' ];

	const searchTaxonomies =
		scope === 'custom' && taxonomies.length
			? taxonomies
			: [ 'category', 'post_tag' ];

	const { suggestions, selectedPosts, selectedTerms, isSearching } =
		useSelect(
			( select ) => {
				const { getEntityRecords, isResolving } = select( 'core' );
				const found = [];
				let resolving = false;

				const postQuery = {
					per_page: 8,
					status: 'publish',
					_fields: [ 'id', 'title', 'type' ],
				};
				if ( search ) {
					postQuery.search = search;
				}

				searchPostTypes.forEach( ( type ) => {
					const rows =
						getEntityRecords( 'postType', type, postQuery ) || [];
					resolving =
						resolving ||
						isResolving( 'getEntityRecords', [
							'postType',
							type,
							postQuery,
						] );
					rows.forEach( ( post ) => {
						found.push( {
							kind: 'post',
							id: post.id,
							title:
								decodeEntities(
									post.title?.rendered?.replace(
										/<[^>]+>/g,
										''
									) || ''
								) || `#${ post.id }`,
							typeLabel: type,
						} );
					} );
				} );

				const termQuery = {
					per_page: 8,
					hide_empty: false,
					_fields: [ 'id', 'name' ],
				};
				if ( search ) {
					termQuery.search = search;
				}

				searchTaxonomies.forEach( ( taxonomy ) => {
					const rows =
						getEntityRecords( 'taxonomy', taxonomy, termQuery ) ||
						[];
					resolving =
						resolving ||
						isResolving( 'getEntityRecords', [
							'taxonomy',
							taxonomy,
							termQuery,
						] );
					rows.forEach( ( term ) => {
						found.push( {
							kind: 'term',
							id: term.id,
							title: decodeEntities( term.name || '' ),
							typeLabel: taxonomy,
						} );
					} );
				} );

				const selectedP = [];
				if ( excludedPostIds.length ) {
					searchPostTypes.forEach( ( type ) => {
						const rows =
							getEntityRecords( 'postType', type, {
								include: excludedPostIds,
								per_page: excludedPostIds.length,
								status: 'publish',
								_fields: [ 'id', 'title', 'type' ],
							} ) || [];
						rows.forEach( ( post ) => {
							if ( ! selectedP.some( ( p ) => p.id === post.id ) ) {
								selectedP.push( post );
							}
						} );
					} );
				}

				const selectedT = [];
				if ( excludedTermIds.length ) {
					[ ...new Set( [ 'category', 'post_tag', ...searchTaxonomies ] ) ].forEach(
						( taxonomy ) => {
							const rows =
								getEntityRecords( 'taxonomy', taxonomy, {
									include: excludedTermIds,
									per_page: excludedTermIds.length,
									hide_empty: false,
									_fields: [ 'id', 'name' ],
								} ) || [];
							rows.forEach( ( term ) => {
								if (
									! selectedT.some( ( t ) => t.id === term.id )
								) {
									selectedT.push( {
										id: term.id,
										title: decodeEntities( term.name || '' ),
										typeLabel: taxonomy,
									} );
								}
							} );
						}
					);
				}

				return {
					suggestions: found,
					selectedPosts: selectedP,
					selectedTerms: selectedT,
					isSearching: resolving,
				};
			},
			[
				search,
				searchPostTypes.join( ',' ),
				searchTaxonomies.join( ',' ),
				excludedPostIds.join( ',' ),
				excludedTermIds.join( ',' ),
			]
		);

	const selectedMap = useMemo( () => {
		const map = {};
		( selectedPosts || [] ).forEach( ( post ) => {
			map[ `post:${ post.id }` ] = {
				kind: 'post',
				id: post.id,
				title:
					decodeEntities(
						post.title?.rendered?.replace( /<[^>]+>/g, '' ) || ''
					) || `#${ post.id }`,
				typeLabel: post.type || 'post',
			};
		} );
		( selectedTerms || [] ).forEach( ( term ) => {
			map[ `term:${ term.id }` ] = {
				kind: 'term',
				id: term.id,
				title: term.title,
				typeLabel: term.typeLabel || 'term',
			};
		} );
		excludedPostIds.forEach( ( id ) => {
			if ( ! map[ `post:${ id }` ] ) {
				map[ `post:${ id }` ] = {
					kind: 'post',
					id,
					title: `#${ id }`,
					typeLabel: 'post',
				};
			}
		} );
		excludedTermIds.forEach( ( id ) => {
			if ( ! map[ `term:${ id }` ] ) {
				map[ `term:${ id }` ] = {
					kind: 'term',
					id,
					title: `#${ id }`,
					typeLabel: 'term',
				};
			}
		} );
		return map;
	}, [ selectedPosts, selectedTerms, excludedPostIds, excludedTermIds ] );

	const mapped = useMemo(
		() => [
			...excludedPostIds.map( ( id ) => selectedMap[ `post:${ id }` ] ),
			...excludedTermIds.map( ( id ) => selectedMap[ `term:${ id }` ] ),
		].filter( Boolean ),
		[ excludedPostIds, excludedTermIds, selectedMap ]
	);

	const available = useMemo(
		() =>
			( suggestions || [] ).filter( ( item ) => {
				if ( item.kind === 'post' ) {
					return ! excludedPostIds.includes( item.id );
				}
				return ! excludedTermIds.includes( item.id );
			} ),
		[ suggestions, excludedPostIds, excludedTermIds ]
	);

	const addItem = ( item ) => {
		if ( item.kind === 'post' ) {
			if ( excludedPostIds.includes( item.id ) ) {
				return;
			}
			onChangePosts( [ ...excludedPostIds, item.id ] );
			return;
		}
		if ( excludedTermIds.includes( item.id ) ) {
			return;
		}
		onChangeTerms( [ ...excludedTermIds, item.id ] );
	};

	const removeItem = ( item ) => {
		if ( item.kind === 'post' ) {
			onChangePosts( excludedPostIds.filter( ( id ) => id !== item.id ) );
			return;
		}
		onChangeTerms( excludedTermIds.filter( ( id ) => id !== item.id ) );
	};

	const typeLabel = ( slug ) => {
		if ( slug === 'post_tag' ) {
			return __( 'Tag', 'gutenberg-lab' );
		}
		if ( slug === 'category' ) {
			return __( 'Category', 'gutenberg-lab' );
		}
		return String( slug || '' )
			.replace( /_/g, ' ' )
			.replace( /\b\w/g, ( c ) => c.toUpperCase() );
	};

	return (
		<div className="lab-search__exclude">
			<p className="lab-search__help">
				{ __(
					'Optional: pick posts, pages, or terms that should never appear in search results.',
					'gutenberg-lab'
				) }
			</p>
			<SearchControl
				label={ __( 'Find items to exclude', 'gutenberg-lab' ) }
				value={ search }
				onChange={ setSearch }
				placeholder={ __( 'Search…', 'gutenberg-lab' ) }
				__nextHasNoMarginBottom
			/>

			{ isSearching && (
				<div className="lab-search__exclude-status">
					<Spinner />
				</div>
			) }

			{ ! isSearching && available.length > 0 && (
				<ul className="lab-search__exclude-list">
					{ available.map( ( item ) => (
						<li key={ itemKey( item ) }>
							<span className="lab-search__exclude-title">
								{ item.title }{ ' ' }
								<span className="lab-search__exclude-type">
									({ typeLabel( item.typeLabel ) })
								</span>
							</span>
							<Button
								variant="secondary"
								size="small"
								onClick={ () => addItem( item ) }
							>
								{ __( 'Exclude', 'gutenberg-lab' ) }
							</Button>
						</li>
					) ) }
				</ul>
			) }

			{ mapped.length > 0 && (
				<>
					<div className="lab-search__exclude-header">
						<strong>
							{ __( 'Excluded', 'gutenberg-lab' ) } ({ mapped.length })
						</strong>
						<Button
							variant="link"
							isDestructive
							onClick={ () => {
								onChangePosts( [] );
								onChangeTerms( [] );
							} }
						>
							{ __( 'Clear all', 'gutenberg-lab' ) }
						</Button>
					</div>
					<ul className="lab-search__exclude-list">
						{ mapped.map( ( item ) => (
							<li key={ itemKey( item ) }>
								<span className="lab-search__exclude-title">
									{ item.title }{ ' ' }
									<span className="lab-search__exclude-type">
										({ typeLabel( item.typeLabel ) })
									</span>
								</span>
								<Button
									variant="tertiary"
									size="small"
									isDestructive
									onClick={ () => removeItem( item ) }
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
