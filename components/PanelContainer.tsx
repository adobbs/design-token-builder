"use client";

import { useDesignTokenStore } from "@/stores/useDesignTokenStore";
import { ColorPanel } from "./panels/ColorPanel";
import { TypographyPanel } from "./panels/TypographyPanel";
import { RadiusPanel } from "./panels/RadiusPanel";
import { ShadowPanel } from "./panels/ShadowPanel";

export function PanelContainer() {
  const activePanel = useDesignTokenStore((state) => state.activePanel);

  if (!activePanel) return null;

  return (
    <div className="fixed left-16 top-0 h-full w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto">
      {activePanel === "colors" && <ColorPanel />}
      {activePanel === "typography" && <TypographyPanel />}
      {activePanel === "radius" && <RadiusPanel />}
      {activePanel === "shadows" && <ShadowPanel />}
    </div>
  );
}
