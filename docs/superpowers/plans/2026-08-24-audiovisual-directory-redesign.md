# Audiovisual Directory Redesign Implementation Plan

> For agentic workers: REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Implement the approved mobile-first Cali No Para directory with a grid-first home, tap-to-play video storytelling, fullscreen map with a selected-business bottom sheet, a video-first detail view, and restrained motion on a white canvas.

**Architecture:** Keep Astro static pages and src/data/emprendimientos.ts as the source of truth. Use ReelTile.astro for poster/video cards, directory.ts for filtering, view state, card playback, and map-sheet rendering, map.ts for marker selection callbacks, and Base.astro for the persistent public bottom navigation. Use CSS transitions only for short opacity/transform feedback; do not add a client framework or authentication state.

**Tech Stack:** Astro 7, TypeScript, vanilla browser APIs, Leaflet 1.9, CSS media queries and prefers-reduced-motion, Node's built-in test runner.

**Spec:** docs/superpowers/specs/2026-08-24-directorio-storytelling-design.md

## Global Constraints

- The canvas background is white #FFFFFF.
- No login, profile, favorites, donations, or internal social features.
- The initial mobile view is the directory grid; only #mapa opens the map directly.
- A card poster never autoplay; a local video plays only after the user activates its play button.
- The detail order remains video/reel, business identity/status, real action, menu, physical location when applicable, and Instagram credit.
- Actions must be derived from existing orderUrl, whatsapp, phone, hasPhysicalLocation, and instagram data.
- Motion is subtle: opacity/6–8px transforms, 150–220ms, no infinite decorative animation, and reduced-motion support.

---

### Task 1: Add red tests for the new public shell and media behavior

**Files:**
- Modify: scripts/index-layout.test.mjs
- Test: src/pages/index.astro, src/components/ReelTile.astro, src/layouts/Base.astro, src/styles/global.css

**Interfaces:**
- Tests consume the source files as text, matching the existing repository test style.
- The tests define stable attributes: data-reel-play, data-reel-video, data-category-filter, data-map-sheet, bottom-nav, and the approved color/motion tokens.

- [ ] Step 1: Write failing assertions for the shell and video contract.

Add source reads for ReelTile.astro, Base.astro, and directory.ts. Add tests that assert index.astro contains data-category-filter and data-map-sheet; Base.astro contains bottom-nav, Directorio, Mapa, and Súmate but no Perfil or Login; ReelTile.astro contains data-reel-play, data-reel-video, preload="none", and no autoplay; directory.ts contains data-reel-play; and global.css contains #FFFFFF, #E43E3E, prefers-reduced-motion, and a 150–220ms transition.

~~~js
test("the directory keeps the approved public mobile shell", () => {
  assert.match(indexSource, /data-category-filter/);
  assert.match(indexSource, /data-map-sheet/);
  assert.match(baseSource, /class="bottom-nav"/);
  assert.match(baseSource, />Directorio</);
  assert.match(baseSource, />Mapa</);
  assert.match(baseSource, />Súmate</);
  assert.doesNotMatch(baseSource, />Perfil</);
  assert.doesNotMatch(baseSource, />Login</i);
});

test("directory cards expose poster-first tap-to-play video controls", () => {
  assert.match(tileSource, /data-reel-play/);
  assert.match(tileSource, /data-reel-video/);
  assert.match(tileSource, /preload="none"/);
  assert.doesNotMatch(tileSource, /autoplay/);
  assert.match(directorySource, /data-reel-play/);
});
~~~

- [ ] Step 2: Run the focused test and verify it fails for missing design contracts.

Run: node --test scripts/index-layout.test.mjs

Expected: FAIL because the new attributes, bottom navigation, video element contract, and color/motion tokens do not yet exist.

- [ ] Step 3: Commit the red tests.

~~~bash
git add scripts/index-layout.test.mjs
git commit -m "test: define audiovisual directory contracts"
~~~

---

### Task 2: Implement the persistent mobile shell and directory-first homepage

**Files:**
- Modify: src/layouts/Base.astro
- Modify: src/pages/index.astro
- Modify: src/styles/global.css

