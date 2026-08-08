# Step 10 — Lab Cards loop (add as many cards as you want)

Yes — this is possible, and it is the **advanced / recommended Gutenberg way**.

## In plain English

Instead of one mega-block that stores an array of cards, we use **two blocks**:

| Block | Role | Analogy |
|-------|------|---------|
| **Lab Cards** (`create-block/lab-cards`) | Parent / grid / loop container | Photo album |
| **Lab Card** (`create-block/lab-card`) | One card (image, title, description, CTA) | One photo page |

You click **+** inside Lab Cards to add another Lab Card.  
On the frontend, WordPress **loops** the child cards and prints each one.

```text
Lab Cards (parent)
  ├── Lab Card 1
  ├── Lab Card 2
  ├── Lab Card 3
  └── [ + add more ]
```

---

## Why this pattern (not a PHP `foreach` array attribute)?

| Approach | Pros | Cons |
|----------|------|------|
| **InnerBlocks parent/child** (what we built) | Native Gutenberg UX, reorder, duplicate, undo, block list | Two block types |
| One block + `cards: []` attribute | Single block | Custom repeater UI is harder; less native |

Core does the same idea with Columns → Column, Buttons → Button, etc.

---

## Architecture / flow

```text
Editor
  Insert "Lab Cards"
      → template creates 3× Lab Card
      → you click + to append more Lab Card children
      → each child edits its own attributes (image, title, …)

Save post
  Parent stores inner blocks:
    <!-- wp:create-block/lab-cards {"columns":3} -->
      <!-- wp:create-block/lab-card {...} /-->
      <!-- wp:create-block/lab-card {...} /-->
    <!-- /wp:create-block/lab-cards -->

Frontend
  lab-cards/render.php
      → wraps output
      → $content = HTML of all children (already rendered)
  lab-card/render.php
      → runs once per card (the "loop body")
```

**Frontend “loop”** = WordPress renders each inner block; parent just prints `$content` inside the grid.

---

## Files map

```text
src/
  lab-cards/          ← PARENT (repeater / grid)
    block.json
    edit.js           ← InnerBlocks + columns control + Appender (+)
    save.js           ← <InnerBlocks.Content />
    render.php        ← grid wrapper + echo $content
    style.scss
  lab-card/           ← CHILD (one card)
    block.json        ← "parent": ["create-block/lab-cards"]
    edit.js           ← image, title, description, CTA link
    save.js           ← null (dynamic)
    render.php        ← one card HTML
```

### Important `block.json` bits

**Parent** — allows only Lab Card children (in `edit.js` via `allowedBlocks`).

**Child** — `"parent": ["create-block/lab-cards"]`  
→ Lab Card does **not** appear alone in the main inserter; it lives inside Lab Cards.

---

## How to use

1. `npm run build` (or `npm start`) + hard refresh.  
2. Inserter → **Lab Cards** (not Lab Card).  
3. You get 3 empty cards.  
4. Fill each card (image, title, description, link).  
5. Click the **+** under the grid to add another card.  
6. Sidebar on the parent → **Columns** (1–4).  
7. Update → View frontend → cards show in a responsive grid.

### Reorder / remove

- Drag cards in the List View (left).  
- Or select a card → … → Remove / Duplicate.

---

## Code explained (parent)

### `lab-cards/edit.js`

| Piece | Meaning |
|-------|---------|
| `ALLOWED_BLOCKS` | Only `create-block/lab-card` can be inserted |
| `TEMPLATE` | Starts with 3 cards |
| `useInnerBlocksProps` | Renders the child list |
| `InnerBlocks.ButtonBlockAppender` | The **+** button to add more |
| `columns` + `RangeControl` | Grid columns setting |

### `lab-cards/save.js`

```js
return <InnerBlocks.Content />;
```

Saves children into the post. Parent wrapper HTML comes from PHP.

### `lab-cards/render.php`

| Piece | Meaning |
|-------|---------|
| `$columns` | From attributes (clamped 1–4) |
| `lab-cards--columns-N` | CSS grid class |
| `echo $content` | **All child cards HTML** (the loop result) |

### `lab-card/render.php`

Runs **once per card** — same as before (image, title, description, CTA).

---

## How to test

1. Insert Lab Cards → confirm 3 children.  
2. Add a 4th with **+**.  
3. Set columns to 2 → editor grid updates.  
4. Code editor should show nested comments (`lab-cards` wrapping `lab-card`).  
5. Frontend shows N cards in a grid.  
6. Remove one card → frontend count updates.

### Console

```js
wp.data.select('core/block-editor').getBlocks()
// Find lab-cards; inspect its innerBlocks length
```

---

## How to debug

| Problem | Check |
|---------|--------|
| Can’t find Lab Card in inserter | Expected — insert **Lab Cards** parent first |
| No + button | Select the **Lab Cards** parent (not a child) |
| Old “gutenberg-lab” block invalid | Old single-block name changed — insert fresh **Lab Cards** |
| Build fails / blocks missing | Run `npm run build`; confirm `build/lab-card` and `build/lab-cards` exist |
| Frontend not a grid | Parent selected? `columns` attribute? CSS loaded? |

---

## Checkpoint

You can explain:

1. Parent = album, child = one card  
2. **+** appends another child InnerBlock  
3. Frontend loop = each child `render.php` + parent echoes `$content`  
4. This is more “Gutenberg native” than a custom JS repeater array  

---

**Previous:** [09-lab-card-block.md](./09-lab-card-block.md)  
**Back to index:** [README.md](./README.md)
