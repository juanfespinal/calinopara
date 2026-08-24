import { mountMap } from "./map";
import type { Place } from "../data/emprendimientos";

type View = "lista" | "mapa";

export function initDirectory(root: HTMLElement, places: Place[]) {
  const search = root.querySelector<HTMLInputElement>("[data-search]");
  const chips = [...root.querySelectorAll<HTMLButtonElement>("[data-chip]")];
  const viewBtns = [...root.querySelectorAll<HTMLButtonElement>("[data-view]")];
  const cards = [...root.querySelectorAll<HTMLElement>("[data-slug]")];
  const count = root.querySelector<HTMLElement>("[data-count]");
  const empty = root.querySelector<HTMLElement>("[data-empty]");
  const mapEl = root.querySelector<HTMLElement>("[data-map]");
  const mapPane = root.querySelector<HTMLElement>("[data-map-pane]");
  const listPane = root.querySelector<HTMLElement>("[data-list-pane]");

  let category = "todos";
  let view: View = (sessionStorage.getItem("calinopara-view") as View) || "lista";
  let map: ReturnType<typeof mountMap> | null = null;

  function visiblePlaces() {
    const q = (search?.value ?? "").trim().toLowerCase();
    return places.filter((place) => {
      const catOk = category === "todos" || place.category === category;
      const qOk =
        !q ||
        place.name.toLowerCase().includes(q) ||
        place.barrio.toLowerCase().includes(q) ||
        place.tagline.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }

  function applyView() {
    root.dataset.view = view;
    sessionStorage.setItem("calinopara-view", view);
    if (listPane) listPane.hidden = view !== "lista";
    if (mapPane) mapPane.hidden = view !== "mapa";
    viewBtns.forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.view === view));
    });
    if (view === "mapa" && mapEl && !map) {
      map = mountMap(mapEl, places);
      map.filter(visiblePlaces().map((p) => p.slug));
    } else if (view === "mapa") {
      requestAnimationFrame(() => map?.map.invalidateSize());
    }
  }

  function render() {
    const shown = visiblePlaces();
    const slugs = new Set(shown.map((p) => p.slug));

    for (const card of cards) {
      const slug = card.dataset.slug ?? "";
      card.hidden = !slugs.has(slug);
    }

    if (count) {
      count.textContent = shown.length === 1 ? "1 negocio" : `${shown.length} negocios`;
    }
    if (empty) empty.hidden = shown.length > 0 || view === "mapa";
    map?.filter([...slugs]);
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      category = chip.dataset.chip ?? "todos";
      chips.forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
      render();
    });
  });

  viewBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      view = (btn.dataset.view as View) || "lista";
      applyView();
      render();
    });
  });

  search?.addEventListener("input", render);

  applyView();
  render();
}
