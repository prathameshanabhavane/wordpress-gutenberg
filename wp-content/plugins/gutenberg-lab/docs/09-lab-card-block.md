# Step 9 — Lab Card explained (every piece)

This page explains **what each part of the Lab Card code does**, in plain English.  
Read it with the real files open side by side:

- `src/block.json`
- `src/index.js`
- `src/edit.js`
- `src/save.js`
- `src/render.php`

---

## In plain English

Lab Card is one block with four content pieces:

1. **Image**  
2. **Title**  
3. **Description**  
4. **CTA (“Learn more”) text + link URL**

It is still a **dynamic block**:

- Editor changes → saved as JSON attributes  
- `save.js` returns `null` (no HTML stored in the post)  
- `render.php` builds the visitor HTML (including the real `<a href="...">`)

---

## Big flow (remember this)

```text
YOU in editor (edit.js)
  │  pick image, type title/description, add CTA link
  ▼
ATTRIBUTES updated (setAttributes)
  │
  ▼ Update / Publish
DATABASE stores:
  <!-- wp:create-block/gutenberg-lab { "title":"...", "ctaUrl":"...", ... } /-->
  │
  ▼ Visitor opens post
render.php reads $attributes
  │
  ▼
HTML card with <img>, <h3>, description, <a class="lab-card__cta">
```

---

## Where you edit each field (UI)

| Field | Attribute keys | How to edit in the editor |
|-------|----------------|---------------------------|
| Image | `imageId`, `imageUrl`, `imageAlt` | Click image area on canvas, or sidebar → **Image** |
| Title | `title` | Click title on canvas |
| Description | `description` | Click description on canvas |
| CTA text | `ctaText` | Edit “Learn more” on canvas, or sidebar |
| CTA link | `ctaUrl` | **Link icon in toolbar**, link button beside CTA, or sidebar → Button URL |
| Open in new tab | `ctaOpensInNewTab` | Link popover toggle, or sidebar toggle |

---

## 1) `block.json` — what each field means

File: `src/block.json`

| Key / lines (idea) | What it does |
|--------------------|--------------|
| `$schema` | Helps your editor autocomplete / validate JSON |
| `apiVersion: 3` | Modern block API (iframe editor compatible) |
| `name` | Unique ID stored in posts: `create-block/gutenberg-lab` |
| `title` | Label in the inserter: **Lab Card** |
| `category` | Inserter group (`widgets`) |
| `icon` | Dashicon shown in inserter |
| `description` | Short help text for the block |
| `keywords` | Extra search words (`card`, `cta`, …) |
| `attributes.imageId` | Media library attachment ID (number) |
| `attributes.imageUrl` | Public image URL string |
| `attributes.imageAlt` | Alt text for accessibility |
| `attributes.title` | Card heading text |
| `attributes.description` | Card body text |
| `attributes.ctaText` | Button label (default `"Learn more"`) |
| `attributes.ctaUrl` | Button link URL (empty until you add one) |
| `attributes.ctaOpensInNewTab` | `true`/`false` for `target="_blank"` |
| `supports.align` | Allows wide/full alignment |
| `supports.color` | Adds color sidebar controls |
| `supports.spacing` | Adds padding/margin controls |
| `supports.html: false` | Hides “Edit as HTML” (safer for this block) |
| `example` | Preview data in the inserter help panel |
| `editorScript` | JS file for the editor (`index.js`) |
| `editorStyle` / `style` | CSS for editor / both sides |
| `render` | PHP file for frontend (`render.php`) |

**Why attributes matter:** whatever you declare here is what can be saved in the block comment and read in `edit.js` + `render.php`.

---

## 2) `index.js` — register the block in the browser

File: `src/index.js`

| Piece | What it does |
|-------|--------------|
| `import { registerBlockType }` | WordPress function that adds the block to the editor |
| `import './style.scss'` | Loads shared CSS into the build |
| `import Edit from './edit'` | Editor UI component |
| `import Save from './save'` | Save function (ours returns `null`) |
| `import metadata from './block.json'` | Reads name + metadata |
| `registerBlockType( metadata.name, { edit, save } )` | Connects name → Edit + Save |

**Analogy:** Puts the brick into the store catalog so the **+** inserter can find it.

---

## 3) `save.js` — why it returns `null`

File: `src/save.js`

```js
export default function save() {
	return null;
}
```

