# Step 1 — Plugin registration (PHP)

## What it is

WordPress must **register** the block on the server so:

- the editor knows it exists
- assets (JS/CSS) can load
- `render.php` can run on the frontend

**Analogy:** Before a brick can be sold in the store, it must be listed in the inventory system. `gutenberg-lab.php` is that inventory entry.

## Where in this plugin

File: `gutenberg-lab.php`

```php
function create_block_gutenberg_lab_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_gutenberg_lab_block_init' );
```

Important: WordPress loads **`build/`**, not `src/`.  
`build/block.json` points at built JS/CSS and `render.php`.

## Tiny example

```php
// Same idea, spelled out:
register_block_type(
	plugin_dir_path( __FILE__ ) . 'build'
);
```

WordPress reads `build/block.json` and wires everything from there.

## How to test

1. **Plugins → Installed Plugins** → Gutenberg Lab is Active.
2. Edit a post → click **+** → search **Gutenberg Lab**.
3. Block appears in the inserter.

### Console test (editor open)

```js
wp.blocks.getBlockType( 'create-block/gutenberg-lab' )
```

You should get an object (not `undefined`).

### PHP / REST test

Open (while logged in):

```text
/wp-json/wp/v2/block-types/create-block/gutenberg-lab
```

You should see JSON with `name`, `title`, `attributes`, etc.

## How to debug

| Symptom | Likely cause | Fix / check |
|---------|--------------|-------------|
| Plugin not listed | Wrong folder / missing header | File must be `wp-content/plugins/gutenberg-lab/gutenberg-lab.php` with `Plugin Name:` header |
| Plugin active, block missing | `build/` missing or empty | Run `npm run build` or `npm start` |
| `getBlockType` is `undefined` | Registration failed or JS not loaded | Check PHP errors; Network tab for `index.js` |
| Looks for `build/build/block.json` | Wrong path to collection API | Keep `register_block_type( __DIR__ . '/build' )` as in this plugin |

### Enable PHP logging

In `wp-config.php`:

```php
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
```

Then check `wp-content/debug.log`.

### Quick break-and-fix (learn by breaking)

1. Temporarily rename `build/block.json` → `build/block.json.bak`.
2. Reload editor → block should disappear / error.
3. Restore the file → block returns.

## Checkpoint

`getBlockType('create-block/gutenberg-lab')` returns data, and the block shows in the inserter.
