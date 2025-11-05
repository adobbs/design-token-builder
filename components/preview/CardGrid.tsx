"use client";

import { useDesignTokenStore } from "@/stores/useDesignTokenStore";
import { generateColorScale, generateNeutralScale } from "@/lib/colorUtils";
import { Download } from "lucide-react";

export function CardGrid() {
  const { colorConfig, typographyConfig, radiusConfig, shadowConfig, exportTokens } =
    useDesignTokenStore();

  // Generate color previews
  const primaryColors = generateColorScale(
    colorConfig.primary.hue,
    colorConfig.primary.chromaMin,
    colorConfig.primary.chromaMax,
    Math.min(colorConfig.primary.steps, 5) // Show fewer in cards
  );

  const neutralColors = generateNeutralScale(
    colorConfig.neutral.hue,
    colorConfig.neutral.chroma,
    Math.min(colorConfig.neutral.steps, 5)
  );

  const handleExport = () => {
    const tokens = exportTokens();
    const blob = new Blob([tokens], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "design-tokens.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Design System Preview</h1>
          <p className="text-gray-600 mt-1">
            Adjust settings in the left panel to see changes in real-time
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export Tokens
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Color Card */}
        <div
          className="bg-white p-6 space-y-4"
          style={{
            borderRadius: `${radiusConfig.scale[2] || 8}px`,
            boxShadow: `0 ${shadowConfig.elevations[1] || 2}px ${
              (shadowConfig.elevations[1] || 2) * 2
            }px ${-(shadowConfig.elevations[1] || 2) / 4}px rgba(0,0,0,0.1)`,
          }}
        >
          <h3 className="text-lg font-semibold text-gray-900">Color Palette</h3>
          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-600 mb-1">Primary</p>
              <div className="flex gap-1">
                {primaryColors.map((color, i) => (
                  <div
                    key={i}
                    className="flex-1 h-8"
                    style={{
                      background: color,
                      borderRadius: `${radiusConfig.scale[1] || 4}px`,
                    }}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Neutral</p>
              <div className="flex gap-1">
                {neutralColors.map((color, i) => (
                  <div
                    key={i}
                    className="flex-1 h-8 border border-gray-200"
                    style={{
                      background: color,
                      borderRadius: `${radiusConfig.scale[1] || 4}px`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Typography Card */}
        <div
          className="bg-white p-6 space-y-4"
          style={{
            borderRadius: `${radiusConfig.scale[2] || 8}px`,
            boxShadow: `0 ${shadowConfig.elevations[1] || 2}px ${
              (shadowConfig.elevations[1] || 2) * 2
            }px ${-(shadowConfig.elevations[1] || 2) / 4}px rgba(0,0,0,0.1)`,
            fontFamily: typographyConfig.fontFamilies.sans,
          }}
        >
          <h3 className="text-lg font-semibold text-gray-900">Typography</h3>
          <div className="space-y-2">
            <p
              className="text-gray-900"
              style={{
                fontSize: `${typographyConfig.baseFontSize * Math.pow(typographyConfig.scale, 2)}px`,
                fontWeight: typographyConfig.weights.bold,
              }}
            >
              Heading
            </p>
            <p
              className="text-gray-900"
              style={{
                fontSize: `${typographyConfig.baseFontSize * typographyConfig.scale}px`,
                fontWeight: typographyConfig.weights.semibold,
              }}
            >
              Subheading
            </p>
            <p
              className="text-gray-600"
              style={{
                fontSize: `${typographyConfig.baseFontSize}px`,
                fontWeight: typographyConfig.weights.regular,
              }}
            >
              Body text with normal weight
            </p>
            <p
              className="text-gray-500"
              style={{
                fontSize: `${typographyConfig.baseFontSize / typographyConfig.scale}px`,
                fontWeight: typographyConfig.weights.regular,
              }}
            >
              Small text
            </p>
          </div>
        </div>

        {/* Radius Card */}
        <div
          className="bg-white p-6 space-y-4"
          style={{
            borderRadius: `${radiusConfig.scale[2] || 8}px`,
            boxShadow: `0 ${shadowConfig.elevations[1] || 2}px ${
              (shadowConfig.elevations[1] || 2) * 2
            }px ${-(shadowConfig.elevations[1] || 2) / 4}px rgba(0,0,0,0.1)`,
          }}
        >
          <h3 className="text-lg font-semibold text-gray-900">Border Radius</h3>
          <div className="grid grid-cols-3 gap-2">
            {radiusConfig.scale.slice(0, 6).map((radius, i) => (
              <div key={i} className="text-center">
                <div
                  className="w-full h-12 bg-blue-500 mb-1"
                  style={{ borderRadius: `${radius}px` }}
                />
                <p className="text-xs text-gray-600">{radius}px</p>
              </div>
            ))}
          </div>
        </div>

        {/* Shadow Card */}
        <div
          className="bg-white p-6 space-y-4"
          style={{
            borderRadius: `${radiusConfig.scale[2] || 8}px`,
            boxShadow: `0 ${shadowConfig.elevations[1] || 2}px ${
              (shadowConfig.elevations[1] || 2) * 2
            }px ${-(shadowConfig.elevations[1] || 2) / 4}px rgba(0,0,0,0.1)`,
          }}
        >
          <h3 className="text-lg font-semibold text-gray-900">Shadows</h3>
          <div className="space-y-3">
            {shadowConfig.elevations.slice(0, 4).map((elevation, i) => {
              const blur = elevation * 2;
              const offsetY = elevation;
              const spread = -elevation / 4;
              return (
                <div key={i} className="space-y-1">
                  <p className="text-xs text-gray-600">Elevation {elevation}px</p>
                  <div
                    className="w-full h-8 bg-white"
                    style={{
                      borderRadius: `${radiusConfig.scale[1] || 4}px`,
                      boxShadow: `0 ${offsetY}px ${blur}px ${spread}px rgba(0,0,0,0.1)`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Button Examples Card */}
        <div
          className="bg-white p-6 space-y-4"
          style={{
            borderRadius: `${radiusConfig.scale[2] || 8}px`,
            boxShadow: `0 ${shadowConfig.elevations[1] || 2}px ${
              (shadowConfig.elevations[1] || 2) * 2
            }px ${-(shadowConfig.elevations[1] || 2) / 4}px rgba(0,0,0,0.1)`,
          }}
        >
          <h3 className="text-lg font-semibold text-gray-900">Buttons</h3>
          <div className="space-y-3">
            <button
              className="w-full text-white py-2 px-4"
              style={{
                background: primaryColors[4] || "#3b82f6",
                borderRadius: `${radiusConfig.scale[1] || 4}px`,
                fontSize: `${typographyConfig.baseFontSize}px`,
                fontWeight: typographyConfig.weights.medium,
              }}
            >
              Primary Button
            </button>
            <button
              className="w-full py-2 px-4 border-2"
              style={{
                borderColor: primaryColors[4] || "#3b82f6",
                color: primaryColors[4] || "#3b82f6",
                background: "transparent",
                borderRadius: `${radiusConfig.scale[1] || 4}px`,
                fontSize: `${typographyConfig.baseFontSize}px`,
                fontWeight: typographyConfig.weights.medium,
              }}
            >
              Outline Button
            </button>
            <button
              className="w-full py-2 px-4"
              style={{
                background: neutralColors[1] || "#f3f4f6",
                color: neutralColors[4] || "#6b7280",
                borderRadius: `${radiusConfig.scale[1] || 4}px`,
                fontSize: `${typographyConfig.baseFontSize}px`,
                fontWeight: typographyConfig.weights.medium,
              }}
            >
              Secondary Button
            </button>
          </div>
        </div>

        {/* Form Elements Card */}
        <div
          className="bg-white p-6 space-y-4"
          style={{
            borderRadius: `${radiusConfig.scale[2] || 8}px`,
            boxShadow: `0 ${shadowConfig.elevations[1] || 2}px ${
              (shadowConfig.elevations[1] || 2) * 2
            }px ${-(shadowConfig.elevations[1] || 2) / 4}px rgba(0,0,0,0.1)`,
          }}
        >
          <h3 className="text-lg font-semibold text-gray-900">Form Elements</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Input field"
              className="w-full px-3 py-2 border"
              style={{
                borderColor: neutralColors[2] || "#e5e7eb",
                borderRadius: `${radiusConfig.scale[1] || 4}px`,
                fontSize: `${typographyConfig.baseFontSize}px`,
              }}
            />
            <textarea
              placeholder="Textarea"
              className="w-full px-3 py-2 border resize-none"
              rows={3}
              style={{
                borderColor: neutralColors[2] || "#e5e7eb",
                borderRadius: `${radiusConfig.scale[1] || 4}px`,
                fontSize: `${typographyConfig.baseFontSize}px`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
