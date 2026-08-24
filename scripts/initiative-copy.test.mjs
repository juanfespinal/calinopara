import test from "node:test";
import assert from "node:assert/strict";
import { initiative } from "../src/data/initiative.mjs";

test("the initiative copy explains local purchasing and sustainable recovery", () => {
  assert.match(initiative.heroTitle, /Comprar local/);
  assert.match(initiative.heroText, /terremoto/);
  assert.match(initiative.heroText, /largo plazo/);
  assert.match(initiative.introTitle, /solo el comienzo/i);
  assert.equal(initiative.principles.length, 3);
  assert.match(initiative.footerText, /No es un censo oficial/);
});
