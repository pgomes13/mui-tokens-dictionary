---
name: edit-token
description: Edit the value (and optionally the type) of an existing design token in the correct JSON source file, following project conventions. Rebuilds both the token pipeline and the site to verify.
argument-hint: "[category/file] [token.path] [new-value] [new-type?]"
allowed-tools: Read Edit Bash
---

Edit an existing design token in this repository. Arguments: $ARGUMENTS

## What to do

1. **Parse the request.** If $ARGUMENTS is empty, ask the user for:
   - Target file (e.g. `spacing`, `shape`, `palette/light`, `typography/base`)
   - Token path as dot-notation (e.g. `spacing.4` or `palette.primary.main`)
   - New value — must be a CSS string for sizes/dimensions (e.g. `"20px"`, not `20`)
   - New type (optional — only if the type is also changing)

2. **Locate the token** at `tokens/<target>.json`. Read the file and confirm the token path exists. If it does not exist, stop and tell the user — use `add-token` instead.

3. **Validate conventions:**
   - Sizes and dimensions must be CSS strings (`"8px"`, `"1rem"`) — never raw numbers
   - Color values (`$type: color`) must be valid hex or CSS color strings
   - Palette tokens live only in `palette/light.json`, `palette/dark.json`, `palette/grey.json`, or `palette/common.json`
   - Do not move palette tokens into base token files or vice versa

4. **Update the token** in the JSON file:
   - Change `$value` to the new value
   - If a new type was provided, update `$type` as well
   - Preserve existing indentation style (2-space) and all sibling fields

5. **Run the builds** to verify no errors:
   ```bash
   npm run build
   cd site && npm run build
   ```
   Both must pass. The root build validates Style Dictionary; the site build confirms the token JSON is importable and the app compiles. If either fails, revert the change and report the error.

6. **Report** what changed:
   - Token path (dot-notation)
   - Old value → new value
   - CSS variable name: `--mui-<kebab-path>` (DEFAULT segments stripped)
   - JS export name: `Mui<PascalCase>` (DEFAULT segments stripped)
   - Remind the user to commit and push to trigger the automated release and site deploy

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
