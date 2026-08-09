/**
 * Shared editor for Lab Category Cards / Lab Tag Cards.
 * Modes: All | Include only | Exclude — mutually exclusive for clear UX.
 */
import { __, sprintf } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
	Spinner,
	Notice,
	ToggleControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import TermCardPreview from './term-card-preview';
import TermPickerControl from './term-picker-control';
import {
	SOURCE_ALL,
	SOURCE_EXCLUDE,
	SOURCE_INCLUDE,
	normalizeSource,
	usesTermPicker,
} from './source';
import './editor.scss';

/**
 * @param {Object} config
 * @param {string} config.taxonomy
 * @param {string} config.pluralLabel
 * @return {Function} Edit component.
 */
export default function createTermCardsEdit( { taxonomy, pluralLabel } ) {
	return function Edit( { attributes, setAttributes } ) {
		const {
			columns = 3,
			termsToShow = 12,
			orderBy = 'name',
			order = 'asc',
			source: rawSource = SOURCE_ALL,
			selectedTermIds = [],
			hideEmpty = true,
			showDescription = true,
			showCount = true,
			showCta = true,
			ctaText = '',
			descriptionLines = 3,
		} = attributes;

		const source = normalizeSource( rawSource );
		const needsPicker = usesTermPicker( source );
		const isInclude = source === SOURCE_INCLUDE;
		const isExclude = source === SOURCE_EXCLUDE;

		const { terms, isResolving } = useSelect(
			( select ) => {
				const { getEntityRecords, isResolving: storeIsResolving } =
					select( 'core' );

				const query = {
					per_page: termsToShow,
					orderby: orderBy,
					order,
					hide_empty: hideEmpty,
				};

				if ( isInclude ) {
					if ( ! selectedTermIds.length ) {
						return { terms: [], isResolving: false };
					}
					query.include = selectedTermIds;
					query.orderby = 'include';
					query.per_page = selectedTermIds.length;
					query.hide_empty = false;
				} else if ( isExclude && selectedTermIds.length ) {
					query.exclude = selectedTermIds;
				}

				return {
					terms: getEntityRecords( 'taxonomy', taxonomy, query ),
					isResolving: storeIsResolving( 'getEntityRecords', [
						'taxonomy',
						taxonomy,
						query,
					] ),
				};
			},
			[
				taxonomy,
				termsToShow,
				orderBy,
				order,
				hideEmpty,
				selectedTermIds,
				isInclude,
				isExclude,
			]
		);

		const list = isInclude
			? ( terms || [] ).slice().sort( ( a, b ) => {
					return (
						selectedTermIds.indexOf( a.id ) -
						selectedTermIds.indexOf( b.id )
					);
			  } )
			: terms || [];

		const blockProps = useBlockProps( {
			className: `lab-term-cards lab-cards lab-cards--columns-${ columns }`,
		} );

		const emptyMessage = () => {
			if ( isInclude ) {
				return sprintf(
					/* translators: %s: categories or tags */
					__(
						'Add %s below to show them as cards.',
						'gutenberg-lab'
					),
					pluralLabel.toLowerCase()
				);
			}
			return sprintf(
				/* translators: %s: categories or tags */
				__( 'No %s found. Adjust the settings.', 'gutenberg-lab' ),
				pluralLabel.toLowerCase()
			);
		};

		return (
			<>
				<InspectorControls>
					<PanelBody
						title={ __( 'Which terms to show', 'gutenberg-lab' ) }
						initialOpen={ true }
					>
						<ToggleGroupControl
							label={ __( 'Mode', 'gutenberg-lab' ) }
							value={ source }
							onChange={ ( value ) =>
								setAttributes( {
									source: normalizeSource( value ),
								} )
							}
							isBlock
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						>
							<ToggleGroupControlOption
								value={ SOURCE_ALL }
								label={ __( 'All', 'gutenberg-lab' ) }
							/>
							<ToggleGroupControlOption
								value={ SOURCE_INCLUDE }
								label={ __( 'Include', 'gutenberg-lab' ) }
							/>
							<ToggleGroupControlOption
								value={ SOURCE_EXCLUDE }
								label={ __( 'Exclude', 'gutenberg-lab' ) }
							/>
						</ToggleGroupControl>
						<p className="lab-term-cards__help">
							{ source === SOURCE_ALL &&
								sprintf(
									/* translators: %s: categories or tags */
									__(
										'Show all %s (you can still hide empty ones).',
										'gutenberg-lab'
									),
									pluralLabel.toLowerCase()
								) }
							{ isInclude &&
								sprintf(
									/* translators: %s: categories or tags */
									__(
										'Show only the %s you pick.',
										'gutenberg-lab'
									),
									pluralLabel.toLowerCase()
								) }
							{ isExclude &&
								sprintf(
									/* translators: %s: categories or tags */
									__(
										'Show all %s except the ones you pick.',
										'gutenberg-lab'
									),
									pluralLabel.toLowerCase()
								) }
						</p>

						{ needsPicker && (
							<TermPickerControl
								taxonomy={ taxonomy }
								mode={ source }
								pluralLabel={ pluralLabel }
								value={ selectedTermIds }
								onChange={ ( ids ) =>
									setAttributes( {
										selectedTermIds: ids,
									} )
								}
							/>
						) }
					</PanelBody>

					{ source !== SOURCE_INCLUDE && (
						<PanelBody
							title={ __( 'Query', 'gutenberg-lab' ) }
							initialOpen={ true }
						>
							<RangeControl
								label={ sprintf(
									/* translators: %s: categories or tags */
									__( 'Max %s', 'gutenberg-lab' ),
									pluralLabel.toLowerCase()
								) }
								value={ termsToShow }
								onChange={ ( value ) =>
									setAttributes( { termsToShow: value } )
								}
								min={ 1 }
								max={ 48 }
							/>
							<ToggleControl
								label={ __(
									'Hide empty terms',
									'gutenberg-lab'
								) }
								checked={ !! hideEmpty }
								onChange={ ( value ) =>
									setAttributes( { hideEmpty: value } )
								}
							/>
							<SelectControl
								label={ __( 'Order by', 'gutenberg-lab' ) }
								value={ orderBy }
								options={ [
									{
										label: __( 'Name', 'gutenberg-lab' ),
										value: 'name',
									},
									{
										label: __( 'Count', 'gutenberg-lab' ),
										value: 'count',
									},
									{
										label: __( 'ID', 'gutenberg-lab' ),
										value: 'term_id',
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
										label: __(
											'Ascending',
											'gutenberg-lab'
										),
										value: 'asc',
									},
									{
										label: __(
											'Descending',
											'gutenberg-lab'
										),
										value: 'desc',
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
						<div className="lab-term-cards__panel-section">
							<ToggleControl
								label={ __(
									'Show description',
									'gutenberg-lab'
								) }
								checked={ !! showDescription }
								onChange={ ( value ) =>
									setAttributes( {
										showDescription: value,
									} )
								}
							/>
							{ showDescription && (
								<div className="lab-term-cards__panel-stack">
									<RangeControl
										label={ __(
											'Description lines',
											'gutenberg-lab'
										) }
										value={ descriptionLines }
										onChange={ ( value ) =>
											setAttributes( {
												descriptionLines: value,
											} )
										}
										min={ 1 }
										max={ 12 }
									/>
								</div>
							) }
						</div>
						<div className="lab-term-cards__panel-section">
							<ToggleControl
								label={ __(
									'Show post count',
									'gutenberg-lab'
								) }
								checked={ !! showCount }
								onChange={ ( value ) =>
									setAttributes( { showCount: value } )
								}
							/>
						</div>
						<div className="lab-term-cards__panel-section">
							<ToggleControl
								label={ __(
									'Show CTA button',
									'gutenberg-lab'
								) }
								checked={ !! showCta }
								onChange={ ( value ) =>
									setAttributes( { showCta: value } )
								}
							/>
							{ showCta && (
								<div className="lab-term-cards__panel-stack">
									<TextControl
										label={ __(
											'CTA text',
											'gutenberg-lab'
										) }
										value={ ctaText }
										onChange={ ( value ) =>
											setAttributes( {
												ctaText: value,
											} )
										}
										placeholder={ __(
											'View posts',
											'gutenberg-lab'
										) }
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
					</PanelBody>
				</InspectorControls>

				<div { ...blockProps }>
					{ isResolving && (
						<div className="lab-term-cards__loading">
							<Spinner />
						</div>
					) }
					{ ! isResolving && list.length === 0 && (
						<Notice status="info" isDismissible={ false }>
							{ emptyMessage() }
						</Notice>
					) }
					<div className="lab-cards__grid">
						{ list.map( ( term ) => (
							<TermCardPreview
								key={ term.id }
								term={ term }
								showDescription={ showDescription }
								showCount={ showCount }
								showCta={ showCta }
								ctaText={ ctaText }
								descriptionLines={ descriptionLines }
							/>
						) ) }
					</div>
				</div>
			</>
		);
	};
}
