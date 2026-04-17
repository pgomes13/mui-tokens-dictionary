# Build Pipeline

## Overview

The build runs in two Style Dictionary passes — one for the light theme, one for dark — then merges the CSS outputs into a single file.

```
npm run build
  └── tsx scripts/build.ts
        ├── StyleDictionary(lightConfig) → build/tokens.css, build/tokens.js, build/tokens.d.ts
        ├── StyleDictionary(darkConfig)  → build/tokens.dark.css
        └── merge: tokens.css + tokens.dark.css → tokens.css  (tokens.dark.css deleted)
```

## Transform Group: `css/mui`

A custom transform group registered in `config.ts`:

| Transform | Purpose |
|-----------|---------|
| `attribute/cti` | Annotates tokens with category/type/item metadata |
| `name/mui/kebab` | Generates kebab-case names, strips `DEFAULT` path segments |
| `color/css` | Converts color values to CSS-compatible strings |

`size/rem` is intentionally excluded — all size values are stored as CSS strings already (e.g. `"8px"`).

## Light Build

**Sources:** all base token files + `tokens/palette/light.json`

**Outputs:**

| File | Format | Selector |
|------|--------|----------|
| `build/tokens.css` | `css/variables` | `:root` |
| `build/tokens.js` | `javascript/es6` | — |
| `build/tokens.d.ts` | `typescript/es6-declarations` | — |

## Dark Build

**Sources:** all base token files + `tokens/palette/dark.json`

**Output:** `build/tokens.dark.css` — palette tokens only, under selector `[data-mui-color-scheme="dark"]`

## Final CSS Output

After both passes, `scripts/build.ts` concatenates the two CSS files:

```css
/* tokens.css (final) */

:root {
  --mui-palette-primary-main: #1976d2;
  /* ... all light tokens ... */
}

[data-mui-color-scheme="dark"] {
  --mui-palette-primary-main: #90caf9;
  /* ... dark palette overrides ... */
}
```

## Activating Dark Mode

Set the attribute on any ancestor (typically `<html>` or `<body>`):

```html
<html data-mui-color-scheme="dark">
```

This matches how MUI's `CssVarsProvider` activates dark mode when using CSS variables.
