# Step 8 — Debug cheatsheet (all steps)

Use this when something breaks. Start at the top.

---

## Picture first: which layer failed?

```text
Plugin active? ──no──► Fix activation / PHP errors (Steps 0–2)
        │ yes
        ▼
Block in inserter? ──no──► build/ + registration (Steps 2, 7)
        │ yes
        ▼
Can edit message? ──no──► edit.js / console errors (Step 4)
        │ yes
        ▼
Code editor has JSON attrs? ──no──► attributes in block.json (Steps 3–5)
        │ yes
        ▼
Frontend shows HTML? ──no──► render.php / debug.log (Step 6)
        │ yes
        ▼
Styles / time / supports OK? ──no──► wrapper attrs + CSS build (Steps 3, 6, 7)
```

---

## 1. Environment

```php
// wp-config.php (local learning site only)
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'SCRIPT_DEBUG', true );
```

- PHP log: `wp-content/debug.log`  
- JS watch: `cd wp-content/plugins/gutenberg-lab && npm start`

---

## 2. Is the block registered?

```js
wp.blocks.getBlockType( 'create-block/gutenberg-lab' )
```

REST (logged in):

```text
/wp-json/wp/v2/block-types/create-block/gutenberg-lab
```

---

## 3. What is on the canvas?

```js
wp.data.select( 'core/block-editor' ).getBlocks()
wp.data.select( 'core/block-editor' ).getSelectedBlock()
wp.data.select( 'core/editor' ).getEditedPostContent()
```

---

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

---

## 5. Editor vs frontend tools

| Layer | Tool |
|-------|------|
| Editor UI | React + Browser Console |
| Stored data | Code editor / `getEditedPostContent()` |
| Frontend HTML | View post + View Source |
| PHP errors | `debug.log` |
| Assets | Network tab (JS/CSS status 200?) |

---

## 6. Common failures

| You see… | Check first… |
|----------|----------------|
| Block not in inserter | Plugin active? `build/` exists? `getBlockType`? |
| Invalid block warning | Did `save()` change compared to old content? |
| Edit works, frontend empty | `render.php` + `debug.log` |
| Frontend OK, styles missing | `get_block_wrapper_attributes()` + CSS loaded? |
| Code changes ignored | `npm start`? Hard refresh? Editing `src`? |
| Attribute lost on reload | Declared in `block.json`? Same spelling everywhere? |

---

## 7. Suggested “lab day” path

1. WordPress admin opens → plugin active (**Step 0–2**).  
2. Change title in `block.json` → rebuild → new title (**Step 3**).  
3. Type message → inspect attributes (**Step 4**).  
4. Code editor → self-closing comment (**Step 5**).  
5. Frontend → message + live time (**Step 6**).  
6. Stop webpack → edit file → nothing changes until build (**Step 7**).

---

## 8. Clean up after learning

Remove temporary noise:

- `console.log` in `src/edit.js`  
- `print_r( $attributes )` in `src/render.php`

Then run `npm run build` once.

---

## 9. Official docs

- [Block Editor Reference Guides](https://developer.wordpress.org/block-editor/reference-guides/) — API & architecture  
- [Gutenberg Storybook](https://wordpress.github.io/gutenberg/?path=/docs/introduction--page) — UI components  
- [Edit and Save](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/)  
- [Metadata in block.json](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/)

---

**Previous:** [08-debug-cheatsheet.md](./08-debug-cheatsheet.md)  
**Next:** [09-lab-card-block.md](./09-lab-card-block.md)  
**Back to index:** [README.md](./README.md)
