/**
 * Editor preview for one taxonomy term card.
 */
import { __ } from '@wordpress/i18n';
import { getTermDescription, getTermName } from './utils';

/**
 * @param {Object}  props
 * @param {Object}  props.term
 * @param {boolean} props.showDescription
 * @param {boolean} props.showCount
 * @param {boolean} props.showCta
 * @param {string}  props.ctaText
 * @param {number}  props.descriptionLines
 * @return {Element}
 */
export default function TermCardPreview( {
	term,
	showDescription,
	showCount,
	showCta,
	ctaText,
	descriptionLines = 3,
} ) {
	const name = getTermName( term ) || __( '(no name)', 'gutenberg-lab' );
	const description = getTermDescription( term );
	const count = term.count ?? 0;

	return (
		<article
			className="lab-card lab-term-card"
			style={ {
				'--lab-term-card-desc-lines': String( descriptionLines || 3 ),
			} }
		>
			<div className="lab-card__body">
				<h3 className="lab-card__title">{ name }</h3>
				{ showCount ? (
					<p className="lab-term-card__count">
						{ count === 1
							? __( '1 post', 'gutenberg-lab' )
							: `${ count } ${ __( 'posts', 'gutenberg-lab' ) }` }
					</p>
				) : null }
				{ showDescription && description ? (
					<div className="lab-card__description lab-term-card__description">
						<p>{ description }</p>
					</div>
				) : null }
				{ showCta ? (
					<p className="lab-card__cta-wrap">
						<span className="lab-card__cta">
							{ ctaText ||
								__( 'View posts', 'gutenberg-lab' ) }
						</span>
					</p>
				) : null }
			</div>
		</article>
	);
}
