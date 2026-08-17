/**
 * Lab Tab Suite — one block that owns tabs → accordion items → fields.
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import {
	Button,
	Dropdown,
	MenuGroup,
	MenuItem,
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
	Flex,
	FlexItem,
} from '@wordpress/components';
import { useState, useMemo, useEffect } from '@wordpress/element';
import { chevronUp, chevronDown, trash, plus } from '@wordpress/icons';
import {
	FIELD_TYPES,
	defaultField,
	defaultItem,
	defaultTab,
} from './field-types';
import FieldEditor from './field-editor';
import './editor.scss';

function move( list, from, to ) {
	if ( to < 0 || to >= list.length ) {
		return list;
	}
	const next = [ ...list ];
	const [ item ] = next.splice( from, 1 );
	next.splice( to, 0, item );
	return next;
}

/**
 * @param {Object}   props
 * @param {Object}   props.attributes
 * @param {Function} props.setAttributes
 * @return {Element}
 */
export default function Edit( { attributes, setAttributes } ) {
	const { tabs = [], allowMultipleOpen = false } = attributes;

	const [ activeTabId, setActiveTabId ] = useState(
		tabs[ 0 ]?.id || null
	);

	useEffect( () => {
		if ( tabs.length === 0 ) {
			return;
		}
		if ( ! tabs.some( ( tab ) => tab.id === activeTabId ) ) {
			setActiveTabId( tabs[ 0 ].id );
		}
	}, [ tabs, activeTabId ] );

	const activeIndex = useMemo(
		() => tabs.findIndex( ( tab ) => tab.id === activeTabId ),
		[ tabs, activeTabId ]
	);
	const activeTab = activeIndex >= 0 ? tabs[ activeIndex ] : null;

	const updateTabs = ( nextTabs ) => setAttributes( { tabs: nextTabs } );

	const updateTab = ( index, patch ) => {
		updateTabs(
			tabs.map( ( tab, i ) =>
				i === index ? { ...tab, ...patch } : tab
			)
		);
	};

	const updateItem = ( tabIndex, itemIndex, patch ) => {
		updateTab( tabIndex, {
			items: tabs[ tabIndex ].items.map( ( item, i ) =>
				i === itemIndex ? { ...item, ...patch } : item
			),
		} );
	};

	const updateField = ( tabIndex, itemIndex, fieldIndex, nextField ) => {
		const item = tabs[ tabIndex ].items[ itemIndex ];
		updateItem( tabIndex, itemIndex, {
			fields: item.fields.map( ( field, i ) =>
				i === fieldIndex ? nextField : field
			),
		} );
	};

	const addTab = () => {
		const next = [ ...tabs, defaultTab( tabs.length ) ];
		updateTabs( next );
		setActiveTabId( next[ next.length - 1 ].id );
	};

	const removeTab = ( index ) => {
		const next = tabs.filter( ( _, i ) => i !== index );
		updateTabs( next );
		if ( next.length ) {
			const fallback = next[ Math.max( 0, index - 1 ) ];
			setActiveTabId( fallback.id );
		} else {
			setActiveTabId( null );
		}
	};

	const moveTab = ( index, delta ) => {
		updateTabs( move( tabs, index, index + delta ) );
	};

	const addItem = ( tabIndex ) => {
		updateTab( tabIndex, {
			items: [ ...tabs[ tabIndex ].items, defaultItem() ],
		} );
	};

	const removeItem = ( tabIndex, itemIndex ) => {
		updateTab( tabIndex, {
			items: tabs[ tabIndex ].items.filter(
				( _, i ) => i !== itemIndex
			),
		} );
	};

	const moveItem = ( tabIndex, itemIndex, delta ) => {
		updateTab( tabIndex, {
			items: move( tabs[ tabIndex ].items, itemIndex, itemIndex + delta ),
		} );
	};

	const addField = ( tabIndex, itemIndex, type ) => {
		const item = tabs[ tabIndex ].items[ itemIndex ];
		updateItem( tabIndex, itemIndex, {
			fields: [ ...item.fields, defaultField( type ) ],
		} );
	};

	const removeField = ( tabIndex, itemIndex, fieldIndex ) => {
		const item = tabs[ tabIndex ].items[ itemIndex ];
		updateItem( tabIndex, itemIndex, {
			fields: item.fields.filter( ( _, i ) => i !== fieldIndex ),
		} );
	};

	const moveField = ( tabIndex, itemIndex, fieldIndex, delta ) => {
		const item = tabs[ tabIndex ].items[ itemIndex ];
		updateItem( tabIndex, itemIndex, {
			fields: move( item.fields, fieldIndex, fieldIndex + delta ),
		} );
	};

	const blockProps = useBlockProps( {
		className: 'lts lts--editor',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Suite', 'gutenberg-lab' ) }>
					<ToggleControl
						label={ __( 'Allow multiple accordions open', 'gutenberg-lab' ) }
						help={ __(
							'If off, opening one item closes the others in the same tab.',
							'gutenberg-lab'
						) }
						checked={ !! allowMultipleOpen }
						onChange={ ( value ) =>
							setAttributes( { allowMultipleOpen: value } )
						}
					/>
					<p className="lts__help">
						{ __(
							'Add tabs → pick a tab → add accordion items → add fields (rich text, checkbox, radio, dropdown, textarea, toggle, text).',
							'gutenberg-lab'
						) }
					</p>
				</PanelBody>
				{ activeTab && (
					<PanelBody
						title={ __( 'Active tab', 'gutenberg-lab' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Tab label', 'gutenberg-lab' ) }
							value={ activeTab.label }
							onChange={ ( value ) =>
								updateTab( activeIndex, { label: value } )
							}
							__nextHasNoMarginBottom
						/>
					</PanelBody>
				) }
			</InspectorControls>

			<div { ...blockProps }>
				<header className="lts__toolbar">
					<div className="lts__tabs" role="tablist">
						{ tabs.map( ( tab, index ) => {
							const isActive = tab.id === activeTabId;
							return (
								<div
									key={ tab.id }
									className={ `lts__tab${ isActive ? ' is-active' : '' }` }
								>
									<button
										type="button"
										role="tab"
										aria-selected={ isActive }
										className="lts__tab-button"
										onClick={ () => setActiveTabId( tab.id ) }
									>
										<RichText
											tagName="span"
											value={ tab.label }
											onChange={ ( value ) =>
												updateTab( index, {
													label: value,
												} )
											}
											placeholder={ __(
												'Tab label…',
												'gutenberg-lab'
											) }
											allowedFormats={ [] }
										/>
									</button>
									{ isActive && (
										<div className="lts__tab-actions">
											<Button
												icon={ chevronUp }
												size="small"
												label={ __(
													'Move tab left',
													'gutenberg-lab'
												) }
												disabled={ index === 0 }
												onClick={ () =>
													moveTab( index, -1 )
												}
											/>
											<Button
												icon={ chevronDown }
												size="small"
												label={ __(
													'Move tab right',
													'gutenberg-lab'
												) }
												disabled={
													index === tabs.length - 1
												}
												onClick={ () =>
													moveTab( index, 1 )
												}
											/>
											<Button
												icon={ trash }
												size="small"
												isDestructive
												label={ __(
													'Remove tab',
													'gutenberg-lab'
												) }
												onClick={ () =>
													removeTab( index )
												}
											/>
										</div>
									) }
								</div>
							);
						} ) }
						<Button
							icon={ plus }
							size="small"
							variant="secondary"
							onClick={ addTab }
							className="lts__add-tab"
						>
							{ __( 'Add tab', 'gutenberg-lab' ) }
						</Button>
					</div>
				</header>

				{ ! activeTab && (
					<p className="lts__empty">
						{ __(
							'No tabs yet. Click “Add tab” to start.',
							'gutenberg-lab'
						) }
					</p>
				) }

				{ activeTab && (
					<div className="lts__panel" role="tabpanel">
						<div className="lts__panel-head">
							<strong>
								{ __( 'Accordion items', 'gutenberg-lab' ) }
							</strong>
							<Button
								icon={ plus }
								variant="secondary"
								size="small"
								onClick={ () => addItem( activeIndex ) }
							>
								{ __( 'Add accordion item', 'gutenberg-lab' ) }
							</Button>
						</div>

						{ activeTab.items.length === 0 && (
							<p className="lts__empty">
								{ __(
									'No accordion items yet.',
									'gutenberg-lab'
								) }
							</p>
						) }

						<div className="lts__items">
							{ activeTab.items.map( ( item, itemIndex ) => (
								<section
									key={ item.id }
									className="lts-item"
								>
									<header className="lts-item__head">
										<Flex align="center" gap={ 2 }>
											<FlexItem isBlock>
												<RichText
													tagName="h4"
													className="lts-item__title"
													value={ item.title }
													onChange={ ( value ) =>
														updateItem(
															activeIndex,
															itemIndex,
															{ title: value }
														)
													}
													placeholder={ __(
														'Accordion title…',
														'gutenberg-lab'
													) }
													allowedFormats={ [] }
												/>
											</FlexItem>
											<FlexItem>
												<Button
													icon={ chevronUp }
													size="small"
													label={ __(
														'Move up',
														'gutenberg-lab'
													) }
													disabled={
														itemIndex === 0
													}
													onClick={ () =>
														moveItem(
															activeIndex,
															itemIndex,
															-1
														)
													}
												/>
												<Button
													icon={ chevronDown }
													size="small"
													label={ __(
														'Move down',
														'gutenberg-lab'
													) }
													disabled={
														itemIndex ===
														activeTab.items.length -
															1
													}
													onClick={ () =>
														moveItem(
															activeIndex,
															itemIndex,
															1
														)
													}
												/>
												<Button
													icon={ trash }
													size="small"
													isDestructive
													label={ __(
														'Remove item',
														'gutenberg-lab'
													) }
													onClick={ () =>
														removeItem(
															activeIndex,
															itemIndex
														)
													}
												/>
											</FlexItem>
										</Flex>
										<ToggleControl
											label={ __(
												'Open by default',
												'gutenberg-lab'
											) }
											checked={ !! item.openByDefault }
											onChange={ ( value ) =>
												updateItem(
													activeIndex,
													itemIndex,
													{ openByDefault: value }
												)
											}
											__nextHasNoMarginBottom
										/>
									</header>

									<div className="lts-item__fields">
										{ item.fields.length === 0 && (
											<p className="lts__empty lts__empty--small">
												{ __(
													'No fields yet — add one below.',
													'gutenberg-lab'
												) }
											</p>
										) }
										{ item.fields.map(
											( field, fieldIndex ) => (
												<FieldEditor
													key={ field.id }
													field={ field }
													onChange={ ( next ) =>
														updateField(
															activeIndex,
															itemIndex,
															fieldIndex,
															next
														)
													}
													onRemove={ () =>
														removeField(
															activeIndex,
															itemIndex,
															fieldIndex
														)
													}
													onMoveUp={ () =>
														moveField(
															activeIndex,
															itemIndex,
															fieldIndex,
															-1
														)
													}
													onMoveDown={ () =>
														moveField(
															activeIndex,
															itemIndex,
															fieldIndex,
															1
														)
													}
													canMoveUp={
														fieldIndex > 0
													}
													canMoveDown={
														fieldIndex <
														item.fields.length - 1
													}
												/>
											)
										) }

										<div className="lts-item__add-field">
											<Dropdown
												popoverProps={ {
													placement: 'bottom-start',
												} }
												renderToggle={ ( {
													isOpen,
													onToggle,
												} ) => (
													<Button
														icon={ plus }
														variant="secondary"
														size="small"
														onClick={ onToggle }
														aria-expanded={ isOpen }
													>
														{ __(
															'Add field',
															'gutenberg-lab'
														) }
													</Button>
												) }
												renderContent={ ( {
													onClose,
												} ) => (
													<MenuGroup label={ __(
														'Field type',
														'gutenberg-lab'
													) }>
														{ FIELD_TYPES.map(
															( type ) => (
																<MenuItem
																	key={
																		type.value
																	}
																	onClick={ () => {
																		addField(
																			activeIndex,
																			itemIndex,
																			type.value
																		);
																		onClose();
																	} }
																>
																	{ type.label }
																</MenuItem>
															)
														) }
													</MenuGroup>
												) }
											/>
										</div>
									</div>
								</section>
							) ) }
						</div>
					</div>
				) }
			</div>
		</>
	);
}
