import test from "node:test";
import assert from "node:assert/strict";

import { derivePlaceActions, prioritizeVideoPlaces } from "../src/data/place-order.mjs";
import { places } from "../src/data/emprendimientos.ts";

test("businesses with video appear before businesses without video", () => {
  const places = [
    { slug: "static-a" },
    { slug: "video-a", video: "/videos/a.mp4" },
    { slug: "static-b" },
    { slug: "video-b", video: "/videos/b.mp4" },
  ];

  const ordered = prioritizeVideoPlaces(places);

  assert.notStrictEqual(ordered, places, "sorting should return a new array");
  assert.deepEqual(ordered.map((place) => place.slug), ["video-a", "video-b", "static-a", "static-b"]);
  assert.deepEqual(places.map((place) => place.slug), ["static-a", "video-a", "static-b", "video-b"]);
});

test("multi-location listings show location context without imprecise directions", () => {
  for (const slug of ["el-gringo-american-kitchen", "proteandco"]) {
    const place = places.find((candidate) => candidate.slug === slug);
    assert.ok(place, `${slug} must exist`);
    const actions = derivePlaceActions(place);
    assert.equal(actions.hasPhysicalLocation, true);
    assert.equal(actions.canGetDirections, false);
  }
});

test("PROTE&CO exposes its campaign link without presenting Linktree as generic checkout", () => {
  const place = places.find((candidate) => candidate.slug === "proteandco");
  assert.ok(place, "PROTE&CO must exist");
  assert.deepEqual(derivePlaceActions(place), {
    hasPhysicalLocation: true,
    canGetDirections: false,
    orderHref: "https://linktr.ee/proteandco.froyo",
    orderNewTab: true,
    canOrder: true,
    orderLabel: "Ver campaña",
  });
});

test("La Central keeps the lechona WhatsApp action and suppresses directions", () => {
  const place = places.find((candidate) => candidate.slug === "la-central-cafe-bar");
  assert.ok(place, "La Central must exist");
  assert.deepEqual(derivePlaceActions(place), {
    hasPhysicalLocation: false,
    canGetDirections: false,
    orderHref: "https://wa.me/573160536396",
    orderNewTab: true,
    canOrder: true,
    orderLabel: "Pedir lechona",
  });
});
