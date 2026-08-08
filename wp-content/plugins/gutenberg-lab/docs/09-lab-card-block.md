# Lab Card block — image, title, description, CTA

This plugin’s block is now a **card**:

| Field | Attribute | Where you edit it |
|-------|-----------|-------------------|
| Image | `imageId`, `imageUrl`, `imageAlt` | Canvas click or sidebar → Image |
| Title | `title` | Click title on canvas |
| Description | `description` | Click description on canvas |
| CTA text | `ctaText` | Sidebar → Call to action |
| CTA link | `ctaUrl` | Sidebar → Call to action |
| New tab | `ctaOpensInNewTab` | Sidebar toggle |

Still a **dynamic** block: `save` returns `null`, frontend comes from `render.php`.

## Flow

```text
Editor (edit.js)
  MediaUpload → imageUrl / imageId / imageAlt
  RichText    → title, description
  Sidebar     → ctaText, ctaUrl, ctaOpensInNewTab
        │
        ▼ Update
Database stores JSON attributes in block comment
        │
        ▼ View post
render.php builds <img>, <h3>, description, <a class="lab-card__cta">
```

## How to test

1. Run `npm start` (or `npm run build`).
2. Soft refresh the editor.
3. Insert **Lab Card** (search “Lab Card” or “card”).
4. Upload an image → type title + description.
5. Sidebar → set Button text + URL.
6. Update post → View → confirm image, text, and working link.

### Console

```js
wp.data.select('core/block-editor').getSelectedBlock()?.attributes
```

You should see `imageUrl`, `title`, `description`, `ctaText`, `ctaUrl`.

### Code editor (example)

```html
<!-- wp:create-block/gutenberg-lab {"imageId":12,"imageUrl":"http://...","title":"Hello","description":"Desc","ctaText":"Learn more","ctaUrl":"https://example.com"} /-->
```

## How to debug

| Problem | Check |
|---------|--------|
| No image button | Is `wp-media` available? Logged in as user who can upload? |
| Link missing on frontend | Both `ctaText` and `ctaUrl` required in `render.php` |
| Old “Hello Gutenberg” UI | Hard refresh; confirm `npm start` rebuilt |
| Invalid old block | Old posts used `message` attribute — re-insert a new Lab Card |

## Related learning docs

- [03-block-json.md](./03-block-json.md) — attributes  
- [04-edit-js.md](./04-edit-js.md) — editor UI  
- [06-render-php.md](./06-render-php.md) — frontend  

**Previous:** [08-debug-cheatsheet.md](./08-debug-cheatsheet.md)  
**Back to index:** [README.md](./README.md)
