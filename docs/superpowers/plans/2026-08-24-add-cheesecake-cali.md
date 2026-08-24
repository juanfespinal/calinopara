# Add Cheesecake Cali Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task with verification checkpoints.

**Goal:** Add Cheesecake Cali to the directory from the public Instagram post `DcT7QBgR0iR` without inventing location, contact, hours, or availability.

**Architecture:** Add one `Place` object to `src/data/emprendimientos.ts`, preserving the Instagram profile identified by the caption, and store the normalized public reel plus a representative cover under `public/`. Use the neutral no-location fallback because the available source does not publish a customer-facing address.

**Tech Stack:** Astro, TypeScript, yt-dlp, ffmpeg, Node tests.

**Spec:** `AGENTS.md`.

## Global Constraints

- Use `cheesecakecali` as the business account because the source caption explicitly identifies it.
- Use `slug: "cheesecake-cali"`, category `postres`, `hasPhysicalLocation: false`, `barrio: "Domicilios"`, and `address: "Ubicación no publicada"` when no public location is confirmed.
- Do not add prices, phone numbers, WhatsApp, hours, coordinates, or availability not supported by the public source.
- Preserve the source shortcode `DcT7QBgR0iR` and the Instagram credit.

### Task 1: Prepare media

**Files:**
- Create: `public/videos/cheesecake-cali.mp4`
- Create: `public/places/cheesecake-cali.jpg`

- [ ] Download the public post without cookies using yt-dlp.
- [ ] Normalize it to H.264/AAC, 720×1280, 30 fps, faststart, under 20 MB where practical.
- [ ] Generate a representative 720×960 cover from the video.

### Task 2: Add the business entry

**Files:**
- Modify: `src/data/emprendimientos.ts`

- [ ] Append a `Place` with the verified account, shortcode, media paths, neutral location fallback, closed status reflecting the source's statement that the family lost everything, and a menu item that asks users to confirm cheesecake availability via Instagram.

### Task 3: Verify

**Files:**
- Read: generated route and media metadata

- [ ] Run `file`, `ffprobe`, `npm test`, and `npm run build`.
- [ ] Confirm the new static route, Instagram credit, no fabricated price, and no unrelated diff beyond existing Mangos changes.
