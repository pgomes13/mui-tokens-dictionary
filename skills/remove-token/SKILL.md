---
name: remove-token
description: Remove an existing design token from the correct JSON source file. Handles cleanup of empty parent objects, rebuilds both the token pipeline and the site to verify.
argument-hint: "[category/file] [token.path]"
allowed-tools: Read Edit Bash
---

Remove an existing design token from this repository. Arguments: $ARGUMENTS

## What to do

1. **Parse the request.** If $ARGUMENTS is empty, ask the user for:
   - Target file (e.g. `spacing`, `shape`, `palette/light`, `typography/base`)
   - Token path as dot-notation (e.g. `spacing.21` or `palette.primary.light`)

2. **Locate the token** at `tokens/<target>.json`. Read the file and confirm the token path exists. If it does not exist, stop and tell the user.

3. **Check for references** before removing:
   - Grep the `site/src/` directory for the CSS variable name (`--mui-<kebab-path>`) and JS export name (`Mui<PascalCase>`) to ensure nothing in the site hardcodes this token.
   - If references are found, list them and ask the user to confirm before proceeding.

4. **Remove the token** from the JSON file:
   - Delete the leaf object `"tokenName": { "$value": "...", "$type": "..." }` at the specified path.
   - If removing the token leaves a parent object empty (no remaining siblings), remove the parent object too. Repeat up the tree until a non-empty parent is reached.
   - Preserve existing indentation style (2-space) and all sibling fields.

5. **Run the builds** to verify no errors:
   ```bash
   npm run build
   cd site && npm run build
   ```
   Both must pass. The root build validates Style Dictionary; the site build confirms the token JSON is importable and the app compiles. If either fails, revert the change and report the error.

6. **Report** what was removed:
   - Token path (dot-notation)
   - Value that was removed
   - CSS variable name that no longer exists: `--mui-<kebab-path>`
   - JS export name that no longer exists: `Mui<PascalCase>`
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