| Line | Meaning |
|------|---------|
| `return null` | Do **not** store inner HTML in the post |
| Result in Code editor | Self-closing comment + JSON attributes only |

Frontend HTML is 100% `render.php`’s job.

---

## 4) `edit.js` — explained section by section

File: `src/edit.js` (this is the longest file — go slowly)

### A) Imports (top of file)

| Import | Purpose |
|--------|---------|
| `__` | Translate strings (`__( 'Add link', 'gutenberg-lab' )`) |
| `useState` | Remember if the link popover is open |
| `useBlockProps` | Adds required wrapper classes/props |
| `RichText` | Editable text on the canvas (title, description, CTA label) |
| `MediaUpload` / `MediaUploadCheck` | Open WordPress media library for images |
| `InspectorControls` | Put panels into the right sidebar |
| `BlockControls` | Put buttons into the block toolbar |
| `LinkControl` | Official URL picker UI (search posts / paste URL) |
| `PanelBody`, `TextControl`, `ToggleControl`, `Button`, … | Sidebar / UI controls from Storybook components |
| `ToolbarGroup`, `ToolbarButton`, `Popover` | Toolbar link buttons + floating link panel |
| `useSelect` | Read media object from the data store |
| `link`, `linkOff` icons | Icons for add/edit/remove link |
| `./editor.scss` | Editor-only CSS |

### B) Reading attributes

```js
const { imageId, imageUrl, imageAlt, title, description, ctaText, ctaUrl, ctaOpensInNewTab } = attributes;
```

| Name | Meaning |
|------|---------|
| `attributes` | Current saved values for this block instance |
| `setAttributes` | Function to update those values |
| `isSelected` | `true` when this block is selected |

### C) Local UI state

```js
const [ isLinkOpen, setIsLinkOpen ] = useState( false );
```

| Piece | Meaning |
|-------|---------|
| `isLinkOpen` | Is the link popover visible? |
| `setIsLinkOpen` | Open/close that popover |

This is **not** saved to the database — only for editor UI.

### D) Wrapper props

```js
const blockProps = useBlockProps({ className: 'lab-card' });
```

Adds WordPress classes (supports colors/spacing/align) plus our `lab-card` class.

### E) Image helpers

| Function | What it does |
|----------|--------------|
| `useSelect(...getMedia(imageId))` | Loads media details for the sidebar preview |
| `onSelectImage(media)` | Saves `imageId`, `imageUrl`, `imageAlt` when user picks an image |
| `onRemoveImage()` | Clears image attributes |

### F) Link helpers (CTA URL feature)

| Function | What it does |
|----------|--------------|
| `onChangeLink(nextValue)` | Saves `ctaUrl` + `ctaOpensInNewTab` from LinkControl |
| `onRemoveLink()` | Clears URL / new-tab flag and closes popover |

**This is the “add link to Learn more” feature.**

### G) Block toolbar (link icon)

```jsx
<BlockControls>
  <ToolbarButton icon={linkIcon} ... />   // Add / Edit CTA link
  <ToolbarButton icon={linkOff} ... />    // Remove CTA link (only if URL exists)
</BlockControls>
```

| UI | User action |
|----|-------------|
| Link icon | Opens popover to set URL |
| Link-off icon | Removes URL |

### H) Link popover + LinkControl

```jsx
{ isLinkOpen && (
  <Popover>
    <LinkControl value={{ url: ctaUrl, opensInNewTab }} onChange={onChangeLink} />
  </Popover>
)}
```

| Piece | Meaning |
|-------|---------|
| `Popover` | Floating panel under the toolbar |
| `LinkControl` | Lets you paste URL / search site content |
| `settings.opensInNewTab` | Checkbox inside the link UI |

### I) Sidebar (`InspectorControls`)

Two panels:

1. **Image** — select/replace/remove image + alt text  
2. **Call to action** — button text, URL field, open-in-new-tab toggle, URL preview  

Same attributes as toolbar/canvas — just another place to edit them.

### J) Canvas layout (what you see in the post)

| JSX part | What it does |
|----------|--------------|
| `lab-card__media` + `MediaUpload` | Show image or “Upload / select image” button |
| `RichText` title (`h3`) | Edit title on canvas |
| `RichText` description (`p`) | Edit description on canvas |
| `RichText` CTA text (`span`) | Edit “Learn more” label on canvas |
| Small link `Button` (when selected) | Shortcut to open link popover |
| Hint text | Shows “Linked to: …” or “Click the link icon…” |

