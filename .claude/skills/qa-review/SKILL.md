---
name: qa-review
description: Use when auditing a change to the Portfolio site before it ships - checks content correctness, component structure, responsive layout, animation and reduced-motion behaviour, accessibility, performance and build health, ending with a PASS or FAIL verdict plus must-fix items.
---

# Skill: QA Review — Portfolio Site

When spawned as a QA agent, audit the specified change against everything below.
Report each finding as: **file**, **line**, **severity** (High / Medium / Low), **fix suggestion**.

This is a static React site. There is no backend, database, auth or user input to audit —
do not report findings about endpoints, SQL, tokens or roles.

## Content Correctness
- [ ] Every fact on the page matches `docs/Manimaran_Mahesan_Resume.pdf` — dates, titles, employers, stacks
- [ ] Contact details are exact: `+6016-2153958`, `manimaranmahesan@hotmail.com`, `github.com/manimaran98`
- [ ] No lorem ipsum, no placeholder copy, no invented achievements or metrics
- [ ] All copy lives in `src/data/content.js`, not inlined in components
- [ ] External links have `target="_blank"` **and** `rel="noopener noreferrer"`
- [ ] The résumé link resolves to a file that exists in `public/`

## Component Structure
- [ ] One component per file, named after the file, default export
- [ ] No duplicated primitive — a second tilt/reveal/tag implementation is a finding
- [ ] Lists rendered with a stable `key` (not the array index where the list can reorder)
- [ ] No dead code, unused imports or commented-out blocks

## Responsive
- [ ] No horizontal scroll at 375px
- [ ] Multi-column grids collapse to one column on mobile
- [ ] Display type is clamped or has responsive sizes — no text overflowing its container
- [ ] Tap targets are at least 44px on touch

## Animation
- [ ] `useReducedMotion()` respected everywhere — reduced motion means no transform-heavy movement
- [ ] Scroll reveals use `once: true`; nothing re-hides when scrolling back up
- [ ] Every `window` / `document` listener is removed on unmount
- [ ] Pointer-driven effects are gated behind a fine-pointer check
- [ ] Animation targets `transform` and `opacity` — animating `width`, `top` or `box-shadow` per frame is a finding

## Accessibility
- [ ] Exactly one `<h1>`; heading levels do not skip
- [ ] Meaningful `alt` on content images, `aria-hidden` on decorative layers
- [ ] Visible keyboard focus on every link and button
- [ ] Nav anchors point at ids that exist
- [ ] Body text meets 4.5:1 contrast on its actual background

## Performance & Build
- [ ] `npm run build` succeeds; no new warnings
- [ ] No console errors or React warnings in `npm run dev`
- [ ] No large asset committed uncompressed into `public/` without reason
- [ ] No unnecessary re-render loop (state written from inside an unthrottled scroll/mouse handler)

## Output Format
```
[SEVERITY] file:line — description — suggested fix
```
End with: **PASS** or **FAIL** + the list of must-fix items before shipping.
