# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # Production build
npm run preview   # Preview the production build locally
npm run lint      # ESLint check
```

No test suite is configured.

## Architecture

Single-page personal portfolio — one long scrollable page with a fixed Navbar. All sections are rendered directly in `App.tsx` in order:

```
Navbar (fixed) → Hero → About → Skills → Projects → LearningNotes → WorkPhilosophy → Contact
```

Each section is a standalone component in `src/components/`. Sections are linked via anchor IDs (e.g., `#about`, `#projects`) matching the Navbar's `navLinks` array in `Navbar.tsx`.

**Styling approach:** MUI v5 (`@mui/material`) with Emotion. All visual styling goes through MUI's `sx` prop — there are no CSS modules or styled-components. The global theme is defined once in `App.tsx` via `createTheme` and wraps the whole app in `ThemeProvider`.

**Design system:** "Whiteboard / sketchbook" aesthetic. Key constraints:
- Background: `#faf9f7` (warm off-white)
- Primary text: `#2d2d2d`; secondary text: `#6b7280`
- Accent: `#ca8a04` (amber/yellow)
- Borders use `2px solid #2d2d2d` with hand-drawn feel (asymmetric `borderRadius` like `'4px 12px 8px 4px'`)
- Box shadows use `'N px N px 0 rgba(0,0,0,0.X)'` (flat/offset, no blur)
- Headings use `"Caveat"` (cursive), body uses `"Nunito"` — both loaded from Google Fonts in `index.html`

**TypeScript:** Strict mode is off (`"strict": false` in tsconfig). The project uses `.tsx` files but TypeScript is treated loosely.

**Inline SVG doodles:** Components like `Hero.tsx` define small SVG components (e.g., `LaptopDoodle`, `CoffeeDoodle`) inline within the file rather than as separate assets. Follow this pattern when adding decorative illustrations.

**Global CSS:** `src/index.css` provides utility classes (`.highlight`, `.highlight-green`, `.highlight-blue`, `.highlight-pink`, `.fade-in`) and keyframe animations (`fadeInUp`, `pulse`). New animations should go here; component-level animation is done via MUI `sx` using the `animation` property referencing these keyframe names.
