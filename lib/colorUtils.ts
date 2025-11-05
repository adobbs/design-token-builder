import { ColorPaletteConfig, ColorToken, TokenGroup } from "@/types/tokens";
import { formatCss, oklch, Oklch } from "culori";

/**
 * Generate a color scale in OKLCH color space
 */
export function generateColorScale(
  hue: number,
  chromaMin: number,
  chromaMax: number,
  steps: number
): string[] {
  const colors: string[] = [];

  for (let i = 0; i < steps; i++) {
    // Lightness from 95% to 10%
    const lightness = 0.95 - (i / (steps - 1)) * 0.85;

    // Chroma varies from min to max, peaking in the middle
    const t = i / (steps - 1);
    const chromaPeak = 0.5;
    const chromaFactor = 1 - Math.abs(t - chromaPeak) / chromaPeak;
    const chroma = chromaMin + (chromaMax - chromaMin) * chromaFactor;

    const color: Oklch = { mode: "oklch", l: lightness, c: chroma, h: hue };
    const formatted = formatCss(color);
    if (formatted) {
      colors.push(formatted);
    }
  }

  return colors;
}

/**
 * Generate a neutral gray scale in OKLCH
 */
export function generateNeutralScale(
  hue: number,
  chroma: number,
  steps: number
): string[] {
  const colors: string[] = [];

  for (let i = 0; i < steps; i++) {
    const lightness = 0.98 - (i / (steps - 1)) * 0.88;
    const color: Oklch = { mode: "oklch", l: lightness, c: chroma, h: hue };
    const formatted = formatCss(color);
    if (formatted) {
      colors.push(formatted);
    }
  }

  return colors;
}

/**
 * Generate color palette tokens in W3C DTCG format
 */
export function generateColorPalette(
  config: ColorPaletteConfig
): Record<string, TokenGroup | ColorToken> {
  const palette: Record<string, TokenGroup | ColorToken> = {};

  // Generate primary colors
  const primaryColors = generateColorScale(
    config.primary.hue,
    config.primary.chromaMin,
    config.primary.chromaMax,
    config.primary.steps
  );

  palette.primary = {
    $type: "color",
    $description: "Primary color scale",
  };

  primaryColors.forEach((color, index) => {
    const step = (index + 1) * (1000 / config.primary.steps);
    (palette.primary as TokenGroup)[step.toString()] = {
      $type: "color",
      $value: color,
    } as ColorToken;
  });

  // Generate neutral colors
  const neutralColors = generateNeutralScale(
    config.neutral.hue,
    config.neutral.chroma,
    config.neutral.steps
  );

  palette.neutral = {
    $type: "color",
    $description: "Neutral gray scale",
  };

  neutralColors.forEach((color, index) => {
    const step = (index + 1) * (1000 / config.neutral.steps);
    (palette.neutral as TokenGroup)[step.toString()] = {
      $type: "color",
      $value: color,
    } as ColorToken;
  });

  // Generate accent colors if configured
  if (config.accent) {
    const accentColors = generateColorScale(
      config.accent.hue,
      config.accent.chromaMin,
      config.accent.chromaMax,
      config.accent.steps
    );

    palette.accent = {
      $type: "color",
      $description: "Accent color scale",
    };

    accentColors.forEach((color, index) => {
      const step = (index + 1) * (1000 / config.accent!.steps);
      (palette.accent as TokenGroup)[step.toString()] = {
        $type: "color",
        $value: color,
      } as ColorToken;
    });
  }

  return palette;
}

/**
 * Convert OKLCH to RGB for preview purposes
 */
export function oklchToRgb(oklchStr: string): string {
  try {
    const color = oklch(oklchStr);
    if (color) {
      return formatCss(color);
    }
  } catch (e) {
    console.error("Error converting OKLCH to RGB:", e);
  }
  return oklchStr;
}
