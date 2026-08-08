# Step 0 — Architecture (big picture)

## What it is

Gutenberg is a **block editor**. A post is a list of blocks, not a blob of free HTML.

**Analogy:** Writing a post = building with LEGO.

| Piece | Role |
|-------|------|
| Block | One brick |
| Attributes | Data written on / inside the brick |
| Editor (`edit`) | Building on the table |
| Saved post content | Photo + barcode of the finished model |
| Frontend (`render.php` for us) | Showing the model to visitors |

## Two kinds of blocks

```text
STATIC block
  edit → user changes
  save → HTML written into the post
  frontend → that same HTML

DYNAMIC block  ← this plugin
  edit → user changes
  save → null (only comment + JSON attributes stored)
  render.php → PHP builds HTML on every page view
```

**Analogy:**

- Static = polaroid glued in the scrapbook.
- Dynamic = rebuild the LEGO set every time a guest arrives (can show live time, latest posts, etc.).

## Data flow in *this* plugin

```text
1. PHP loads plugin → register_block_type( build/ )
2. Editor loads → index.js → registerBlockType( ... edit, save )
3. You type in RichText → setAttributes({ message })
4. You save post → DB stores:
     <!-- wp:create-block/gutenberg-lab {"message":"..."} /-->
5. Visitor opens post → WordPress runs render.php
     → HTML with message + current time
```

## Where to look in core (optional)

Open in your install:

- `wp-includes/blocks/paragraph/block.json` — a real core block’s “instruction sheet”
- Compare to `src/block.json` in this plugin

## How to test

1. New post → insert Paragraph + Gutenberg Lab.
2. Editor → **Options (⋮) → Code editor**.
3. Compare:

```html
<!-- wp:paragraph -->
<p>Hello</p>
<!-- /wp:paragraph -->

<!-- wp:create-block/gutenberg-lab {"message":"Hello Gutenberg"} /-->
```

Paragraph has inner HTML (static-ish content). Your block is self-closing (dynamic).

## How to debug

| Question | Check |
|----------|--------|
| Is my mental model wrong? | Code editor: do you see inner HTML for your block? For dynamic, you should **not**. |
| Is the editor talking to the server? | DevTools → Network → filter `wp/v2` |
| What blocks are on the page? | Console: `wp.data.select('core/block-editor').getBlocks()` |

## Checkpoint

You can explain in one sentence: *“Our block stores only attributes in the post; PHP draws the frontend.”*
