import test from "node:test";
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const dataSource = await readFile(new URL("../src/data/emprendimientos.ts", import.meta.url), "utf8");
const detailSource = await readFile(
  new URL("../src/pages/emprendimiento/[slug].astro", import.meta.url),
  "utf8",
);
const { categories, places } = await import("../src/data/emprendimientos.ts");
const placeVideoSource = await readFile(
  new URL("../src/components/PlaceVideo.astro", import.meta.url),
  "utf8",
);

test("directory categories stay condensed and every filter has businesses", () => {
  assert.deepEqual(
    categories.map((category) => category.label),
    ["Comidas", "Postres y panadería", "Café y bebidas"],
  );
  for (const category of categories) {
    assert.ok(places.some((place) => place.category === category.id), `${category.label} must not be empty`);
  }
});


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

test("Kurtos Kali publishes the verified Libertadores location and official media", async () => {
  const kurtos = dataSource.match(/slug:\s*"kurtos-kali"([\s\S]*?)(?=\n  },\n  \{)/)?.[1];

  assert.ok(kurtos, "Kurtos Kali listing must exist");
  assert.match(kurtos, /instagram:\s*"kurtos_kali"/);
  assert.match(kurtos, /instagramPost:\s*"DccGtgFRIEb"/);
  assert.match(kurtos, /instagramPostPublisher:\s*"takamarsushi"/);
  assert.ok(
    detailSource.includes("handle={place.instagramPostPublisher ?? place.instagram}"),
    "collaboration reels must identify the publishing account",
  );
  assert.match(placeVideoSource, /Publicado por/);
  assert.doesNotMatch(placeVideoSource, /Video original de/);
  assert.match(kurtos, /video:\s*"\/videos\/kurtos-kali\.mp4"/);
  assert.match(kurtos, /videoPoster:\s*"\/places\/kurtos-kali\.jpg"/);
  assert.match(kurtos, /logo:\s*"\/logos\/kurtos-kali\.jpg"/);
  assert.match(kurtos, /barrio:\s*"Libertadores"/);
  assert.match(kurtos, /address:\s*"Cra\. 22 #1 Oeste-04"/);
  assert.match(kurtos, /lat:\s*3\.4421688/);
  assert.match(kurtos, /lng:\s*-76\.541648/);
  assert.match(kurtos, /whatsapp:\s*"573233706743"/);
  assert.match(kurtos, /menuUrl:\s*"https:\/\/wa\.me\/c\/573233706743"/);
  assert.match(kurtos, /status:\s*"abierto"/);
  const products = [
    "Kurto Lulada",
    "Kurto Maracululo",
    "Kurto Banano Nutella",
    "Kurto Smash",
    "Kurto Frutos Rojos",
    "Kurto Fresas con Nutella",
    "Kurto Chocolate Blanco",
    "Kurto salado",
  ];
  for (const product of products) {
    assert.match(kurtos, new RegExp(`name:\\s*"${product}"`), `${product} must be published`);
  }
  assert.doesNotMatch(kurtos, /price:\s*\d+/);
  const menuPhotos = [...kurtos.matchAll(/photo:\s*"(\/places\/kurtos-kali\/menu\/[^"]+\.webp)"/g)]
    .map((match) => match[1]);
  assert.equal(menuPhotos.length, products.length, "each verified product should have an official image");
  assert.equal(new Set(menuPhotos).size, products.length, "product images should be distinct");
  await Promise.all([
    access(new URL("../public/videos/kurtos-kali.mp4", import.meta.url)),
    access(new URL("../public/places/kurtos-kali.jpg", import.meta.url)),
    access(new URL("../public/logos/kurtos-kali.jpg", import.meta.url)),
    ...menuPhotos.map((photo) => access(new URL(`../public${photo}`, import.meta.url))),
  ]);
});

