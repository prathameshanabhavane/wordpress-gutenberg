# Step 1 — Architecture and flow (the full picture)

This is the most important doc in the folder.  
If you understand this page, every other file feels smaller.

---

## In plain English

Your custom block is a small machine with **three jobs**:

1. **Describe itself** → `block.json`  
2. **Let the author edit it** → `edit.js` (React in the admin editor)  
3. **Show something to visitors** → `render.php` (PHP on the frontend)

Because this lab block is **dynamic**, the database mostly stores **settings** (attributes), not finished HTML. PHP builds the HTML when someone views the post.

---

## Analogy: LEGO kit + shop window

| Piece | In this plugin |
|-------|----------------|
| Kit name on the box | Block `name` in `block.json` |
| Instruction sheet | Whole `block.json` |
| Building on the table | `edit.js` |
| Barcode sticker only (no glued model) | `save.js` returns `null` |
| Shop window rebuilt for each guest | `render.php` |
| Factory that packs the kit | `npm start` → `build/` |
| Store inventory system | `gutenberg-lab.php` → `register_block_type` |

---

## Architecture diagram (components)

```text
                         ┌─────────────────────────┐
                         │     WordPress Core      │
                         │  posts, REST, editor    │
                         └───────────┬─────────────┘
                                     │
                         ┌───────────▼─────────────┐
                         │  gutenberg-lab.php      │
                         │  register_block_type(   │
                         │    __DIR__ . '/build' ) │
                         └───────────┬─────────────┘
                                     │
                         ┌───────────▼─────────────┐
                         │   build/block.json      │
                         │   (copied from src/)    │
                         └───────────┬─────────────┘
              ┌──────────────────────┼──────────────────────┐
              │                      │                      │
   ┌──────────▼──────────┐ ┌─────────▼─────────┐ ┌──────────▼──────────┐
   │ editorScript        │ │ save: null        │ │ render.php          │
   │ build/index.js      │ │ (dynamic block)   │ │ frontend HTML       │
   │  → Edit component   │ │ stores attributes │ │ every page view     │
   └─────────────────────┘ └───────────────────┘ └─────────────────────┘
```

---

## Runtime flow A — loading the editor

What happens when you open **Posts → Add New**:

```text
1. Browser requests the edit-post screen
2. WordPress prints the admin page + enqueues scripts
3. Because the block is registered, its editorScript loads
4. index.js runs registerBlockType( name, { edit, save } )
5. Block appears in the inserter as “Gutenberg Lab”
6. When inserted, React renders Edit()
7. You type → setAttributes({ message })
8. Editor state (in the browser) now holds the new message
```

**Debug this flow:** browser Console + Network (is `index.js` loaded? any red errors?)

---

## Runtime flow B — saving the post

```text
1. You click Update / Publish
2. Editor serializes blocks into post content
3. For OUR block, save() returned null, so serialization is:
     <!-- wp:create-block/gutenberg-lab {"message":"Hello lab"} /-->
4. That string is sent to WordPress (REST API) and stored in the DB
   (table wp_posts, column post_content — you don’t need to edit SQL)
```

**Debug this flow:** Editor → Options (⋮) → **Code editor**.  
You should see the block comment. No inner `<div>` for our block.

---

## Runtime flow C — visitor views the post

```text
1. Visitor opens the post URL (frontend)
2. WordPress loads post_content from the database
3. It parses block comments
4. For create-block/gutenberg-lab it finds render.php
5. PHP receives $attributes (including message)
6. render.php echoes HTML:
     <div class="wp-block-...">
       <p>Hello lab</p>
       <time>2026-...</time>
     </div>
7. Theme wraps that inside the page layout
```

**Debug this flow:** View post → View Source.  
Change message in editor, update, refresh frontend.  
Refresh again: `<time>` should change (PHP ran again).

---

## One diagram: all three flows together

```text
                 EDIT (admin browser)
                 ───────────────────
  edit.js  ←→  attributes (message)
       │
       │  Update
       ▼
                 STORE (database)
                 ────────────────
  <!-- wp:create-block/gutenberg-lab {"message":"..."} /-->
       │
       │  Visitor request
       ▼
                 VIEW (frontend)
                 ───────────────
  render.php($attributes) → HTML for humans
```

---

## Static vs dynamic (compare with core Paragraph)

Open both in Code editor on the same post:

```html
<!-- wp:paragraph -->
<p>Hello</p>
<!-- /wp:paragraph -->

<!-- wp:create-block/gutenberg-lab {"message":"Hello Gutenberg"} /-->
```

| | Paragraph (typical content block) | Gutenberg Lab (this plugin) |
|--|-----------------------------------|-----------------------------|
| Inner HTML in post? | Yes | No |
| Who draws frontend? | Mostly the saved HTML | `render.php` every time |
| Can show “live” server time easily? | Not really | Yes (`current_time`) |

Optional: open core’s sheet  
`wp-includes/blocks/paragraph/block.json`  
and compare with `src/block.json`.

---

## Where each file sits in the flow

```text
Request to admin or frontend
        │
        ▼
gutenberg-lab.php          ← “register me”
        │
        ▼
build/block.json           ← “here is my config”
        │
        ├─► build/index.js (+ edit.js logic)
        │         └─ editor only
        │
        ├─► save.js → null
        │         └─ shapes what is stored
        │
        └─► build/render.php
                  └─ frontend only
```

---

## How to test (architecture lab)

1. Insert **Paragraph** + **Gutenberg Lab**.  
2. Switch to **Code editor** — compare shapes.  
3. Change Lab message → Update → View post.  
4. Confirm frontend message + changing time.  
5. In editor Console:

```js
wp.blocks.getBlockType( 'create-block/gutenberg-lab' )
wp.data.select( 'core/block-editor' ).getBlocks()
wp.data.select( 'core/editor' ).getEditedPostContent()
```

---

## How to debug (architecture-level)

| If you think… | Check… |
|---------------|--------|
| “WordPress doesn’t know my block” | Step 2 registration + `getBlockType(...)` |
| “Editor UI is wrong” | Step 4 `edit.js` + Console errors |
| “Data isn’t saving” | Code editor JSON + `block.json` attributes |
| “Frontend is wrong but editor is fine” | Step 6 `render.php` + `debug.log` |
| “My code changes do nothing” | Step 7 build — is `npm start` running? |

---

## Checkpoint

Say this out loud without reading:

> “The plugin registers a block from `build/`. In the editor I change attributes with React. On save, only those attributes are stored. When someone views the post, PHP turns attributes into HTML.”

**Previous:** [00-wordpress-basics.md](./00-wordpress-basics.md)  
**Next:** [02-plugin-registration.md](./02-plugin-registration.md)
