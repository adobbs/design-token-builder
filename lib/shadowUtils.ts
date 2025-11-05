import { ShadowConfig, ShadowToken } from "@/types/tokens";

/**
 * Generate shadow tokens in W3C DTCG format
 */
export function generateShadowTokens(
  config: ShadowConfig
): Record<string, ShadowToken> {
  const tokens: Record<string, ShadowToken> = {};
  const names = ["xs", "sm", "base", "md", "lg", "xl", "2xl"];

  config.elevations.forEach((elevation, index) => {
    const name = names[index] || `elevation-${index}`;
    tokens[name] = {
      $type: "shadow",
      $value: generateShadowValue(elevation),
    };
  });

  return tokens;
}

function generateShadowValue(elevation: number): ShadowToken["$value"] {
  // Generate shadow based on elevation
  const blur = elevation * 2;
  const spread = -elevation / 4;
  const offsetY = elevation;

  return {
    color: "oklch(0 0 0 / 0.1)",
    offsetX: "0px",
    offsetY: `${offsetY}px`,
    blur: `${blur}px`,
    spread: `${spread}px`,
  };
}
