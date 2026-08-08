/**
 * Custom select — progressive enhancement + cross-browser listbox.
 *
 * Without JS: native <select> submits the form.
 * With JS: custom panel UI (same look in Chrome / Firefox / Safari / Edge).
 */
( function () {
	'use strict';

	var KEY = {
		ENTER: 13,
		ESC: 27,
		SPACE: 32,
		END: 35,
		HOME: 36,
		UP: 38,
		DOWN: 40,
	};

	function closest( el, selector ) {
		if ( ! el ) {
			return null;
		}
		if ( el.closest ) {
			return el.closest( selector );
		}
		while ( el && el.nodeType === 1 ) {
			if ( el.matches && el.matches( selector ) ) {
				return el;
			}
			if ( el.msMatchesSelector && el.msMatchesSelector( selector ) ) {
				return el;
			}
			el = el.parentElement || el.parentNode;
		}
		return null;
	}

	function keyCodeOf( event ) {
		return event.keyCode || event.which || 0;
	}

	function isKey( event, name ) {
		var code = keyCodeOf( event );
		var key = event.key;
		if ( name === 'Enter' ) {
			return key === 'Enter' || code === KEY.ENTER;
		}
		if ( name === 'Escape' ) {
			return key === 'Escape' || key === 'Esc' || code === KEY.ESC;
		}
		if ( name === ' ' ) {
			return key === ' ' || key === 'Spacebar' || code === KEY.SPACE;
		}
		if ( name === 'ArrowDown' ) {
			return key === 'ArrowDown' || key === 'Down' || code === KEY.DOWN;
		}
		if ( name === 'ArrowUp' ) {
			return key === 'ArrowUp' || key === 'Up' || code === KEY.UP;
		}
		if ( name === 'Home' ) {
			return key === 'Home' || code === KEY.HOME;
		}
		if ( name === 'End' ) {
			return key === 'End' || code === KEY.END;
		}
		return false;
	}

	function getOptions( root ) {
		return root.querySelectorAll( '.lab-form-field__select-list [role="option"]' );
	}

	function enhance( root ) {
		if ( ! root || root.getAttribute( 'data-enhanced' ) === '1' ) {
			return;
		}

		var fallback = root.querySelector( '.lab-form-field__fallback-select' );
		var ui = root.querySelector( '.lab-form-field__select-ui' );
		var hidden = root.querySelector( '.lab-form-field__select-input' );
		if ( ! fallback || ! ui || ! hidden ) {
			return;
		}

		var name = fallback.getAttribute( 'name' ) || '';
		fallback.disabled = true;
		fallback.removeAttribute( 'name' );
		fallback.setAttribute( 'aria-hidden', 'true' );
		fallback.tabIndex = -1;

		hidden.disabled = false;
		if ( name ) {
			hidden.setAttribute( 'name', name );
		}
		hidden.value = fallback.value;

		ui.hidden = false;
		root.classList.add( 'is-enhanced' );
		root.setAttribute( 'data-enhanced', '1' );
	}

	function closeAll( except ) {
		var openRoots = document.querySelectorAll( '.lab-form-field__custom-select.is-open' );
		for ( var i = 0; i < openRoots.length; i++ ) {
			if ( except && openRoots[ i ] === except ) {
				continue;
			}
			setOpen( openRoots[ i ], false );
		}
	}

	function setOpen( root, open ) {
		var trigger = root.querySelector( '.lab-form-field__select-trigger' );
		var list = root.querySelector( '.lab-form-field__select-list' );
		if ( ! trigger || ! list ) {
			return;
		}
		if ( open ) {
			root.classList.add( 'is-open' );
		} else {
			root.classList.remove( 'is-open' );
		}
		trigger.setAttribute( 'aria-expanded', open ? 'true' : 'false' );
		list.hidden = ! open;
		if ( open ) {
			var selected = list.querySelector( '[aria-selected="true"]' );
			var focusEl = selected || list.querySelector( '[role="option"]' );
			if ( focusEl ) {
				focusEl.focus();
			}
		}
	}

	function choose( root, option ) {
		var hidden = root.querySelector( '.lab-form-field__select-input' );
		var fallback = root.querySelector( '.lab-form-field__fallback-select' );
		var labelEl = root.querySelector( '.lab-form-field__select-value' );
		var list = root.querySelector( '.lab-form-field__select-list' );
		var trigger = root.querySelector( '.lab-form-field__select-trigger' );
		if ( ! option || ! hidden || ! labelEl || ! list ) {
			return;
		}

		var value = option.getAttribute( 'data-value' ) || '';
		var labelNode = option.querySelector( '.lab-form-field__select-option-label' );
		var labelText = labelNode
			? ( labelNode.textContent || '' ).replace( /^\s+|\s+$/g, '' )
			: ( option.textContent || '' ).replace( /^\s+|\s+$/g, '' );

		hidden.value = value;
		if ( fallback ) {
			fallback.value = value;
		}
		labelEl.textContent = labelText;

		var opts = getOptions( root );
		for ( var i = 0; i < opts.length; i++ ) {
			opts[ i ].setAttribute( 'aria-selected', opts[ i ] === option ? 'true' : 'false' );
		}

		setOpen( root, false );
		if ( trigger ) {
			trigger.focus();
		}
	}

	function focusOptionAt( root, index ) {
		var opts = getOptions( root );
		if ( ! opts.length ) {
			return;
		}
		if ( index < 0 ) {
			index = 0;
		}
		if ( index > opts.length - 1 ) {
			index = opts.length - 1;
		}
		opts[ index ].focus();
	}

	function indexOfOption( root, option ) {
		var opts = getOptions( root );
		for ( var i = 0; i < opts.length; i++ ) {
			if ( opts[ i ] === option ) {
				return i;
			}
		}
		return -1;
	}

	function onDocumentClick( event ) {
		var root = closest( event.target, '.lab-form-field__custom-select' );

		if ( ! root || root.getAttribute( 'data-enhanced' ) !== '1' ) {
			closeAll();
			return;
		}

		var trigger = closest( event.target, '.lab-form-field__select-trigger' );
		if ( trigger && root.contains( trigger ) ) {
			event.preventDefault();
			var willOpen = ! root.classList.contains( 'is-open' );
			closeAll( root );
			setOpen( root, willOpen );
			return;
		}

		var option = closest( event.target, '[role="option"]' );
		if ( option && root.contains( option ) ) {
			event.preventDefault();
			choose( root, option );
			return;
		}

		if ( ! root.contains( event.target ) ) {
			closeAll();
		}
	}

	function onKeyDown( event ) {
		var root = closest( event.target, '.lab-form-field__custom-select' );
		if ( ! root || root.getAttribute( 'data-enhanced' ) !== '1' ) {
			return;
		}

		var open = root.classList.contains( 'is-open' );
		var target = event.target;
		var opts = getOptions( root );

		if ( target.classList && target.classList.contains( 'lab-form-field__select-trigger' ) ) {
			if ( isKey( event, 'ArrowDown' ) || isKey( event, 'Enter' ) || isKey( event, ' ' ) ) {
				event.preventDefault();
				closeAll( root );
				setOpen( root, true );
			}
			return;
		}

		if ( isKey( event, 'Escape' ) ) {
			event.preventDefault();
			setOpen( root, false );
			var trigger = root.querySelector( '.lab-form-field__select-trigger' );
			if ( trigger ) {
				trigger.focus();
			}
			return;
		}

		if ( ! open || ! target.getAttribute || target.getAttribute( 'role' ) !== 'option' ) {
			return;
		}

		var index = indexOfOption( root, target );

		if ( isKey( event, 'Enter' ) || isKey( event, ' ' ) ) {
			event.preventDefault();
			choose( root, target );
			return;
		}

		if ( isKey( event, 'ArrowDown' ) ) {
			event.preventDefault();
			focusOptionAt( root, index + 1 );
			return;
		}

		if ( isKey( event, 'ArrowUp' ) ) {
			event.preventDefault();
			focusOptionAt( root, index - 1 );
			return;
		}

		if ( isKey( event, 'Home' ) ) {
			event.preventDefault();
			focusOptionAt( root, 0 );
			return;
		}

		if ( isKey( event, 'End' ) ) {
			event.preventDefault();
			focusOptionAt( root, opts.length - 1 );
			return;
		}

		/* Typeahead: jump to option starting with pressed letter */
		var typed = event.key && event.key.length === 1 ? event.key.toLowerCase() : '';
		if ( typed && /[a-z0-9]/i.test( typed ) ) {
			event.preventDefault();
			for ( var i = 1; i <= opts.length; i++ ) {
				var next = opts[ ( index + i ) % opts.length ];
				var label = next.querySelector( '.lab-form-field__select-option-label' );
				var text = ( label ? label.textContent : next.textContent || '' )
					.replace( /^\s+|\s+$/g, '' )
					.toLowerCase();
				if ( text.charAt( 0 ) === typed ) {
					next.focus();
					break;
				}
			}
		}
	}

	function formatBytes( bytes ) {
		if ( ! bytes && bytes !== 0 ) {
			return '';
		}
		if ( bytes < 1024 ) {
			return bytes + ' B';
		}
		if ( bytes < 1024 * 1024 ) {
			return ( Math.round( ( bytes / 1024 ) * 10 ) / 10 ) + ' KB';
		}
		return ( Math.round( ( bytes / ( 1024 * 1024 ) ) * 10 ) / 10 ) + ' MB';
	}

	function bindUpload( root ) {
		if ( ! root || root.getAttribute( 'data-upload-bound' ) === '1' ) {
			return;
		}

		var type = root.getAttribute( 'data-lab-upload' );
		var input = root.querySelector( '.lab-form-field__native-file' );
		var dropzone = root.querySelector( '.lab-form-field__dropzone' );
		var preview = root.querySelector( '.lab-form-field__upload-preview' );
		if ( ! input || ! dropzone || ! preview ) {
			return;
		}

		var nameEl = preview.querySelector( '.lab-form-field__upload-name' );
		var subEl = preview.querySelector( '.lab-form-field__upload-sub' );
		var thumb = preview.querySelector( '.lab-form-field__upload-thumb' );
		var changeBtn = preview.querySelector( 'button.lab-form-field__upload-change' );
		var objectUrl = null;

		function showPreview( file ) {
			if ( ! file ) {
				return;
			}
			if ( nameEl ) {
				nameEl.textContent = file.name || 'Selected file';
			}
			if ( subEl ) {
				subEl.textContent = formatBytes( file.size );
			}

			if ( type === 'image' && thumb && file.type && file.type.indexOf( 'image/' ) === 0 ) {
				if ( objectUrl ) {
					URL.revokeObjectURL( objectUrl );
				}
				objectUrl = URL.createObjectURL( file );
				thumb.src = objectUrl;
				thumb.alt = file.name || '';
			}

			dropzone.hidden = true;
			preview.hidden = false;
			preview.classList.add( 'is-visible' );
		}

		function reopenPicker() {
			input.click();
		}

		input.addEventListener( 'change', function () {
			var file = input.files && input.files[ 0 ] ? input.files[ 0 ] : null;
			if ( file ) {
				showPreview( file );
			}
		} );

		if ( changeBtn ) {
			changeBtn.addEventListener( 'click', function ( event ) {
				event.preventDefault();
				reopenPicker();
			} );
		}

		root.setAttribute( 'data-upload-bound', '1' );
	}

	function syncRangeLabels( root ) {
		var range = root.querySelector( '.lab-form-field__control--range' );
		var valueEl = root.querySelector( '.lab-form-field__range-value' );
		if ( ! range || ! valueEl ) {
			return;
		}
		range.addEventListener( 'input', function () {
			valueEl.textContent = range.value;
		} );
		range.addEventListener( 'change', function () {
			valueEl.textContent = range.value;
		} );
	}

	function init() {
		var selects = document.querySelectorAll( '[data-lab-select]' );
		for ( var i = 0; i < selects.length; i++ ) {
			enhance( selects[ i ] );
		}

		var fields = document.querySelectorAll( '.lab-form-field--range' );
		for ( var j = 0; j < fields.length; j++ ) {
			syncRangeLabels( fields[ j ] );
		}

		var uploads = document.querySelectorAll( '[data-lab-upload]' );
		for ( var k = 0; k < uploads.length; k++ ) {
			bindUpload( uploads[ k ] );
		}
	}

	document.addEventListener( 'click', onDocumentClick );
	document.addEventListener( 'keydown', onKeyDown );

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