**Interfaces:**
- Base.astro produces a public bottom navigation with links to /, /#mapa, and /sumate.
- index.astro emits data-category-filter buttons, data-map-sheet, and the existing data-directory root.
- directory.ts will consume these attributes in Task 3.

- [ ] Step 1: Add bottom navigation markup to Base.astro.

Place a fixed, accessible nav.bottom-nav after main and before the footer. Use three anchors: Directorio to /, Mapa to /#mapa, and Súmate to /sumate; include lightweight inline SVG icons. Do not add profile or account links.

- [ ] Step 2: Reshape index.astro around the approved first view.

Keep the initiative copy and Conoce la iniciativa, but shorten hero spacing so the first grid appears early. Import categories and add an Todos filter plus one button per existing category using data-category-filter. Keep the Lista/Mapa toggle. Add a map sheet inside the map pane with targets data-sheet-photo, data-sheet-name, data-sheet-meta, data-sheet-status, and data-sheet-link; keep it hidden until a marker is selected.

- [ ] Step 3: Add white-canvas and mobile-shell styling.

Update root tokens to #FFFFFF background, #13233A ink, #2F8F3B green, #EAF4E8 soft green, #1F65A6 blue, #E43E3E red, #F5B51B yellow, #E4E7E3 line, and #66706C muted text. Add safe-area padding and enough bottom body padding that content is never obscured. Keep the existing two-column grid, increase reel-tile visual weight, use 14px radius, and use shadows sparingly.

- [ ] Step 4: Run the focused test and verify it passes.

Run: node --test scripts/index-layout.test.mjs

Expected: PASS for homepage, shell, token, and motion-contract tests.

- [ ] Step 5: Commit the shell.

~~~bash
git add src/layouts/Base.astro src/pages/index.astro src/styles/global.css scripts/index-layout.test.mjs
git commit -m "feat: add mobile directory shell"
~~~

---

### Task 3: Implement poster-first tap-to-play cards and shared directory filters

**Files:**
- Modify: src/components/ReelTile.astro
- Modify: src/scripts/directory.ts
- Modify: src/styles/global.css
- Modify: scripts/index-layout.test.mjs

**Interfaces:**
- ReelTile.astro emits button[data-reel-play] and video[data-reel-video] only when place.video exists. The link remains the card navigation target.
- initDirectory(root, places) owns play state, one-active-video behavior, search filtering, category filtering, and map-sheet updates.

- [ ] Step 1: Add a failing behavior test for filter and playback wiring.

Add a test asserting directory.ts contains data-category-filter, data-reel-video, pause(), data-map-sheet, and location.hash. Run node --test scripts/index-layout.test.mjs. Expected: FAIL until the behavior exists.

- [ ] Step 2: Add poster-first video markup to ReelTile.astro.

Keep the poster image as the initial visible layer. For local videos, render a video with poster, preload="none", muted, playsinline, controls, data-reel-video, and the MP4 source; keep it visually hidden until activation. Render a named type=button play control with data-reel-play and an accessible label. Stop the link from navigating when the play control is used.

- [ ] Step 3: Implement directory state and tap-to-play behavior.

In initDirectory:
1. Read the initial view from location.hash === "#mapa" ? "mapa" : "lista"; otherwise default to the grid and do not persist a map preference.
2. Track category = "todos" and filter by category in visiblePlaces() in addition to name, barrio, and tagline search.
3. Update aria-pressed on category buttons and hide/show cards as filters change.
4. Add play listeners that prevent link navigation, pause any currently playing card, reveal the selected video, call video.play(), and set the selected card data-playing state. If playback rejects, leave the poster visible and keep the link usable.
5. Update the URL hash only for map view and keep the bottom-nav map link functional.
6. Render map-sheet text and image through textContent, src, and alt instead of injecting business data into HTML strings.

- [ ] Step 4: Add card, poster, play, and filter motion styles.

Use only short opacity/transform transitions. Make the selected play button scale slightly on :active, hide the poster only after the video is ready to play, and honor reduced motion. Do not add autoplay or infinite animation.

- [ ] Step 5: Run focused tests and the complete test suite.

Run: node --test scripts/index-layout.test.mjs
Expected: PASS.

