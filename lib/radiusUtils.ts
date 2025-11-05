import { RadiusConfig, BorderRadiusToken } from "@/types/tokens";

/**
 * Generate border radius tokens in W3C DTCG format
 */
export function generateRadiusTokens(
  config: RadiusConfig
): Record<string, BorderRadiusToken> {
  const tokens: Record<string, BorderRadiusToken> = {};
  const names = ["none", "sm", "base", "md", "lg", "xl", "2xl", "full"];

  config.scale.forEach((value, index) => {
    const name = names[index] || `custom-${index}`;
    tokens[name] = {
      $type: "dimension",
      $value: value === 9999 ? "9999px" : `${value}px`,
    };
  });

  // Add full radius
  if (!config.scale.includes(9999)) {
    tokens.full = {
      $type: "dimension",
      $value: "9999px",
    };
  }

  return tokens;
}
