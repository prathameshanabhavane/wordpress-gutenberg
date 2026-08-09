/**
 * Lab Post Cards — query or search-map posts into card UI.
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
	SearchControl,
	Button,
	Spinner,
	Notice,
	ToggleControl,
	CheckboxControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useMemo, useState } from '@wordpress/element';
import PostCardPreview from './post-card-preview';
import TermAllowlistControl from './term-allowlist-control';
import { getPostTitle } from './utils';
import './editor.scss';

/**
 * @param {Object}   props
 * @param {Object}   props.attributes
 * @param {Function} props.setAttributes
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		columns,
		postsToShow,
		orderBy,
		order,
		search,
		categoryId,
		tagId,
		selectedPostIds = [],
		ctaText,
		showCta = true,
		showTerms = false,
		showCategories = true,
		showTags = true,
		maxTerms = 3,
		selectedTermIds = [],
		excerptLines,
		source = 'query',
	} = attributes;

	const isManual = source === 'manual';
	const [ postSearch, setPostSearch ] = useState( '' );

	const {
		categories,
		tags,
		posts,
		searchedPosts,
		selectedPosts,
		isResolving,
		isSearching,
	} = useSelect(
		( select ) => {
			const { getEntityRecords, isResolving: storeIsResolving } =
				select( 'core' );

			const query = {
				per_page: postsToShow,
				orderby: orderBy,
				order,
				_embed: true,
				status: 'publish',
			};

			if ( isManual && selectedPostIds.length ) {
				query.include = selectedPostIds;
				query.orderby = 'include';
				query.per_page = selectedPostIds.length;
			} else if ( ! isManual ) {
				if ( search ) {
					query.search = search;
				}
				if ( categoryId ) {
					query.categories = [ categoryId ];
				}
				if ( tagId ) {
					query.tags = [ tagId ];
				}
			} else {
				query.include = [ 0 ];
				query.per_page = 1;
			}

			const searchQuery = {
				per_page: 12,
				status: 'publish',
				_fields: [ 'id', 'title' ],
			};
			if ( postSearch ) {
				searchQuery.search = postSearch;
			}

			const selectedQuery = {
				include: selectedPostIds.length ? selectedPostIds : [ 0 ],
				per_page: selectedPostIds.length || 1,
				orderby: 'include',
				_fields: [ 'id', 'title' ],
				status: 'publish',
			};

			return {
				categories:
					getEntityRecords( 'taxonomy', 'category', {
						per_page: 100,
						hide_empty: false,
					} ) || [],
				tags:
					getEntityRecords( 'taxonomy', 'post_tag', {
						per_page: 100,
						hide_empty: false,
					} ) || [],
				posts:
					isManual && ! selectedPostIds.length
						? []
						: getEntityRecords( 'postType', 'post', query ),
				searchedPosts:
					getEntityRecords( 'postType', 'post', searchQuery ) || [],
				selectedPosts: selectedPostIds.length
					? getEntityRecords( 'postType', 'post', selectedQuery ) ||
					  []
					: [],
				isResolving:
					isManual && ! selectedPostIds.length
						? false
						: storeIsResolving( 'getEntityRecords', [
								'postType',
								'post',
								query,
						  ] ),
				isSearching: storeIsResolving( 'getEntityRecords', [
					'postType',
					'post',
					searchQuery,
				] ),
			};
		},
		[
			postsToShow,
			orderBy,
			order,
			search,
			categoryId,
			tagId,
			selectedPostIds,
			postSearch,
			isManual,
		]
	);

	const categoryOptions = useMemo(
		() => [
			{ label: __( 'All categories', 'gutenberg-lab' ), value: '0' },
			...( categories || [] ).map( ( term ) => ( {
				label: term.name,
				value: String( term.id ),
			} ) ),
		],
		[ categories ]
	);

	const tagOptions = useMemo(
		() => [
			{ label: __( 'All tags', 'gutenberg-lab' ), value: '0' },
			...( tags || [] ).map( ( term ) => ( {
				label: term.name,
				value: String( term.id ),
			} ) ),
		],
		[ tags ]
	);

	const idToTitle = useMemo( () => {
		const map = {};
		[
			...( selectedPosts || [] ),
			...( posts || [] ),
			...( searchedPosts || [] ),
		].forEach( ( post ) => {
			map[ post.id ] = getPostTitle( post ) || `#${ post.id }`;
		} );
		return map;
	}, [ selectedPosts, posts, searchedPosts ] );

	const mappedPosts = useMemo(
		() =>
			( selectedPostIds || [] ).map( ( id ) => ( {
				id,
				title: idToTitle[ id ] || `#${ id }`,
			} ) ),
		[ selectedPostIds, idToTitle ]
	);

	const searchResults = useMemo(
		() =>
			( searchedPosts || [] ).filter(
				( post ) => ! selectedPostIds.includes( post.id )
			),
		[ searchedPosts, selectedPostIds ]
	);

	const addPost = ( id ) => {
		if ( selectedPostIds.includes( id ) ) {
			return;
		}
		setAttributes( {
			source: 'manual',
			selectedPostIds: [ ...selectedPostIds, id ],
		} );
	};

	const removePost = ( id ) => {
		setAttributes( {
			selectedPostIds: selectedPostIds.filter(
				( postId ) => postId !== id
			),
		} );
	};

	const movePost = ( id, direction ) => {
		const index = selectedPostIds.indexOf( id );
		if ( index < 0 ) {
			return;
		}
		const next = index + direction;
		if ( next < 0 || next >= selectedPostIds.length ) {
			return;
		}
		const ids = [ ...selectedPostIds ];
		[ ids[ index ], ids[ next ] ] = [ ids[ next ], ids[ index ] ];
		setAttributes( { selectedPostIds: ids } );
	};

	const clearMapped = () => {
		setAttributes( { selectedPostIds: [] } );
	};

	const blockProps = useBlockProps( {
		className: `lab-post-cards lab-cards lab-cards--columns-${ columns }`,
		style: {
			'--lab-post-card-excerpt-lines': String( excerptLines || 3 ),
		},
	} );

	const list = isManual
		? ( posts || [] ).slice().sort( ( a, b ) => {
				return (
					selectedPostIds.indexOf( a.id ) -
					selectedPostIds.indexOf( b.id )
				);
		  } )
		: posts || [];

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Content source', 'gutenberg-lab' ) }
					initialOpen={ true }
				>
					<ToggleGroupControl
						label={ __( 'How to fill cards', 'gutenberg-lab' ) }
						value={ source }
						onChange={ ( value ) =>
							setAttributes( { source: value } )
						}
						isBlock
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					>
						<ToggleGroupControlOption
							value="query"
							label={ __( 'Query', 'gutenberg-lab' ) }
						/>
						<ToggleGroupControlOption
							value="manual"
							label={ __( 'Search & map', 'gutenberg-lab' ) }
						/>
					</ToggleGroupControl>
					<p className="lab-post-cards__help">
						{ isManual
							? __(
									'Search posts and add them to this block. Order is preserved.',
									'gutenberg-lab'
							  )
							: __(
									'Automatically load posts by keyword, category, or tag.',
									'gutenberg-lab'
							  ) }
					</p>
				</PanelBody>

				{ isManual ? (
					<PanelBody
						title={ __( 'Map posts', 'gutenberg-lab' ) }
						initialOpen={ true }
					>
						<SearchControl
							label={ __( 'Search posts', 'gutenberg-lab' ) }
							value={ postSearch }
							onChange={ setPostSearch }
							placeholder={ __(
								'Type to find posts…',
								'gutenberg-lab'
							) }
							__nextHasNoMarginBottom
						/>

						{ isSearching && (
							<div className="lab-post-cards__search-status">
								<Spinner />
							</div>
						) }

						{ ! isSearching && searchResults.length > 0 && (
							<ul className="lab-post-cards__search-results">
								{ searchResults.map( ( post ) => {
									const title =
										getPostTitle( post ) ||
										`#${ post.id }`;
									return (
										<li key={ post.id }>
											<span
												className="lab-post-cards__result-title"
												title={ title }
											>
												{ title }
											</span>
											<Button
												variant="secondary"
												size="small"
												onClick={ () =>
													addPost( post.id )
												}
											>
												{ __( 'Add', 'gutenberg-lab' ) }
											</Button>
										</li>
									);
								} ) }
							</ul>
						) }

						{ ! isSearching &&
							postSearch &&
							searchResults.length === 0 && (
								<p className="lab-post-cards__help">
									{ __(
										'No matching posts. Try another keyword.',
										'gutenberg-lab'
									) }
								</p>
							) }

						{ mappedPosts.length > 0 && (
							<>
								<div className="lab-post-cards__mapped-header">
									<strong>
										{ __(
											'Mapped posts',
											'gutenberg-lab'
										) }{ ' ' }
										({ mappedPosts.length })
									</strong>
									<Button
										variant="link"
										isDestructive
										onClick={ clearMapped }
									>
										{ __( 'Clear all', 'gutenberg-lab' ) }
									</Button>
								</div>
								<ul className="lab-post-cards__mapped-list">
									{ mappedPosts.map( ( item, index ) => (
										<li key={ item.id }>
											<span
												className="lab-post-cards__mapped-title"
												title={ item.title }
											>
												{ item.title }
											</span>
											<div className="lab-post-cards__mapped-actions">
												<Button
													size="small"
													variant="tertiary"
													disabled={ index === 0 }
													onClick={ () =>
														movePost( item.id, -1 )
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
														mappedPosts.length - 1
													}
													onClick={ () =>
														movePost( item.id, 1 )
													}
													label={ __(
														'Move down',
														'gutenberg-lab'
													) }
													showTooltip
												>
													↓
												</Button>
												<Button
													size="small"
													variant="tertiary"
													isDestructive
													onClick={ () =>
														removePost( item.id )
													}
												>
													{ __(
														'Remove',
														'gutenberg-lab'
													) }
												</Button>
											</div>
										</li>
									) ) }
								</ul>
							</>
						) }
					</PanelBody>
				) : (
					<PanelBody
						title={ __( 'Query', 'gutenberg-lab' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Search posts', 'gutenberg-lab' ) }
							value={ search }
							onChange={ ( value ) =>
								setAttributes( { search: value } )
							}
							placeholder={ __( 'Keyword…', 'gutenberg-lab' ) }
							help={ __(
								'Leave empty for latest posts.',
								'gutenberg-lab'
							) }
						/>
						<SelectControl
							label={ __( 'Category', 'gutenberg-lab' ) }
							value={ String( categoryId || 0 ) }
							options={ categoryOptions }
							onChange={ ( value ) =>
								setAttributes( {
									categoryId: parseInt( value, 10 ) || 0,
								} )
							}
						/>
						<SelectControl
							label={ __( 'Tag', 'gutenberg-lab' ) }
							value={ String( tagId || 0 ) }
							options={ tagOptions }
							onChange={ ( value ) =>
								setAttributes( {
									tagId: parseInt( value, 10 ) || 0,
								} )
							}
						/>
						<RangeControl
							label={ __( 'Number of posts', 'gutenberg-lab' ) }
							value={ postsToShow }
							onChange={ ( value ) =>
								setAttributes( { postsToShow: value } )
							}
							min={ 1 }
							max={ 24 }
						/>
						<SelectControl
							label={ __( 'Order by', 'gutenberg-lab' ) }
							value={ orderBy }
							options={ [
								{
									label: __( 'Date', 'gutenberg-lab' ),
									value: 'date',
								},
								{
									label: __( 'Title', 'gutenberg-lab' ),
									value: 'title',
								},
								{
									label: __( 'Modified', 'gutenberg-lab' ),
									value: 'modified',
								},
							] }
							onChange={ ( value ) =>
								setAttributes( { orderBy: value } )
							}
						/>
						<SelectControl
							label={ __( 'Order', 'gutenberg-lab' ) }
							value={ order }
							options={ [
								{
									label: __( 'Descending', 'gutenberg-lab' ),
									value: 'desc',
								},
								{
									label: __( 'Ascending', 'gutenberg-lab' ),
									value: 'asc',
								},
							] }
							onChange={ ( value ) =>
								setAttributes( { order: value } )
							}
						/>
					</PanelBody>
				) }

				<PanelBody
					title={ __( 'Card content', 'gutenberg-lab' ) }
					initialOpen={ true }
				>
					<div className="lab-post-cards__panel-section">
						<ToggleControl
							label={ __( 'Show terms', 'gutenberg-lab' ) }
							help={ __(
								'Off by default. When on, cards can show category and tag badges. Each card only shows terms assigned to that post.',
								'gutenberg-lab'
							) }
							checked={ !! showTerms }
							onChange={ ( value ) =>
								setAttributes( { showTerms: value } )
							}
						/>
						{ showTerms && (
							<div className="lab-post-cards__panel-stack">
								<CheckboxControl
									label={ __(
										'Categories',
										'gutenberg-lab'
									) }
									checked={ !! showCategories }
									onChange={ ( value ) =>
										setAttributes( {
											showCategories: value,
										} )
									}
								/>
								<CheckboxControl
									label={ __( 'Tags', 'gutenberg-lab' ) }
									checked={ !! showTags }
									onChange={ ( value ) =>
										setAttributes( { showTags: value } )
									}
								/>
								<RangeControl
									label={ __(
										'Max terms per type',
										'gutenberg-lab'
									) }
									value={ maxTerms }
									onChange={ ( value ) =>
										setAttributes( { maxTerms: value } )
									}
									min={ 1 }
									max={ 10 }
									help={ __(
										'Maximum category or tag badges shown on each card.',
										'gutenberg-lab'
									) }
								/>
								<TermAllowlistControl
									value={ selectedTermIds }
									onChange={ ( ids ) =>
										setAttributes( {
											selectedTermIds: ids,
										} )
									}
									showCategories={ showCategories }
									showTags={ showTags }
								/>
							</div>
						) }
					</div>

					<div className="lab-post-cards__panel-section lab-post-cards__panel-section--cta">
						<ToggleControl
							label={ __( 'Show CTA button', 'gutenberg-lab' ) }
							checked={ !! showCta }
							onChange={ ( value ) =>
								setAttributes( { showCta: value } )
							}
						/>
						{ showCta && (
							<div className="lab-post-cards__panel-stack">
								<TextControl
									label={ __( 'CTA text', 'gutenberg-lab' ) }
									value={ ctaText }
									onChange={ ( value ) =>
										setAttributes( { ctaText: value } )
									}
								/>
							</div>
						) }
					</div>
				</PanelBody>

				<PanelBody title={ __( 'Layout', 'gutenberg-lab' ) }>
					<RangeControl
						label={ __( 'Columns', 'gutenberg-lab' ) }
						value={ columns }
						onChange={ ( value ) =>
							setAttributes( { columns: value } )
						}
						min={ 1 }
						max={ 4 }
					/>
					<RangeControl
						label={ __( 'Excerpt lines', 'gutenberg-lab' ) }
						value={ excerptLines }
						onChange={ ( value ) =>
							setAttributes( { excerptLines: value } )
						}
						min={ 1 }
						max={ 12 }
						help={ __(
							'Clamp description text with an ellipsis after this many lines.',
							'gutenberg-lab'
						) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ isResolving && (
					<div className="lab-post-cards__loading">
						<Spinner />
					</div>
				) }
				{ ! isResolving && list.length === 0 && (
					<Notice status="info" isDismissible={ false }>
						{ isManual
							? __(
									'Search and add posts in the sidebar to map them into cards.',
									'gutenberg-lab'
							  )
							: __(
									'No posts found. Adjust search, category, or tag.',
									'gutenberg-lab'
							  ) }
					</Notice>
				) }
				<div className="lab-cards__grid">
					{ list.map( ( post ) => (
						<PostCardPreview
							key={ post.id }
							post={ post }
							showCta={ showCta }
							ctaText={ ctaText }
							showTerms={ showTerms }
							showCategories={ showCategories }
							showTags={ showTags }
							maxTerms={ maxTerms }
							selectedTermIds={ selectedTermIds }
						/>
					) ) }
				</div>
			</div>
		</>
	);
}
