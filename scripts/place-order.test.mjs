import test from "node:test";
import assert from "node:assert/strict";

import { prioritizeVideoPlaces } from "../src/data/place-order.mjs";

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
