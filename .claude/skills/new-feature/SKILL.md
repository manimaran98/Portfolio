---
name: new-feature
description: Use when adding any new section, component or interaction to the Portfolio site - scope it, add the content to the data file, build the component, wire the reveal and responsive behaviour, register the nav anchor, then verify the build.
---

# Skill: Add a Feature to the Portfolio Site

Work top-to-bottom. Do not skip steps. This project is a static React site — there is no
backend, database or auth, so anything that mentions those is out of scope.

## 1. Plan (before writing any code)
- [ ] Confirm scope with the user — what it looks like, where it sits in the page order
- [ ] List every file to create or modify
- [ ] Decide whether this is new *content* (data only) or a new *component*

## 2. Content
- [ ] Add the copy to `src/data/content.js` — a named export, shaped like its neighbours
- [ ] No copy, label, URL, phone number or e-mail goes inside a component file
- [ ] If it is a new numbered section, pick the next number and keep `SECTIONS` in order

## 3. Component
- [ ] Section components go in `src/components/sections/`, reusable pieces in `src/components/ui/`
- [ ] One component per file, default export, named after the file
- [ ] Implement fully — no TODOs, no placeholder text, no commented-out blocks
- [ ] Reuse `SectionHeading`, `Reveal`, `RevealGroup`, `TiltCard`, `SkillTag` before writing a new primitive

## 4. Styling
- [ ] Tailwind utilities only; add a token to `@theme` in `src/index.css` instead of an arbitrary hex
- [ ] Dark-first — the site has no light mode; do not add `dark:` variants
- [ ] Check the layout at 375px, 768px and 1440px before calling it done

## 5. Animation
- [ ] Scroll reveal via `<Reveal>` / `<RevealGroup>`, not a bare `whileInView`
- [ ] `viewport={{ once: true }}` so content never re-hides on scroll-back
- [ ] Honour `useReducedMotion()` — reduced motion means opacity only, no transforms
- [ ] Any `mousemove` / device-orientation effect is gated behind `useFinePointer()`

## 6. Wiring
- [ ] Render the section in `src/App.jsx` in the right order
- [ ] Give the `<section>` an `id`, and add the matching entry to `NAV_LINKS` if it belongs in the nav
- [ ] Confirm the scroll-spy highlights it (`useScrollSpy` reads the ids from `NAV_LINKS`)

## 7. Accessibility
- [ ] Headings descend in order — one `<h1>` on the page, sections use `<h2>`
- [ ] Every image has a real `alt`; decorative layers get `aria-hidden="true"`
- [ ] Interactive elements are `<a>` or `<button>`, reachable by keyboard, with a visible focus ring
- [ ] Text over an image or gradient still meets contrast

## 8. Final Verification
- [ ] `npm run build` succeeds with no warnings you introduced
- [ ] `npm run dev` — the section renders, animates once, and links work
- [ ] No console errors, no React key warnings
- [ ] Run QA using the `qa-review` skill
