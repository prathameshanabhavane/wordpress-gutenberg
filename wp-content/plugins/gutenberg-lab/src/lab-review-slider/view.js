/**
 * Simple review carousel.
 */
( function () {
	function enhance( root ) {
		const track = root.querySelector( '[data-lab-review-track]' );
		const slides = track
			? [ ...track.querySelectorAll( '[data-lab-review-card]' ) ]
			: [];
		if ( ! slides.length ) {
			return;
		}

		const prev = root.querySelector( '[data-lab-review-prev]' );
		const next = root.querySelector( '[data-lab-review-next]' );
		const dotsWrap = root.querySelector( '[data-lab-review-dots]' );
		const autoplay = root.dataset.autoplay === '1';
		let index = 0;
		let timer = null;

		function renderDots() {
			if ( ! dotsWrap ) {
				return;
			}
			dotsWrap.innerHTML = '';
			slides.forEach( ( _, i ) => {
				const btn = document.createElement( 'button' );
				btn.type = 'button';
				btn.className =
					'lab-review-slider__dot' +
					( i === index ? ' is-active' : '' );
				btn.setAttribute(
					'aria-label',
					'Go to review ' + ( i + 1 )
				);
				btn.addEventListener( 'click', () => goTo( i ) );
				dotsWrap.appendChild( btn );
			} );
		}

		function goTo( nextIndex ) {
			index = ( nextIndex + slides.length ) % slides.length;
			track.style.transform = `translateX(-${ index * 100 }%)`;
			slides.forEach( ( slide, i ) => {
				slide.setAttribute( 'aria-hidden', i === index ? 'false' : 'true' );
			} );
			renderDots();
		}

		function startAutoplay() {
			if ( ! autoplay || slides.length < 2 ) {
				return;
			}
			window.clearInterval( timer );
			timer = window.setInterval( () => goTo( index + 1 ), 5000 );
		}

		if ( prev ) {
			prev.addEventListener( 'click', () => {
				goTo( index - 1 );
				startAutoplay();
			} );
		}
		if ( next ) {
			next.addEventListener( 'click', () => {
				goTo( index + 1 );
				startAutoplay();
			} );
		}

		goTo( 0 );
		startAutoplay();
	}

	function init() {
		document
			.querySelectorAll( '[data-lab-review-slider]' )
			.forEach( ( node ) => enhance( node ) );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
