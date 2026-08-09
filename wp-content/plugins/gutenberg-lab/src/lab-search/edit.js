/**
 * Lab Search — editor UI.
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	RangeControl,
	CheckboxControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import ExcludePickerControl from './exclude-picker-control';
import './editor.scss';

const SCOPE_DEFAULT = 'default';
const SCOPE_CUSTOM = 'custom';

/**
 * @param {Object}   props
 * @param {Object}   props.attributes
 * @param {Function} props.setAttributes
 * @return {Element}
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		label,
		showLabel,
		placeholder,
		buttonText,
		scope = SCOPE_DEFAULT,
		postTypes = [],
		taxonomies = [],
		liveResults = true,
		resultsMode = 'limited',
		resultsLimit = 8,
		excludedPostIds = [],
		excludedTermIds = [],
	} = attributes;

	const { availablePostTypes, availableTaxonomies } = useSelect(
		( select ) => {
			const { getPostTypes, getTaxonomies } = select( 'core' );
			return {
				availablePostTypes:
					getPostTypes( { per_page: -1 } )?.filter(
						( type ) => type.viewable && type.slug !== 'attachment'
					) || [],
				availableTaxonomies:
					getTaxonomies( { per_page: -1 } )?.filter(
						( tax ) => tax.visibility?.public
					) || [],
			};
		},
		[]
	);

	const postTypeOptions = useMemo(
		() =>
			availablePostTypes.map( ( type ) => ( {
				slug: type.slug,
				label: type.labels?.singular_name || type.name,
			} ) ),
		[ availablePostTypes ]
	);

	const taxonomyOptions = useMemo(
		() =>
			availableTaxonomies.map( ( tax ) => ( {
				slug: tax.slug,
				label: tax.labels?.singular_name || tax.name,
			} ) ),
		[ availableTaxonomies ]
	);

	const toggleInList = ( list, slug, checked ) => {
		const next = new Set( list || [] );
		if ( checked ) {
			next.add( slug );
		} else {
			next.delete( slug );
		}
		return [ ...next ];
	};

	const blockProps = useBlockProps( {
		className: 'lab-search',
	} );

	const isCustom = scope === SCOPE_CUSTOM;

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Search targets', 'gutenberg-lab' ) }
					initialOpen={ true }
				>
					<ToggleGroupControl
						label={ __( 'Scope', 'gutenberg-lab' ) }
						value={ scope }
						onChange={ ( value ) =>
							setAttributes( { scope: value } )
						}
						isBlock
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					>
						<ToggleGroupControlOption
							value={ SCOPE_DEFAULT }
							label={ __( 'Default', 'gutenberg-lab' ) }
						/>
						<ToggleGroupControlOption
							value={ SCOPE_CUSTOM }
							label={ __( 'Custom', 'gutenberg-lab' ) }
						/>
					</ToggleGroupControl>
					<p className="lab-search__help">
						{ isCustom
							? __(
									'Pick post types and taxonomies to search. Custom post types and taxonomies appear here when registered.',
									'gutenberg-lab'
							  )
							: __(
									'Uses WordPress default search (all content that is searchable).',
									'gutenberg-lab'
							  ) }
					</p>

					{ isCustom && (
						<div className="lab-search__targets">
							<strong className="lab-search__targets-title">
								{ __( 'Post types', 'gutenberg-lab' ) }
							</strong>
							{ postTypeOptions.map( ( option ) => (
								<CheckboxControl
									key={ option.slug }
									label={ option.label }
									checked={ postTypes.includes(
										option.slug
									) }
									onChange={ ( checked ) =>
										setAttributes( {
											postTypes: toggleInList(
												postTypes,
												option.slug,
												checked
											),
										} )
									}
								/>
							) ) }

							<strong className="lab-search__targets-title">
								{ __( 'Taxonomies', 'gutenberg-lab' ) }
							</strong>
							{ taxonomyOptions.map( ( option ) => (
								<CheckboxControl
									key={ option.slug }
									label={ option.label }
									checked={ taxonomies.includes(
										option.slug
									) }
									onChange={ ( checked ) =>
										setAttributes( {
											taxonomies: toggleInList(
												taxonomies,
												option.slug,
												checked
											),
										} )
									}
								/>
							) ) }
						</div>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Form', 'gutenberg-lab' ) }
					initialOpen={ true }
				>
					<ToggleControl
						label={ __( 'Show label', 'gutenberg-lab' ) }
						checked={ !! showLabel }
						onChange={ ( value ) =>
							setAttributes( { showLabel: value } )
						}
					/>
					{ showLabel && (
						<TextControl
							label={ __( 'Label', 'gutenberg-lab' ) }
							value={ label }
							onChange={ ( value ) =>
								setAttributes( { label: value } )
							}
						/>
					) }
					<TextControl
						label={ __( 'Placeholder', 'gutenberg-lab' ) }
						value={ placeholder }
						onChange={ ( value ) =>
							setAttributes( { placeholder: value } )
						}
					/>
					<TextControl
						label={ __( 'Button text', 'gutenberg-lab' ) }
						value={ buttonText }
						onChange={ ( value ) =>
							setAttributes( { buttonText: value } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Exclude from results', 'gutenberg-lab' ) }
					initialOpen={ false }
				>
					<ExcludePickerControl
						excludedPostIds={ excludedPostIds }
						excludedTermIds={ excludedTermIds }
						onChangePosts={ ( ids ) =>
							setAttributes( { excludedPostIds: ids } )
						}
						onChangeTerms={ ( ids ) =>
							setAttributes( { excludedTermIds: ids } )
						}
						postTypes={ postTypes }
						taxonomies={ taxonomies }
						scope={ scope }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Live results', 'gutenberg-lab' ) }>
					<ToggleControl
						label={ __( 'Show live results', 'gutenberg-lab' ) }
						help={ __(
							'As the visitor types, show matches via the WordPress REST API. The form still works without JavaScript.',
							'gutenberg-lab'
						) }
						checked={ !! liveResults }
						onChange={ ( value ) =>
							setAttributes( { liveResults: value } )
						}
					/>
					{ liveResults && (
						<>
							<ToggleGroupControl
								label={ __(
									'Results to show',
									'gutenberg-lab'
								) }
								value={ resultsMode }
								onChange={ ( value ) =>
									setAttributes( { resultsMode: value } )
								}
								isBlock
								__next40pxDefaultSize
								__nextHasNoMarginBottom
							>
								<ToggleGroupControlOption
									value="limited"
									label={ __( 'Max', 'gutenberg-lab' ) }
								/>
								<ToggleGroupControlOption
									value="all"
									label={ __( 'All', 'gutenberg-lab' ) }
								/>
							</ToggleGroupControl>
							{ resultsMode === 'all' ? (
								<p className="lab-search__help">
									{ __(
										'Show every match in a scrollable dropdown (fixed height).',
										'gutenberg-lab'
									) }
								</p>
							) : (
								<RangeControl
									label={ __(
										'Max results',
										'gutenberg-lab'
									) }
									value={ resultsLimit }
									onChange={ ( value ) =>
										setAttributes( {
											resultsLimit: value,
										} )
									}
									min={ 3 }
									max={ 20 }
								/>
							) }
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<form
					className="lab-search__form"
					role="search"
					onSubmit={ ( event ) => event.preventDefault() }
				>
					{ showLabel ? (
						<label className="lab-search__label" htmlFor="lab-search-preview">
							{ label || __( 'Search', 'gutenberg-lab' ) }
						</label>
					) : (
						<label className="screen-reader-text" htmlFor="lab-search-preview">
							{ label || __( 'Search', 'gutenberg-lab' ) }
						</label>
					) }
					<div className="lab-search__row">
						<input
							id="lab-search-preview"
							className="lab-search__input"
							type="search"
							placeholder={
								placeholder ||
								__( 'Search…', 'gutenberg-lab' )
							}
							disabled
						/>
						<button className="lab-search__button" type="button" disabled>
							{ buttonText || __( 'Search', 'gutenberg-lab' ) }
						</button>
					</div>
				</form>
				{ liveResults && (
					<p className="lab-search__help">
						{ __(
							'Live results appear on the front end while typing.',
							'gutenberg-lab'
						) }
					</p>
				) }
			</div>
		</>
	);
}
