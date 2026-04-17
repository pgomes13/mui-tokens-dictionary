import StyleDictionary from 'style-dictionary';
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { lightConfig, darkConfig } from '../config.js';

async function build() {
  const sdLight = new StyleDictionary(lightConfig);
  await sdLight.buildAllPlatforms();

  const sdDark = new StyleDictionary(darkConfig);
  await sdDark.buildAllPlatforms();

  const lightCss = readFileSync('build/tokens.css', 'utf8');
  const darkCss = readFileSync('build/tokens.dark.css', 'utf8');
  writeFileSync('build/tokens.css', lightCss + '\n' + darkCss);
  unlinkSync('build/tokens.dark.css');

  console.log('Build complete: build/tokens.css, build/tokens.js, build/tokens.d.ts');
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
