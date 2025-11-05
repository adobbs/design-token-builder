# Design Toys

Interactive tools for visualizing and creating design system tokens.

## Overview

Design Toys is a Next.js application that helps you visualize and make decisions about foundational style choices for a design system. Configure color palettes, typography scales, border radius, and shadows in real-time, with instant visual feedback.

## Features

### Current Tools

#### Design System Foundations
- **OKLCH Color Palettes**: Generate perceptually uniform color scales using the OKLCH color space
  - Primary color scales with configurable hue and chroma
  - Neutral gray scales
  - Accent color scales
- **Typography**: Configure modular type scales with custom base sizes and ratios
- **Border Radius**: Create consistent corner radius scales
- **Shadows**: Define elevation-based shadow systems

### Key Features
- Real-time preview with card grid examples
- W3C Design Tokens Community Group (DTCG) compatible token export
- Left-side panel configuration UI
- Interactive sliders for all parameters
- Live color swatches and previews

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **Color Utilities**: Culori (for OKLCH color space)

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Usage

1. **Navigate**: Use the left sidebar to select a design category (Colors, Typography, Radius, Shadows)
2. **Configure**: Adjust parameters using the sliders and inputs in the panel
3. **Preview**: See real-time updates in the card grid preview
4. **Export**: Click the "Export Tokens" button to download W3C DTCG compatible JSON

## Project Structure

```
design-toys/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── LeftNav.tsx       # Main navigation
│   ├── PanelContainer.tsx # Panel wrapper
│   ├── panels/           # Configuration panels
│   │   ├── ColorPanel.tsx
│   │   ├── TypographyPanel.tsx
│   │   ├── RadiusPanel.tsx
│   │   └── ShadowPanel.tsx
│   └── preview/          # Preview components
│       └── CardGrid.tsx  # Main preview grid
├── stores/               # Zustand stores
│   └── useDesignTokenStore.ts
├── lib/                  # Utility functions
│   ├── colorUtils.ts    # Color generation
│   ├── typographyUtils.ts
│   ├── radiusUtils.ts
│   └── shadowUtils.ts
└── types/               # TypeScript types
    └── tokens.ts        # W3C DTCG token types
```

## Design Token Format

The app exports tokens in the [W3C Design Tokens Community Group format](https://design-tokens.github.io/community-group/format/):

```json
{
  "$schema": "https://design-tokens.github.io/community-group/format/schema.json",
  "$description": "Design Toys - Generated Design Tokens",
  "color": {
    "primary": {
      "100": {
        "$type": "color",
        "$value": "oklch(0.95 0.1 210)"
      }
    }
  },
  "typography": { ... },
  "radius": { ... },
  "shadow": { ... }
}
```

## OKLCH Color Space

This app uses OKLCH (Oklab Lightness Chroma Hue) for color generation because it provides:
- Perceptually uniform color scales
- Consistent lightness across hues
- Better chroma control
- More predictable color mixing

## Future Enhancements

- [ ] Additional design system tools
- [ ] Import existing token files
- [ ] Color contrast checking
- [ ] More preview templates
- [ ] Accessibility recommendations
- [ ] Theme variants (light/dark mode)
- [ ] Token aliasing and references
- [ ] Export to multiple formats (CSS, SCSS, Tailwind config)

## License

MIT
