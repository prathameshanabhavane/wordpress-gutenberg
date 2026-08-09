/**
 * Front-end live search via core REST.
 * Progressive enhancement: classic form still works without JS.
 */
( function () {
	const DEBOUNCE_MS = 280;

	function splitCsv( csv ) {
		return ( csv || '' )
			.split( ',' )
			.map( ( part ) => part.trim() )
			.filter( Boolean );
	}

	function parseJson( value, fallback ) {
		try {
			return JSON.parse( value || '' ) || fallback;
		} catch ( error ) {
			return fallback;
		}
	}

	function debounce( fn, wait ) {
		let timer;
		return function debounced( ...args ) {
			window.clearTimeout( timer );
			timer = window.setTimeout( () => fn.apply( this, args ), wait );
		};
	}

	function escapeHtml( text ) {
		return String( text )
			.replace( /&/g, '&amp;' )
			.replace( /</g, '&lt;' )
			.replace( />/g, '&gt;' )
			.replace( /"/g, '&quot;' );
	}

	/**
	 * Highlight query matches in a title (safe HTML).
	 *
	 * @param {string} title
	 * @param {string} query
	 * @return {string}
	 */
	function highlightTitle( title, query ) {
		const safe = escapeHtml( title );
		const q = query.trim();
		if ( q.length < 2 ) {
			return safe;
		}
		const escaped = q.replace( /[.*+?^${}()|[\]\\]/g, '\\$&' );
		const regex = new RegExp( `(${ escaped })`, 'ig' );
		return safe.replace( regex, '<mark class="lab-search__mark">$1</mark>' );
	}

	function friendlyType( root, slug ) {
		const labels = parseJson( root.dataset.labels, {} );
		if ( labels[ slug ] ) {
			return labels[ slug ];
		}
		if ( slug === 'post_tag' ) {
			return 'Tag';
		}
		return String( slug || 'Result' )
			.replace( /_/g, ' ' )
			.replace( /\b\w/g, ( c ) => c.toUpperCase() );
	}

	async function fetchJson( url ) {
		const response = await window.fetch( url, {
			headers: { Accept: 'application/json' },
		} );
		if ( ! response.ok ) {
			return [];
		}
		const data = await response.json();
		return Array.isArray( data ) ? data : [];
	}

	function parseIdList( csv ) {
		return splitCsv( csv )
			.map( ( part ) => Number( part ) )
			.filter( ( id ) => Number.isInteger( id ) && id > 0 );
	}

	function isExcluded( item, excludePosts, excludeTerms ) {
		if ( ! item || ! item.id ) {
			return false;
		}
		if ( item.kind === 'term' ) {
			return excludeTerms.includes( item.id );
		}
		return excludePosts.includes( item.id );
	}

	async function searchAll( root, query ) {
		const scope = root.dataset.scope || 'default';
		const limit = Number( root.dataset.limit || 8 );
		const restSearch = root.dataset.restUrl;
		const restRoot = root.dataset.restRoot;
		const postTypes = splitCsv( root.dataset.postTypes );
		const taxonomyMap = parseJson( root.dataset.taxonomies, {} );
		const excludePosts = parseIdList( root.dataset.excludePosts );
		const excludeTerms = parseIdList( root.dataset.excludeTerms );
		const overFetch = Math.min(
			100,
			limit + excludePosts.length + excludeTerms.length
		);
		const encoded = encodeURIComponent( query );
		const requests = [];

		if ( scope === 'default' ) {
			requests.push(
				fetchJson(
					`${ restSearch }?search=${ encoded }&per_page=${ overFetch }`
				).then( ( items ) =>
					items.map( ( item ) => ( {
						id: item.id,
						kind: item.type === 'term' ? 'term' : 'post',
						title: item.title || item.slug || `#${ item.id }`,
						url: item.url,
						type: item.subtype || item.type || 'result',
					} ) )
				)
			);
		} else {
			if ( postTypes.length && restSearch ) {
				requests.push(
					fetchJson(
						`${ restSearch }?search=${ encoded }&type=post&subtype=${ encodeURIComponent(
							postTypes.join( ',' )
						) }&per_page=${ overFetch }`
					).then( ( items ) =>
						items.map( ( item ) => ( {
							id: item.id,
							kind: 'post',
							title: item.title || `#${ item.id }`,
							url: item.url,
							type: item.subtype || 'post',
						} ) )
					)
				);
			}

			Object.keys( taxonomyMap ).forEach( ( taxonomy ) => {
				const restBase = taxonomyMap[ taxonomy ];
				requests.push(
					fetchJson(
						`${ restRoot }${ restBase }?search=${ encoded }&per_page=${ overFetch }`
					).then( ( items ) =>
						items.map( ( item ) => ( {
							id: item.id,
							kind: 'term',
							title: item.name || `#${ item.id }`,
							url: item.link,
							type: taxonomy,
						} ) )
					)
				);
			} );
		}

		if ( ! requests.length ) {
			return [];
		}

		const groups = await Promise.all( requests );
		return groups
			.flat()
			.filter( ( item ) => item.url )
			.filter(
				( item ) => ! isExcluded( item, excludePosts, excludeTerms )
			)
			.slice( 0, limit );
	}

	function setExpanded( input, open ) {
		input.setAttribute( 'aria-expanded', open ? 'true' : 'false' );
	}

	function setStatus( root, text, visible, kind ) {
		const status = root.querySelector( '[data-lab-search-status]' );
		const textEl = status
			? status.querySelector( '.lab-search__results-status-text' )
			: null;
		if ( ! status || ! textEl ) {
			return;
		}
		status.classList.remove(
			'is-loading',
			'is-empty',
			'is-hint'
		);
		if ( kind ) {
			status.classList.add( `is-${ kind }` );
		}
		if ( ! visible || ! text ) {
			status.hidden = true;
			textEl.textContent = '';
			return;
		}
		status.hidden = false;
		textEl.textContent = text;
	}

	function setHint( root, visible ) {
		const hint = root.querySelector( '[data-lab-search-hint]' );
		if ( ! hint ) {
			return;
		}
		if ( visible ) {
			hint.textContent =
				root.dataset.i18nHint || 'Keep typing to search…';
		}
		hint.hidden = ! visible;
	}

	function hidePanel( root, input ) {
		const panel = root.querySelector( '[data-lab-search-results]' );
		const list = root.querySelector( '[data-lab-search-list]' );
		if ( panel ) {
			panel.hidden = true;
		}
		if ( list ) {
			list.innerHTML = '';
		}
		if ( input ) {
			setExpanded( input, false );
			input.removeAttribute( 'aria-activedescendant' );
		}
		setStatus( root, '', false );
		root._labActiveIndex = -1;
	}

	function renderResults( root, items, query, state ) {
		const panel = root.querySelector( '[data-lab-search-results]' );
		const list = root.querySelector( '[data-lab-search-list]' );
		const input = root.querySelector( '.lab-search__input' );
		if ( ! panel || ! list || ! input ) {
			return;
		}

		list.innerHTML = '';
		root._labActiveIndex = -1;
		setHint( root, false );

		if ( state === 'hint' ) {
			hidePanel( root, input );
			setHint( root, true );
			return;
		}

		if ( state === 'loading' ) {
			panel.hidden = false;
			setExpanded( input, true );
			setStatus(
				root,
				root.dataset.i18nLoading || 'Searching…',
				true,
				'loading'
			);
			return;
		}

		if ( ! query || state === 'idle' ) {
			hidePanel( root, input );
			return;
		}

		panel.hidden = false;
		setExpanded( input, true );

		if ( ! items.length ) {
			setStatus(
				root,
				root.dataset.i18nEmpty || 'No matches yet. Try another keyword.',
				true,
				'empty'
			);
			return;
		}

		setStatus( root, '', false );

		items.forEach( ( item, index ) => {
			const li = document.createElement( 'li' );
			li.className = 'lab-search__result';
			li.setAttribute( 'role', 'option' );
			li.id = `${ input.id }-opt-${ index }`;

			const a = document.createElement( 'a' );
			a.className = 'lab-search__result-link';
			a.href = item.url;
			a.innerHTML = highlightTitle( item.title, query );

			const badge = document.createElement( 'span' );
			badge.className = 'lab-search__result-type';
			badge.textContent = friendlyType( root, item.type );

			li.appendChild( a );
			li.appendChild( badge );
			list.appendChild( li );
		} );
	}

	function moveActive( root, delta ) {
		const list = root.querySelector( '[data-lab-search-list]' );
		const input = root.querySelector( '.lab-search__input' );
		if ( ! list || ! input ) {
			return;
		}
		const items = [ ...list.querySelectorAll( '.lab-search__result' ) ];
		if ( ! items.length ) {
			return;
		}

		const current = Number( root._labActiveIndex ?? -1 );
		let next = current + delta;
		if ( next < 0 ) {
			next = items.length - 1;
		}
		if ( next >= items.length ) {
			next = 0;
		}

		items.forEach( ( el ) =>
			el.classList.remove( 'is-active' )
		);
		items[ next ].classList.add( 'is-active' );
		root._labActiveIndex = next;
		input.setAttribute( 'aria-activedescendant', items[ next ].id );
		items[ next ].scrollIntoView( { block: 'nearest' } );
	}

	function activateCurrent( root ) {
		const list = root.querySelector( '[data-lab-search-list]' );
		const index = Number( root._labActiveIndex ?? -1 );
		if ( ! list || index < 0 ) {
			return false;
		}
		const link = list.querySelectorAll( '.lab-search__result-link' )[
			index
		];
		if ( link ) {
			window.location.href = link.href;
			return true;
		}
		return false;
	}

	function enhance( root ) {
		if ( root.dataset.live !== '1' ) {
			return;
		}

		const input = root.querySelector( '.lab-search__input' );
		if ( ! input ) {
			return;
		}

		let requestId = 0;

		const run = debounce( async () => {
			const query = input.value.trim();
			if ( query.length === 0 ) {
				renderResults( root, [], '', 'idle' );
				return;
			}
			if ( query.length < 2 ) {
				renderResults( root, [], query, 'hint' );
				return;
			}

			const current = ++requestId;
			renderResults( root, [], query, 'loading' );

			try {
				const items = await searchAll( root, query );
				if ( current !== requestId ) {
					return;
				}
				renderResults( root, items, query, 'ready' );
			} catch ( error ) {
				if ( current !== requestId ) {
					return;
				}
				renderResults( root, [], query, 'ready' );
			}
		}, DEBOUNCE_MS );

		input.addEventListener( 'input', run );
		input.addEventListener( 'search', run );

		input.addEventListener( 'keydown', ( event ) => {
			const panel = root.querySelector( '[data-lab-search-results]' );
			if ( ! panel || panel.hidden ) {
				return;
			}

			if ( event.key === 'ArrowDown' ) {
				event.preventDefault();
				moveActive( root, 1 );
			} else if ( event.key === 'ArrowUp' ) {
				event.preventDefault();
				moveActive( root, -1 );
			} else if ( event.key === 'Enter' ) {
				if ( activateCurrent( root ) ) {
					event.preventDefault();
				}
			} else if ( event.key === 'Escape' ) {
				renderResults( root, [], '', 'idle' );
				input.blur();
			}
		} );

		document.addEventListener( 'click', ( event ) => {
			if ( ! root.contains( event.target ) ) {
				renderResults( root, [], '', 'idle' );
			}
		} );
	}

	function init() {
		document
			.querySelectorAll( '[data-lab-search]' )
			.forEach( ( node ) => enhance( node ) );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
