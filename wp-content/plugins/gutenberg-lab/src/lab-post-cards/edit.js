/**
 * Lab Post Cards — query posts and preview mapped card UI.
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
	FormTokenField,
	Spinner,
	Notice,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useMemo, useState } from '@wordpress/element';
import { decodeEntities } from '@wordpress/html-entities';
import './editor.scss';

/**
 * @param {Object} post
 * @return {string} Plain title.
 */
function getPostTitle( post ) {
	return decodeEntities(
		post?.title?.rendered?.replace( /<[^>]+>/g, '' ) || ''
	);
}

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
		selectedPostIds,
		ctaText,
		excerptLines,
	} = attributes;

	const [ postSearch, setPostSearch ] = useState( '' );

	const {
		categories,
		tags,
		posts,
		searchedPosts,
		selectedPosts,
		isResolving,
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

			if ( selectedPostIds?.length ) {
				query.include = selectedPostIds;
				query.orderby = 'include';
				query.per_page = selectedPostIds.length;
			} else {
				if ( search ) {
					query.search = search;
				}
				if ( categoryId ) {
					query.categories = [ categoryId ];
				}
				if ( tagId ) {
					query.tags = [ tagId ];
				}
			}

			const searchQuery = {
				per_page: 20,
				status: 'publish',
				_fields: [ 'id', 'title' ],
			};
			if ( postSearch ) {
				searchQuery.search = postSearch;
			}

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
				posts: getEntityRecords( 'postType', 'post', query ),
				searchedPosts:
					getEntityRecords( 'postType', 'post', searchQuery ) || [],
				selectedPosts: selectedPostIds?.length
					? getEntityRecords( 'postType', 'post', {
							include: selectedPostIds,
							per_page: selectedPostIds.length,
							_fields: [ 'id', 'title' ],
							status: 'publish',
					  } ) || []
					: [],
				isResolving: storeIsResolving( 'getEntityRecords', [
					'postType',
					'post',
					query,
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

	const titleToId = useMemo( () => {
		const map = {};
		[ ...( searchedPosts || [] ), ...( selectedPosts || [] ), ...( posts || [] ) ].forEach(
			( post ) => {
				const title = getPostTitle( post );
				if ( title ) {
					map[ title ] = post.id;
				}
			}
		);
		return map;
	}, [ searchedPosts, selectedPosts, posts ] );

	const idToTitle = useMemo( () => {
		const map = {};
		[ ...( selectedPosts || [] ), ...( posts || [] ), ...( searchedPosts || [] ) ].forEach(
			( post ) => {
				map[ post.id ] = getPostTitle( post ) || `#${ post.id }`;
			}
		);
		return map;
	}, [ selectedPosts, posts, searchedPosts ] );

	const postSuggestions = useMemo(
		() =>
			( searchedPosts || [] )
				.map( ( post ) => getPostTitle( post ) )
				.filter( Boolean ),
		[ searchedPosts ]
	);

	const selectedPostTitles = useMemo(
		() =>
			( selectedPostIds || [] ).map(
				( id ) => idToTitle[ id ] || `#${ id }`
			),
		[ selectedPostIds, idToTitle ]
	);

	const onChangeSelectedPosts = ( tokens ) => {
		const nextIds = tokens
			.map( ( token ) => titleToId[ token ] )
			.filter( Boolean );
		setAttributes( { selectedPostIds: nextIds } );
	};

	const blockProps = useBlockProps( {
		className: `lab-post-cards lab-cards lab-cards--columns-${ columns }`,
		style: {
			'--lab-post-card-excerpt-lines': String( excerptLines || 3 ),
		},
	} );

	const list = posts || [];

	return (
		<>
			<InspectorControls>
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
							'Leave empty for latest posts. Ignored if you pick specific posts below.',
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

				<PanelBody
					title={ __( 'Pick specific posts', 'gutenberg-lab' ) }
					initialOpen={ false }
				>
					<FormTokenField
						label={ __( 'Posts', 'gutenberg-lab' ) }
						value={ selectedPostTitles }
						suggestions={ postSuggestions }
						onInputChange={ setPostSearch }
						onChange={ onChangeSelectedPosts }
						placeholder={ __(
							'Search and add posts…',
							'gutenberg-lab'
						) }
						__experimentalExpandOnFocus
					/>
					<p className="lab-post-cards__help">
						{ __(
							'When posts are selected here, category/tag/search filters are ignored.',
							'gutenberg-lab'
						) }
					</p>
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
					<TextControl
						label={ __( 'CTA text', 'gutenberg-lab' ) }
						value={ ctaText }
						onChange={ ( value ) =>
							setAttributes( { ctaText: value } )
						}
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
						{ __(
							'No posts found. Adjust search, category, tag, or pick posts.',
							'gutenberg-lab'
						) }
					</Notice>
				) }
				<div className="lab-cards__grid">
					{ list.map( ( post ) => {
						const title =
							getPostTitle( post ) ||
							__( '(no title)', 'gutenberg-lab' );
						const excerpt = decodeEntities(
							post.excerpt?.rendered?.replace( /<[^>]+>/g, '' ) ||
								''
						);
						const image =
							post._embedded?.[ 'wp:featuredmedia' ]?.[ 0 ]
								?.source_url || '';
						const link = post.link || '#';

						return (
							<article
								key={ post.id }
								className="lab-card lab-post-card"
							>
								{ image ? (
									<div className="lab-card__media">
										<img
											className="lab-card__image"
											src={ image }
											alt={ title }
										/>
									</div>
								) : null }
								<div className="lab-card__body">
									<h3 className="lab-card__title">{ title }</h3>
									{ excerpt ? (
										<div className="lab-card__description">
											<p>{ excerpt }</p>
										</div>
									) : null }
									<p className="lab-card__cta-wrap">
										<span className="lab-card__cta">
											{ ctaText ||
												__( 'Read more', 'gutenberg-lab' ) }
										</span>
									</p>
								</div>
							</article>
						);
					} ) }
				</div>
			</div>
		</>
	);
}
