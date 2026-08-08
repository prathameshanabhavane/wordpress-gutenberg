# Gutenberg Lab — Docs for beginners

**Who this is for:** anyone new to WordPress, new to Gutenberg (the block editor), or both.  
You do **not** need to be a React expert or a WordPress veteran.

## How to use this guide (important)

1. Open the files **in order** from the table below (0 → 9).  
2. At the end of each file, click **Next**.  
3. Do the **How to test** section before moving on.  
4. If something breaks, open [08-debug-cheatsheet.md](./08-debug-cheatsheet.md).  
5. Do **not** skip Step 0 and Step 1 — they give the big picture.

You only need: a running WordPress site (MAMP), this plugin activated, and `npm start` when editing JS.

Each step always has the same shape:

1. **In plain English** — what this piece does  
2. **Analogy** — so it sticks in your head  
3. **Where it sits in the big flow** — how it connects  
4. **Where in this plugin** — real files  
5. **Tiny example**  
6. **How to test** — click-by-click  
7. **How to debug** — if it breaks  
8. **Checkpoint** — “I get it when…”

---

## 60-second WordPress picture

WordPress is a website system with two “sides”:

| Side | What you see | Who uses it |
|------|----------------|-------------|
| **Admin (backend)** | `/wp-admin` — Dashboard, Posts, Plugins… | You (the site owner / developer) |
| **Frontend** | The public website visitors open | Readers / customers |

A **plugin** is an add-on folder under `wp-content/plugins/`.  
This project (`gutenberg-lab`) is a plugin that adds **one custom block** to the editor.

**Gutenberg** = the modern WordPress editor where you build pages from **blocks** (Paragraph, Image, columns, and *your* block), instead of one big HTML text box.

```text
You (admin)
    → open a Post in the Block Editor (Gutenberg)
        → insert blocks (LEGO bricks)
            → click Update / Publish
                → WordPress saves data in the database
                    → visitor opens the post URL
                        → WordPress shows HTML (frontend)
```

---

## Your block in this lab

| Item | Value | Plain English |
|------|--------|----------------|
| Plugin name | Gutenberg Lab | The add-on you activate |
| Block name | `create-block/gutenberg-lab` | Unique ID WordPress stores in the post |
| Inserter title | **Lab Card** | What you search for in **+** |
| Type | **Dynamic block** | Editor stores settings; **PHP** draws visitor HTML |
| Fields | image, title, description, CTA | See [09-lab-card-block.md](./09-lab-card-block.md) |

---

## Full architecture (big picture)

Read this once. Come back whenever you feel lost.

### A) Layers of the system

```text
┌──────────────────────────────────────────────────────────────┐
│  1. WORDPRESS CORE                                           │
│     Knows how to load plugins, posts, themes, the editor     │
└────────────────────────────┬─────────────────────────────────┘
                             │ loads your plugin
┌────────────────────────────▼─────────────────────────────────┐
│  2. YOUR PLUGIN (gutenberg-lab.php)                          │
│     “Hello WordPress, I have a block. Here is its folder.”   │
│     register_block_type( .../build )                         │
└────────────────────────────┬─────────────────────────────────┘
                             │ reads
┌────────────────────────────▼─────────────────────────────────┐
│  3. block.json  (instruction sheet)                          │
│     name, title, attributes, supports, which JS/CSS/PHP      │
└────────────────────────────┬─────────────────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        ▼                    ▼                    ▼
┌───────────────┐   ┌─────────────────┐   ┌─────────────────┐
│ 4. EDITOR JS  │   │ 5. SAVE (null)  │   │ 6. RENDER PHP   │
│ edit.js       │   │ save.js         │   │ render.php      │
│ What YOU see  │   │ What is stored  │   │ What VISITORS   │
│ while editing │   │ in the database │   │ see on the site │
└───────────────┘   └─────────────────┘   └─────────────────┘
```

### B) End-to-end flow (happy path)

```text
 [Activate plugin]
        │
        ▼
 [WordPress init] ──► register_block_type(build/)
        │
        ▼
 [You open Add/Edit Post]
        │
        ▼
 [Browser loads editor JS] ──► registerBlockType + Edit UI
        │
        ▼
 [You insert “Lab Card”: image, title, description, CTA]
        │                 setAttributes({ title, description, imageUrl, ctaUrl, ... })
        ▼
 [You click Update]
        │
        ▼
 [Database stores something like:]
   <!-- wp:create-block/gutenberg-lab {"title":"Hello","ctaUrl":"https://..."} /-->
        │
        ▼
 [Visitor opens the post URL]
        │
        ▼
 [WordPress runs render.php]
        │                 reads $attributes (image, title, description, CTA)
        ▼
 [HTML card appears: image + heading + text + link button]
```

### C) Static vs dynamic (why our `save` is empty)

```text
STATIC block                          DYNAMIC block (this lab)
─────────────────────────────         ────────────────────────────────
edit → change data                    edit → change data
save → write HTML into the post       save → return null
frontend → show that saved HTML       render.php → build HTML every visit

Analogy: polaroid in a scrapbook      Analogy: rebuild the display
                                       each time a guest walks in
                                       (can show live time, etc.)
```

