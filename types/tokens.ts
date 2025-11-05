/**
 * W3C Design Tokens Community Group (DTCG) Format
 * https://design-tokens.github.io/community-group/format/
 */

export interface BaseToken {
  $type?: string;
  $description?: string;
  $extensions?: Record<string, unknown>;
}

export interface ColorToken extends BaseToken {
  $type: "color";
  $value: string; // OKLCH format: "oklch(L C H)"
}

export interface DimensionToken extends BaseToken {
  $type: "dimension";
  $value: string; // e.g., "16px", "1rem"
}

export interface FontFamilyToken extends BaseToken {
  $type: "fontFamily";
  $value: string | string[];
}

export interface FontWeightToken extends BaseToken {
  $type: "fontWeight";
  $value: number | string;
}

export interface FontSizeToken extends BaseToken {
  $type: "fontSize";
  $value: string;
}

export interface LineHeightToken extends BaseToken {
  $type: "lineHeight";
  $value: string | number;
}

export interface ShadowToken extends BaseToken {
  $type: "shadow";
  $value: {
    color: string;
    offsetX: string;
    offsetY: string;
    blur: string;
    spread: string;
  } | Array<{
    color: string;
    offsetX: string;
    offsetY: string;
    blur: string;
    spread: string;
  }>;
}

export interface BorderRadiusToken extends BaseToken {
  $type: "dimension";
  $value: string;
}

export type DesignToken =
  | ColorToken
  | DimensionToken
  | FontFamilyToken
  | FontWeightToken
  | FontSizeToken
  | LineHeightToken
  | ShadowToken
  | BorderRadiusToken;

export interface TokenGroup {
  $type?: string;
  $description?: string;
  [key: string]: DesignToken | TokenGroup | string | undefined;
}

export interface DesignTokens {
  $schema?: string;
  $description?: string;
  color?: {
    [key: string]: ColorToken | TokenGroup;
  };
  typography?: {
    fontFamily?: {
      [key: string]: FontFamilyToken;
    };
    fontSize?: {
      [key: string]: FontSizeToken;
    };
    fontWeight?: {
      [key: string]: FontWeightToken;
    };
    lineHeight?: {
      [key: string]: LineHeightToken;
    };
  };
  radius?: {
    [key: string]: BorderRadiusToken;
  };
  shadow?: {
    [key: string]: ShadowToken;
  };
  spacing?: {
    [key: string]: DimensionToken;
  };
}

// Application state types
export interface ColorPaletteConfig {
  primary: {
    hue: number;
    chromaMin: number;
    chromaMax: number;
    steps: number;
  };
  neutral: {
    hue: number;
    chroma: number;
    steps: number;
  };
  accent?: {
    hue: number;
    chromaMin: number;
    chromaMax: number;
    steps: number;
  };
}

export interface TypographyConfig {
  baseFontSize: number;
  scale: number;
  fontFamilies: {
    sans: string;
    serif: string;
    mono: string;
  };
  weights: {
    regular: number;
    medium: number;
    semibold: number;
    bold: number;
  };
}

export interface RadiusConfig {
  scale: number[];
}

export interface ShadowConfig {
  elevations: number[];
}
