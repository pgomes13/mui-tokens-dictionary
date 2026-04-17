import StyleDictionary from 'style-dictionary';
import type { Config, TransformedToken } from 'style-dictionary/types';

StyleDictionary.registerTransform({
  name: 'name/mui/kebab',
  type: 'name',
  transform(token: TransformedToken, options): string {
    return [(options as { prefix?: string })?.prefix]
      .filter(Boolean)
      .concat(token.path.filter((s: string) => s !== 'DEFAULT'))
      .join('-');
  },
});

StyleDictionary.registerTransformGroup({
  name: 'css/mui',
  // Deliberately omits size/rem — all values stored as CSS strings already
  transforms: ['attribute/cti', 'name/mui/kebab', 'color/css'],
});

const baseTokenSources = [
  'tokens/palette/grey.json',
  'tokens/palette/common.json',
  'tokens/typography/base.json',
  'tokens/typography/variants.json',
  'tokens/spacing.json',
  'tokens/shape.json',
  'tokens/breakpoints.json',
  'tokens/zIndex.json',
  'tokens/transitions/duration.json',
  'tokens/transitions/easing.json',
];

export const lightConfig: Config = {
  source: [...baseTokenSources, 'tokens/palette/light.json'],
  platforms: {
    css: {
      transformGroup: 'css/mui',
      prefix: 'mui',
      buildPath: 'build/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            selector: ':root',
            outputReferences: false,
          },
        },
      ],
    },
    js: {
      transformGroup: 'js',
      prefix: 'Mui',
      buildPath: 'build/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
        },
        {
          destination: 'tokens.d.ts',
          format: 'typescript/es6-declarations',
        },
      ],
    },
  },
};

export const darkConfig: Config = {
  source: [...baseTokenSources, 'tokens/palette/dark.json'],
  platforms: {
    css: {
      transformGroup: 'css/mui',
      prefix: 'mui',
      buildPath: 'build/',
      files: [
        {
          destination: 'tokens.dark.css',
          format: 'css/variables',
          filter: (token: TransformedToken) => token.path[0] === 'palette',
          options: {
            selector: '[data-mui-color-scheme="dark"]',
            outputReferences: false,
          },
        },
      ],
    },
  },
};
