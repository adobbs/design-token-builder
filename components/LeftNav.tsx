"use client";

import { Palette, Type, Square, Sparkles } from "lucide-react";
import { useDesignTokenStore, PanelType } from "@/stores/useDesignTokenStore";

const navItems: { id: PanelType; label: string; icon: React.ReactNode }[] = [
  { id: "colors", label: "Colors", icon: <Palette className="w-5 h-5" /> },
  { id: "typography", label: "Typography", icon: <Type className="w-5 h-5" /> },
  { id: "radius", label: "Radius", icon: <Square className="w-5 h-5" /> },
  { id: "shadows", label: "Shadows", icon: <Sparkles className="w-5 h-5" /> },
];

export function LeftNav() {
  const { activePanel, setActivePanel } = useDesignTokenStore();

  return (
    <nav className="fixed left-0 top-0 h-full w-16 bg-gray-900 border-r border-gray-800 flex flex-col items-center py-4 gap-2">
      <div className="mb-4 text-white font-bold text-xl">DT</div>
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() =>
            setActivePanel(activePanel === item.id ? null : item.id)
          }
          className={`
            w-12 h-12 rounded-lg flex items-center justify-center
            transition-colors relative group
            ${
              activePanel === item.id
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }
          `}
          title={item.label}
        >
          {item.icon}
          <span className="absolute left-16 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
}
