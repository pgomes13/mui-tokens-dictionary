# Adding & Modifying Tokens

## Adding a new token

1. Open (or create) the relevant JSON file under `tokens/`.
2. Add the token following the `{ "$value": "...", "$type": "..." }` format.
3. Run `npm run build` — the new token appears in all output files automatically.

**Example:** adding a `palette.brand.accent` color to the light theme:

```json
// tokens/palette/light.json
{
  "palette": {
    "brand": {
      "accent": { "$value": "#ff5722", "$type": "color" }
    }
  }
}
```

This produces:
- CSS: `--mui-palette-brand-accent: #ff5722;`
- JS: `export const MuiPaletteBrandAccent = '#ff5722';`

## Adding a dark-mode override

Add the same path to `tokens/palette/dark.json`:

```json
{
  "palette": {
    "brand": {
      "accent": { "$value": "#ff8a65", "$type": "color" }
    }
  }
}
```

Only palette tokens are included in the dark CSS output. Other token categories (typography, spacing, etc.) are not theme-specific and should not be added to `dark.json`.

## Adding a new token category

1. Create a new JSON file, e.g. `tokens/motion.json`.
2. Add it to `baseTokenSources` in `config.ts`:

```ts
const baseTokenSources = [
  // ...existing entries...
  'tokens/motion.json',
];
```

3. Run `npm run build`.

## Modifying an existing token

Edit the `$value` in the relevant JSON file and rebuild. The change propagates to CSS, JS, and TS outputs.

## Removing a token

Delete the key from the JSON file and rebuild. Make sure no consuming application references the removed CSS variable or JS export before doing so.

## Conventions

- Use CSS strings for sizes (e.g. `"8px"`, `"1rem"`) — the build deliberately skips `size/rem` conversion.
- Keep shared (non-theme) tokens in base files; only put theme-varying colors in `light.json` / `dark.json`.
- Token paths should mirror MUI's theme shape where possible to aid discoverability.
