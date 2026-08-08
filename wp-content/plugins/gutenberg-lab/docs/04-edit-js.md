# Step 4 — `edit.js` (what you see while editing)

## In plain English

`edit.js` is the **editor UI** for your block.  
It is React code that runs only in **wp-admin** while you edit a post.

When you type in the block, you update **attributes** (data).  
Those attributes are what get saved into the post (for our dynamic block).

---

## Analogy

This is the **workbench**.  
You change the brick here. The visitor-facing shop window is a different file (`render.php`).

---

## Where this sits in the flow

```text
Editor loads index.js
    → registerBlockType({ edit: Edit, save: Save })
        → you insert the block
            → React draws <Edit />
                → you type in RichText
                    → setAttributes({ message })
                        → attribute stored in editor memory
                            → later saved into the database
```

---

## Where in this plugin

File: `src/edit.js`

```jsx
export default function Edit({ attributes, setAttributes }) {
	const props = useBlockProps();

	return (
		<div {...props}>
			<RichText
				tagName="p"
				value={attributes.message}
				onChange={(message) => setAttributes({ message })}
			/>
		</div>
	);
}
```

| Piece | Job (beginner words) |
|-------|----------------------|
| `attributes` | Current saved settings (like `message`) |
| `setAttributes` | Update those settings |
| `useBlockProps()` | Adds WordPress classes to the wrapper (needed!) |
| `RichText` | Editable text that feels like a paragraph |

> Temporary `console.log` lines are OK while learning. Remove them later.

---

## Tiny example — watch changes

```jsx
onChange={(message) => {
	console.log( 'New message:', message );
	setAttributes({ message });
}}
```

---

## How to test

1. `npm start` is running.  
2. Insert **Gutenberg Lab**.  
3. Click the text, type `Hello lab`.  
4. Open **Code editor** — JSON should include `"message":"Hello lab"`.  
5. Update → reload editor → text still there.

### Console helpers (block selected)

```js
wp.data.select( 'core/block-editor' ).getSelectedBlock()
```

Look at `attributes.message`.

---

## How to debug

| Symptom | Likely cause | What to do |
|---------|--------------|------------|
| Typing does nothing | Forgot `setAttributes` | Fix `onChange` |
| Typing works, reload loses text | Attribute not declared in `block.json`, or save issue | Check Code editor + Step 3 |
| Weird selection / missing styles on wrapper | Missing `useBlockProps()` | Spread `{...props}` on outer element |
| Red error in console | JS bug | Read the error; check terminal from `npm start` |
| Old UI after code change | Build/cache | Confirm rebuild + hard refresh |

### Break-and-fix

1. Remove `setAttributes` call → typing won’t persist in attributes.  
2. Put it back → works.  
3. Remove `{...props}` → editor wrapper behaves wrongly.  
4. Restore `useBlockProps()`.

---

## Checkpoint

You can change `message` in the editor and see it in:

- the Code editor JSON  
- `getSelectedBlock().attributes`

**Previous:** [03-block-json.md](./03-block-json.md)  
**Next:** [05-save-js.md](./05-save-js.md)
