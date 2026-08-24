# Add Instagram Business Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task with verification checkpoints.

**Goal:** Add the business identified by Instagram post `https://www.instagram.com/p/DcY3KyMukJl/` to the Astro directory using only publicly verified information.

**Architecture:** Treat `src/data/emprendimientos.ts` as the source of truth, append one stable `Place` object following the existing data conventions, and place any public media under `public/`. Preserve the post shortcode for attribution and use the local video only if the public reel can be downloaded and normalized.

**Tech Stack:** Astro, TypeScript, Node test scripts, yt-dlp, ffmpeg.

**Spec:** `AGENTS.md`, especially “Procedimiento autónomo para una URL de Instagram”, “Descargar y preparar un reel”, and “Verificación antes de entregar”.

## Global Constraints

- Use the Instagram URL as the primary public source and do not invent prices, hours, address, coverage, availability, or coordinates.
- Keep `instagram: "<verified account>"` and `instagramPost: "DcY3KyMukJl"` in the new object.
- Use an existing category from `categories` and a stable ASCII lowercase slug.
- Set `hasPhysicalLocation: false` and use `address: "Ubicación no publicada"`, `barrio: "Domicilios"` when no public customer-facing location is confirmed.
- Omit `lat` and `lng` unless the address is publicly confirmed and reliably geocoded.
- Preserve existing user changes and do not modify unrelated businesses or media.

### Task 1: Verify the public Instagram source

**Files:**
- Read: `AGENTS.md`
- Read: `src/data/emprendimientos.ts`

- [ ] Open the supplied Instagram post and confirm the account, visible business name, caption, contact details, location, hours, customer-facing service model, and products/services. Record only facts supported by the public post or public profile.
- [ ] Determine the stable slug, category, status, and whether a physical location exists from that evidence. If the public source does not expose a fact, leave the corresponding optional field out or use the documented neutral fallback.

### Task 2: Prepare public media when available

**Files:**
- Create: `public/videos/<slug>.mp4` only when the public reel downloads successfully
- Create: `public/places/<slug>.jpg` when a local video is created
- Create: `public/logos/<slug>.jpg` only when a clear public profile image is available

- [ ] Download the public post with `yt-dlp --no-playlist --restrict-filenames --merge-output-format mp4` without cookies.
- [ ] Normalize any downloaded video to H.264/AAC, 720×1280, 30 fps, `faststart`, and target less than 20 MB where practical.
- [ ] Generate the cover from a representative non-transition frame; keep the source download outside `public/` and outside git.
- [ ] Omit media rather than inventing or fabricating it if download or image evidence is unavailable.

### Task 3: Add the directory entry

**Files:**
- Modify: `src/data/emprendimientos.ts`

- [ ] Append one `Place` object with the verified identity, post shortcode, supported contact/location fields, objective `photoAlt`, a confirmation-oriented `menuNote`, and only products/services named by the source.
- [ ] Ensure all referenced asset paths match the exact slug; retain the Instagram fallback when no local video exists.

### Task 4: Verify the result

**Files:**
- Read: generated page output and existing video policy checks

- [ ] Run `file` and `ffprobe` for each generated media asset that exists.
- [ ] Run `npm test` and `npm run build`.
- [ ] Inspect the diff and confirm the entry keeps the Instagram credit, does not show an invented price, and preserves unrelated pre-existing changes.
