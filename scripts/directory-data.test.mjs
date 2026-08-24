import test from "node:test";
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const dataSource = await readFile(new URL("../src/data/emprendimientos.ts", import.meta.url), "utf8");
const detailSource = await readFile(
  new URL("../src/pages/emprendimiento/[slug].astro", import.meta.url),
  "utf8",
);


test("unverified businesses are not published as active listings", () => {
  assert.doesNotMatch(dataSource, /slug:\s*["']el-porteno["']/);
});

test("reservation-only businesses can replace the generic order label", () => {
  assert.match(
    dataSource,
    /slug:\s*"la-fugitiva-pizzeria-dapa"[\s\S]*?orderLabel:\s*"Reservar"/,
  );
  assert.match(detailSource, /place\.orderLabel\s*\?\?\s*"Pedir ahora"/);
});

test("directory status labels avoid unsupported operational claims", () => {
  assert.match(dataSource, /limitado:\s*"Atención limitada"/);
  assert.match(dataSource, /cerrado:\s*"No está atendiendo"/);
});

test("every Perreiranos menu item includes an existing product photo", async () => {
  const perreiranos = dataSource.match(
    /slug:\s*"perreiranos"([\s\S]*?)slug:\s*"tjaditos"/,
  )?.[1];

  assert.ok(perreiranos, "Perreiranos listing must exist");
  const itemCount = (perreiranos.match(/\bname:\s*"/g) ?? []).length - 1; // Exclude the place name.
  const photoCount = (perreiranos.match(/\bphoto:\s*"\/places\/perreiranos\/menu\//g) ?? []).length;

  assert.equal(photoCount, itemCount, "each menu item should have a local product photo");
  const photos = [...perreiranos.matchAll(/\bphoto:\s*"(\/places\/perreiranos\/menu\/[^"]+)"/g)];
  await Promise.all(photos.map((match) => access(new URL(`../public${match[1]}`, import.meta.url))));
});

test("Cocinamia publishes its complete priced menu and source", async () => {
  const cocinamia = dataSource.match(
    /slug:\s*"cocina-mia"([\s\S]*?)slug:\s*"la-fonda-tradicional"/,
  )?.[1];

  assert.ok(cocinamia, "Cocinamia listing must exist");
  assert.match(cocinamia, /menuUrl:\s*"https:\/\/drive\.google\.com\/file\/d\/1ISfH0kvE978ABk7gpTac9Zq9JkIICE6N\/view"/);
  assert.equal((cocinamia.match(/\bprice:\s*\d+/g) ?? []).length, 46, "all published prices should be represented");
  const photos = [...cocinamia.matchAll(/\bphoto:\s*"(\/places\/cocina-mia\/menu\/[^"]+)"/g)];
  assert.equal(photos.length, 12, "key dishes should include the 12 real menu photographs");
  await Promise.all(photos.map((match) => access(new URL(`../public${match[1]}`, import.meta.url))));
  assert.match(detailSource, /place\.menuUrl/);
  assert.match(detailSource, />Ver carta completa</);
});

test("La Fonda Tradicional uses its own verified Instagram video", async () => {
  const laFonda = dataSource.match(
    /slug:\s*"la-fonda-tradicional"([\s\S]*?)slug:\s*"mangos"/,
  )?.[1];

  assert.ok(laFonda, "La Fonda Tradicional listing must exist");
  assert.match(laFonda, /instagramPost:\s*"DcXCwp-CEYU"/);
  assert.match(laFonda, /video:\s*"\/videos\/la-fonda-tradicional\.mp4"/);
  assert.doesNotMatch(laFonda, /reactivacion-cali\.mp4/);
  await access(new URL("../public/videos/la-fonda-tradicional.mp4", import.meta.url));
});
