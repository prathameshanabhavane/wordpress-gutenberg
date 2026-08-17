/**
 * Lab Accordion — expand / collapse items.
 */
( function () {
	function closeItem( item ) {
		const trigger = item.querySelector( '[data-lab-accordion-trigger]' );
		const panel = item.querySelector( '[data-lab-accordion-panel]' );
		if ( ! trigger || ! panel ) {
			return;
		}
		item.classList.remove( 'is-open' );
		trigger.setAttribute( 'aria-expanded', 'false' );
		panel.hidden = true;
	}

	function openItem( item ) {
		const trigger = item.querySelector( '[data-lab-accordion-trigger]' );
		const panel = item.querySelector( '[data-lab-accordion-panel]' );
		if ( ! trigger || ! panel ) {
			return;
		}
		item.classList.add( 'is-open' );
		trigger.setAttribute( 'aria-expanded', 'true' );
		panel.hidden = false;
	}

	function enhance( root ) {
		const allowMultiple = root.dataset.allowMultiple === '1';
		const items = [ ...root.querySelectorAll( '[data-lab-accordion-item]' ) ];

		items.forEach( ( item ) => {
			const trigger = item.querySelector( '[data-lab-accordion-trigger]' );
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
	}

	function init() {
		document
			.querySelectorAll( '[data-lab-accordion]' )
			.forEach( ( node ) => enhance( node ) );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
