# Project Brain: Portfolio
# Personal portfolio site for Manimaran Mahesan — a cinematic dark-mode, single-page React site presenting profile, expertise, experience, selected work, and credentials.

---

## Tech Stack
| Layer | Technology |
|---|---|
| Framework | Next.js 16, App Router, `src/app/` |
| Rendering | Server-rendered / prerendered to static HTML at build time (SSG) |
| Frontend | React 19 (JSX, no TypeScript) |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`, CSS-first `@theme` — there is no `tailwind.config.js`) |
| Animation | Framer Motion 13 |
| Icons | Lucide React |
| State | Local component state only — no store |
| Fonts | `next/font/google` (Inter + Oswald), self-hosted, exposed as `--font-inter` / `--font-oswald` |
| Hosting | Node server (`npm start`), or set `output: 'export'` in `next.config.mjs` for a static host |

Backend, database, migrations and auth: **none**. This is a static front-end.

---

## Architecture Rules
- **All copy lives in `src/data/content.js`.** Never hardcode a job title, skill, project or contact string inside a component — the components render the data file.
- Sections are numbered (`01`–`05`) and the number is part of the design; the `id` of each `<section>` is the nav anchor and must match `NAV_LINKS` in `content.js`.
- `src/app/page.jsx` and `src/app/layout.jsx` are **server components** — keep them that way. Anything using a hook, `framer-motion` or an event handler starts with `'use client'`.
- Client components are still server-rendered to HTML, so all copy must live in the markup, never be fetched or injected on mount. That is what keeps the page readable to crawlers.
- Import with the `@/` alias (`@/components/...`, `@/data/content`), configured in `jsconfig.json`.
- Scroll reveals go through `<Reveal>` / `<RevealGroup>` (`src/components/ui/Reveal.jsx`). Do not sprinkle raw `whileInView` on individual elements.
- Every animation must be disabled or reduced when `prefers-reduced-motion` is set — use the `useReducedMotion()` hook from Framer Motion.
- Mouse-driven effects (tilt, parallax, spotlight) must be pointer-gated: skip them on touch/coarse pointers, never attach a `mousemove` listener that runs on mobile.
- Tailwind v4: design tokens are declared in `@theme inline` inside `src/app/globals.css`, pointing at `:root` custom properties built with CSS `light-dark(<light>, <dark>)`. Add a token there rather than using an arbitrary hex value in a class.
- **Themes.** `data-theme` on `<html>` is the single source of truth; an inline script in `layout.jsx` sets it before first paint. Never hardcode `white`, `black` or a hex in a component — use the semantic tokens: `canvas`, `canvas-sunk`, `ink`, `surface`, `surface-strong`, `line`, `line-strong`, `on-accent`, plus the `steel-*` (muted text) and `molten-*` (accent) scales. All of them flip with the theme.
- `text-on-accent` is for text sitting on a solid `molten` fill; it is not the same as the page canvas colour, and conflating the two breaks the light theme's CTA contrast.
- Canvas drawing (ParticleField) cannot read these tokens: `getComputedStyle` returns the literal `light-dark(...)` text for an unregistered custom property. Branch on the theme in JS there and keep the values in step by hand.
- **Reading measure:** use the `.measure` class (33em), not `ch`. Inter's "0" is much wider than its average character, so `68ch` renders at ~87 characters per line.
- Section headlines animate with `RevealHeading` (a masked slide: the heading is translated out of an `overflow-hidden` wrapper and rises back in); body copy uses `Reveal` / `RevealGroup`. Keeping those distinct is what stops the page being one identical fade repeated six times.
- `RevealHeading` observes the **wrapper**, not the heading. A translated element sits outside its own overflow clip, and IntersectionObserver measures the clipped rect — so `whileInView` on the heading itself reports zero visible area and never fires. Anything that animates out of a mask has to be triggered from an unclipped ancestor.
- The hero renders `Profile-cutout.png`, a background-removed derivative of `Profile.jpg` produced by `scripts/generate-cutout.py` (re-runnable; never edit the PNG by hand). Replacing the photo means supplying a new transparent cutout and updating the `src`, `width`, `height` and `aspect-[238/365]` in `Hero.jsx` — dropping in a JPEG with a background will render as a white box on the dark canvas.
- No CSS modules and no per-component `.css` files — utility classes plus the few component classes defined in `src/app/globals.css`.

---

## Key File Paths
| Purpose | Path |
|---|---|
| All site content / copy | `src/data/content.js` |
| Canonical origin (`SITE_URL`) | `src/app/layout.jsx` — override with `NEXT_PUBLIC_SITE_URL` |
| SEO: robots / sitemap / JSON-LD | `src/app/robots.js`, `src/app/sitemap.js`, `src/app/page.jsx` |
| Social card + icons | `src/app/opengraph-image.jpg`, `twitter-image.jpg`, `icon.svg`, `apple-icon.png` |
| Portrait cutout generator | `scripts/generate-cutout.py` |
| Design tokens + global CSS | `src/app/globals.css` |
| Nav + footer | `src/components/layout/` |
| Page sections (01–05, hero) | `src/components/sections/` |
| Reusable primitives | `src/components/ui/` |
| Hooks (scroll spy, pointer) | `src/hooks/` |
| Static assets (photo, résumé) | `public/` |
| Hero portrait actually rendered | `public/Profile-cutout.png` (derived from `Profile.jpg`) |
| Source assets (resume PDF, photo) | `docs/` |

---

## Implemented Features (log of what's been built)
| Version | Feature |
|---|---|
| V1 | Initial setup — Next.js 16 App Router + Tailwind v4 + Framer Motion scaffold |
| V1 | Full single-page site: nav, hero, 01 Profile, 02 Expertise, 03 Experience, 04 Selected work, 05 Credentials, footer |
| V2 | Light/dark theming via CSS `light-dark()`, `data-theme` on `<html>`, no-flash inline script, nav toggle |
| V3 | UX pass: 44px tap targets, `.measure` reading width, panel elevation, masked headline reveal, no-JS fallback |
| V4 | SEO + sharing: robots, sitemap, ProfilePage/Person/WebSite JSON-LD, 1200×630 social card, monogram icons, designed 404, named section landmarks |

---

## Collaboration Preferences
- Ask clarifying questions before building when requirements are ambiguous
- Build fully — no stubs or placeholder implementations
- Match existing code style; don't refactor beyond what's asked
- Content changes are data edits, not component edits — start in `src/data/content.js`
- Keep the site a single page; do not add a router unless asked

---

# Workflow Reference

## Agentic Loop (use for every feature)
1. **Spec first** — Plan Mode (Shift+Tab): `"Plan [feature]. List all files to create/modify and the data flow."`
2. **Scaffold** — `"Implement the spec."`
3. **QA** — `"Spawn a QA agent using the qa-review skill to audit [feature]."`
4. **Verify** — `npm run build` then `npm run dev`; check at 375px / 768px / 1440px, and confirm the copy is present in the server HTML (`curl -s localhost:3000 | grep -o 'Spring Boot'`).

## Context Hygiene
| Command | When |
|---|---|
| `/compact` | History getting long |
| `/clear` | Switching domains |
| `/context` | Near token limit |

## Skills (`.claude/skills/`)
- **`new-feature`** — end-to-end checklist for adding a section or component
- **`qa-review`** — what to check before a change ships

There is no `new-migration` skill in this project: there is no database.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
