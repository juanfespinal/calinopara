import test from "node:test";
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const aidsDataUrl = new URL("src/data/ayudas.mjs", root);
const aidsPageUrl = new URL("src/pages/ayudas.astro", root);
const exists = async (url) => access(url).then(() => true).catch(() => false);

const [dataExists, pageExists] = await Promise.all([exists(aidsDataUrl), exists(aidsPageUrl)]);
const aidsSource = dataExists ? await readFile(aidsDataUrl, "utf8") : "";
const aidsPageSource = pageExists ? await readFile(aidsPageUrl, "utf8") : "";
const indexSource = await readFile(new URL("src/pages/index.astro", root), "utf8");
const sumateSource = await readFile(new URL("src/pages/sumate.astro", root), "utf8");
const baseSource = await readFile(new URL("src/layouts/Base.astro", root), "utf8");
const stylesSource = await readFile(new URL("src/styles/global.css", root), "utf8");
const docsSource = await readFile(new URL("docs/ayudas-verificadas-2026-08-24.md", root), "utf8");

test("verified aid data distinguishes actionable and announced support", async () => {
  assert.equal(dataExists, true, "src/data/ayudas.mjs must exist");
  const { aidOpportunities, aidStatus } = await import(aidsDataUrl.href);

  assert.equal(aidStatus.available, "Disponible ahora");
  assert.equal(aidStatus.byProvider, "Disponible según entidad");
  assert.equal(aidStatus.announced, "Convocatoria pendiente");
  assert.equal(aidStatus.regulation, "En reglamentación");

  const registry = aidOpportunities.find((aid) => aid.id === "registro-afectacion-economica");
  assert.ok(registry);
  assert.equal(registry.status, "available");
  assert.match(registry.provider, /Alcaldía de Cali.*Cámara de Comercio de Cali/i);
  assert.match(registry.eligibility, /formales e informales/i);
  assert.match(registry.eligibility, /directas e indirectas/i);
  assert.deepEqual(
    registry.actions.map(({ type }) => type).sort(),
    ["email", "phone", "whatsapp"],
  );
  assert.match(registry.actions.find(({ type }) => type === "whatsapp").href, /wa\.me\/573009131811/);
  assert.match(docsSource, /reactivacali@cali\.gov\.co/);
  assert.match(registry.sourceUrl, /^https:\/\/www\.ccc\.org\.co\//);
  assert.match(registry.institutionRole, /plataforma tecnológica/i);
  assert.match(registry.institutionRole, /Confecámaras/i);
  assert.match(aidsPageSource, /Papel de la Cámara/);

  assert.ok(aidOpportunities.some((aid) => aid.id === "alivios-bancarios" && aid.status === "byProvider"));

  const comfandiCredit = aidOpportunities.find((aid) => aid.id === "credito-emergencia-comfandi");
  assert.ok(comfandiCredit);
  assert.equal(comfandiCredit.provider, "Comfandi");
  assert.equal(comfandiCredit.status, "byProvider");
  assert.match(comfandiCredit.summary, /crédito de libre destinación/i);
  assert.match(comfandiCredit.summary, /no es un subsidio/i);
  assert.match(comfandiCredit.eligibility, /trabajadores dependientes/i);
  assert.match(comfandiCredit.eligibility, /no aplica para independientes ni pensionados/i);
  assert.match(comfandiCredit.eligibility, /categorías A, B o C/i);
  assert.match(comfandiCredit.eligibility, /3 meses de afiliación/i);
  assert.match(comfandiCredit.eligibility, /3 meses de antigüedad laboral/i);
  assert.match(comfandiCredit.details.join(" "), /\$1\.000\.000.*\$20\.000\.000/i);
  assert.match(comfandiCredit.details.join(" "), /60 meses/i);
  assert.match(comfandiCredit.details.join(" "), /primera cuota.*60 días/i);
  assert.match(comfandiCredit.guidance, /App Mi Comfandi.*Sucursal Virtual Personas/i);
  assert.match(comfandiCredit.sourceUrl, /^https:\/\/www\.comfandi\.com\.co\//);
  assert.equal(comfandiCredit.lastVerified, "2026-08-27");
  assert.match(docsSource, /## Crédito de Emergencia Comfandi/);

  assert.ok(aidOpportunities.some((aid) => aid.id === "fondo-recuperacion-productiva" && aid.status === "announced"));
  assert.ok(aidOpportunities.some((aid) => aid.id === "microcreditos-especiales" && aid.status === "announced"));
  assert.ok(aidOpportunities.some((aid) => aid.id === "alivios-tributarios-servicios" && aid.status === "regulation"));

  for (const aid of aidOpportunities.filter(({ status }) => !["available", "byProvider"].includes(status))) {
    assert.doesNotMatch(JSON.stringify(aid.actions ?? []), /solicitar|aplicar/i);
  }
});

test("aid UX has a dedicated route and contextual entry points", () => {
  assert.equal(pageExists, true, "src/pages/ayudas.astro must exist");
  assert.match(aidsPageSource, /Haz esto primero/);
  assert.match(aidsPageSource, /data-aid-status/);
  assert.match(aidsPageSource, /Última verificación/);
  assert.match(aidsPageSource, /formatVerified\(aid\.lastVerified\)/);
  assert.match(aidsPageSource, /No administramos ni entregamos recursos/);
  assert.match(aidsPageSource, /abre en una pestaña nueva/);
  assert.match(stylesSource, /\.sr-only/);
  assert.match(indexSource, /class="[^"]*aid-callout/);
  assert.match(indexSource, /href="\/ayudas\/"/);
  assert.match(sumateSource, /no reemplaza el registro oficial/i);
  assert.match(sumateSource, /wa\.me\/573009131811/);
  assert.match(baseSource, /href="\/ayudas\/"/);
  assert.match(baseSource, />Ayudas</);
  assert.match(stylesSource, /\.aid-callout/);
  assert.match(stylesSource, /\.aid-card/);
  assert.match(stylesSource, /grid-template-columns:\s*repeat\(4,\s*1fr\)/);
  assert.match(baseSource, /Usamos analítica opcional/);
  assert.match(stylesSource, /\.analytics-consent[\s\S]*?max-width:\s*30rem/);
});

test("the aid page does not present pending programs as open applications", () => {
  assert.doesNotMatch(aidsPageSource, /Solicitar (el )?(fondo|microcrédito|alivio tributario)/i);
  assert.match(aidsSource, /Ver anuncio oficial/);
  assert.match(aidsSource, /lastVerified:\s*"2026-08-24"/);
});
