<?php
// This file is generated. Do not modify it manually.
return array(
	'build' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/gutenberg-lab',
		'version' => '0.2.0',
		'title' => 'Lab Card',
		'category' => 'widgets',
		'icon' => 'format-image',
		'description' => 'A card with image, title, description, and a call-to-action link.',
		'keywords' => array(
			'card',
			'image',
			'cta',
			'lab'
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
			'align' => array(
				'wide',
				'full'
			),
			'color' => array(
				'background' => true,
				'text' => true
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true
			),
			'html' => false
		),
		'example' => array(
			'attributes' => array(
				'title' => 'Card title',
				'description' => 'A short description of this card.',
				'ctaText' => 'Learn more',
				'ctaUrl' => '#',
				'imageUrl' => 'https://picsum.photos/640/360'
			)
		),
		'textdomain' => 'gutenberg-lab',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	)
);
