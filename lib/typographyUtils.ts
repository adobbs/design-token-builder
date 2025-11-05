import {
  TypographyConfig,
  FontFamilyToken,
  FontSizeToken,
  FontWeightToken,
  LineHeightToken,
} from "@/types/tokens";

/**
 * Generate typography tokens in W3C DTCG format
 */
export function generateTypographyTokens(config: TypographyConfig) {
  const fontSizes = generateFontSizeScale(config.baseFontSize, config.scale);
  const lineHeights = generateLineHeightScale();

  return {
    fontFamily: {
      sans: {
        $type: "fontFamily",
        $value: config.fontFamilies.sans,
      } as FontFamilyToken,
      serif: {
        $type: "fontFamily",
        $value: config.fontFamilies.serif,
      } as FontFamilyToken,
      mono: {
        $type: "fontFamily",
        $value: config.fontFamilies.mono,
      } as FontFamilyToken,
    },
    fontSize: fontSizes,
    fontWeight: {
      regular: {
        $type: "fontWeight",
        $value: config.weights.regular,
      } as FontWeightToken,
      medium: {
        $type: "fontWeight",
        $value: config.weights.medium,
      } as FontWeightToken,
      semibold: {
        $type: "fontWeight",
        $value: config.weights.semibold,
      } as FontWeightToken,
      bold: {
        $type: "fontWeight",
        $value: config.weights.bold,
      } as FontWeightToken,
    },
    lineHeight: lineHeights,
  };
}

function generateFontSizeScale(
  baseSize: number,
  scale: number
): Record<string, FontSizeToken> {
  const sizes = ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl"];
  const tokens: Record<string, FontSizeToken> = {};

  sizes.forEach((size, index) => {
    // Start from smaller than base
    const steps = index - 2;
    const value = baseSize * Math.pow(scale, steps);
    tokens[size] = {
      $type: "fontSize",
      $value: `${Math.round(value * 100) / 100}px`,
    };
  });

  return tokens;
}

function generateLineHeightScale(): Record<string, LineHeightToken> {
  return {
    tight: {
      $type: "lineHeight",
      $value: 1.25,
    },
    normal: {
      $type: "lineHeight",
      $value: 1.5,
    },
    relaxed: {
      $type: "lineHeight",
      $value: 1.75,
    },
    loose: {
      $type: "lineHeight",
      $value: 2,
    },
  };
}
