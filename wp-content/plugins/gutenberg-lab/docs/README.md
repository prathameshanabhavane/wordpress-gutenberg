# Gutenberg Lab — Learn by Doing

Simple docs for this plugin. Read them **in order**. Each step has:

1. **What it is** (plain language + analogy)
2. **Where in this plugin**
3. **Tiny example**
4. **How to test**
5. **How to debug** if something breaks

## Your block today

| Item | Value |
|------|--------|
| Plugin | `gutenberg-lab` |
| Block name | `create-block/gutenberg-lab` |
| Type | **Dynamic** (`save` returns `null`, PHP draws the frontend) |
| Main attribute | `message` (string) |

## Files map (LEGO analogy)

```text
gutenberg-lab.php     →  Turn the power on (register the brick)
src/block.json        →  Instruction sheet on the box
src/index.js          →  Put the brick in the catalog
src/edit.js           →  How you build it on the table (editor)
src/save.js           →  What gets glued into the post (null = dynamic)
src/render.php        →  How it looks on the shelf (frontend)
build/                →  Factory output (WordPress loads this, not src/)
```

## Steps

| # | Doc | Focus |
|---|-----|--------|
| 0 | [00-architecture.md](./00-architecture.md) | Big picture |
| 1 | [01-plugin-registration.md](./01-plugin-registration.md) | PHP registers the block |
| 2 | [02-block-json.md](./02-block-json.md) | Metadata + attributes |
| 3 | [03-edit-js.md](./03-edit-js.md) | Editor UI (React) |
| 4 | [04-save-js.md](./04-save-js.md) | Why `save` is `null` |
| 5 | [05-render-php.md](./05-render-php.md) | Frontend HTML |
| 6 | [06-build-and-assets.md](./06-build-and-assets.md) | `npm start` / build |
| — | [07-debug-cheatsheet.md](./07-debug-cheatsheet.md) | All debug tools in one place |

## Before you start

1. MAMP is running (Apache + MySQL).
2. Plugin **Gutenberg Lab** is activated.
3. In the plugin folder, run:

```bash
cd wp-content/plugins/gutenberg-lab
npm start
```

Leave that terminal open while you edit JS/SCSS.

Optional learning flags in `wp-config.php`:

```php
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'SCRIPT_DEBUG', true );
```

## Pass/fail for the whole lab

You “get it” when you can:

1. Insert **Gutenberg Lab** in a post.
2. Change the message text.
3. Save, reload editor — text still there.
4. View the post on the frontend — same message + a live `<time>`.
5. Open Code editor and see something like:

```html
<!-- wp:create-block/gutenberg-lab {"message":"Hello lab"} /-->
```

(No inner HTML — that is normal for a dynamic block.)

## Official resources

Keep these open next to the lab docs. They are the source of truth beyond this plugin:

| Resource | What it is | When to open it |
|----------|------------|-----------------|
| [Block Editor Reference Guides](https://developer.wordpress.org/block-editor/reference-guides/) | Handbook: Block API, attributes, edit/save, supports, hooks, SlotFills, theme.json, packages, data modules | After a lab step, when you want the full API detail |
| [Gutenberg Storybook](https://wordpress.github.io/gutenberg/?path=/docs/introduction--page) | Interactive catalog of `@wordpress/components` and related UI | When building `edit.js` inspector / toolbar UI |

**How they fit with this lab**

```text
docs/00–07          →  learn on THIS plugin (examples + debug)
Reference Guides    →  deepen the “why / API contract”
Storybook           →  pick real editor UI components
```

Start with the steps here. When a step mentions attributes, `supports`, or `edit`/`save`, skim the matching page under Reference Guides. When you add buttons or sidebar panels, browse Storybook.
