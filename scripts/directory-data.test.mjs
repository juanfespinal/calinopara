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
  assert.match(dataSource, /["']por-confirmar["']:\s*"Por confirmar"/);
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

test("Fábrica Emilitas publishes the complete official Atom Bio menu", async () => {
  const fabrica = dataSource.match(
    /slug:\s*"fabrica-emilitas"([\s\S]*?)slug:\s*"asados-al-carbon"/,
  )?.[1];

  assert.ok(fabrica, "Fábrica Emilitas listing must exist");
  assert.match(fabrica, /menuUrl:\s*"https:\/\/www\.atom\.bio\/fabricaemilitaspostres"/);
  assert.match(fabrica, /whatsapp:\s*"573058150947"/);
  assert.match(fabrica, /photo:\s*"\/places\/fabrica-emilitas\/menu\/merengon-especial\.webp"/);
  assert.doesNotMatch(fabrica, /photo:\s*"\/places\/fabrica-emilitas\.jpg"/);

  const itemNames = [
    "Merengón Especial", "Merengón Personal", "Merengón Junior",
    "Oblea con Todo", "Oblea Especial", "Oblea Tradicional",
    "Milo", "Carlota de arequipe", "Maracuyá", "Genovesa",
    "Cheesecake horneado", "Flan de tres leches", "Arroz de leche",
    "Torta de chocolate", "Torta artesanal pequeña", "Torta artesanal mediana",
    "Botella de agua",
  ];
  for (const name of itemNames) {
    assert.match(fabrica, new RegExp(`name:\\s*"${name}"`), `${name} must be published`);
  }

  const prices = [...fabrica.matchAll(/price:\s*(\d+)/g)].map((match) => Number(match[1]));
  assert.deepEqual(prices, [18000, 15000, 12000, 7500, 6500, 6000, 9500, 9500, 9500, 9500, 9500, 9500, 5000, 6500, 1800, 2400, 3000]);

  const photos = [...fabrica.matchAll(/photo:\s*"([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(photos).size, 9, "the official menu must contribute nine distinct local photos");
  await Promise.all([...new Set(photos)].map((photo) => access(new URL(`../public${photo}`, import.meta.url))));
});

test("Restaurant Montserrat publishes its Instagram story and local media", async () => {
  const montserrat = dataSource.match(/slug:\s*"restaurante-montserrat"([\s\S]*?)(?=\n  },\n  \{)/)?.[1];

  assert.ok(montserrat, "Restaurant Montserrat listing must exist");
  assert.match(montserrat, /instagram:\s*"restaurantemontserrat"/);
  assert.match(montserrat, /instagramPost:\s*"DcEuJGzi0Sx"/);
  assert.match(montserrat, /video:\s*"\/videos\/restaurantemontserrat\.mp4"/);
  assert.match(montserrat, /status:\s*"por-confirmar"/);
  assert.match(montserrat, /hasPhysicalLocation:\s*false/);
  assert.doesNotMatch(montserrat, /price:\s*\d+/);
  await Promise.all([
    access(new URL("../public/videos/restaurantemontserrat.mp4", import.meta.url)),
    access(new URL("../public/places/restaurantemontserrat.jpg", import.meta.url)),
  ]);
});

test("supplied logos and La Fugitiva menu source are published", async () => {
  const montserrat = dataSource.match(/slug:\s*"restaurante-montserrat"([\s\S]*?)(?=\n  },\n  \{)/)?.[1];
  const fugitiva = dataSource.match(/slug:\s*"la-fugitiva-pizzeria-dapa"([\s\S]*?)(?=\n  },\n  \{)/)?.[1];

  assert.ok(montserrat, "Restaurant Montserrat listing must exist");
  assert.ok(fugitiva, "La Fugitiva listing must exist");
  assert.match(montserrat, /logo:\s*"\/logos\/restaurantemontserrat\.png"/);
  assert.match(fugitiva, /logo:\s*"\/logos\/la-fugitiva-pizzeria-dapa\.png"/);
  assert.match(fugitiva, /menuUrl:\s*"https:\/\/menupp\.co\/lafugitiva\/venue\/jhfJgnsgRrj3ovActhCE\/menu\/a5204527-32eb-412d-b231-dd7bb5b0c987"/);
  assert.match(fugitiva, /"?name"?:\s*"Pepperoni Chips/);
  assert.match(fugitiva, /"?name"?:\s*"Pizza de Nutella/);
  assert.match(fugitiva, /"?photo"?:\s*"\/places\/la-fugitiva-pizzeria-dapa\/menu\/001-pepperoni-chips\.webp"/);
  await Promise.all([
    access(new URL("../public/logos/restaurantemontserrat.png", import.meta.url)),
    access(new URL("../public/logos/la-fugitiva-pizzeria-dapa.png", import.meta.url)),
  ]);
});

test("every local video card has an existing poster", async () => {
  const videoPosters = {
    "arepas-de-la-abuela": "/video-posters/reactivacion-cali.jpg",
    "la-fonda-tradicional": "/video-posters/reactivacion-cali.jpg",
    "la-casona-vegetariana": "/video-posters/lacasona-vegetariana.jpg",
  };

  for (const [slug, poster] of Object.entries(videoPosters)) {
    assert.match(dataSource, new RegExp(`slug:\\s*"${slug}"[\\s\\S]*?video:\\s*"`));
    assert.match(dataSource, new RegExp(`slug:\\s*"${slug}"[\\s\\S]*?videoPoster:\\s*"${poster}"`));
    await access(new URL(`../public${poster}`, import.meta.url));
  }
});
