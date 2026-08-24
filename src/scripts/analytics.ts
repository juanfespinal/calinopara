export const GA_MEASUREMENT_ID = "G-R9MNJYHSLQ";

type AnalyticsValue = string | number | boolean | undefined;
type AnalyticsParams = Record<string, AnalyticsValue>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function toSnakeCase(value: string) {
  return value.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

function paramsFromElement(element: HTMLElement) {
  const params: AnalyticsParams = {};

  for (const [key, value] of Object.entries(element.dataset)) {
    if (!key.startsWith("analytics") || key === "analyticsEvent" || value == null) continue;
    params[toSnakeCase(key.slice("analytics".length))] = value;
  }

  return params;
}

export function trackEvent(name: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return false;
  window.gtag("event", name, params);
  return true;
}

export function initAnalytics(root: Document = document) {
  root.addEventListener("click", (event) => {
    const target = (event.target as Element | null)?.closest<HTMLElement>("[data-analytics-event]");
    if (!target?.dataset.analyticsEvent) return;
    trackEvent(target.dataset.analyticsEvent, paramsFromElement(target));
  });

  root.addEventListener("submit", (event) => {
    const target = event.target instanceof HTMLFormElement ? event.target : null;
    if (!target?.dataset.analyticsEvent) return;
    trackEvent(target.dataset.analyticsEvent, paramsFromElement(target));
  });
}
