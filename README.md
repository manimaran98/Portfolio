# Manimaran Mahesan — Portfolio

A cinematic dark-mode personal portfolio. Server-rendered with Next.js, so the page ships as
real HTML: crawlers, link previews and no-JS readers get the actual content, not an empty shell.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, `src/app/`) |
| UI | React 19, plain JSX — no TypeScript |
| Styling | Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.js`) |
| Animation | Framer Motion 13 |
| Icons | Lucide React |
| Fonts | `next/font/google` — Inter (body) + Oswald (display), self-hosted |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3300
```

```bash
npm run build    # prerenders the page to static HTML
npm start        # serves the production build on http://localhost:3300
```

### Why port 3300 and not 3000

On this Windows machine, Hyper-V/WSL has reserved the TCP range `2986–3085`, so binding
port 3000 fails with `EACCES: permission denied` even though nothing is using it. Check the
reserved ranges with:

```bash
netsh interface ipv4 show excludedportrange protocol=tcp
```

3300 sits outside every reserved range. If you would rather have 3000 back, restart the
NAT driver from an **administrator** terminal — this releases the dynamic reservation:

```
net stop winnat
net start winnat
```

The reservation can return after a reboot, which is why the scripts pin an explicit port.

### Set your domain

Every canonical link, sitemap entry and social-card URL is built from one value.
Set it in the deploy environment (see [`.env.example`](.env.example)):

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Leave it unset and the build falls back to a placeholder, which will point search
engines at the wrong host.

### Deploying to a static host

The site has no server-side data, so it can be exported as flat files. Uncomment
`output: 'export'` in `next.config.mjs`, then:

```bash
npm run build    # writes ./out
```

Upload `out/` to GitHub Pages, Netlify, S3 or any static host. On Vercel, leave the
line commented and deploy as-is.

## Project layout

```
public/
  Profile.jpg                  original photo (white studio background)
  Profile-cutout.png           background removed — this is what the hero renders
  Manimaran_Mahesan_Resume.pdf downloadable résumé
src/
  app/
    layout.jsx                 <html>, fonts, metadata, nav + footer shell
    page.jsx                   section order + JSON-LD structured data
    globals.css                design tokens (@theme) and component classes
  components/
    layout/    Navbar, Footer
    sections/  Hero, Profile, Expertise, Experience, SelectedWork, Credentials
    ui/        Reveal, SectionHeading, TiltCard, BentoCard, TimelineItem,
               ProjectCard, SkillTag, Spotlight, ParticleField, ScrollProgress
  data/
    content.js                 every word on the site
  hooks/
    useScrollSpy, useScrolled, useFinePointer
```

## Editing content

**All copy lives in [`src/data/content.js`](src/data/content.js).** Components render that
file and never hardcode a job title, skill, project or contact detail. To change what the
site says, edit the data — not the components.

| Export | Drives |
|---|---|
| `IDENTITY` | name, role, phone, email, GitHub, résumé path |
| `NAV_LINKS` | the centre nav; each `id` must match a `<section id>` |
| `HERO` | hero eyebrow, statement, CTA |
| `PROFILE` | section 01 — lead line, paragraphs, fact panel |
| `EXPERTISE` | section 02 — the three bento columns |
| `EXPERIENCE` | section 03 — the timeline roles |
| `WORK` | section 04 — the five projects |
| `CREDENTIALS` | section 05 — degree and certifications |
| `FOOTER` | closing statement and contact links |

Swapping the résumé means replacing the file in `public/` and, if the name changes,
updating `IDENTITY.resumeUrl`.

### About the portrait

The hero renders `public/Profile-cutout.png`, **not** `Profile.jpg`. The original is a
400×400 photo on a white studio background; a CSS mask can fade an edge but cannot remove
a background colour, so the white would show as a hard box on the dark canvas. The cutout
is that photo with the background knocked out and the matte eroded a pixel to kill the
white fringe.

The cutout is produced by [`scripts/generate-cutout.py`](scripts/generate-cutout.py),
which is re-runnable and never modifies the source JPEG:

```bash
python scripts/generate-cutout.py
```

To swap the photo, replace `public/Profile.jpg` and re-run it — then update the
`width`, `height` and `aspect-[…]` in [`Hero.jsx`](src/components/sections/Hero.jsx)
to the dimensions it prints. A higher-resolution source is worth supplying: the
original is only 400×400, which is small for a hero portrait.

## SEO and sharing

Generated from the same content source as the page, so they cannot drift:

| Output | Source |
|---|---|
| `/robots.txt` | [`src/app/robots.js`](src/app/robots.js) |
| `/sitemap.xml` | [`src/app/sitemap.js`](src/app/sitemap.js) |
| `ProfilePage` + `Person` + `WebSite` JSON-LD | [`src/app/page.jsx`](src/app/page.jsx) |
| 1200x630 social card | `src/app/opengraph-image.jpg` |
| Monogram icons | `src/app/icon.svg`, `src/app/apple-icon.png` |

The `Person` block carries a `sameAs` array — **add your LinkedIn URL there** when
you have one. That array is how a search engine reconciles this page with your
other profiles under the same name, which is the single highest-leverage change
left for showing up when someone searches your name.

## Design system

Tokens are declared once in `src/app/globals.css` under `@theme`, which turns each into a
Tailwind utility. Add a token there rather than reaching for an arbitrary hex value.

- **Canvas** — `void-950` `#08080a` through `void-700`
- **Molten bronze** (primary accent) — `molten-200` … `molten-600`, `molten-500` `#ff8a3d`
- **Cold steel** (secondary accent) — `steel-200` … `steel-500`
- **Classes** — `.display` (Oswald poster type), `.chrome` / `.molten` (metallic gradient text
  fills), `.glass` (glassmorphism panel), `.eyebrow`, `.hairline`, `.shell` (page gutter)

## Motion

Every scroll reveal goes through `Reveal` / `RevealGroup` / `RevealItem` so timing stays
consistent. Pointer-driven effects — the hero parallax, the card tilt, the spotlight — are
gated behind a fine-pointer check, so phones never attach a `pointermove` listener. Everything
collapses to a plain fade under `prefers-reduced-motion`.

## Accessibility

Single `<h1>`, ordered headings, a skip link, visible focus rings, `aria-expanded` on every
disclosure, decorative layers marked `aria-hidden`, and a reduced-motion path throughout.
