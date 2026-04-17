import paletteLight from '@tokens/palette/light.json'
import paletteDark from '@tokens/palette/dark.json'
import paletteGrey from '@tokens/palette/grey.json'
import paletteCommon from '@tokens/palette/common.json'
import typographyBase from '@tokens/typography/base.json'
import typographyVariants from '@tokens/typography/variants.json'
import spacing from '@tokens/spacing.json'
import shape from '@tokens/shape.json'
import breakpoints from '@tokens/breakpoints.json'
import zIndex from '@tokens/zIndex.json'
import transitionDuration from '@tokens/transitions/duration.json'
import transitionEasing from '@tokens/transitions/easing.json'

export const rawTokenFiles = {
  'palette/light': paletteLight,
  'palette/dark': paletteDark,
  'palette/grey': paletteGrey,
  'palette/common': paletteCommon,
  'typography/base': typographyBase,
  'typography/variants': typographyVariants,
  spacing,
  shape,
  breakpoints,
  zIndex,
  'transitions/duration': transitionDuration,
  'transitions/easing': transitionEasing,
} as const

export type RawTokenFileKey = keyof typeof rawTokenFiles
