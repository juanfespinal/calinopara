import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const analyticsPath = fileURLToPath(new URL("../src/scripts/analytics.ts", import.meta.url));

test("analytics normalizes data attributes and respects consent", () => {
  const script = `
    import { initAnalytics, trackEvent } from ${JSON.stringify(analyticsPath)};

    const calls = [];
    globalThis.window = {
      __analyticsConsent: false,
      gtag: (...args) => calls.push(args),
    };
    if (trackEvent("blocked_event") !== false) process.exit(1);

    window.__analyticsConsent = true;
    const button = {
      dataset: {
        analyticsEvent: "support_click",
        analyticsBusinessSlug: "cocina-mia",
        analyticsChannel: "whatsapp",
      },
    };
    const handlers = {};
    initAnalytics({ addEventListener(type, handler) { handlers[type] = handler; } });
    handlers.click({ target: { closest() { return button; } } });

    const expected = JSON.stringify([["event", "support_click", { business_slug: "cocina-mia", channel: "whatsapp" }]]);
    if (JSON.stringify(calls) !== expected) process.exit(1);
  `;
  const result = spawnSync(process.execPath, ["--experimental-strip-types", "--input-type=module", "-e", script], {
    encoding: "utf8",
  });

  assert.equal(result.status, 0, result.stderr);
});
