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

### Domain

The live domain is **manimaranmahesan.com**, and it is the built-in default —
nothing needs configuring for a production deploy.

Point the apex `manimaranmahesan.com` at the host and **301-redirect `www` to the
apex**, so only one hostname is canonical. Two reachable hostnames split ranking
signals between them.

For a preview or staging deploy, override the origin so it does not claim the
production canonical URL:

```
NEXT_PUBLIC_SITE_URL=https://staging.manimaranmahesan.com
```

### After the first deploy

1. Add the property in [Google Search Console](https://search.google.com/search-console)
   and submit `https://manimaranmahesan.com/sitemap.xml`.
2. Check the social card with the
   [Facebook debugger](https://developers.facebook.com/tools/debug/) and
   [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) — both cache
   aggressively, so inspect once to prime them before you share the link.
3. Add the domain to your GitHub profile and LinkedIn, and put the LinkedIn URL
   into the `sameAs` array in [`src/app/page.jsx`](src/app/page.jsx). Those
   reciprocal links are what let a search engine connect the page to you.

### Deploying

The site runs on **Vercel's free Hobby plan** — no credit card, custom domain and
HTTPS included, and Next's image optimizer stays on (the hero portrait is served
at a fraction of its 1.1 MB source).

1. Go to [vercel.com/new](https://vercel.com/new), sign in **with GitHub**, and
   import `manimaran98/Portfolio`.
2. Change nothing. Vercel detects Next.js, and the defaults (`npm install`,
   `next build`) are correct. Press **Deploy**.
3. In the project, open **Settings → Domains** and add `manimaranmahesan.com`.
   Add `www.manimaranmahesan.com` too, and set it to **redirect** to the apex —
   two reachable hostnames split ranking signals.
4. Vercel prints the exact DNS records to create at your registrar. Use the
   values it shows rather than any copied from elsewhere; they change. They are
   normally an `A` record on the apex and a `CNAME` on `www`.
5. DNS takes minutes to a few hours. Vercel issues the certificate automatically
   once it resolves.

Nothing needs configuring in the code: `SITE_URL` already defaults to
`https://manimaranmahesan.com`.

> **Hobby is licensed for non-commercial use.** A personal portfolio qualifies.
> You would only need a paid plan if the site itself became a business.

#### Alternative: a static host

The site can also be exported to flat files for GitHub Pages, Netlify or S3.
Uncomment **both** `output: 'export'` and `images: { unoptimized: true }` in
`next.config.mjs` — `export` does not support `next/image`'s default loader, so
the build fails on the hero portrait without the second line. Then `npm run build`
writes `./out`.

Two trade-offs: the image optimizer is off, so the portrait ships at full size,
and `headers()` is ignored under `export` — the security headers below have to be
configured at the host instead.

### Security headers

[`next.config.mjs`](next.config.mjs) sets a CSP plus `X-Content-Type-Options`,
`Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy` and HSTS on every
response. The CSP allows `'unsafe-inline'` for scripts and styles by necessity,
not oversight: the no-flash theme script in `layout.jsx`, Next's hydration
bootstrap and Framer Motion's per-element inline styles are all inline, and a
prerendered page has no per-request nonce to hand them. `frame-ancestors 'none'`
is the part that actually earns its keep — it stops the site being framed into
a phishing page.

Verify them against a deploy with:

```bash
curl -sI https://manimaranmahesan.com | grep -i "content-security\|x-frame\|x-content\|referrer\|strict-transport"
```

## Project layout

```
public/
  profile.png                  hero portrait, 800x1321 transparent cutout
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

The hero renders `public/profile.png` — an 800×1321 cutout with a real alpha
channel. It has to be a cutout: a CSS mask can fade an edge but cannot remove a
background colour, so a JPEG on a white studio backdrop would show as a hard box
on the dark canvas.

**The source for that file is not in this repo.** It was produced outside the
project and committed in `06adb3f`; nothing here regenerates it.

[`scripts/generate-cutout.py`](scripts/generate-cutout.py) is the *older* pipeline.
It reads `docs/Profile.jpg` (400×400, white studio background), knocks out the
background, erodes the matte a pixel to kill the white fringe, and writes a
470×728 `public/Profile-cutout.png` — the portrait that shipped before `06adb3f`.
It is re-runnable and never modifies the source JPEG, but its output is **not**
what the hero renders today:

```bash
python scripts/generate-cutout.py
```

To swap the photo, supply a new transparent cutout and update `src`, `width`,
`height` and the `aspect-[…]` wrapper in
[`Hero.jsx`](src/components/sections/Hero.jsx) to the new file's real pixel
dimensions. All three must agree with the file: when they drifted apart,
`object-contain` silently letterboxed the portrait inside its own box.

## SEO and sharing

Generated from the same content source as the page, so they cannot drift:

| Output | Source |
|---|---|
| `/robots.txt` | [`src/app/robots.js`](src/app/robots.js) |
| `/sitemap.xml` | [`src/app/sitemap.js`](src/app/sitemap.js) |
| `ProfilePage` + `Person` + `WebSite` JSON-LD | [`src/app/page.jsx`](src/app/page.jsx) |
| 1200x630 social card | `src/app/opengraph-image.jpg` |
| Monogram icons | `src/app/icon.svg`, `src/app/apple-icon.png` |

The `Person` block carries a `sameAs` array, already populated with the GitHub and
LinkedIn URLs from `IDENTITY`. That array is how a search engine reconciles this
page with your other profiles under the same name — add any further profile there
rather than inline.

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
