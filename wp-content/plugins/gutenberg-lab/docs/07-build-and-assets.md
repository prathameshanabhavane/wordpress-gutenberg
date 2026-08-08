# Step 7 — Build and assets (`src/` → `build/`)

## In plain English

Modern block plugins are written with JavaScript tooling.

- You edit files in **`src/`**  
- A build tool compiles/copies them into **`build/`**  
- WordPress only loads **`build/`**

If you skip the build step, your changes will look like they “don’t work.”

---

## Analogy

| Place | Role |
|-------|------|
| `src/` | Design studio (you work here) |
| `npm start` / `npm run build` | Factory |
| `build/` | Shipping warehouse (customers = WordPress) |

Customers never pick up unfinished parts from the studio.

---

## Where this sits in the flow

```text
You save src/edit.js
    → npm start rebuilds
        → build/index.js updates
            → hard refresh editor
                → you see the new UI
```

Same idea for `block.json`, SCSS, and `render.php`.

---

## Commands

From `wp-content/plugins/gutenberg-lab`:

```bash
npm install      # first time only
npm start        # watch mode while learning (best)
npm run build    # one-time production build
```

After a successful build you should see files like:

```text
build/
  block.json
  index.js
  index.asset.php
  index.css
  style-index.css
  render.php
```

---

## How to test

1. Run `npm start`.  
2. Change something obvious in `src/edit.js` (for example a `console.log`).  
3. Terminal shows a rebuild.  
4. Hard refresh the editor → change appears.  
5. Stop `npm start`, change a file, refresh → **no** change (proves the factory must run).

### Network tab

Editor → DevTools → Network → confirm the plugin JS/CSS return **200**.

---

## How to debug

| Symptom | Likely cause | What to do |
|---------|--------------|------------|
| “Module not found” | Bad import path | Fix import; save again |
| Editor shows old code | Cache / not rebuilding | Hard refresh; watch terminal |
| White editor canvas | JS error | Console + fix syntax |
| No `build/` after clone | Never built | `npm install` then `npm run build` |
| Styles missing | SCSS not imported / wrong `block.json` keys | Check imports in `index.js` / `edit.js` |

### Break-and-fix

1. Delete `build/index.js`.  
2. Reload editor → block breaks.  
3. Run `npm run build` → restored.

---

## Checkpoint

You never expect WordPress to read `src/` directly, and you know when to use `npm start`.

**Previous:** [06-render-php.md](./06-render-php.md)  
**Next:** [08-debug-cheatsheet.md](./08-debug-cheatsheet.md)