Run: npm test
Expected: all existing and new tests pass with 0 failures.

- [ ] Step 6: Commit the card behavior.

~~~bash
git add src/components/ReelTile.astro src/scripts/directory.ts src/styles/global.css scripts/index-layout.test.mjs
git commit -m "feat: make directory cards video-first"
~~~

---

### Task 4: Add map marker selection and mobile bottom sheet

**Files:**
- Modify: src/scripts/map.ts
- Modify: src/scripts/directory.ts
- Modify: src/styles/global.css
- Modify: scripts/index-layout.test.mjs

**Interfaces:**
- Extend mountMap options with onSelect?: (place: Place) => void.
- Marker clicks call onSelect(place) without changing existing filter or bounds behavior.
- directory.ts populates the existing map sheet targets and shows the sheet only for a selected business.

- [ ] Step 1: Add a failing test for the marker callback contract.

Add a mapSource read and this test:

~~~js
test("map markers expose business selection to the directory sheet", () => {
  assert.match(mapSource, /onSelect\?: \(place: Place\) => void/);
  assert.match(mapSource, /marker\.on\("click"/);
});
~~~

Run: node --test scripts/index-layout.test.mjs
Expected: FAIL until mountMap supports the callback.

- [ ] Step 2: Implement marker selection in map.ts.

Change the options type to { zoom?: number; interactive?: boolean; onSelect?: (place: Place) => void }. Register marker.on("click", () => options.onSelect?.(place)) while preserving current popup, filtering, and map-fitting behavior.

- [ ] Step 3: Connect the callback and render the sheet in directory.ts.

Pass onSelect to mountMap. Populate the sheet with photo, photoAlt, name, category label, barrio, status label, and detail URL. Use statusLabel and categories data exports. Show the sheet with a short transform/opacity transition and make Ver detalle the only business action.

- [ ] Step 4: Style the sheet for mobile and desktop.

On mobile, position the sheet at the bottom of the map pane with a white surface, rounded top corners, and a subtle shadow. Keep it contained on larger screens. Add aria-live="polite" to the sheet status region and respect hidden state.

- [ ] Step 5: Run tests and commit.

Run: npm test
Expected: all tests pass.

~~~bash
git add src/scripts/map.ts src/scripts/directory.ts src/styles/global.css scripts/index-layout.test.mjs
git commit -m "feat: add map business bottom sheet"
~~~

---

### Task 5: Restyle the detail page and verify the finished build

**Files:**
- Modify: src/pages/emprendimiento/[slug].astro
- Modify: src/styles/global.css
- Modify: scripts/index-layout.test.mjs

**Interfaces:**
- The existing detail data flow remains unchanged and continues to respect hasPhysicalLocation, orderUrl, whatsapp, phone, instagram, and video.
- The detail page keeps PlaceVideo first and does not add account controls.

- [ ] Step 1: Add a failing detail-layout assertion.

Add a detailSource read and assert that story-block occurs before detail-hero, Conoce su historia remains present, and no Perfil, Favoritos, or Iniciar sesión copy appears. Run node --test scripts/index-layout.test.mjs.

- [ ] Step 2: Apply the approved detail visual hierarchy.

Use the white canvas, larger video radius, stronger deep-blue headings, compact status pill, and a primary action row below identity. Preserve all existing conditional actions and menu content. Do not add unsupported hours, distance, prices, or recovery claims.

- [ ] Step 3: Add detail transitions with reduced-motion fallback.

Use one short fade/translate transition for the story block and one for the detail card. Keep native video controls and do not autoplay. Add no looping decorative motion.

- [ ] Step 4: Run complete verification.

Run: npm test
Expected: all tests pass.

Run: npm run build
Expected: Astro build exits 0 and generates pages for every place.

Run: npm run check:videos
Expected: all local videos satisfy the existing policy.

- [ ] Step 5: Inspect the diff and commit the final UI pass.

~~~bash
git diff --check
git status --short
git add src/pages/emprendimiento/[slug].astro src/styles/global.css scripts/index-layout.test.mjs
git commit -m "feat: polish audiovisual business details"
~~~

