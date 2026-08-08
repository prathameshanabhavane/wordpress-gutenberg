# Step 5 — `render.php` (frontend)

## What it is

For a dynamic block, every time someone views the post, WordPress runs `render.php` and injects the returned HTML.

**Analogy:** The display window in the shop. Each visitor gets a freshly built model (so `<time>` can be “now”).

## Where in this plugin

Source: `src/render.php`  
Loaded from: `build/render.php` (copied on build)

```php
$wrapper = get_block_wrapper_attributes();
$message = $attributes['message'] ?? '';
?>
<div <?php echo $wrapper; ?>>
	<p><?php echo esc_html( $message ); ?></p>
	<time><?php echo esc_html( current_time( 'mysql' ) ); ?></time>
</div>
```

### Variables WordPress gives you

| Variable | Meaning |
|----------|---------|
| `$attributes` | Block attributes (e.g. `message`, colors from supports) |
| `$content` | Inner block HTML (empty for us) |
| `$block` | Full `WP_Block` object |

`get_block_wrapper_attributes()` outputs classes/styles from **supports** (color, spacing, …). Always put it on the outer wrapper.

## Tiny example — safe debug dump

Temporary (remove for real sites):

```php
if ( current_user_can( 'manage_options' ) ) {
	echo '<pre>' . esc_html( print_r( $attributes, true ) ) . '</pre>';
}
```

Your file may already print `$attributes` while learning — that is fine on a local lab site; remove before production.

## How to test

1. Edit message in the editor → Update.
2. **View post** (frontend).
3. You should see:
   - Your message in a `<p>`
   - A `<time>` with server datetime
4. Refresh the frontend a few times — **time should change** (proves PHP runs each request).
5. In editor, set a background color → Update → frontend wrapper should keep that styling.

### View source

Frontend page source should contain something like:

```html
<div class="wp-block-create-block-gutenberg-lab ...">
  <p>Hello lab</p>
  <time>2026-...</time>
</div>
```

## How to debug

| Symptom | Likely cause | Fix / check |
|---------|--------------|-------------|
| Editor OK, frontend blank | PHP error in `render.php` | `WP_DEBUG_LOG`; check `debug.log` |
| Message missing | Wrong attribute key / empty attributes | `print_r( $attributes )` temporarily |
| Colors/spacing missing on frontend | Forgot `get_block_wrapper_attributes()` | Add to outer `<div>` |
| Changes to `src/render.php` ignored | `build/render.php` not updated | Run `npm start` / `npm run build` |
| XSS risk | Echoing unescaped attributes | Always `esc_html`, `esc_attr`, etc. |

### Break-and-fix

1. Typo the attribute: `$attributes['mesage']` → frontend paragraph empty.
2. Fix spelling → message returns.
3. Remove `get_block_wrapper_attributes()` → color supports stop showing on frontend.

## Checkpoint

Frontend shows your `message` plus a changing timestamp, and supports styles appear on the wrapper.
