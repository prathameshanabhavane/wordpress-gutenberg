/**
 * One review card slide.
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl, TextControl } from '@wordpress/components';
import './editor.scss';

/**
 * @param {Object}   props
 * @param {Object}   props.attributes
 * @param {Function} props.setAttributes
 * @return {Element}
 */
export default function Edit( { attributes, setAttributes } ) {
	const { name, quote, rating = 5 } = attributes;
	const stars = '★'.repeat( Math.max( 1, Math.min( 5, rating ) ) );

	const blockProps = useBlockProps( {
		className: 'lab-review-card lab-review-card--editor',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Review', 'gutenberg-lab' ) }>
					<TextControl
						label={ __( 'Name', 'gutenberg-lab' ) }
						value={ name }
						onChange={ ( value ) =>
							setAttributes( { name: value } )
						}
					/>
					<RangeControl
						label={ __( 'Rating', 'gutenberg-lab' ) }
						value={ rating }
						onChange={ ( value ) =>
							setAttributes( { rating: value } )
						}
						min={ 1 }
						max={ 5 }
					/>
				</PanelBody>
			</InspectorControls>
			<article { ...blockProps }>
				<RichText
					tagName="p"
					className="lab-review-card__quote"
					value={ quote }
					onChange={ ( value ) => setAttributes( { quote: value } ) }
					placeholder={ __( 'Write the review…', 'gutenberg-lab' ) }
				/>
				<div className="lab-review-card__meta">
					<RichText
						tagName="p"
						className="lab-review-card__name"
						value={ name }
						onChange={ ( value ) =>
							setAttributes( { name: value } )
						}
						placeholder={ __( 'Name', 'gutenberg-lab' ) }
						allowedFormats={ [] }
					/>
					<p className="lab-review-card__rating" aria-label={ `${ rating } stars` }>
						{ stars }
					</p>
				</div>
			</article>
		</>
	);
}