That is why Code editor shows **no inner HTML** for our block — only the comment + JSON. The pretty HTML is created later by PHP.

### D) `src/` vs `build/` (very common beginner confusion)

```text
  YOU edit here          FACTORY                 WORDPRESS loads here
 ──────────────         ─────────               ─────────────────────
  src/edit.js    ──npm──►  build/index.js   ──►  browser (editor)
  src/block.json ──npm──►  build/block.json ──►  PHP registration
  src/render.php ──npm──►  build/render.php ──►  frontend
```

If you change `src/` but skip `npm start` / `npm run build`, the site will look “stuck” on old code. That is normal.

---

## Files map (LEGO analogy)

```text
gutenberg-lab.php     →  Turn the power on (register the brick with WordPress)
src/block.json        →  Instruction sheet on the box
src/index.js          →  Put the brick in the editor catalog
src/edit.js           →  How you build it on the table (editor UI)
src/save.js           →  What gets glued into the post (null = dynamic)
src/render.php        →  How it looks in the shop window (frontend)
build/                →  Factory output (WordPress loads THIS, not src/)
```

---

## Learning path (read in order)

| # | Doc | You will understand… |
|---|-----|----------------------|
| 0 | [00-wordpress-basics.md](./00-wordpress-basics.md) | Posts, plugins, admin vs frontend, where files live |
| 1 | [01-architecture-and-flow.md](./01-architecture-and-flow.md) | Full architecture + data flow (deep dive) |
| 2 | [02-plugin-registration.md](./02-plugin-registration.md) | How PHP registers the block |
| 3 | [03-block-json.md](./03-block-json.md) | The instruction sheet (`block.json`) |
| 4 | [04-edit-js.md](./04-edit-js.md) | Editor UI (`edit.js`) |
| 5 | [05-save-js.md](./05-save-js.md) | Why `save` returns `null` |
| 6 | [06-render-php.md](./06-render-php.md) | Frontend HTML (`render.php`) |
| 7 | [07-build-and-assets.md](./07-build-and-assets.md) | `npm start` and the `build/` folder |
| 8 | [08-debug-cheatsheet.md](./08-debug-cheatsheet.md) | All debug tools in one place |
| 9 | [09-lab-card-block.md](./09-lab-card-block.md) | Current block: image + title + description + CTA |

**Suggested pace:** one step at a time. Steps 0–1 = understanding. Steps 2–7 = hands-on. Step 8 = keep open while practicing. Step 9 = the card you build in this plugin.

---

## Before you start (setup checklist)

1. **MAMP** is running (Apache + MySQL).  
2. You can open your site admin (usually something like `http://localhost:8888/wordpress/gutenberg-explor/wp-admin`).  
3. **Plugins → Gutenberg Lab → Active**.  
4. In a terminal:

```bash
cd wp-content/plugins/gutenberg-lab
npm install    # first time only
npm start      # leave this running while you edit JS/CSS
```

Optional learning flags in `wp-config.php` (local site only):

```php
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'SCRIPT_DEBUG', true );
```

---

## Mini glossary (don’t memorize — peek when stuck)

| Word | Meaning |
|------|---------|
| **Block** | One piece of content in the editor (Paragraph, Image, your lab block) |
| **Attribute** | A piece of data the block stores (e.g. `title`, `ctaUrl`) |
| **Editor** | The admin screen where you write posts with blocks |
| **Frontend** | The public page visitors see |
| **Plugin** | Extra code package that adds features |
| **`block.json`** | Metadata file describing the block |
| **Dynamic block** | Frontend HTML comes from PHP, not from saved HTML |
| **`useBlockProps`** | Helper that adds the right CSS classes to the block wrapper |
| **Inserter** | The **+** button UI used to add blocks |
| **Code editor** | View that shows the raw block comments stored in the post |

---

## Pass/fail for the whole lab

You “get it” when you can:

1. Insert **Lab Card** in a post.
2. Add image, title, description, and CTA URL.
3. Save, reload the editor — content is still there.
4. View the post on the frontend — card looks correct and the link works.
5. Open **Code editor** and see a self-closing block comment with JSON attributes (no inner HTML).
6. Explain out loud: *“Settings are saved in the post; PHP draws what visitors see.”*

---

## Official resources

Keep these open next to the lab docs:

| Resource | What it is | When to open it |
|----------|------------|-----------------|
| [Block Editor Reference Guides](https://developer.wordpress.org/block-editor/reference-guides/) | Official handbook: Block API, attributes, edit/save, hooks, SlotFills, theme.json, data | After a lab step, when you want full API detail |
| [Gutenberg Storybook](https://wordpress.github.io/gutenberg/?path=/docs/introduction--page) | Live UI components (`Button`, `Panel`, controls) | When building nicer editor UI in `edit.js` |

```text
docs in THIS folder     →  learn on this plugin (simple + debug)
Reference Guides        →  deepen the “why / API contract”
Storybook               →  pick real editor UI components
```

**Rule of thumb:** Reference Guides = *how blocks work*. Storybook = *what buttons/panels to put in the editor*.
