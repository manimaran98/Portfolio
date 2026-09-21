# Portfolio — Claude Memory

## Project Stack
- Next.js 16 (App Router, `src/app/`) + React 19, plain JSX (no TypeScript)
- Server-rendered: the page is prerendered to real HTML at build time, which is why this is Next and not a Vite SPA
- Tailwind CSS v4 via `@tailwindcss/postcss` — CSS-first config, tokens in `@theme` in `src/app/globals.css`, no `tailwind.config.js`
- Framer Motion 13 for all animation, Lucide React for icons
- Fonts via `next/font/google` (Inter + Oswald), self-hosted
- Single page, no backend, no database

## Key File Paths
| Purpose | Path |
|---|---|
| All copy / content | `src/data/content.js` |
| Design tokens | `src/app/globals.css` |
| Layout / metadata | `src/app/layout.jsx` |
| Section order + JSON-LD | `src/app/page.jsx` |
| Sections | `src/components/sections/` |
| Primitives | `src/components/ui/` |
| Hooks | `src/hooks/` |
| Photo + résumé | `public/` |

## Patterns
- Content is data-driven: components never hardcode copy
- `layout.jsx` / `page.jsx` stay server components; interactive pieces opt in with `'use client'`
- Imports use the `@/` alias from `jsconfig.json`
- Scroll reveals use the shared `<Reveal>` / `<RevealGroup>` wrappers
- Pointer effects (tilt / parallax / spotlight) are gated on a fine pointer and on `prefers-reduced-motion`
- Section ids double as nav anchors and are listed in `NAV_LINKS`

## User Preferences
- Ask clarifying questions before building when requirements are ambiguous
- Build fully — no stubs or placeholder implementations