test("Casa Bananá publishes its verified Pance operation, priced menu, and official media", async () => {
  const casaBanana = dataSource.match(/slug:\s*"casa-banana"([\s\S]*?)(?=\n  },\n  \{)/)?.[1];

  assert.ok(casaBanana, "Casa Bananá listing must exist");
  assert.match(casaBanana, /instagram:\s*"casabananaa"/);
  assert.match(casaBanana, /instagramPost:\s*"Db_PXvahGFN"/);
  assert.match(casaBanana, /video:\s*"\/videos\/casa-banana\.mp4"/);
  assert.match(casaBanana, /videoPoster:\s*"\/places\/casa-banana\.jpg"/);
  assert.match(casaBanana, /barrio:\s*"Pance"/);
  assert.match(casaBanana, /address:\s*"Puerto 125, Cl\. 16A #124-285, local 2"/);
  assert.match(casaBanana, /whatsapp:\s*"573186909991"/);
  assert.match(
    casaBanana,
    /menuUrl:\s*"https:\/\/menupp\.co\/casabanana\/venue\/mekiP3lb8Ou8ytqKgOq1\/menu\/aac0c5ed-d748-4191-b3be-fc0f76dc32b3"/,
  );
  assert.match(casaBanana, /status:\s*"limitado"/);

  for (const product of ["Waffle Soleados", "Cheesecake Borojó", "Francesita Bananella"]) {
    assert.match(casaBanana, new RegExp(`name:\\s*"${product}`), `${product} must be published`);
  }
  const itemCount = (casaBanana.match(/\bname:\s*"/g) ?? []).length - 1; // Exclude the place name.
  const prices = casaBanana.match(/\bprice:\s*\d+/g) ?? [];
  const photos = [...casaBanana.matchAll(/\bphoto:\s*"(\/places\/casa-banana\/menu\/[^"]+\.webp)"/g)]
    .map((match) => match[1]);

  assert.equal(itemCount, 59, "all 50 photographed products and their priced variants should be represented");
  assert.equal(prices.length, 58, "every unambiguous official variant price should be represented");
  assert.equal(photos.length, itemCount, "every local menu card should have an official product photo");
  assert.equal(new Set(photos).size, 50, "the official Pance menu should contribute 50 distinct product photos");
  await Promise.all([
    access(new URL("../public/videos/casa-banana.mp4", import.meta.url)),
    access(new URL("../public/places/casa-banana.jpg", import.meta.url)),
    access(new URL("../public/logos/casa-banana.jpg", import.meta.url)),
    ...[...new Set(photos)].map((photo) => access(new URL(`../public${photo}`, import.meta.url))),
  ]);
});

test("KingPapa publishes an operating support point and its verified reopening story", async () => {
  const kingPapa = dataSource.match(/slug:\s*"kingpapa"([\s\S]*?)(?=\n  },\n  \{)/)?.[1];

  assert.ok(kingPapa, "KingPapa listing must exist");
  assert.match(kingPapa, /instagram:\s*"kingpapaco"/);
  assert.match(kingPapa, /instagramPost:\s*"DccLjFFsVgy"/);
  assert.match(kingPapa, /video:\s*"\/videos\/kingpapa\.mp4"/);
  assert.match(kingPapa, /videoPoster:\s*"\/places\/kingpapa\.jpg"/);
  assert.match(kingPapa, /barrio:\s*"La Flora"/);
  assert.match(kingPapa, /address:\s*"Cl\. 44 Nte\. #3E-45"/);
  assert.match(kingPapa, /whatsapp:\s*"573172455336"/);
  assert.match(kingPapa, /website:\s*"https:\/\/kingpapacali\.com"/);
  assert.match(kingPapa, /menuUrl:\s*"https:\/\/kingpapacali\.com\/menu"/);
  assert.match(kingPapa, /status:\s*"limitado"/);
  assert.match(kingPapa, /Marbella Plaza/);
  assert.match(kingPapa, /4 de septiembre/);
  assert.doesNotMatch(kingPapa, /price:\s*\d+/);
  await Promise.all([
    access(new URL("../public/videos/kingpapa.mp4", import.meta.url)),
    access(new URL("../public/places/kingpapa.jpg", import.meta.url)),
    access(new URL("../public/logos/kingpapa.jpg", import.meta.url)),
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
