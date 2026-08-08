# Step 2 — Plugin registration (PHP)

## In plain English

WordPress will not show your block until the plugin **registers** it.

Registration tells WordPress:

- “This block exists”
- “Load these JS/CSS files in the editor”
- “On the frontend, run this PHP file”

---

## Analogy

Before a product can appear in a store, it must be in the **inventory system**.  
`gutenberg-lab.php` is that inventory entry for your block.

---

## Where this sits in the flow

```text
WordPress starts
    → loads active plugins
        → gutenberg-lab.php runs on hook "init"
            → register_block_type( build/ )
                → WordPress reads build/block.json
```

If this step fails, later steps never matter — the block won’t appear in the **+** inserter.

---

## Where in this plugin

File: `gutenberg-lab.php`

```php
function create_block_gutenberg_lab_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_gutenberg_lab_block_init' );
```

Important for beginners:

- `__DIR__ . '/build'` means the **`build`** folder next to this PHP file  
- WordPress does **not** read `src/` here  
- `src/` is only for you + the build tool

---

## Tiny example

```php
// Same idea, written more explicitly:
register_block_type(
	plugin_dir_path( __FILE__ ) . 'build'
);
```

---

## How to test

1. **Plugins** screen → Gutenberg Lab is **Active**.  
2. **Posts → Add New** → click **+** → search **Gutenberg Lab**.  
3. Block should appear.

### Browser console (editor open)

```js
wp.blocks.getBlockType( 'create-block/gutenberg-lab' )
```

Expected: an object with `title`, `attributes`, etc.  
Bad: `undefined`

### Optional REST check (while logged in)

Visit:

```text
/wp-json/wp/v2/block-types/create-block/gutenberg-lab
```

You should see JSON describing the block.

---

## How to debug

| Symptom | Likely cause | What to do |
|---------|--------------|------------|
| Plugin not in list | Wrong folder or missing plugin header | Path must be `wp-content/plugins/gutenberg-lab/gutenberg-lab.php` |
| Plugin active, no block | Empty/missing `build/` | Run `npm run build` or `npm start` |
| `getBlockType` is `undefined` | Registration failed or JS not loaded | Check `debug.log`; Network tab for JS |
| White screen after activate | PHP error | Enable `WP_DEBUG_LOG`, open `wp-content/debug.log` |

### Break-and-fix (best teacher)

1. Rename `build/block.json` temporarily.  
2. Reload editor → block disappears / errors.  
3. Restore the file → block returns.

---

## Checkpoint

- Block shows in the inserter  
- `getBlockType('create-block/gutenberg-lab')` returns data  

**Previous:** [01-architecture-and-flow.md](./01-architecture-and-flow.md)  
**Next:** [03-block-json.md](./03-block-json.md)
