"use client";

import { useDesignTokenStore } from "@/stores/useDesignTokenStore";

export function TypographyPanel() {
  const { typographyConfig, updateTypographyConfig } = useDesignTokenStore();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Typography</h2>
        <p className="text-sm text-gray-600">
          Configure font scales and families
        </p>
      </div>

      <section className="space-y-3">
        <h3 className="font-semibold text-gray-900">Scale</h3>

        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Base Font Size: {typographyConfig.baseFontSize}px
          </label>
          <input
            type="range"
            min="12"
            max="24"
            value={typographyConfig.baseFontSize}
            onChange={(e) =>
              updateTypographyConfig({ baseFontSize: Number(e.target.value) })
            }
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Scale Ratio: {typographyConfig.scale.toFixed(2)}
          </label>
          <input
            type="range"
            min="1.1"
            max="1.6"
            step="0.05"
            value={typographyConfig.scale}
            onChange={(e) =>
              updateTypographyConfig({ scale: Number(e.target.value) })
            }
            className="w-full"
          />
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="font-semibold text-gray-900">Font Families</h3>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Sans Serif</label>
          <input
            type="text"
            value={typographyConfig.fontFamilies.sans}
            onChange={(e) =>
              updateTypographyConfig({
                fontFamilies: {
                  ...typographyConfig.fontFamilies,
                  sans: e.target.value,
                },
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Serif</label>
          <input
            type="text"
            value={typographyConfig.fontFamilies.serif}
            onChange={(e) =>
              updateTypographyConfig({
                fontFamilies: {
                  ...typographyConfig.fontFamilies,
                  serif: e.target.value,
                },
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Monospace</label>
          <input
            type="text"
            value={typographyConfig.fontFamilies.mono}
            onChange={(e) =>
              updateTypographyConfig({
                fontFamilies: {
                  ...typographyConfig.fontFamilies,
                  mono: e.target.value,
                },
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
          />
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="font-semibold text-gray-900">Font Weights</h3>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Regular</label>
            <input
              type="number"
              min="100"
              max="900"
              step="100"
              value={typographyConfig.weights.regular}
              onChange={(e) =>
                updateTypographyConfig({
                  weights: {
                    ...typographyConfig.weights,
                    regular: Number(e.target.value),
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Medium</label>
            <input
              type="number"
              min="100"
              max="900"
              step="100"
              value={typographyConfig.weights.medium}
              onChange={(e) =>
                updateTypographyConfig({
                  weights: {
                    ...typographyConfig.weights,
                    medium: Number(e.target.value),
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Semibold</label>
            <input
              type="number"
              min="100"
              max="900"
              step="100"
              value={typographyConfig.weights.semibold}
              onChange={(e) =>
                updateTypographyConfig({
                  weights: {
                    ...typographyConfig.weights,
                    semibold: Number(e.target.value),
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Bold</label>
            <input
              type="number"
              min="100"
              max="900"
              step="100"
              value={typographyConfig.weights.bold}
              onChange={(e) =>
                updateTypographyConfig({
                  weights: {
                    ...typographyConfig.weights,
                    bold: Number(e.target.value),
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
