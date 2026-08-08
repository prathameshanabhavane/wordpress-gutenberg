# Step 11 — Lab Form Fields (add one control at a time)

**Inserter:** Lab Form Fields  
**Pattern:** same idea as Lab Cards — parent + children + **+**

## In plain English

You no longer get every control dumped in one block.

1. Insert **Lab Form Fields** (parent).  
2. Click **+** to add a **Lab Form Field** (one control).  
3. Select that field → sidebar → **Which control?** (text, toggle, select, …).  
4. Repeat + for each use case.

```text
Lab Form Fields
  ├── Field (Text)
  ├── Field (Toggle)
  ├── Field (Image)
  └── [ + add another single field ]
```

## Field types you can pick

| Type | Component |
|------|-----------|
| text | `TextControl` |
| textarea | `TextareaControl` |
| toggle | `ToggleControl` |
| select | `SelectControl` |
| checkbox | `CheckboxControl` |
| radio | `RadioControl` |
| range | `RangeControl` |
| tokens | `FormTokenField` |
| image | `MediaUpload` (image) |
| file | `MediaUpload` (pdf/doc/txt) |

## Folders

```text
src/lab-form-fields/   ← parent (list + appender)
src/lab-form-field/    ← child (one control)
```

Child has `"parent": ["create-block/lab-form-fields"]` so it only appears inside the kit.

## How to test

1. Rebuild / hard refresh.  
2. Insert **Lab Form Fields** (starts with one Text field).  
3. Change type in sidebar to Toggle — only toggle shows.  
4. Click **+** → add Image field → upload an image.  
5. View frontend — each field renders separately.

**Note:** Old “all fields in one block” posts may look invalid — insert a fresh Lab Form Fields.

## Frontend = same control type

Admin choice is mirrored on the frontend:

| Admin field type | Frontend HTML |
|------------------|---------------|
| text | `<input type="text">` |
| textarea | `<textarea>` |
| toggle / checkbox | `<input type="checkbox">` |
| select | `<select><option>…` |
| radio | `<input type="radio">` group |
| range | `<input type="range">` |
| tokens | text input (comma-separated) |
| image | `<img>` preview |
| file | download `<a>` |

Values you set in the editor are used as the initial/default state on the frontend.
The parent wraps fields in a demo `<form>`.

## Custom UI, cross-browser (all field types)

Frontend controls are **custom-styled** and meant to look the same in Chrome, Firefox, Safari, and Edge.

Pattern:

1. Real `<input>` / `<select>` stay in the DOM (a11y + form data)
2. Checkbox / radio / toggle: native input is visually hidden; a CSS indicator shows the design
3. **Select:** custom button + listbox (native `<select>` popup **cannot** be styled — that is why it looked OS-native)
4. Text, textarea, range: `appearance: none` + vendor track/thumb rules
5. Tokens / image / file: custom chips and cards
6. Theme via `--lab-field-*` / `--lab-form-*` CSS variables

```css
.lab-form-field {
	--lab-field-primary: #2563eb;
	--lab-field-radius: 0.75rem;
	--lab-field-border: #cbd5e1;
}
.lab-form-fields {
	--lab-form-primary: #2563eb;
}
```

Inspired by [shadcn Radio Group](https://ui.shadcn.com/docs/components/base/radio-group) visuals — without pulling in React UI kits.

## Checkpoint

You can add only the controls you need for a use case, one by one.

**Previous:** [10-lab-cards-loop.md](./10-lab-cards-loop.md)  
**Back to index:** [README.md](./README.md)
