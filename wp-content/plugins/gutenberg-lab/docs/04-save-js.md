# Step 4 — `save.js` (what goes into the post)

## What it is

`save` decides **what HTML is written into `post_content`**.

For **this** plugin, save returns `null` → WordPress stores only the block comment + attributes. The visible HTML is built later by `render.php`.

**Analogy:**

- Static `save` = gluing the finished model into the scrapbook.
- Our `save: null` = storing only the barcode; the store rebuilds the model when someone visits.

## Where in this plugin

File: `src/save.js`

```js
export default function save() {
	return null;
}
```

Wired in `src/index.js`:

```js
registerBlockType( metadata.name, {
	edit: Edit,
	save: Save,
} );
```

## Tiny example — what gets stored

After you type a message and save the post, Code editor looks like:

```html
<!-- wp:create-block/gutenberg-lab {"message":"Hello lab"} /-->
```

Self-closing. No `<div>` inside. That is correct for dynamic blocks.

## How to test

1. Insert block, set message to `Stored only in JSON`.
2. Save post.
3. **Code editor** → confirm self-closing comment with JSON.
4. View post on frontend → you still see a real `<div>` and `<p>` (from PHP).
5. View page source on frontend → HTML comes from `render.php`, not from the comment body.

### Compare with Paragraph

Insert a Paragraph, switch to Code editor: you will see opening + closing comments **and** inner `<p>...</p>`. Different storage model.

## How to debug

| Symptom | Likely cause | Fix / check |
|---------|--------------|-------------|
| “Invalid content” / unexpected block | You returned HTML from `save` earlier, then changed `save` to `null` (or the opposite) without migrating | Attempt recovery / re-insert block; learn [deprecations](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-deprecation/) later |
| Frontend empty but editor has text | `render.php` broken, not `save` | Debug Step 5 |
| Code editor shows inner HTML for your block | `save` is not returning `null` (old build) | Rebuild; confirm `build/` matches `src/save.js` |

### Break-and-fix (see validation)

Only for learning — then undo:

1. Change `save` to return a `<div>saved</div>`.
2. Rebuild, save a **new** post with the block.
3. Change `save` back to `null`, rebuild, reopen that post.
4. WordPress may complain the block is invalid — because stored HTML no longer matches `save()`.

That pain is how you learn why dynamic vs static matters.

## Checkpoint

You can open Code editor and explain why the Gutenberg Lab block has **no inner HTML**.
