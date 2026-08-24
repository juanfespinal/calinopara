import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const indexSource = await readFile(new URL("../src/pages/index.astro", import.meta.url), "utf8");
const stylesSource = await readFile(new URL("../src/styles/global.css", import.meta.url), "utf8");

test("the directory homepage does not render story chips", () => {
  assert.doesNotMatch(indexSource, /story-rail|story-ring|story-name/);
  assert.doesNotMatch(stylesSource, /\.story-rail|\.story-ring|\.story-name/);
});
