# mui-tokens-dictionary

A design token pipeline that converts MUI-aligned JSON tokens into CSS custom properties and JavaScript/TypeScript modules using [Style Dictionary](https://styledictionary.com/).

**Live site:** [https://pgomes13.github.io/mui-tokens-dictionary/](https://pgomes13.github.io/mui-tokens-dictionary/)
**npm:** [https://www.npmjs.com/package/mui-tokens-dictionary](https://www.npmjs.com/package/mui-tokens-dictionary)

## Overview

- Single source of truth for MUI design tokens (colors, typography, spacing, and more)
- Generates CSS variables for both light and dark themes
- Outputs typed JavaScript/TypeScript modules for programmatic use
- Read-only token dictionary site with Designer and Developer views
- Automated versioning and deployment via semantic-release on every merge to `main`
- Manual npm publish via GitHub Actions

## Installation

```bash
npm install mui-tokens-dictionary
```

## Usage

### CSS

```js
import 'mui-tokens-dictionary/tokens.css'
```

```css
.button {
  background: var(--mui-palette-primary-main);
  border-radius: var(--mui-shape-borderRadius);
}
```

Dark mode activates automatically when `data-mui-color-scheme="dark"` is set on any ancestor element.

### JavaScript / TypeScript

```ts
import { MuiPalettePrimaryMain } from 'mui-tokens-dictionary'
```

## Local Development

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

## Token Dictionary Site

The site (`site/`) is a React + Vite app deployed to GitHub Pages. It is read-only — no editing or authentication required.

### Designer view
- Color swatches with clickable hex and CSS variable chips
- Typography specimens with font metadata
- Spacing bars and shape previews
- Light / Dark theme toggle

### Developer view
- Filterable table of all tokens with CSS variable and JS export names
- Click **Explore** on any token to open a usage modal with copy-ready CSS and JS snippets

## Releasing

Versioning is fully automated via [semantic-release](https://github.com/semantic-release/semantic-release). Merge to `main` with conventional commits and the pipeline handles the rest:

1. **semantic-release** analyzes commits, bumps `package.json`, updates `CHANGELOG.md`, creates a git tag, and publishes a GitHub Release with token build artifacts attached
2. **Deploy site** runs automatically after a successful release, rebuilding and deploying the site with the new version shown in the footer

### Commit message convention

| Prefix | Version bump |
|--------|-------------|
| `fix:` | patch — `1.0.0` → `1.0.1` |
| `feat:` | minor — `1.0.0` → `1.1.0` |
| `feat!:` or `BREAKING CHANGE:` | major — `1.0.0` → `2.0.0` |

## Publishing to npm

npm publish is **manual**. After a release is created:

1. Go to **Actions → Publish to npm → Run workflow**
2. Optionally enter a specific tag (defaults to the latest release)

Requires an `NPM_TOKEN` secret set in repository Settings → Secrets and variables → Actions.

## Project Structure

```
tokens/             # JSON token source files (W3C design token format)
  palette/          # Color tokens — common, grey, light, dark
  typography/       # Font family, weight, size tokens
  transitions/      # Duration and easing tokens
  spacing.json
  shape.json
  breakpoints.json
  zIndex.json
config.ts           # Style Dictionary configuration
scripts/
  build.ts          # Build entry point
build/              # Generated output (do not edit manually)
site/               # Token dictionary React app
  src/
    components/     # Layout, designer, developer, common components
    pages/          # DesignerPage, DeveloperPage
    hooks/          # useTokenData, useTheme
    lib/            # tokenUtils, w3cExport
    tokens/         # Static JSON imports
skills/             # Claude Code slash commands
  add-token/        # /add-token — add a new token
  edit-token/       # /edit-token — edit an existing token value
  remove-token/     # /remove-token — remove a token
.github/workflows/
  release.yml       # semantic-release on push to main
  deploy-site.yml   # Site deploy triggered after release
  publish-npm.yml   # Manual npm publish via workflow_dispatch
docs/               # Extended documentation
```
