# Step 3 — `edit.js` (editor UI)

## What it is

`edit` is a React component. It is **what you see and click in the block editor**.

**Analogy:** The workbench. You change the brick here; those changes update attributes (the data).

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

### Important pieces

| Piece | Job |
|-------|-----|
| `attributes` | Current data (`message`, plus supports attrs) |
| `setAttributes` | Update data (immutable — pass a new object) |
| `useBlockProps()` | Wrapper classes/ids WordPress needs (alignment, color, etc.) |
| `RichText` | Editable text that feels like a paragraph |

## Tiny example — log every change

```jsx
onChange={(message) => {
	console.log( 'message changed to:', message );
	setAttributes({ message });
}}
```

(Your file may already have temporary `console.log` lines for learning — remove them when you are done debugging.)

## How to test

1. `npm start` is running.
2. Edit a post → insert **Gutenberg Lab**.
3. Click the text → type `Hello lab`.
4. Open browser **Console** — you should see your logs (if enabled).
5. Without leaving the editor, open Code editor — JSON should include `"message":"Hello lab"`.
6. Update post → reload editor → text still `Hello lab`.

### React / data store test

With the block selected:

```js
wp.data.select( 'core/block-editor' ).getSelectedBlock()
```

Look at `attributes.message`.

Change it from the console (advanced):

```js
const { clientId, attributes } = wp.data.select( 'core/block-editor' ).getSelectedBlock();
wp.data.dispatch( 'core/block-editor' ).updateBlockAttributes(
	clientId,
	{ message: 'From console' }
);
```

The RichText on canvas should update.

## How to debug

| Symptom | Likely cause | Fix / check |
|---------|--------------|-------------|
| Typing does nothing | Not calling `setAttributes` | Check `onChange` |
| Typing works, reload loses text | Dynamic OK — but attribute not in `block.json`, or save failed | Check Code editor JSON; check `attributes` in `block.json` |
| Block has no selection outline / broken UI | Missing `useBlockProps()` on wrapper | Spread `{...props}` on the outer element |
| JS error in console | Syntax / wrong import | Fix error; webpack terminal often shows the stack |
| Old UI after edit | Browser cache / build not watching | Hard refresh; confirm `npm start` rebuilt |

### Break-and-fix

1. Comment out `setAttributes` in `onChange` — typing won’t stick in attributes.
2. Restore it — works again.
3. Remove `{...props}` from the wrapper — notice editor chrome issues.
4. Restore `useBlockProps()`.

## Checkpoint

You can change `message` in the editor, see it in `getSelectedBlock().attributes`, and see it in the Code editor JSON.
