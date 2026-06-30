# Plan: Add Motion Animations to Portfolio Site

Add fluid Motion (v12, `motion/react`) animations across the site. The core asks — NextPages slide-down, Card fade-in (including on filter), and a typing-start delay — plus a few complementary touches to make navigation feel cohesive. Mirror the old `Animation.js` approach with a shared variants module so animations stay consistent and reusable.

## Steps

### Phase 1 — Shared animation foundation
1. Create `app/lib/animations.ts` exporting reusable `Variants` (and transitions), mirroring the old pattern: `slideDown` (NextPages), `fadeInUp`/`fade` (cards & content), `staggerContainer` (list children), `hoverScale`/`tapScale` (buttons/cards). Re-export from `app/lib/index.ts`.
2. Centralize a `useReducedMotion()` guard so animations gracefully no-op for users who prefer reduced motion.

### Phase 2 — NextPages slide-down (depends on 1)
3. In `app/components/NextPages.tsx`, convert `<nav id="navigation">` → `motion.nav` with `initial`/`animate`/`exit` slide-down + fade variants; make the `.pages` list a `staggerContainer` and each `<li>` a `motion.li` so entries cascade in.
4. In `app/layout.tsx`, wrap `{showNav && <NextPages />}` in `<AnimatePresence>` so the exit (slide-up/fade) plays when the nav hides instead of snapping out.

### Phase 3 — Card fade-in & filter transitions (depends on 1, parallel with Phase 2)
5. In `app/pages/Projects.tsx`, wrap the `visible.map(...)` in `<AnimatePresence mode="popLayout">`, convert each `<li>` to `motion.li` with `layout` + `fadeInUp` enter/exit (key already `post.slug`). This fades cards in on mount and animates add/remove/reflow smoothly when tag filters change.
6. Optional polish in `app/components/Card.tsx`: `whileHover`/`whileTap` scale on the card and tag buttons (complements existing hover CSS).

### Phase 4 — Typing delay (independent, parallel)
7. In `app/components/BreadCrumb.tsx`, add a `useRef` "first run" flag so the very first typing pass waits ~400ms (lets the prompt/breadcrumb paint first); subsequent command changes type immediately as today. No Motion needed here.

### Phase 5 — Recommended extras (optional, gated on approval)
8. Route content fade-in: wrap `app/components/Article.tsx` output in a `motion.div` `fade`/`fadeInUp` so page/post bodies ease in on navigation.
9. Breadcrumb path animation: animate `Crumb` segments (subtle fade/slide) when the path changes for a more "live terminal" feel.

## Relevant files
- `app/lib/animations.ts` (new) — shared variants, single source of truth (the `Animation.js` pattern).
- `app/lib/index.ts` — re-export the variants.
- `app/components/NextPages.tsx` — `motion.nav` + staggered `motion.li`.
- `app/layout.tsx` — `AnimatePresence` around `NextPages` for enter/exit.
- `app/pages/Projects.tsx` — `AnimatePresence` + `motion.li` + `layout` for fade/filter.
- `app/components/BreadCrumb.tsx` — first-run typing delay via ref.
- `app/components/Card.tsx`, `app/components/Article.tsx` — optional hover/route polish.

## Verification
1. `npm run dev`, hover/focus `#top-bar` → NextPages slides down with staggered entries; move away → it slides/fades out (not abrupt).
2. Visit `/projects` → cards fade in on load; click a tag → non-matching cards fade out and the list reflows smoothly instead of snapping.
3. Reload any page → command typing pauses briefly until the breadcrumb is visible, then types.
4. Toggle OS "reduce motion" → animations are minimized/disabled, no layout breakage.
5. `npm run build` (or existing typecheck/lint) passes with the new `motion/react` imports.

## Decisions
- Import surface: `motion/react` (Motion v12). Shared variants in `app/lib/animations.ts` to match the prior reusable-variant style.
- Filtering keeps removing non-matching cards from the DOM (current behavior); `AnimatePresence` handles the graceful exit rather than switching to CSS hide.
- Card fade-in uses mount-based animation (every render of the list), matching "fade in when shown."

## Further Considerations
1. Scope of extras (steps 6, 8, 9): **A)** Core asks only (1–5, 7) · **B)** Core + card/tag hover (6) · **C)** All extras for max polish. Recommend **C**, but can trim.
2. Card fade trigger: **A)** Animate in once per page visit (recommended) · **B)** Also re-animate every card on each filter change (more motion, slightly busier).
3. Typing delay timing: ~400ms default — adjust up/down to taste.
