# Step 0 — WordPress basics (for complete beginners)

If WordPress already feels familiar, skim this and go to [01-architecture-and-flow.md](./01-architecture-and-flow.md).  
If you are new, read every section once.

---

## In plain English

WordPress is software that:

1. Stores your content (posts, pages) in a **database**  
2. Lets you manage it in **wp-admin**  
3. Shows it to visitors as a normal website (**frontend**)

You extend WordPress with:

- **Themes** → how the site looks overall  
- **Plugins** → extra features (like our custom block)

---

## Analogy: a restaurant

| Restaurant | WordPress |
|------------|-----------|
| Kitchen + recipes | WordPress core |
| Menu board for guests | Frontend (public site) |
| Manager’s office | Admin (`/wp-admin`) |
| A new oven / coffee machine you install | Plugin |
| Paint and furniture style | Theme |
| One dish on the menu made of ingredients | A **post** made of **blocks** |

Gutenberg is the modern way of assembling dishes from ingredients (blocks), instead of writing one free-form recipe blob.

---

## The folders you will touch

Your project lives roughly here:

```text
gutenberg-explor/                 ← WordPress site root
  wp-admin/                       ← admin screens (don’t edit casually)
  wp-includes/                    ← WordPress core (don’t edit)
  wp-content/
    themes/                       ← look & feel
    plugins/
      gutenberg-lab/              ← THIS learning plugin ★
        gutenberg-lab.php
        src/                      ← you edit here
        build/                    ← WordPress loads here
        docs/                     ← you are reading this
  wp-config.php                   ← database + debug settings
```

**Rule:** almost never edit `wp-admin/` or `wp-includes/`. Learn by editing **your plugin**.

---

## Admin vs frontend (practice)

1. Open **Admin**: `.../wp-admin` → log in.  
2. Go to **Posts → Add New**.  
   This is the **Block Editor** (Gutenberg).  
3. Type a title, add a Paragraph block, click **Publish** / **Update**.  
4. Click **View Post**.  
   This is the **frontend**.

Same content, two different views:

```text
Admin editor  =  workshop (you can change blocks)
Frontend      =  storefront (visitors only look)
```

---

## What is a “block”?

A block is one unit of content:

- Paragraph  
- Heading  
- Image  
- Your **Gutenberg Lab** block  

When you save, WordPress does **not** only store pretty HTML. It stores **block comments** that name each block and its settings.

Example of a paragraph in Code editor:

```html
<!-- wp:paragraph -->
<p>Hello</p>
<!-- /wp:paragraph -->
```

**Analogy:** the HTML is the toy; the `<!-- wp:... -->` comment is the barcode on the box.

---

## What is a plugin?

A plugin is a folder + a main PHP file with a header like:

```php
/**
 * Plugin Name: Gutenberg Lab
 */
```

WordPress lists it under **Plugins**. When **Active**, its PHP runs and can register blocks, menus, etc.

Our plugin’s job in one sentence:

> Teach WordPress about one block, show an editor UI for it, and render it on the frontend with PHP.

---

## Where this sits in the big flow

```text
WordPress starts
    → loads active plugins
        → gutenberg-lab.php runs
            → registers block from build/
                → later: editor can insert it
                → later: frontend can render it
```

---

## How to test

| # | Action | Expected |
|---|--------|----------|
| 1 | Admin loads | Dashboard visible |
| 2 | Plugins list | “Gutenberg Lab” is Active |
| 3 | Posts → Add New | Block editor opens (not classic TinyMCE only) |
| 4 | Click **+** | Inserter opens; you can search blocks |
| 5 | View a published post | Frontend theme shows content |

---

## How to debug (WordPress level)

| Problem | What to check |
|---------|----------------|
| Site won’t open | MAMP Apache/MySQL running? Correct URL? |
| Can’t log in | Username/password; try `/wp-login.php` |
| Plugin missing | Folder under `wp-content/plugins/gutenberg-lab/`? |
| White screen | Enable `WP_DEBUG` in `wp-config.php`; read `wp-content/debug.log` |
| Editor looks broken | Browser console errors; disable other plugins temporarily |

---

## Checkpoint

You can explain:

- Admin vs frontend  
- What a plugin is  
- What a block is  
- That you will edit `wp-content/plugins/gutenberg-lab/`, not core WordPress folders  

**Previous:** [README.md](./README.md) (index)  
**Next:** [01-architecture-and-flow.md](./01-architecture-and-flow.md)
