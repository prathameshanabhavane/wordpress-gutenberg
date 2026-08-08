# Step 6 — `render.php` (what visitors see)

## In plain English

When someone opens the post on the public site, WordPress runs `render.php` for our block.

PHP receives the saved **attributes** (like `message`) and prints HTML.

That is why the `<time>` can show the **current** server time on every refresh.

---

## Analogy

This is the **shop window**.  
Each visitor gets a freshly built display from the barcode (attributes) stored in the database.

---

## Where this sits in the flow

```text
Visitor opens post URL
    → WordPress reads post_content
        → finds <!-- wp:create-block/gutenberg-lab {"message":"..."} /-->
            → runs render.php
                → echoes <div><p>...</p><time>...</time></div>
```

Editor preview can look similar, but **this file owns the real frontend output**.

---

## Where in this plugin

Edit: `src/render.php`  
WordPress runs: `build/render.php` (updated by the build)

```php
$wrapper = get_block_wrapper_attributes();
$message = $attributes['message'] ?? '';
?>
<div <?php echo $wrapper; ?>>
	<p><?php echo esc_html( $message ); ?></p>
	<time><?php echo esc_html( current_time( 'mysql' ) ); ?></time>
</div>
```

| Variable / helper | Meaning |
|-------------------|---------|
| `$attributes` | Settings saved with the block |
| `$content` | Inner blocks HTML (empty for us) |
| `$block` | Full block object (advanced) |
| `get_block_wrapper_attributes()` | Outputs classes/styles from **supports** (color, spacing…) |
| `esc_html()` | Safe output (prevents XSS) |

> A temporary `print_r( $attributes )` is fine on a local lab site. Remove it before any real site.

---

## Tiny example — safe debug for admins only

```php
if ( current_user_can( 'manage_options' ) ) {
	echo '<pre>' . esc_html( print_r( $attributes, true ) ) . '</pre>';
}
```

---

## How to test

1. Change message in the editor → Update.  
2. **View post**.  
3. See your message + a `<time>`.  
4. Refresh the page a few times → time should change.  
5. In the editor, set a background color → Update → frontend keeps the styling.

### View Source checklist

Frontend source should include something like:

```html
<div class="wp-block-create-block-gutenberg-lab ...">
  <p>Hello lab</p>
  <time>2026-...</time>
</div>
```

---

## How to debug

| Symptom | Likely cause | What to do |
|---------|--------------|------------|
| Editor OK, frontend blank | PHP error in render | Check `wp-content/debug.log` |
| Message missing | Wrong attribute key | Dump `$attributes` temporarily |
| Colors/spacing missing | Forgot wrapper helper | Use `get_block_wrapper_attributes()` on outer tag |
| `src/render.php` changes ignored | `build/render.php` not updated | Run `npm start` / `npm run build` |

### Break-and-fix

1. Typo: `$attributes['mesage']` → empty paragraph.  
2. Fix key → message returns.  
3. Remove wrapper helper → support styles disappear on frontend.

---

## Checkpoint

Frontend shows your message and a changing timestamp; supports styles appear on the wrapper.

**Previous:** [05-save-js.md](./05-save-js.md)  
**Next:** [07-build-and-assets.md](./07-build-and-assets.md)
