"use client";

import { useDesignTokenStore } from "@/stores/useDesignTokenStore";

export function RadiusPanel() {
  const { radiusConfig, updateRadiusConfig } = useDesignTokenStore();

  const handleScaleChange = (index: number, value: number) => {
    const newScale = [...radiusConfig.scale];
    newScale[index] = value;
    updateRadiusConfig({ scale: newScale });
  };

  const addRadius = () => {
    const newScale = [...radiusConfig.scale, 32];
    updateRadiusConfig({ scale: newScale });
  };

  const removeRadius = (index: number) => {
    const newScale = radiusConfig.scale.filter((_, i) => i !== index);
    updateRadiusConfig({ scale: newScale });
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Border Radius</h2>
        <p className="text-sm text-gray-600">Configure corner radius scale</p>
      </div>

      <section className="space-y-3">
        {radiusConfig.scale.map((value, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="flex-1">
              <label className="block text-sm text-gray-700 mb-1">
                Step {index + 1}: {value}px
              </label>
              <input
                type="range"
                min="0"
                max="48"
                value={value}
                onChange={(e) => handleScaleChange(index, Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div
              className="w-12 h-12 bg-blue-500"
              style={{ borderRadius: `${value}px` }}
            />
            {radiusConfig.scale.length > 1 && (
              <button
                onClick={() => removeRadius(index)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          onClick={addRadius}
          className="w-full py-2 border-2 border-dashed border-gray-300 rounded text-gray-600 hover:border-gray-400 hover:text-gray-800"
        >
          Add Radius Step
        </button>
      </section>
    </div>
  );
}
