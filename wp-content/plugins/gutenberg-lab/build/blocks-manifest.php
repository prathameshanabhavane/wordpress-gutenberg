<?php
// This file is generated. Do not modify it manually.
return array(
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
	)
);
