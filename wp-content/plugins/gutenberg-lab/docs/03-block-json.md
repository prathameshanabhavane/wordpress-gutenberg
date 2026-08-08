# Step 3 — `block.json` (the instruction sheet)

## In plain English

`block.json` describes your block in one place:

- What it is called  
- What data it stores (**attributes**)  
- Which editor features it supports (colors, spacing…)  
- Which JS / CSS / PHP files belong to it  

WordPress and the build tool both trust this file.

---

## Analogy

It is the **printed instruction sheet** inside a LEGO box: set name, piece list, and which booklet to follow.

---

## Where this sits in the flow

```text
register_block_type(build/)
        │
        ▼
build/block.json   ← WordPress reads THIS
        ▲
        │ npm copies/builds from
src/block.json     ← YOU edit THIS
```

Beginner rule: edit `src/block.json`, then wait for `npm start` to update `build/`.

---

## Where in this plugin

`src/block.json` (simplified view of what we have):

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

### Field meanings (simple)

| Field | Meaning |
|-------|---------|
| `name` | Unique ID. Stored in posts. Don’t rename casually. |
| `title` | Label humans see in the inserter |
| `category` | Which inserter group (widgets, text, …) |
| `attributes` | Data the block remembers |
| `supports` | Built-in sidebar controls WordPress adds for free |
| `editorScript` | JavaScript for the editor |
| `render` | PHP file for the frontend (dynamic block) |

---

## Tiny example — add another setting later

```json
"attributes": {
  "message": { "type": "string", "default": "Hello Gutenberg" },
  "showTime": { "type": "boolean", "default": true }
}
```

Then you would read `attributes.showTime` in `edit.js` and `render.php`.

---

## How to test

1. Change `"title"` to `"Gutenberg Lab v2"` in `src/block.json`.  
2. Wait for rebuild (`npm start`) or run `npm run build`.  
3. Hard refresh the editor (Cmd+Shift+R / Ctrl+Shift+R).  
4. Inserter should show the new title.

### Supports test

1. Insert the block and select it.  
2. Right sidebar should offer **Color** and **Spacing**.  
3. Set a background → Update → View frontend.  
4. Styling should appear (because `render.php` uses `get_block_wrapper_attributes()`).

### Console

```js
wp.blocks.getBlockType( 'create-block/gutenberg-lab' ).attributes
wp.blocks.getBlockType( 'create-block/gutenberg-lab' ).supports
```

---

## How to debug

| Symptom | Likely cause | What to do |
|---------|--------------|------------|
| Title/attr change ignored | Only edited `src`, `build` stale | Rebuild + hard refresh |
| New attribute always empty | Typo in name, or not rebuilt | Compare `src` and `build` `block.json` |
| Color UI missing | `supports` missing/typo | Fix JSON, rebuild |
| JSON error | Trailing comma / invalid JSON | JSON cannot include comments |

---

## Checkpoint

You know `block.json` is the contract, and WordPress reads the **`build`** copy.

**Previous:** [02-plugin-registration.md](./02-plugin-registration.md)  
**Next:** [04-edit-js.md](./04-edit-js.md)
