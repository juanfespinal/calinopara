import test from "node:test";
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const indexSource = await readFile(new URL("../src/pages/index.astro", import.meta.url), "utf8");
const reelTileSource = await readFile(new URL("../src/components/ReelTile.astro", import.meta.url), "utf8");
const stylesSource = await readFile(new URL("../src/styles/global.css", import.meta.url), "utf8");
const tileSource = await readFile(new URL("../src/components/ReelTile.astro", import.meta.url), "utf8");
const baseSource = await readFile(new URL("../src/layouts/Base.astro", import.meta.url), "utf8");
const directorySource = await readFile(new URL("../src/scripts/directory.ts", import.meta.url), "utf8");
const mapSource = await readFile(new URL("../src/scripts/map.ts", import.meta.url), "utf8");
const mapPageUrl = new URL("../src/pages/mapa.astro", import.meta.url);
const mapPageExists = await access(mapPageUrl).then(() => true).catch(() => false);
const mapPageSource = mapPageExists ? await readFile(mapPageUrl, "utf8") : "";
const detailSource = await readFile(new URL("../src/pages/emprendimiento/[slug].astro", import.meta.url), "utf8");
const placeVideoSource = await readFile(new URL("../src/components/PlaceVideo.astro", import.meta.url), "utf8");
const analyticsUrl = new URL("../src/scripts/analytics.ts", import.meta.url);
const analyticsExists = await access(analyticsUrl).then(() => true).catch(() => false);
const analyticsSource = analyticsExists ? await readFile(analyticsUrl, "utf8") : "";

test("the directory homepage does not render story chips", () => {
  assert.doesNotMatch(indexSource, /story-rail|story-ring|story-name/);
  assert.doesNotMatch(stylesSource, /\.story-rail|\.story-ring|\.story-name/);
});

test("the directory keeps the approved public mobile shell", () => {
  assert.match(indexSource, /data-category-filter/);
  assert.match(mapPageSource, /data-map-sheet/);
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
  assert.match(tileSource, /data-has-video/);
  assert.match(tileSource, /video-posters/);
  assert.match(tileSource, /!hasLocalVideo/);
  assert.match(tileSource, /preload="none"/);
  assert.doesNotMatch(tileSource, /autoplay/);
  assert.match(directorySource, /data-reel-play/);
  assert.match(tileSource, /place\.videoPoster/);
});

test("poster links remain clickable while the local video is hidden", () => {
  assert.match(stylesSource, /\.reel-tile-video[\s\S]*?pointer-events:\s*none/);
  assert.match(stylesSource, /\.reel-tile\[data-has-video="true"\][\s\S]*?\.reel-tile-video[\s\S]*?opacity:\s*1/);
  assert.match(stylesSource, /\.reel-tile\[data-playing="true"\][\s\S]*?\.reel-tile-video[\s\S]*?pointer-events:\s*auto/);
  assert.match(stylesSource, /\.reel-tile-link[\s\S]*?z-index:\s*1/);
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
  assert.match(mapSource, /map\.setView\(CALI, 12\)/);
  assert.match(mapPageSource, /data-map-directory/);
  assert.match(mapPageSource, /data-map-coordinate-count/);
  assert.match(mapPageSource, /Los negocios sin una dirección pública precisa/);
});

test("the directory uses the approved white canvas and restrained motion tokens", () => {
  assert.match(stylesSource, /--bg:\s*#ffffff/i);
  assert.match(stylesSource, /--accent-red:\s*#e43e3e/i);
  assert.match(stylesSource, /prefers-reduced-motion/);
  assert.match(stylesSource, /transition:[^;]*(150ms|180ms|220ms)/);
});

test("detail view keeps storytelling before business information", () => {
  assert.match(detailSource, /class="wrap detail-page"/);
  assert.match(detailSource, /data-story-first/);
  assert.ok(detailSource.indexOf("story-block") < detailSource.indexOf("detail-hero"));
  assert.match(detailSource, /Conoce su historia/);
  assert.doesNotMatch(detailSource, /Perfil|Favoritos|Iniciar sesión/);
});

test("detail videos expose a working central play control", () => {
  assert.match(placeVideoSource, /controls/);
  assert.match(placeVideoSource, /data-analytics-business-slug/);
  assert.match(placeVideoSource, /business_slug/);
  assert.doesNotMatch(placeVideoSource, /data-video-toggle/);
  assert.doesNotMatch(stylesSource, /\.reel-hero-play/);
});

test("map lives on a dedicated full-height route", () => {
  assert.equal(mapPageExists, true);
  assert.match(baseSource, /href="\/mapa\/"/);
  assert.doesNotMatch(indexSource, /Ver mapa|map-link/);
  assert.doesNotMatch(indexSource, /data-map-pane/);
  assert.match(mapPageSource, /data-map-page/);
  assert.match(mapPageSource, /data-map/);
  assert.match(stylesSource, /body\.map-page/);
  assert.match(stylesSource, /body\.map-page \.bottom-nav[\s\S]*?z-index:\s*30/);
  assert.match(stylesSource, /body\.map-page \.bottom-nav[\s\S]*?background:\s*#fff/);
  assert.match(stylesSource, /body\.map-page \.map-pane-full[\s\S]*?isolation:\s*isolate/);
  assert.match(stylesSource, /height:\s*100dvh/);
});

test("analytics measures the support journey", () => {
  assert.equal(analyticsExists, true);
       assert.match(analyticsSource, /G-R9MNJYHSLQ/);
       assert.match(analyticsSource, /trackEvent/);
       assert.match(analyticsSource, /replace\(\/\^_\//);
       assert.match(baseSource, /G-R9MNJYHSLQ/);
       assert.match(baseSource, /googletagmanager\.com\/gtag\/js/);
       assert.match(baseSource, /analytics_storage: "denied"/);
       assert.match(baseSource, /Aceptar medición/);
  assert.match(baseSource, /data-analytics-event="open_directory"/);
  assert.match(directorySource, /video_start/);
       assert.match(directorySource, /directory_search/);
       assert.match(directorySource, /query_length/);
       assert.doesNotMatch(directorySource, /\{ query \}/);
  assert.match(directorySource, /directory_filter/);
  assert.match(detailSource, /data-analytics-event="support_click"/);
  assert.match(detailSource, /data-analytics-event="get_directions"/);
  assert.match(detailSource, /data-analytics-event="view_instagram"/);
  assert.match(directorySource, /map_marker_select/);
  assert.match(detailSource, /data-analytics-event="view_menu_item"/);
});

test("reel tiles show business identity below the video", () => {
  assert.match(reelTileSource, /class="reel-tile-meta"/);
  assert.match(reelTileSource, /class="reel-tile-logo"/);
  assert.match(reelTileSource, /class="reel-tile-name"/);
  assert.match(reelTileSource, /class="reel-tile-category"/);
  assert.doesNotMatch(reelTileSource, /class="reel-tile-scrim"/);
  assert.match(stylesSource, /\.reel-tile-meta/);
});
