"use client";

import { useDesignTokenStore } from "@/stores/useDesignTokenStore";

export function ShadowPanel() {
  const { shadowConfig, updateShadowConfig } = useDesignTokenStore();

  const handleElevationChange = (index: number, value: number) => {
    const newElevations = [...shadowConfig.elevations];
    newElevations[index] = value;
    updateShadowConfig({ elevations: newElevations });
  };

  const addElevation = () => {
    const newElevations = [...shadowConfig.elevations, 32];
    updateShadowConfig({ elevations: newElevations });
  };

  const removeElevation = (index: number) => {
    const newElevations = shadowConfig.elevations.filter((_, i) => i !== index);
    updateShadowConfig({ elevations: newElevations });
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Shadows</h2>
        <p className="text-sm text-gray-600">Configure shadow elevations</p>
      </div>

      <section className="space-y-4">
        {shadowConfig.elevations.map((elevation, index) => {
          const blur = elevation * 2;
          const offsetY = elevation;
          const spread = -elevation / 4;

          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="block text-sm text-gray-700 mb-1">
                    Elevation {index + 1}: {elevation}px
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="32"
                    value={elevation}
                    onChange={(e) =>
                      handleElevationChange(index, Number(e.target.value))
                    }
                    className="w-full"
                  />
                </div>
                {shadowConfig.elevations.length > 1 && (
                  <button
                    onClick={() => removeElevation(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div
                className="w-full h-16 bg-white rounded-lg"
                style={{
                  boxShadow: `0 ${offsetY}px ${blur}px ${spread}px rgba(0,0,0,0.1)`,
                }}
              />
            </div>
          );
        })}

        <button
          onClick={addElevation}
          className="w-full py-2 border-2 border-dashed border-gray-300 rounded text-gray-600 hover:border-gray-400 hover:text-gray-800"
        >
          Add Elevation
        </button>
      </section>
    </div>
  );
}
