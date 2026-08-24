import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const indexSource = await readFile(new URL("../src/pages/index.astro", import.meta.url), "utf8");
const stylesSource = await readFile(new URL("../src/styles/global.css", import.meta.url), "utf8");
const tileSource = await readFile(new URL("../src/components/ReelTile.astro", import.meta.url), "utf8");
const baseSource = await readFile(new URL("../src/layouts/Base.astro", import.meta.url), "utf8");
const directorySource = await readFile(new URL("../src/scripts/directory.ts", import.meta.url), "utf8");
const mapSource = await readFile(new URL("../src/scripts/map.ts", import.meta.url), "utf8");

test("the directory homepage does not render story chips", () => {
  assert.doesNotMatch(indexSource, /story-rail|story-ring|story-name/);
  assert.doesNotMatch(stylesSource, /\.story-rail|\.story-ring|\.story-name/);
});

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

test("directory script supports category filtering, card playback, and map selection", () => {
  assert.match(directorySource, /data-category-filter/);
  assert.match(directorySource, /data-reel-video/);
  assert.match(directorySource, /pause\(\)/);
  assert.match(directorySource, /data-map-sheet/);
  assert.match(directorySource, /location\.hash/);
});

test("map markers expose business selection to the directory sheet", () => {
  assert.match(mapSource, /onSelect\?: \(place: Place\) => void/);
  assert.match(mapSource, /marker\.on\("click"/);
});

test("the directory uses the approved white canvas and restrained motion tokens", () => {
  assert.match(stylesSource, /--bg:\s*#ffffff/i);
  assert.match(stylesSource, /--accent-red:\s*#e43e3e/i);
  assert.match(stylesSource, /prefers-reduced-motion/);
  assert.match(stylesSource, /transition:[^;]*(150ms|180ms|220ms)/);
});
