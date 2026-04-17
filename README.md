# mui-tokens-dictionary

A design token pipeline that converts MUI-aligned JSON tokens into CSS custom properties and JavaScript/TypeScript modules using [Style Dictionary](https://styledictionary.com/).

**Live site:** [https://pgomes13.github.io/mui-tokens-dictionary/](https://pgomes13.github.io/mui-tokens-dictionary/)

## Overview

- Single source of truth for MUI design tokens (colors, typography, spacing, and more)
- Generates CSS variables for both light and dark themes
- Outputs typed JavaScript/TypeScript modules for programmatic use

## Quick Start

```bash
make install
make build
```

| Command | Description |
|---------|-------------|
| `make install` | Install dependencies |
| `make build` | Build token outputs |
| `make clean` | Remove `build/` artifacts |
| `make rebuild` | Clean then build |

Output is written to `build/`:

| File | Description |
|------|-------------|
| `tokens.css` | CSS custom properties (light + dark mode) |
| `tokens.js` | ES6 named exports |
| `tokens.d.ts` | TypeScript declarations |

## Usage

### CSS

```html
<link rel="stylesheet" href="build/tokens.css" />
```

```css
.button {
  background: var(--mui-palette-primary-main);
  border-radius: var(--mui-shape-borderRadius);
}
```

Dark mode activates automatically when the `data-mui-color-scheme="dark"` attribute is set on any ancestor element.

### JavaScript / TypeScript

```ts
import { MuiPalettePrimaryMain } from './build/tokens.js';
```

## Documentation

- [Token Structure](docs/token-structure.md) — how tokens are organized and named
- [Build Pipeline](docs/build-pipeline.md) — how the build works end-to-end
- [Adding Tokens](docs/adding-tokens.md) — how to add or modify tokens

## Project Structure

```
tokens/           # JSON token source files
  palette/        # Color tokens (common, grey, light, dark themes)
  typography/     # Font family, weight, size tokens
  transitions/    # Duration and easing tokens
  spacing.json
  shape.json
  breakpoints.json
  zIndex.json
config.ts         # Style Dictionary configuration
scripts/
  build.ts        # Build entry point
build/            # Generated output (do not edit manually)
docs/             # Extended documentation
```
