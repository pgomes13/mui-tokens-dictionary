# Token Structure

Tokens are stored as JSON files under `tokens/` and follow a hierarchical path that maps directly to CSS variable names and JS export names.

## Naming Convention

A token at path `palette.primary.main` with prefix `mui` becomes:

- **CSS:** `--mui-palette-primary-main`
- **JS:** `MuiPalettePrimaryMain`

The `DEFAULT` key at any level is stripped from the name (e.g. `typography.fontFamily.DEFAULT` → `--mui-typography-fontFamily`).

## Directory Layout

```
tokens/
  palette/
    common.json       # black, white
    grey.json         # grey.50 – grey.900
    light.json        # light-theme palette (primary, secondary, error, etc.)
    dark.json         # dark-theme palette overrides
  typography/
    base.json         # fontFamily, fontWeightLight/Regular/Medium/Bold, htmlFontSize, fontSize
    variants.json     # h1–h6, body1/2, subtitle, caption, overline, button
  spacing.json        # 0–20 steps in 8px increments
  shape.json          # borderRadius
  breakpoints.json    # xs, sm, md, lg, xl values
  zIndex.json         # mobileStepper, fab, speedDial, appBar, drawer, modal, snackbar, tooltip
  transitions/
    duration.json     # shortest, shorter, short, standard, complex, enteringScreen, leavingScreen
    easing.json       # easeInOut, easeOut, easeIn, sharp
```

## Token File Format

Tokens follow the [W3C Design Token Community Group](https://design-tokens.github.io/community-group/format/) draft spec. Each leaf token has a `$value` and optional `$type`:

```json
{
  "palette": {
    "primary": {
      "main": { "$value": "#1976d2", "$type": "color" }
    }
  }
}
```

## Theme Tokens

Base tokens (grey, common, typography, spacing, shape, breakpoints, zIndex, transitions) are shared across themes. Only `palette/light.json` and `palette/dark.json` differ between builds.

The dark build filters to `palette` tokens only — all other tokens are identical between themes and are not duplicated in the dark CSS output.
