/**
 * Editor preview for a single mapped/queried post card.
 */
import { __ } from '@wordpress/i18n';
import { getPostExcerpt, getPostTitle, getPostTerms } from './utils';

/**
 * @param {Object}   props
 * @param {Object}   props.post
 * @param {boolean}  props.showCta
 * @param {string}   props.ctaText
 * @param {boolean}  props.showTerms
 * @param {boolean}  props.showCategories
 * @param {boolean}  props.showTags
 * @param {number}   props.maxTerms
 * @param {number[]} props.selectedTermIds
 * @return {Element}
 */
export default function PostCardPreview( {
	post,
	showCta,
	ctaText,
	showTerms,
	showCategories,
	showTags,
	maxTerms,
	selectedTermIds = [],
} ) {
	const title = getPostTitle( post ) || __( '(no title)', 'gutenberg-lab' );
	const excerpt = getPostExcerpt( post );
	const image =
		post._embedded?.[ 'wp:featuredmedia' ]?.[ 0 ]?.source_url || '';
	const terms = showTerms
		? getPostTerms( post, {
				showCategories,
				showTags,
				maxTerms,
				selectedTermIds,
		  } )
		: [];

	return (
		<article className="lab-card lab-post-card">
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
				{ terms.length > 0 ? (
					<ul className="lab-post-card__terms">
						{ terms.map( ( term ) => (
							<li
								key={ `${ term.taxonomy }-${ term.id }` }
								className={ `lab-post-card__term lab-post-card__term--${ term.taxonomy }` }
							>
								<span>{ term.name }</span>
							</li>
						) ) }
					</ul>
				) : null }
				{ excerpt ? (
					<div className="lab-card__description">
						<p>{ excerpt }</p>
					</div>
				) : null }
				{ showCta ? (
					<p className="lab-card__cta-wrap">
						<span className="lab-card__cta">
							{ ctaText ||
								__( 'Read more', 'gutenberg-lab' ) }
						</span>
					</p>
				) : null }
			</div>
		</article>
	);
}
