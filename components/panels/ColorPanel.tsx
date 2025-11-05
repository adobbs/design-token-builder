"use client";

import { useDesignTokenStore } from "@/stores/useDesignTokenStore";
import { generateColorScale, generateNeutralScale } from "@/lib/colorUtils";

export function ColorPanel() {
  const { colorConfig, updateColorConfig } = useDesignTokenStore();

  const handlePrimaryHueChange = (hue: number) => {
    updateColorConfig({
      primary: { ...colorConfig.primary, hue },
    });
  };

  const handlePrimaryChromaMinChange = (chromaMin: number) => {
    updateColorConfig({
      primary: { ...colorConfig.primary, chromaMin },
    });
  };

  const handlePrimaryChromaMaxChange = (chromaMax: number) => {
    updateColorConfig({
      primary: { ...colorConfig.primary, chromaMax },
    });
  };

  const handleNeutralHueChange = (hue: number) => {
    updateColorConfig({
      neutral: { ...colorConfig.neutral, hue },
    });
  };

  const handleNeutralChromaChange = (chroma: number) => {
    updateColorConfig({
      neutral: { ...colorConfig.neutral, chroma },
    });
  };

  const handleAccentHueChange = (hue: number) => {
    if (!colorConfig.accent) return;
    updateColorConfig({
      accent: { ...colorConfig.accent, hue },
    });
  };

  const handleAccentChromaMinChange = (chromaMin: number) => {
    if (!colorConfig.accent) return;
    updateColorConfig({
      accent: { ...colorConfig.accent, chromaMin },
    });
  };

  const handleAccentChromaMaxChange = (chromaMax: number) => {
    if (!colorConfig.accent) return;
    updateColorConfig({
      accent: { ...colorConfig.accent, chromaMax },
    });
  };

  // Generate preview colors
  const primaryColors = generateColorScale(
    colorConfig.primary.hue,
    colorConfig.primary.chromaMin,
    colorConfig.primary.chromaMax,
    colorConfig.primary.steps
  );

  const neutralColors = generateNeutralScale(
    colorConfig.neutral.hue,
    colorConfig.neutral.chroma,
    colorConfig.neutral.steps
  );

  const accentColors = colorConfig.accent
    ? generateColorScale(
        colorConfig.accent.hue,
        colorConfig.accent.chromaMin,
        colorConfig.accent.chromaMax,
        colorConfig.accent.steps
      )
    : [];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Colors</h2>
        <p className="text-sm text-gray-600">
          Configure OKLCH-based color palettes
        </p>
      </div>

      {/* Primary Colors */}
      <section className="space-y-3">
        <h3 className="font-semibold text-gray-900">Primary</h3>

        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Hue: {colorConfig.primary.hue}°
          </label>
          <input
            type="range"
            min="0"
            max="360"
            value={colorConfig.primary.hue}
            onChange={(e) => handlePrimaryHueChange(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Chroma Min: {colorConfig.primary.chromaMin.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="0.4"
            step="0.01"
            value={colorConfig.primary.chromaMin}
            onChange={(e) =>
              handlePrimaryChromaMinChange(Number(e.target.value))
            }
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Chroma Max: {colorConfig.primary.chromaMax.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="0.4"
            step="0.01"
            value={colorConfig.primary.chromaMax}
            onChange={(e) =>
              handlePrimaryChromaMaxChange(Number(e.target.value))
            }
            className="w-full"
          />
        </div>

        <div className="flex gap-1">
          {primaryColors.map((color, i) => (
            <div
              key={i}
              className="flex-1 h-8 rounded"
              style={{ background: color }}
              title={color}
            />
          ))}
        </div>
      </section>

      {/* Neutral Colors */}
      <section className="space-y-3">
        <h3 className="font-semibold text-gray-900">Neutral</h3>

        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Hue: {colorConfig.neutral.hue}°
          </label>
          <input
            type="range"
            min="0"
            max="360"
            value={colorConfig.neutral.hue}
            onChange={(e) => handleNeutralHueChange(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Chroma: {colorConfig.neutral.chroma.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="0.1"
            step="0.001"
            value={colorConfig.neutral.chroma}
            onChange={(e) => handleNeutralChromaChange(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex gap-1">
          {neutralColors.map((color, i) => (
            <div
              key={i}
              className="flex-1 h-8 rounded border border-gray-200"
              style={{ background: color }}
              title={color}
            />
          ))}
        </div>
      </section>

      {/* Accent Colors */}
      {colorConfig.accent && (
        <section className="space-y-3">
          <h3 className="font-semibold text-gray-900">Accent</h3>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Hue: {colorConfig.accent.hue}°
            </label>
            <input
              type="range"
              min="0"
              max="360"
              value={colorConfig.accent.hue}
              onChange={(e) => handleAccentHueChange(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Chroma Min: {colorConfig.accent.chromaMin.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="0.4"
              step="0.01"
              value={colorConfig.accent.chromaMin}
              onChange={(e) =>
                handleAccentChromaMinChange(Number(e.target.value))
              }
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Chroma Max: {colorConfig.accent.chromaMax.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="0.4"
              step="0.01"
              value={colorConfig.accent.chromaMax}
              onChange={(e) =>
                handleAccentChromaMaxChange(Number(e.target.value))
              }
              className="w-full"
            />
          </div>

          <div className="flex gap-1">
            {accentColors.map((color, i) => (
              <div
                key={i}
                className="flex-1 h-8 rounded"
                style={{ background: color }}
                title={color}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
