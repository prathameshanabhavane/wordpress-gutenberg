# Step 6 — Build and assets

## What it is

You edit files in `src/`. WordPress loads files from `build/`.

`@wordpress/scripts` (via `npm start` / `npm run build`) is the factory that compiles JS/CSS and copies `block.json` + `render.php`.

**Analogy:** `src` is the design studio. `build` is what ships to the store. Customers (WordPress) only buy from the store.

## Commands

From `wp-content/plugins/gutenberg-lab`:

```bash
# Development: watch mode (auto-rebuild on save)
npm start

# Production: one-time build
npm run build
```

## What you should see after a build

```text
build/
  block.json
  index.js
  index.asset.php    ← dependencies + version hash
  index.css          ← editor styles
  style-index.css    ← shared styles
  render.php
  ...
```

## How to test

1. Run `npm start`.
2. Change a string in `src/edit.js` (e.g. default visible text flow).
3. Terminal should print a rebuild success line.
4. Hard refresh the editor → change appears.
5. Stop `npm start`, change a file, refresh → **no** change (proves you need the build step).

### Asset loading test

Editor open → DevTools → Network:

- Filter `gutenberg-lab` or `index.js`
- Confirm JS and CSS return **200**
- Open `index.asset.php` in the repo — lists script dependencies (`wp-blocks`, `wp-block-editor`, …)

## How to debug

| Symptom | Likely cause | Fix / check |
|---------|--------------|-------------|
| “Module not found” in terminal | Bad import path | Fix import; save again |
| Editor shows old code | Cache or not rebuilding | Hard refresh; check terminal; disable cache in DevTools |
| White screen in editor | JS runtime error | Console tab; fix the error |
| Styles missing | SCSS not imported / wrong `block.json` style keys | `edit.js` imports `editor.scss`; `index.js` imports `style.scss` |
| `build` missing after clone | Never installed/built | `npm install` then `npm run build` |

### Break-and-fix

1. Delete `build/index.js`.
2. Reload editor → block breaks / disappears.
3. Run `npm run build` → restored.

## Checkpoint

You never expect WordPress to read `src/` directly, and you know when to use `npm start` vs `npm run build`.
