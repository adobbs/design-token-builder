import { create } from "zustand";
import {
  DesignTokens,
  ColorPaletteConfig,
  TypographyConfig,
  RadiusConfig,
  ShadowConfig,
} from "@/types/tokens";
import { generateColorPalette } from "@/lib/colorUtils";
import { generateTypographyTokens } from "@/lib/typographyUtils";
import { generateRadiusTokens } from "@/lib/radiusUtils";
import { generateShadowTokens } from "@/lib/shadowUtils";

export type PanelType = "colors" | "typography" | "radius" | "shadows" | null;

interface DesignTokenState {
  // Current active panel
  activePanel: PanelType;
  setActivePanel: (panel: PanelType) => void;

  // Configuration for each category
  colorConfig: ColorPaletteConfig;
  typographyConfig: TypographyConfig;
  radiusConfig: RadiusConfig;
  shadowConfig: ShadowConfig;

  // Update functions
  updateColorConfig: (config: Partial<ColorPaletteConfig>) => void;
  updateTypographyConfig: (config: Partial<TypographyConfig>) => void;
  updateRadiusConfig: (config: Partial<RadiusConfig>) => void;
  updateShadowConfig: (config: Partial<ShadowConfig>) => void;

  // Generated tokens (W3C DTCG format)
  getTokens: () => DesignTokens;

  // Export tokens as JSON
  exportTokens: () => string;
}

const defaultColorConfig: ColorPaletteConfig = {
  primary: {
    hue: 210,
    chromaMin: 0.05,
    chromaMax: 0.15,
    steps: 10,
  },
  neutral: {
    hue: 210,
    chroma: 0.02,
    steps: 10,
  },
  accent: {
    hue: 150,
    chromaMin: 0.08,
    chromaMax: 0.18,
    steps: 10,
  },
};

const defaultTypographyConfig: TypographyConfig = {
  baseFontSize: 16,
  scale: 1.25,
  fontFamilies: {
    sans: "system-ui, -apple-system, sans-serif",
    serif: "Georgia, serif",
    mono: "ui-monospace, monospace",
  },
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

const defaultRadiusConfig: RadiusConfig = {
  scale: [0, 2, 4, 8, 12, 16, 24],
};

const defaultShadowConfig: ShadowConfig = {
  elevations: [1, 2, 4, 8, 16],
};

export const useDesignTokenStore = create<DesignTokenState>((set, get) => ({
  activePanel: null,
  setActivePanel: (panel) => set({ activePanel: panel }),

  colorConfig: defaultColorConfig,
  typographyConfig: defaultTypographyConfig,
  radiusConfig: defaultRadiusConfig,
  shadowConfig: defaultShadowConfig,

  updateColorConfig: (config) =>
    set((state) => ({
      colorConfig: { ...state.colorConfig, ...config },
    })),

  updateTypographyConfig: (config) =>
    set((state) => ({
      typographyConfig: { ...state.typographyConfig, ...config },
    })),

  updateRadiusConfig: (config) =>
    set((state) => ({
      radiusConfig: { ...state.radiusConfig, ...config },
    })),

  updateShadowConfig: (config) =>
    set((state) => ({
      shadowConfig: { ...state.shadowConfig, ...config },
    })),

  getTokens: () => {
    const state = get();
    return {
      $schema: "https://design-tokens.github.io/community-group/format/schema.json",
      $description: "Design Toys - Generated Design Tokens",
      color: generateColorPalette(state.colorConfig),
      typography: generateTypographyTokens(state.typographyConfig),
      radius: generateRadiusTokens(state.radiusConfig),
      shadow: generateShadowTokens(state.shadowConfig),
    };
  },

  exportTokens: () => {
    const tokens = get().getTokens();
    return JSON.stringify(tokens, null, 2);
  },
}));
