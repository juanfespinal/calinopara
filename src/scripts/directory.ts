import { mountMap } from "./map";
import { trackEvent } from "./analytics";
import { categories, statusLabel, type Place } from "../data/emprendimientos";

type View = "lista" | "mapa";

export function initDirectory(root: HTMLElement, places: Place[]) {
  const search = root.querySelector<HTMLInputElement>("[data-search]");
  const viewBtns = [...root.querySelectorAll<HTMLButtonElement>("[data-view]")];
  const categoryBtns = [...root.querySelectorAll<HTMLButtonElement>("[data-category-filter]")];
  const cards = [...root.querySelectorAll<HTMLElement>("[data-slug]")];
  const reelButtons = [...root.querySelectorAll<HTMLButtonElement>("[data-reel-play]")];
  const reelVideos = [...root.querySelectorAll<HTMLVideoElement>("[data-reel-video]")];
  const count = root.querySelector<HTMLElement>("[data-count]");
  const empty = root.querySelector<HTMLElement>("[data-empty]");
  const mapEl = root.querySelector<HTMLElement>("[data-map]");
  const mapPane = root.querySelector<HTMLElement>("[data-map-pane]");
  const mapSheet = root.querySelector<HTMLElement>("[data-map-sheet]");
  const sheetPhoto = root.querySelector<HTMLImageElement>("[data-sheet-photo]");
  const sheetName = root.querySelector<HTMLElement>("[data-sheet-name]");
  const sheetMeta = root.querySelector<HTMLElement>("[data-sheet-meta]");
  const sheetStatus = root.querySelector<HTMLElement>("[data-sheet-status]");
  const sheetLink = root.querySelector<HTMLAnchorElement>("[data-sheet-link]");
  const listPane = root.querySelector<HTMLElement>("[data-list-pane]");
  const isMapPage = root.dataset.mapPage === "true";

  let view: View = isMapPage || window.location.hash === "#mapa" ? "mapa" : "lista";
  let category = "todos";
  let map: ReturnType<typeof mountMap> | null = null;
  let activeVideo: HTMLVideoElement | null = null;

  function visiblePlaces() {
    const q = (search?.value ?? "").trim().toLowerCase();
    return places.filter((place) => {
      const categoryOk = category === "todos" || place.category === category;
      const qOk =
        !q ||
        place.name.toLowerCase().includes(q) ||
        place.barrio.toLowerCase().includes(q) ||
        place.tagline.toLowerCase().includes(q);
      return categoryOk && qOk;
    });
  }

  function resetVideo(video: HTMLVideoElement) {
    const card = video.closest<HTMLElement>("[data-slug]");
    card?.removeAttribute("data-playing");
    const button = card?.querySelector<HTMLButtonElement>("[data-reel-play]");
    if (button) button.hidden = false;
    video.tabIndex = -1;
    if (activeVideo === video) activeVideo = null;
  }

  function showMapSheet(place: Place) {
    if (!mapSheet) return;
    trackEvent("map_marker_select", { business_slug: place.slug, business_name: place.name });
    const categoryLabel = categories.find((item) => item.id === place.category)?.label ?? "Negocio";
    if (sheetPhoto) {
      sheetPhoto.src = place.photo;
      sheetPhoto.alt = place.photoAlt;
    }
    if (sheetName) sheetName.textContent = place.name;
    if (sheetMeta) sheetMeta.textContent = `${categoryLabel} · ${place.barrio}`;
    if (sheetStatus) sheetStatus.textContent = statusLabel[place.status];
    if (sheetLink) sheetLink.href = `/emprendimiento/${place.slug}`;
    mapSheet.hidden = false;
  }

  function setView(next: View, updateUrl = true) {
    view = next;
    root.dataset.view = view;
    if (updateUrl && !isMapPage) {
      const url = new URL(window.location.href);
      url.hash = view === "mapa" ? "mapa" : "";
      window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    }
    if (listPane) listPane.hidden = view !== "lista";
    if (mapPane) mapPane.hidden = view !== "mapa";
    if (mapSheet && view !== "mapa") mapSheet.hidden = true;
    viewBtns.forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.view === view));
    });
    if (view === "mapa" && mapEl && !map) {
      map = mountMap(mapEl, places, { onSelect: showMapSheet });
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

    categoryBtns.forEach((btn) => {
      btn.setAttribute("aria-pressed", String((btn.dataset.categoryFilter ?? "todos") === category));
    });

    if (count) {
      count.textContent = shown.length === 1 ? "1 negocio" : `${shown.length} negocios`;
    }
    if (empty) empty.hidden = shown.length > 0 || view === "mapa";
    map?.filter([...slugs]);
  }

  reelVideos.forEach((video) => {
    video.addEventListener("ended", () => {
      const card = video.closest<HTMLElement>("[data-slug]");
      trackEvent("video_complete", { business_slug: card?.dataset.slug, content_type: "directory_story" });
      resetVideo(video);
    });
  });

  reelButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      const card = button.closest<HTMLElement>("[data-slug]");
      const video = card?.querySelector<HTMLVideoElement>("[data-reel-video]");
      if (!card || !video) return;

      if (activeVideo && activeVideo !== video) {
        activeVideo.pause();
        resetVideo(activeVideo);
      }

      activeVideo = video;
      card.dataset.playing = "true";
      button.hidden = true;
      video.tabIndex = 0;

      try {
        await video.play();
        trackEvent("video_start", { business_slug: card.dataset.slug, content_type: "directory_story" });
      } catch {
        resetVideo(video);
      }
    });
  });

  viewBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      setView((btn.dataset.view as View) || "lista");
      render();
    });
  });

  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      category = btn.dataset.categoryFilter || "todos";
      trackEvent("directory_filter", { category });
      render();
    });
  });

  let searchTimer: ReturnType<typeof setTimeout> | undefined;
  search?.addEventListener("input", () => {
    render();
    if (searchTimer) window.clearTimeout(searchTimer);
    searchTimer = window.setTimeout(() => {
      const query = search.value.trim();
      if (query) trackEvent("directory_search", { query_length: query.length });
    }, 500);
  });

  setView(view, false);
  render();
}
