# Step 5 — `save.js` (what is written into the post)

## In plain English

`save` answers: **“When the post is saved, what HTML should be stored inside the database for this block?”**

For this lab, the answer is: **nothing** (`null`).

We only store the block name + attributes in a special comment.  
The visible HTML for visitors is created later by `render.php`.

That pattern is called a **dynamic block**.

---

## Analogy

- **Static save** = glue a finished LEGO model into a scrapbook.  
- **Our save (`null`)** = keep only the barcode; rebuild the model in the shop window whenever a guest arrives.

---

## Where this sits in the flow

```text
You click Update
    → editor asks save() for HTML
        → save returns null
            → database gets:
               <!-- wp:create-block/gutenberg-lab {"message":"..."} /-->
                → (no inner HTML)
```

Frontend flow continues in the next step with `render.php`.

---

## Where in this plugin

File: `src/save.js`

```js
export default function save() {
	return null;
}
```

Connected in `src/index.js`:

```js
registerBlockType( metadata.name, {
	edit: Edit,
	save: Save,
} );
```

---

## Tiny example — what you should see in Code editor

```html
<!-- wp:create-block/gutenberg-lab {"message":"Hello lab"} /-->
```

Self-closing. This is **success**, not a bug.

Compare with a Paragraph:

```html
<!-- wp:paragraph -->
<p>Hello</p>
<!-- /wp:paragraph -->
```

Paragraph stores inner HTML. We don’t.

---

## How to test

1. Set message to `Stored only in JSON`.  
2. Update the post.  
3. Open **Code editor** → confirm self-closing comment + JSON.  
4. **View post** → you still see real HTML (from PHP).  
5. View frontend page source → HTML comes from `render.php`.

---

## How to debug

| Symptom | Likely cause | What to do |
|---------|--------------|------------|
| “This block contains unexpected or invalid content” | `save` output changed vs old saved posts | Re-insert block, or learn deprecations later |
| Frontend empty, editor fine | Not a save problem — check `render.php` | Go to Step 6 |
| Code editor shows inner HTML for Lab block | Old build still returning HTML from `save` | Rebuild; confirm `src/save.js` is `null` |

### Break-and-fix (optional, then undo)

1. Make `save` return `<div>saved</div>`, rebuild, save a new post.  
2. Change `save` back to `null`, rebuild, reopen that post.  
3. WordPress may mark the block invalid — now you *felt* why save must stay stable.

---

## Checkpoint

You can open Code editor and explain why Gutenberg Lab has **no inner HTML**.

**Previous:** [04-edit-js.md](./04-edit-js.md)  
**Next:** [06-render-php.md](./06-render-php.md)
