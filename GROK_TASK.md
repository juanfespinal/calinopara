You are implementing an approved UI redesign into a real, working Astro 7 static site. Use subagents to parallelize the independent pieces of this (home page vs. detail page vs. data model vs. styles) where it's safe to do so, but be careful about shared files (global.css, emprendimientos.ts) — coordinate so edits don't clobber each other.

# Project
`/Users/juanfespinal/Documents/Development/calinopara` — "Calinopará" (formerly "La Vitrina"), a mobile-first Astro directory of small Cali, Colombia businesses affected by the Aug 10, 2026 earthquake. No backend; all data lives in `src/data/emprendimientos.ts`.

Files you'll touch:
- `src/pages/index.astro` (home page)
- `src/pages/emprendimiento/[slug].astro` (detail page)
- `src/components/ShopCard.astro` (existing list card)
- `src/components/InstagramFeed.astro` (existing real Instagram profile embed — keep as-is, just reuse it)
- `src/data/emprendimientos.ts` (data + types)
- `src/styles/global.css` (design tokens + shared classes)
- `src/scripts/directory.ts` (search/filter/view-toggle logic — READ FIRST, don't break its DOM contract)
- `src/scripts/map.ts` (Leaflet map — READ FIRST, don't break it)
- `public/places/*.jpg` (existing real business photos, already referenced by `place.photo`)

Read every file you touch in full before editing it. This site currently builds and runs (`npm run dev`, `npm run build`) — it must keep doing so when you're done.

# What's approved (design direction, already signed off by the business owner)

## Home page (`src/pages/index.astro`)

1. Keep the existing hero header ("Cali" kicker / "Carta local" h1 / subtitle), the search input, and the category chip filters exactly as they behave today.
2. **Add a horizontal-scrolling "story rail"** above the toolbar, one circular avatar per business that has an `instagram` handle (skip businesses without one — don't show a muted/empty ring for them, just omit them from the rail). Each avatar: a photo crop from `place.photo` inside a two-tone gradient ring (green `--accent` → the new blue accent, see Style section below), label underneath with the business's first name word. Tapping an avatar links to `/emprendimiento/{slug}`.
3. **Replace the current single-column list of `ShopCard` components with a 2-column grid** of taller, photo-forward tiles ("directorio de columnas / grid"). Each tile: full-bleed photo (~3:4 aspect) from `place.photo`, dark gradient scrim at the bottom for text legibility, business name + barrio + starting price written in white over the scrim (compute price with the existing `startingPrice()` + `formatCop()` helpers from `emprendimientos.ts` — only show a price line if `startingPrice()` returns non-null, never invent one), a status badge top-right (`statusLabel[place.status]`, styled like the existing `.badge`/`.badge.cerrado`), and — only when `place.instagram` is set — a small play-icon chip top-left indicating video content. Build this as a new `src/components/ReelTile.astro` component (or extend `ShopCard.astro` with a mode — pick whichever keeps the code cleanest) and use it in the grid instead of the old card.
4. Keep the existing map/list view toggle working. The grid replaces the old `.list` in the list-view pane only.
5. `src/scripts/directory.ts` currently filters/searches by querying card elements in the DOM (check its selectors before you change markup) — update the script if you change class names or structure, so search, category filters, and the empty-state message keep working exactly as before.

## Detail page (`src/pages/emprendimiento/[slug].astro`)

1. Replace the current flat `.hero-photo` with a **"reel hero"**, but ONLY when `place.instagram` is set (if there's no Instagram handle, keep today's plain photo — don't fake video chrome for a business with no video presence). The reel hero: tall (~3:4) card using `place.photo`, dark gradient scrim, top-left a small circular avatar (business initial) + `@{instagram}` handle, top-right a small "Video" pill, a centered translucent play button, and at the bottom the `place.tagline` as a one-line caption plus a link to the real Instagram profile URL (the page already computes this as `ig`).
2. Below the reel hero (still only when `place.instagram` is set), keep using the existing `<InstagramFeed>` component exactly as it is today — it's a real, working embedded Instagram profile grid, not something to fake. Do not invent individual reel/post embeds or fabricate any like/comment counts — there's no real per-post data to embed, so don't pretend there is.
3. **Menu section**: add an optional `photo?: string` field to the `MenuItem` interface in `emprendimientos.ts` (leave it unset on every existing menu item — there's no real per-dish photography yet, so don't invent any, and never reuse `place.photo` to fake a specific dish's photo). Render each menu row with a 52×52px rounded photo thumbnail when `item.photo` is set, else a small icon-only placeholder swatch (accent-soft background, a simple line icon, `role="img" aria-label="Sin foto disponible"`). Build both visual states so real menu photos can be dropped in later.
4. Leave the order bar, "Dónde" panel, and back link exactly as they are today.

## Style (`src/styles/global.css`)

1. Change `--bg` from `#f3f4f1` to `#ffffff` for a cleaner look. `--paper` is already white, so after this change look carefully at every card/panel/map-frame that used to rely on contrast against the sand background — most already have `border: 1px solid var(--line)` so should still read fine, but verify by actually looking at the rendered page, don't just assume.
2. Add one new token, e.g. `--accent-blue: #1f4b6e` (a muted, dark-toned teal-blue in the same low-saturation family as the existing forest-green `--accent` — adjust the exact hex to taste, but keep it restrained, not a bright/generic blue), representing the blue in Cali's city flag alongside the existing green. Use it sparingly — one or two touches, e.g. the "Cómo llegar" ghost button gets a subtle blue-tinted border/text instead of plain gray, and/or the "Video" pill / play-button glass chips in the story rail and reel hero pick up a blue tint instead of plain white/glass. The primary green `--accent` stays primary everywhere it already is (main CTA button, badges, links) — this is a subtle accent, not a repaint.

## Data model (`src/data/emprendimientos.ts`)

- Add `photo?: string;` to the `MenuItem` interface only. Don't touch `Place` or any existing place/menu data otherwise (beyond leaving the new field unset).

# Ground rules

- Never invent data: no fabricated prices, captions, like/comment counts, or menu photos. If real data isn't there, build the graceful "not available" state instead (as specified above).
- Match each file's existing code style (Astro components with scoped `<style>` blocks, or shared classes in `global.css` — follow whichever pattern that file already uses).
- Run `npm install` if needed and then `npm run build` from the project root at the end; fix any build errors before finishing.
- Do NOT run `git add`, `git commit`, `git push`, or any git command — leave everything unstaged for the user to review themselves.
- Do NOT modify anything outside `/Users/juanfespinal/Documents/Development/calinopara`.
- When done, print a concise summary listing every file you created or changed and one line on what changed in each.
