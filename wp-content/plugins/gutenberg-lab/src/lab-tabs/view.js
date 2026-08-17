/**
 * Lab Tabs — accessible tab switching (keyboard + click).
 */
( function () {
	function activate( root, nextIndex ) {
		const tabs = [ ...root.querySelectorAll( '[data-lab-tab]' ) ];
		const panels = [ ...root.querySelectorAll( '[data-lab-tab-panel]' ) ];
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

	function enhance( root ) {
		const tabs = [ ...root.querySelectorAll( '[data-lab-tab]' ) ];
		if ( ! tabs.length ) {
			return;
		}

		tabs.forEach( ( tab, index ) => {
			tab.addEventListener( 'click', () => activate( root, index ) );
			tab.addEventListener( 'keydown', ( event ) => {
				let next = null;
				if ( event.key === 'ArrowRight' || event.key === 'ArrowDown' ) {
					next = ( index + 1 ) % tabs.length;
				} else if ( event.key === 'ArrowLeft' || event.key === 'ArrowUp' ) {
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
				activate( root, next );
			} );
		} );
	}

	function init() {
		document
			.querySelectorAll( '[data-lab-tabs]' )
			.forEach( ( node ) => enhance( node ) );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
