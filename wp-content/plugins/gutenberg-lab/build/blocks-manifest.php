<?php
// This file is generated. Do not modify it manually.
return array(
	'lab-accordion' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/lab-accordion',
		'version' => '0.1.0',
		'title' => 'Lab Accordion',
		'category' => 'widgets',
		'icon' => 'editor-justify',
		'description' => 'Add accordion items as needed. Each item can hold cards, a review slider, text, and fields.',
		'keywords' => array(
			'accordion',
			'faq',
			'collapse',
			'lab'
		),
		'parent' => array(
			'create-block/lab-tab'
		),
		'allowedBlocks' => array(
			'create-block/lab-accordion-item'
		),
		'attributes' => array(
			'allowMultiple' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'supports' => array(
			'html' => false,
			'reusable' => false
		),
		'textdomain' => 'gutenberg-lab',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js',
		'render' => 'file:./render.php'
	),
	'lab-accordion-item' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/lab-accordion-item',
		'version' => '0.1.0',
		'title' => 'Lab Accordion Item',
		'category' => 'widgets',
		'icon' => 'arrow-down-alt2',
		'description' => 'One accordion section: title plus rich text, cards, review slider, checkbox/radio fields.',
		'keywords' => array(
			'accordion',
			'item',
			'section',
			'lab'
		),
		'parent' => array(
			'create-block/lab-accordion'
		),
		'allowedBlocks' => array(
			'core/paragraph',
			'core/heading',
			'create-block/lab-cards',
			'create-block/lab-review-slider',
			'create-block/lab-fields-ui',
			'create-block/lab-form-fields'
		),
		'attributes' => array(
			'title' => array(
				'type' => 'string',
				'default' => ''
			),
			'openByDefault' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'supports' => array(
			'html' => false,
			'reusable' => false
		),
		'textdomain' => 'gutenberg-lab',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'lab-card' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/lab-card',
		'version' => '0.3.0',
		'title' => 'Lab Card',
		'category' => 'widgets',
		'icon' => 'format-image',
		'description' => 'One card: image, title, description, and CTA link. Use inside Lab Cards.',
		'keywords' => array(
			'card',
			'image',
			'cta',
			'lab'
		),
		'parent' => array(
			'create-block/lab-cards'
		),
		'attributes' => array(
			'imageId' => array(
				'type' => 'number'
			),
			'imageUrl' => array(
				'type' => 'string',
				'default' => ''
			),
			'imageAlt' => array(
				'type' => 'string',
				'default' => ''
			),
			'title' => array(
				'type' => 'string',
				'default' => ''
			),
			'description' => array(
				'type' => 'string',
				'default' => ''
			),
			'ctaText' => array(
				'type' => 'string',
				'default' => 'Learn more'
			),
			'ctaUrl' => array(
				'type' => 'string',
				'default' => ''
			),
			'ctaOpensInNewTab' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'supports' => array(
			'color' => array(
				'background' => true,
				'text' => true
			),
			'spacing' => array(
				'padding' => true
			),
			'html' => false,
			'reusable' => false
		),
		'textdomain' => 'gutenberg-lab',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'lab-cards' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/lab-cards',
		'version' => '0.3.0',
		'title' => 'Lab Cards',
		'category' => 'widgets',
		'icon' => 'grid-view',
		'description' => 'A repeating grid of Lab Cards. Click + to add as many cards as you want.',
		'keywords' => array(
			'cards',
			'grid',
			'loop',
			'repeater',
			'lab'
		),
		'allowedBlocks' => array(
			'create-block/lab-card'
		),
		'attributes' => array(
			'columns' => array(
				'type' => 'number',
				'default' => 3
			)
		),
		'supports' => array(
			'align' => array(
				'wide',
				'full'
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true
			),
			'html' => false
		),
		'example' => array(
			'attributes' => array(
				'columns' => 2
			),
			'innerBlocks' => array(
				array(
					'name' => 'create-block/lab-card',
					'attributes' => array(
						'title' => 'Card one',
						'description' => 'First card description.',
						'ctaText' => 'Learn more',
						'ctaUrl' => '#',
						'imageUrl' => 'https://picsum.photos/640/360?1'
					)
				),
				array(
					'name' => 'create-block/lab-card',
					'attributes' => array(
						'title' => 'Card two',
						'description' => 'Second card description.',
						'ctaText' => 'Learn more',
						'ctaUrl' => '#',
						'imageUrl' => 'https://picsum.photos/640/360?2'
					)
				)
			)
		),
		'textdomain' => 'gutenberg-lab',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'lab-category-cards' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/lab-category-cards',
		'version' => '0.1.0',
		'title' => 'Lab Category Cards',
		'category' => 'widgets',
		'icon' => 'category',
		'description' => 'Display categories as cards. Choose All, Include only, or Exclude specific categories.',
		'keywords' => array(
			'category',
			'categories',
			'cards',
			'taxonomy',
			'lab'
		),
		'attributes' => array(
			'columns' => array(
				'type' => 'number',
				'default' => 3
			),
			'termsToShow' => array(
				'type' => 'number',
				'default' => 12
			),
			'orderBy' => array(
				'type' => 'string',
				'default' => 'name'
			),
			'order' => array(
				'type' => 'string',
				'default' => 'asc'
			),
			'source' => array(
				'type' => 'string',
				'default' => 'all'
			),
			'selectedTermIds' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'hideEmpty' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showDescription' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showCount' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showCta' => array(
				'type' => 'boolean',
				'default' => true
			),
			'ctaText' => array(
				'type' => 'string',
				'default' => 'View posts'
			),
			'descriptionLines' => array(
				'type' => 'number',
				'default' => 3
			)
		),
		'supports' => array(
			'align' => array(
				'wide',
				'full'
			),
			'html' => false
		),
		'textdomain' => 'gutenberg-lab',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'lab-field-ui' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/lab-field-ui',
		'version' => '0.1.0',
		'title' => 'Lab Field UI',
		'category' => 'widgets',
		'icon' => 'text',
		'description' => 'One display row. Set type and value in admin; frontend shows content only.',
		'keywords' => array(
			'display',
			'field',
			'ui',
			'lab'
		),
		'parent' => array(
			'create-block/lab-fields-ui',
			'create-block/lab-repeater-row'
		),
		'attributes' => array(
			'fieldType' => array(
				'type' => 'string',
				'default' => 'text'
			),
			'label' => array(
				'type' => 'string',
				'default' => ''
			),
			'textValue' => array(
				'type' => 'string',
				'default' => ''
			),
			'textareaValue' => array(
				'type' => 'string',
				'default' => ''
			),
			'toggleValue' => array(
				'type' => 'boolean',
				'default' => false
			),
			'selectValue' => array(
				'type' => 'string',
				'default' => 'option-a'
			),
			'checkboxValue' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'radioValue' => array(
				'type' => 'string',
				'default' => 'option-a'
			),
			'options' => array(
				'type' => 'array',
				'default' => array(
					array(
						'label' => 'Option A',
						'value' => 'option-a'
					),
					array(
						'label' => 'Option B',
						'value' => 'option-b'
					),
					array(
						'label' => 'Option C',
						'value' => 'option-c'
					)
				)
			),
			'rangeValue' => array(
				'type' => 'number',
				'default' => 40
			),
			'tokensValue' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'imageId' => array(
				'type' => 'number'
			),
			'imageUrl' => array(
				'type' => 'string',
				'default' => ''
			),
			'imageAlt' => array(
				'type' => 'string',
				'default' => ''
			),
			'fileId' => array(
				'type' => 'number'
			),
			'fileUrl' => array(
				'type' => 'string',
				'default' => ''
			),
			'fileName' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'supports' => array(
			'html' => false,
			'reusable' => false
		),
		'textdomain' => 'gutenberg-lab',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'lab-fields-ui' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/lab-fields-ui',
		'version' => '0.1.0',
		'title' => 'Lab Fields UI',
		'category' => 'widgets',
		'icon' => 'visibility',
		'description' => 'Display-only field rows. Configure values in the editor; frontend shows content, not form controls.',
		'keywords' => array(
			'display',
			'fields',
			'ui',
			'content',
			'lab'
		),
		'allowedBlocks' => array(
			'create-block/lab-field-ui'
		),
		'supports' => array(
			'html' => false,
			'align' => array(
				'wide'
			)
		),
		'textdomain' => 'gutenberg-lab',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'lab-form-field' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/lab-form-field',
		'version' => '0.2.0',
		'title' => 'Lab Form Field',
		'category' => 'widgets',
		'icon' => 'editor-textcolor',
		'description' => 'One form control for reference. Choose the field type, then edit its value.',
		'keywords' => array(
			'field',
			'input',
			'form',
			'lab'
		),
		'parent' => array(
			'create-block/lab-form-fields'
		),
		'attributes' => array(
			'fieldType' => array(
				'type' => 'string',
				'default' => 'text'
			),
			'label' => array(
				'type' => 'string',
				'default' => ''
			),
			'textValue' => array(
				'type' => 'string',
				'default' => ''
			),
			'textareaValue' => array(
				'type' => 'string',
				'default' => ''
			),
			'toggleValue' => array(
				'type' => 'boolean',
				'default' => false
			),
			'selectValue' => array(
				'type' => 'string',
				'default' => 'option-a'
			),
			'checkboxValue' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'radioValue' => array(
				'type' => 'string',
				'default' => 'option-a'
			),
			'options' => array(
				'type' => 'array',
				'default' => array(
					array(
						'label' => 'Option A',
						'value' => 'option-a'
					),
					array(
						'label' => 'Option B',
						'value' => 'option-b'
					),
					array(
						'label' => 'Option C',
						'value' => 'option-c'
					)
				)
			),
			'rangeValue' => array(
				'type' => 'number',
				'default' => 40
			),
			'tokensValue' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'imageId' => array(
				'type' => 'number'
			),
			'imageUrl' => array(
				'type' => 'string',
				'default' => ''
			),
			'imageAlt' => array(
				'type' => 'string',
				'default' => ''
			),
			'fileId' => array(
				'type' => 'number'
			),
			'fileUrl' => array(
				'type' => 'string',
				'default' => ''
			),
			'fileName' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'supports' => array(
			'html' => false,
			'reusable' => false
		),
		'textdomain' => 'gutenberg-lab',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js',
		'render' => 'file:./render.php'
	),
	'lab-form-fields' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/lab-form-fields',
		'version' => '0.2.0',
		'title' => 'Lab Form Fields',
		'category' => 'widgets',
		'icon' => 'forms',
		'description' => 'Add form controls one by one (+). Each child is a single field type for reference.',
		'keywords' => array(
			'form',
			'fields',
			'controls',
			'reference',
			'lab'
		),
		'allowedBlocks' => array(
			'create-block/lab-form-field'
		),
		'supports' => array(
			'html' => false,
			'align' => array(
				'wide'
			)
		),
		'textdomain' => 'gutenberg-lab',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'lab-post-cards' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/lab-post-cards',
		'version' => '0.1.0',
		'title' => 'Lab Post Cards',
		'category' => 'widgets',
		'icon' => 'admin-post',
		'description' => 'Query posts by search, category, or tag and map them into Lab Card UI.',
		'keywords' => array(
			'posts',
			'cards',
			'query',
			'category',
			'tag',
			'search',
			'lab'
		),
		'attributes' => array(
			'columns' => array(
				'type' => 'number',
				'default' => 3
			),
			'postsToShow' => array(
				'type' => 'number',
				'default' => 6
			),
			'orderBy' => array(
				'type' => 'string',
				'default' => 'date'
			),
			'order' => array(
				'type' => 'string',
				'default' => 'desc'
			),
			'search' => array(
				'type' => 'string',
				'default' => ''
			),
			'categoryId' => array(
				'type' => 'number',
				'default' => 0
			),
			'tagId' => array(
				'type' => 'number',
				'default' => 0
			),
			'selectedPostIds' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'source' => array(
				'type' => 'string',
				'default' => 'query'
			),
			'showCta' => array(
				'type' => 'boolean',
				'default' => true
			),
			'ctaText' => array(
				'type' => 'string',
				'default' => 'Read more'
			),
			'showTerms' => array(
				'type' => 'boolean',
				'default' => false
			),
			'showCategories' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showTags' => array(
				'type' => 'boolean',
				'default' => true
			),
			'maxTerms' => array(
				'type' => 'number',
				'default' => 3
			),
			'selectedTermIds' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'excerptLines' => array(
				'type' => 'number',
				'default' => 3
			)
		),
		'supports' => array(
			'align' => array(
				'wide',
				'full'
			),
			'html' => false
		),
		'textdomain' => 'gutenberg-lab',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'lab-repeater' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/lab-repeater',
		'version' => '0.1.0',
		'title' => 'Lab Repeater',
		'category' => 'widgets',
		'icon' => 'table-row-after',
		'description' => 'ACF-style repeater: add rows, each row holds Lab Field UI sub fields.',
		'keywords' => array(
			'repeater',
			'acf',
			'rows',
			'fields',
			'lab'
		),
		'allowedBlocks' => array(
			'create-block/lab-repeater-row'
		),
		'attributes' => array(
			'buttonLabel' => array(
				'type' => 'string',
				'default' => 'Add Row'
			)
		),
		'supports' => array(
			'html' => false,
			'align' => array(
				'wide'
			)
		),
		'textdomain' => 'gutenberg-lab',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'lab-repeater-row' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/lab-repeater-row',
		'version' => '0.1.0',
		'title' => 'Lab Repeater Row',
		'category' => 'widgets',
		'icon' => 'editor-ul',
		'description' => 'One repeater row. Add Lab Field UI sub fields inside.',
		'keywords' => array(
			'row',
			'repeater',
			'lab'
		),
		'parent' => array(
			'create-block/lab-repeater'
		),
		'allowedBlocks' => array(
			'create-block/lab-field-ui'
		),
		'attributes' => array(
			'rowLabel' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'supports' => array(
			'html' => false,
			'reusable' => false
		),
		'textdomain' => 'gutenberg-lab',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'lab-review-card' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/lab-review-card',
		'version' => '0.1.0',
		'title' => 'Lab Review Card',
		'category' => 'widgets',
		'icon' => 'format-quote',
		'description' => 'One review slide: quote, name, and star rating.',
		'keywords' => array(
			'review',
			'testimonial',
			'quote',
			'lab'
		),
		'parent' => array(
			'create-block/lab-review-slider'
		),
		'attributes' => array(
			'name' => array(
				'type' => 'string',
				'default' => ''
			),
			'quote' => array(
				'type' => 'string',
				'default' => ''
			),
			'rating' => array(
				'type' => 'number',
				'default' => 5
			)
		),
		'supports' => array(
			'html' => false,
			'reusable' => false
		),
		'textdomain' => 'gutenberg-lab',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'lab-review-slider' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/lab-review-slider',
		'version' => '0.1.0',
		'title' => 'Lab Review Slider',
		'category' => 'widgets',
		'icon' => 'slides',
		'description' => 'A slider of review cards. Add as many reviews as you need.',
		'keywords' => array(
			'review',
			'slider',
			'carousel',
			'testimonial',
			'lab'
		),
		'allowedBlocks' => array(
			'create-block/lab-review-card'
		),
		'attributes' => array(
			'autoplay' => array(
				'type' => 'boolean',
				'default' => false
			),
			'showDots' => array(
				'type' => 'boolean',
				'default' => true
			)
		),
		'supports' => array(
			'align' => array(
				'wide'
			),
			'html' => false
		),
		'textdomain' => 'gutenberg-lab',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js',
		'render' => 'file:./render.php'
	),
	'lab-search' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/lab-search',
		'version' => '0.1.0',
		'title' => 'Lab Search',
		'category' => 'widgets',
		'icon' => 'search',
		'description' => 'Search posts, pages, categories, tags, and custom types. Use WordPress default search or pick targets.',
		'keywords' => array(
			'search',
			'find',
			'posts',
			'pages',
			'categories',
			'tags',
			'lab'
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string',
				'default' => 'Search'
			),
			'showLabel' => array(
				'type' => 'boolean',
				'default' => false
			),
			'placeholder' => array(
				'type' => 'string',
				'default' => 'Search…'
			),
			'buttonText' => array(
				'type' => 'string',
				'default' => 'Search'
			),
			'scope' => array(
				'type' => 'string',
				'default' => 'default'
			),
			'postTypes' => array(
				'type' => 'array',
				'default' => array(
					'post',
					'page'
				)
			),
			'taxonomies' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'liveResults' => array(
				'type' => 'boolean',
				'default' => true
			),
			'resultsMode' => array(
				'type' => 'string',
				'default' => 'limited'
			),
			'resultsLimit' => array(
				'type' => 'number',
				'default' => 8
			),
			'excludedPostIds' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'excludedTermIds' => array(
				'type' => 'array',
				'default' => array(
					
				)
			)
		),
		'supports' => array(
			'align' => array(
				'wide',
				'full'
			),
			'html' => false
		),
		'textdomain' => 'gutenberg-lab',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js',
		'render' => 'file:./render.php'
	),
	'lab-tab' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/lab-tab',
		'version' => '0.1.0',
		'title' => 'Lab Tab',
		'category' => 'widgets',
		'icon' => 'table-row-after',
		'description' => 'One tab panel. Holds an accordion. Rename the tab label in the sidebar or header.',
		'keywords' => array(
			'tab',
			'panel',
			'lab'
		),
		'parent' => array(
			'create-block/lab-tabs'
		),
		'allowedBlocks' => array(
			'create-block/lab-accordion'
		),
		'attributes' => array(
			'tabLabel' => array(
				'type' => 'string',
				'default' => 'Tab'
			)
		),
		'supports' => array(
			'html' => false,
			'reusable' => false
		),
		'textdomain' => 'gutenberg-lab',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'lab-tab-suite' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/lab-tab-suite',
		'version' => '0.1.0',
		'title' => 'Lab Tab Suite',
		'category' => 'widgets',
		'icon' => 'index-card',
		'description' => 'One block: add tabs, then accordion items inside each tab, then simple fields (text, rich text, checkbox, radio, dropdown, textarea, toggle).',
		'keywords' => array(
			'tabs',
			'accordion',
			'fields',
			'form',
			'lab'
		),
		'attributes' => array(
			'tabs' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'allowMultipleOpen' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'supports' => array(
			'align' => array(
				'wide',
				'full'
			),
			'html' => false,
			'reusable' => true
		),
		'textdomain' => 'gutenberg-lab',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js',
		'render' => 'file:./render.php'
	),
	'lab-tabs' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/lab-tabs',
		'version' => '0.1.0',
		'title' => 'Lab Tabs',
		'category' => 'widgets',
		'icon' => 'index-card',
		'description' => 'Add tabs as needed. Each tab holds an accordion for FAQ-style or sectioned content.',
		'keywords' => array(
			'tabs',
			'tab',
			'accordion',
			'sections',
			'lab'
		),
		'allowedBlocks' => array(
			'create-block/lab-tab'
		),
		'attributes' => array(
			
		),
		'supports' => array(
			'align' => array(
				'wide',
				'full'
			),
			'html' => false
		),
		'textdomain' => 'gutenberg-lab',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js',
		'render' => 'file:./render.php'
	),
	'lab-tag-cards' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/lab-tag-cards',
		'version' => '0.1.0',
		'title' => 'Lab Tag Cards',
		'category' => 'widgets',
		'icon' => 'tag',
		'description' => 'Display tags as cards. Choose All, Include only, or Exclude specific tags.',
		'keywords' => array(
			'tag',
			'tags',
			'cards',
			'taxonomy',
			'lab'
		),
		'attributes' => array(
			'columns' => array(
				'type' => 'number',
				'default' => 3
			),
			'termsToShow' => array(
				'type' => 'number',
				'default' => 12
			),
			'orderBy' => array(
				'type' => 'string',
				'default' => 'name'
			),
			'order' => array(
				'type' => 'string',
				'default' => 'asc'
			),
			'source' => array(
				'type' => 'string',
				'default' => 'all'
			),
			'selectedTermIds' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'hideEmpty' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showDescription' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showCount' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showCta' => array(
				'type' => 'boolean',
				'default' => true
			),
			'ctaText' => array(
				'type' => 'string',
				'default' => 'View posts'
			),
			'descriptionLines' => array(
				'type' => 'number',
				'default' => 3
			)
		),
		'supports' => array(
			'align' => array(
				'wide',
				'full'
			),
			'html' => false
		),
		'textdomain' => 'gutenberg-lab',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	)
);
