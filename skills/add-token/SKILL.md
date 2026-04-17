---
name: add-token
description: Add a new design token to the correct JSON source file, following project conventions. Updates config.ts and site/src/tokens/index.ts when a new category file is created.
argument-hint: "[category/file] [token.path] [value] [type]"
allowed-tools: Read Edit Write Bash
---

Add a new design token to this repository. Arguments: $ARGUMENTS

## What to do

1. **Parse the request.** If $ARGUMENTS is empty, ask the user for:
   - Target file (e.g. `spacing`, `shape`, `palette/light`, `typography/base`)
   - Token path as dot-notation (e.g. `spacing.21` or `palette.primary.light`)
   - Value — must be a CSS string for sizes/dimensions (e.g. `"168px"`, not `168`)
   - W3C type (`color` | `dimension` | `fontFamily` | `fontWeight` | `fontSize` | `lineHeight` | `duration` | `cubicBezier` | `number` | `string`)

2. **Locate the file** at `tokens/<target>.json`. If it does not exist, this is a new category — flag it and follow the "New category" steps below.

3. **Validate conventions:**
   - Sizes and dimensions must be CSS strings (`"8px"`, `"1rem"`) — never raw numbers
   - Palette (color) tokens belong only in `palette/light.json`, `palette/dark.json`, `palette/grey.json`, or `palette/common.json`
   - Do not add palette tokens to base token files

4. **Write the token** into the JSON file using W3C leaf format:
   ```json
   "tokenName": { "$value": "VALUE", "$type": "TYPE" }
   ```
   Insert at the correct nesting level. Preserve the existing indentation style (2-space).

5. **New category steps** (only when the target file does not exist):
   - Create `tokens/<name>.json` with the token already inside
   - Add `'tokens/<name>.json'` to `baseTokenSources` array in `config.ts`
   - Add an import and entry to `site/src/tokens/index.ts` matching the existing pattern

6. **Run the builds** to verify no errors:
   ```bash
   npm run build
   cd site && npm run build
   ```
   Both must pass. The root build validates Style Dictionary; the site build confirms the token JSON is importable and the app compiles.

7. **Report** the generated names so the user can use them immediately:
   - CSS variable: `--mui-<kebab-path>` (DEFAULT segments stripped)
   - JS export: `Mui<PascalCase>` (DEFAULT segments stripped)
   - Example: path `palette.primary.main` → `--mui-palette-primary-main` / `MuiPalettePrimaryMain`

## Naming rules (mirrors the pipeline)

- CSS var: join path with `-`, strip `DEFAULT` segments, prepend `--mui-`
- JS name: join path in PascalCase, strip `DEFAULT` segments, prepend `Mui`
- These must match exactly what `toCssVar` / `toJsName` in `site/src/lib/tokenUtils.ts` produces

## Existing token files

| File | Category |
|------|----------|
| `tokens/palette/light.json` | Light palette colors |
| `tokens/palette/dark.json` | Dark palette colors |
| `tokens/palette/grey.json` | Grey scale |
| `tokens/palette/common.json` | Common colors (black/white) |
| `tokens/typography/base.json` | Font family, weight, size base values |
| `tokens/typography/variants.json` | Per-variant typography (h1–h6, body, etc.) |
| `tokens/spacing.json` | Spacing scale |
| `tokens/shape.json` | Border radius |
| `tokens/breakpoints.json` | Responsive breakpoints |
| `tokens/zIndex.json` | Z-index scale |
| `tokens/transitions/duration.json` | Transition durations |
| `tokens/transitions/easing.json` | Transition easing curves |
