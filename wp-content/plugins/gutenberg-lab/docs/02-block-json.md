# Step 2 — `block.json` (the instruction sheet)

## What it is

`block.json` is the **single source of truth** for the block: name, title, attributes, supports, which scripts/styles to load, and (for us) which PHP file renders the frontend.

**Analogy:** The printed sheet inside a LEGO box — name of the set, piece list, and which instructions to follow.

## Where in this plugin

Source of truth while coding: `src/block.json`  
What WordPress actually reads: `build/block.json` (copied/built by `@wordpress/scripts`)

Current shape:

```json
{
  "apiVersion": 3,
  "name": "create-block/gutenberg-lab",
  "title": "Gutenberg Lab",
  "category": "widgets",
  "attributes": {
    "message": { "type": "string", "default": "Hello Gutenberg" }
  },
  "supports": {
    "color": { "background": true, "text": true },
    "spacing": { "padding": true, "margin": true }
  },
  "editorScript": "file:./index.js",
  "editorStyle": "file:./index.css",
  "style": "file:./style-index.css",
  "render": "file:./render.php"
}
```

## Field cheat sheet

| Field | Meaning |
|-------|---------|
| `name` | Unique ID `namespace/block` — **do not rename lightly** (stored in posts) |
| `title` | Label in the inserter |
| `category` | Inserter group (`widgets`, `text`, …) |
| `attributes` | Data the block stores |
| `supports` | Built-in editor controls (color, spacing, …) |
| `editorScript` | JS for the editor |
| `style` | CSS for editor + frontend |
| `render` | PHP template for frontend (dynamic block) |

## Tiny example — add another attribute

In `src/block.json`:

```json
"attributes": {
  "message": { "type": "string", "default": "Hello Gutenberg" },
  "showTime": { "type": "boolean", "default": true }
}
```

Then use `attributes.showTime` in `edit.js` and `render.php`. Rebuild / let `npm start` watch.

## How to test

1. Change `"title"` to `"Gutenberg Lab v2"` in `src/block.json`.
2. Wait for rebuild (or `npm run build`).
3. Hard refresh the editor (Cmd+Shift+R).
4. Inserter should show the new title.

### Attribute default test

1. Insert a **fresh** block (do not reuse old one).
2. Without typing, save.
3. Code editor should show default or omit default depending on WP version — either way, frontend should show `Hello Gutenberg` (or your default).

### Supports test

1. Select the block.
2. In the sidebar, you should see **Color** and **Spacing** (Dimensions) controls.
3. Set a background color → save → view frontend.
4. Wrapper should get classes / styles (via `get_block_wrapper_attributes()` in `render.php`).

## How to debug

| Symptom | Likely cause | Fix / check |
|---------|--------------|-------------|
| Title change ignored | Editing `src` but `build` stale | Run `npm start` / `npm run build`, hard refresh |
| New attribute always `undefined` | Forgot to rebuild; or reading wrong name | Confirm `build/block.json`; check `attributes` in console |
| Color UI missing | `supports` missing or typo | Compare with `src/block.json` |
| Invalid JSON | Trailing comma / comment in JSON | JSON cannot have comments; validate in editor |

### Console

```js
wp.blocks.getBlockType( 'create-block/gutenberg-lab' ).attributes
wp.blocks.getBlockType( 'create-block/gutenberg-lab' ).supports
```

## Checkpoint

You know: changing `src/block.json` only matters after it lands in `build/`, and `attributes` + `supports` drive both editor and stored data.