### K) Important CTA rule

In the **editor**, the CTA looks like a button but is mostly for editing.  
On the **frontend**, `render.php` outputs a real link **only if both** `ctaText` and `ctaUrl` exist.

---

## 5) `render.php` — every line explained

File: `src/render.php`

| Lines / code | What it does |
|--------------|--------------|
| `$attributes['imageUrl'] ?? ''` (and others) | Read saved attributes safely (empty string if missing) |
| `$new_tab = ! empty( ... ctaOpensInNewTab )` | Convert attribute into a boolean for HTML |
| `get_block_wrapper_attributes( ['class' => 'lab-card'] )` | Build wrapper `class`/styles from supports + our class |
| `<div <?php echo $wrapper; ?>>` | Outer card wrapper |
| `if ( $image_url )` | Only print `<img>` when an image exists |
| `esc_url( $image_url )` | Safe URL output |
| `esc_attr( $image_alt )` | Safe alt attribute |
| `loading="lazy"` | Browser loads image when needed |
| `if ( $title )` | Only print heading when title exists |
| `wp_kses_post( $title )` | Allow safe HTML from RichText, strip dangerous tags |
| `if ( $description )` | Only print description when present |
| `if ( $cta_text && $cta_url )` | **Both required** to show the CTA link |
| `<a href="...">` | Real clickable link for visitors |
| `target="_blank" rel="noopener noreferrer"` | Only when “open in new tab” is on |
| `esc_html( $cta_text )` | Safe plain text for the button label |

### CTA frontend condition (memorize)

```text
ctaText only  → no link on frontend
ctaUrl only   → no link on frontend
both set      → <a class="lab-card__cta"> shows
```

---

## 6) Styles (quick map)

| File | Applies to | Role |
|------|------------|------|
| `src/style.scss` | Editor + frontend | Card layout, image, title, CTA look |
| `src/editor.scss` | Editor only | Image replace hint, CTA row, link button, helper text |

Class naming: `lab-card`, `lab-card__title`, `lab-card__cta` (BEM-style).

---

## How to test (including link)

1. `npm start` (or `npm run build`) + hard refresh editor.  
2. Insert **Lab Card**.  
3. Add image, title, description.  
4. Click **link icon** in toolbar → paste `https://example.com` → apply.  
5. Confirm hint shows `Linked to: https://example.com`.  
6. Update → View post → click **Learn more** → opens the URL.  
7. Toggle **Open in new tab** → View again → link opens in a new tab.

### Console check

```js
wp.data.select('core/block-editor').getSelectedBlock()?.attributes
```

Expect keys like: `imageUrl`, `title`, `description`, `ctaText`, `ctaUrl`, `ctaOpensInNewTab`.

### Code editor example

```html
<!-- wp:create-block/gutenberg-lab {"title":"Hello","description":"Desc","ctaText":"Learn more","ctaUrl":"https://example.com","ctaOpensInNewTab":true,"imageUrl":"http://..."} /-->
```

---

## How to debug

| Problem | Likely cause | Fix |
|---------|--------------|-----|
| No link icon | Old build / cache | Rebuild + hard refresh |
| Link set in editor, missing on frontend | Empty `ctaText` or `ctaUrl` | Both required in `render.php` |
| Link works but wrong tab behavior | `ctaOpensInNewTab` not saved | Re-toggle in LinkControl / sidebar |
| Image won’t upload | Permissions / media library | Check user can upload files |
| Invalid old block | Old `message` attribute posts | Insert a new Lab Card |

---

## Checkpoint

You can explain, without looking:

1. Which file defines attributes (`block.json`)  
2. Which file is the editor UI (`edit.js`)  
3. Why `save` is `null`  
4. How the CTA URL is added (toolbar LinkControl)  
5. Why frontend needs **both** CTA text and URL  

---

## Related docs

- [01-architecture-and-flow.md](./01-architecture-and-flow.md)  
- [03-block-json.md](./03-block-json.md)  
- [04-edit-js.md](./04-edit-js.md)  
- [05-save-js.md](./05-save-js.md)  
- [06-render-php.md](./06-render-php.md)  
- [08-debug-cheatsheet.md](./08-debug-cheatsheet.md)  

**Previous:** [08-debug-cheatsheet.md](./08-debug-cheatsheet.md)  
**Next:** [10-lab-cards-loop.md](./10-lab-cards-loop.md)  
**Back to index:** [README.md](./README.md)
