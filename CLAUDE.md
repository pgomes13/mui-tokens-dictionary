# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Token pipeline (repo root)
```bash
npm run build        # Run Style Dictionary → produces build/tokens.css, build/tokens.js, build/tokens.d.ts
make build           # Same via Makefile
make clean           # Remove build/
make rebuild         # clean + build
```

### Site (run inside `site/`)
```bash
cd site
npm run dev          # Vite dev server with HMR
npm run build        # TypeScript check + Vite production build → site/dist/
npm run preview      # Serve the production build locally
```

## Architecture

This repo has two independent sub-projects that share the `tokens/` directory as their source of truth.

### 1. Token pipeline (repo root)

`tokens/*.json` → `config.ts` + `scripts/build.ts` → `build/` artifacts

- Token files use the W3C design token format (`$value`, `$type` on every leaf).
- `config.ts` registers a custom Style Dictionary transform group `css/mui` and runs two passes: **light** (outputs `:root` CSS vars + JS/TS exports) and **dark** (outputs palette-only CSS vars under `[data-mui-color-scheme="dark"]`). `scripts/build.ts` merges the two CSS files into a single `build/tokens.css` and deletes the intermediate `build/tokens.dark.css`.
- `size/rem` transform is intentionally excluded — all sizes are already stored as CSS strings (e.g. `"8px"`).
- CSS variable names use the custom `name/mui/kebab` transform: kebab-case, `DEFAULT` path segments stripped, `--mui-` prefix. JS names use PascalCase with `Mui` prefix.
- Only `palette/light.json` and `palette/dark.json` differ between builds; all other token files are shared base tokens.

### 2. Site (`site/`)

React + Vite + TypeScript app deployed to GitHub Pages at `https://pgomes13.github.io/mui-tokens-dictionary/`.

**Data flow:**
- `site/src/tokens/index.ts` imports all 12 token JSON files as static compile-time imports (via Vite's `resolveJsonModule` + `@tokens` alias pointing to `../tokens/`). No runtime fetching for reads.
- `site/src/lib/tokenUtils.ts` provides `flattenTokens` (recursive W3C leaf walker), `toCssVar` / `toJsName` (replicates the pipeline's naming logic), and `groupByCategory`.
- `site/src/hooks/useTokenData.ts` memoizes the flattened/grouped result once on mount.

**Two audience views** toggled in `App.tsx`:
- **Designer view** (`DesignerPage`) — color swatches, typography specimens, spacing bars, simple token tables. Includes a "Download Tokens Studio JSON" button that calls `site/src/lib/w3cExport.ts` to merge all token files into the Tokens Studio envelope format and trigger a browser download.
- **Developer view** (`DeveloperPage`) — filterable table of all tokens with CSS variable name, JS export name, value, and copy buttons. `UsageSnippet` shows copy-ready CSS and JS code blocks.

**Token editing:**
- Requires a GitHub Personal Access Token (PAT) with `repo` scope, stored in `localStorage` key `mui-tokens-pat`.
- `site/src/lib/github.ts` (`createPrFromEdit`) uses `@octokit/rest` to: get `main` SHA → create branch `token-edit/{timestamp}` → fetch + patch the JSON file → push → open a PR. The PAT never leaves the browser.

**Theme toggle:** sets `data-mui-color-scheme="dark"` on `<html>`, persisted in `localStorage`. This is the same attribute MUI's `CssVarsProvider` uses.

### CI/CD

`.github/workflows/deploy-site.yml` — on push to `main`: runs root `npm run build` (validates tokens), then `cd site && npm run build`, then pushes `site/dist/` to the `gh-pages` branch via `peaceiris/actions-gh-pages`.

After the first deploy, enable Pages in repo Settings → Pages → Source: `gh-pages` branch.

## Token file conventions

- Sizes are CSS strings (`"8px"`, `"1rem"`) — do not use raw numbers.
- Only palette tokens belong in `light.json` / `dark.json`. Everything else goes in a base file.
- To add a new base token category, create `tokens/<name>.json` and add its path to `baseTokenSources` in `config.ts` and to `rawTokenFiles` in `site/src/tokens/index.ts`.
