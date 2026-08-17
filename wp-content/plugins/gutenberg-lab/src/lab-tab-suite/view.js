/**
 * Lab Tab Suite — tabs + accordion behavior (progressive enhancement).
 */
( function () {
	function activateTab( root, nextIndex ) {
		const tabs = [ ...root.querySelectorAll( '[data-lts-tab]' ) ];
		const panels = [ ...root.querySelectorAll( '[data-lts-panel]' ) ];
		if ( ! tabs.length || ! panels.length ) {
			return;
		}

		const index = Math.max( 0, Math.min( nextIndex, tabs.length - 1 ) );

		tabs.forEach( ( tab, i ) => {
			const on = i === index;
			tab.classList.toggle( 'is-active', on );
			tab.setAttribute( 'aria-selected', on ? 'true' : 'false' );
			tab.tabIndex = on ? 0 : -1;
		} );

		panels.forEach( ( panel, i ) => {
			const on = i === index;
			panel.classList.toggle( 'is-active', on );
			panel.hidden = ! on;
		} );

		tabs[ index ].focus();
	}

	function bindTabs( root ) {
		const tabs = [ ...root.querySelectorAll( '[data-lts-tab]' ) ];
		if ( ! tabs.length ) {
			return;
		}

		tabs.forEach( ( tab, index ) => {
			tab.addEventListener( 'click', () => activateTab( root, index ) );
			tab.addEventListener( 'keydown', ( event ) => {
				let next = null;
				if (
					event.key === 'ArrowRight' ||
					event.key === 'ArrowDown'
				) {
					next = ( index + 1 ) % tabs.length;
				} else if (
					event.key === 'ArrowLeft' ||
					event.key === 'ArrowUp'
				) {
					next = ( index - 1 + tabs.length ) % tabs.length;
				} else if ( event.key === 'Home' ) {
					next = 0;
				} else if ( event.key === 'End' ) {
					next = tabs.length - 1;
				}
				if ( next === null ) {
					return;
				}
				event.preventDefault();
				activateTab( root, next );
			} );
		} );
	}

	function closeItem( item ) {
		const trigger = item.querySelector( '[data-lts-acc-trigger]' );
		const body = item.querySelector( '[data-lts-acc-body]' );
		if ( ! trigger || ! body ) {
			return;
		}
		item.classList.remove( 'is-open' );
		trigger.setAttribute( 'aria-expanded', 'false' );
		body.hidden = true;
	}

	function openItem( item ) {
		const trigger = item.querySelector( '[data-lts-acc-trigger]' );
		const body = item.querySelector( '[data-lts-acc-body]' );
		if ( ! trigger || ! body ) {
			return;
		}
		item.classList.add( 'is-open' );
		trigger.setAttribute( 'aria-expanded', 'true' );
		body.hidden = false;
	}

	function bindAccordion( root, allowMultiple ) {
		const accordions = [ ...root.querySelectorAll( '[data-lts-accordion]' ) ];
		accordions.forEach( ( accordion ) => {
			const items = [
				...accordion.querySelectorAll( '[data-lts-acc-item]' ),
			];
			items.forEach( ( item ) => {
				const trigger = item.querySelector( '[data-lts-acc-trigger]' );
				if ( ! trigger ) {
					return;
				}
				trigger.addEventListener( 'click', () => {
					const isOpen = item.classList.contains( 'is-open' );
					if ( ! allowMultiple ) {
						items.forEach( ( other ) => {
							if ( other !== item ) {
								closeItem( other );
							}
						} );
					}
					if ( isOpen ) {
						closeItem( item );
					} else {
						openItem( item );
					}
				} );
			} );
		} );
	}

	function enhance( root ) {
		const allowMultiple = root.dataset.allowMultiple === '1';
		bindTabs( root );
		bindAccordion( root, allowMultiple );
	}

	function init() {
		document
			.querySelectorAll( '[data-lts]' )
			.forEach( ( node ) => enhance( node ) );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
