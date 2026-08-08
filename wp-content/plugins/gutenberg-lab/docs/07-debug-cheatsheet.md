# Debug cheatsheet (all steps)

Keep this open while learning.

## 1. Environment

```php
// wp-config.php (local only)
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'SCRIPT_DEBUG', true );
```

- PHP log: `wp-content/debug.log`
- Plugin watch: `cd wp-content/plugins/gutenberg-lab && npm start`

## 2. Is the block registered?

```js
wp.blocks.getBlockType( 'create-block/gutenberg-lab' )
```

REST (logged in):

```text
/wp-json/wp/v2/block-types/create-block/gutenberg-lab
```

## 3. What is on the canvas?

```js
// All blocks in the post
wp.data.select( 'core/block-editor' ).getBlocks()

// Selected block
wp.data.select( 'core/block-editor' ).getSelectedBlock()

// Serialized content (like Code editor)
wp.data.select( 'core/editor' ).getEditedPostContent()
```

## 4. Change attributes from the console

```js
const block = wp.data.select( 'core/block-editor' ).getSelectedBlock();
if ( block ) {
	wp.data.dispatch( 'core/block-editor' ).updateBlockAttributes(
		block.clientId,
		{ message: 'Debug ' + Date.now() }
	);
}
```

## 5. Editor vs frontend

| Layer | Tool |
|-------|------|
| Editor UI | React component + Console |
| Stored data | Code editor / `getEditedPostContent()` |
| Frontend HTML | View post + View Source |
| PHP errors | `debug.log` |
| Assets | Network tab (JS/CSS 200?) |

## 6. Common failures (quick matrix)

| You see… | Check first… |
|----------|----------------|
| Block not in inserter | Plugin active? `build/` exists? `getBlockType`? |
| Invalid block warning | `save()` changed vs old post content |
| Edit works, frontend empty | `render.php` + `debug.log` |
| Frontend OK, styles missing | `get_block_wrapper_attributes()` + `style-index.css` loaded |
| Code changes ignored | `npm start` running? Hard refresh? Editing `src` not only `build`? |
| Attribute lost on reload | Declared in `block.json`? Name spelled the same everywhere? |

## 7. Suggested “lab day” path

1. Insert block → confirm inserter (**Step 1**).
2. Change title in `block.json` → rebuild → see new title (**Step 2**).
3. Type message → inspect attributes in console (**Step 3**).
4. Open Code editor → confirm self-closing comment (**Step 4**).
5. View frontend → message + live time (**Step 5**).
6. Stop webpack → edit file → prove nothing changes until build (**Step 6**).

## 8. Clean up when finished learning

Remove temporary debug noise before sharing the plugin:

- `console.log` in `src/edit.js`
- `print_r( $attributes )` dumps in `src/render.php`

Then run `npm run build` once more.

## 9. Official docs (next reading)

- [Block Editor Reference Guides](https://developer.wordpress.org/block-editor/reference-guides/)
- [Edit and Save](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/)
- [Metadata in block.json](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/)
- [Storybook components](https://wordpress.github.io/gutenberg/?path=/docs/introduction--page)
