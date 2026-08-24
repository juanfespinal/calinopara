import L from "leaflet";
import type { Place } from "../data/emprendimientos";
import { categoryColor } from "../data/emprendimientos";

const CALI: L.LatLngExpression = [3.437, -76.527];

function pinIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<span class="pin" style="background:${color};display:block"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 18],
    popupAnchor: [0, -16],
  });
}

export function mountMap(
  el: HTMLElement,
  places: Place[],
  options: { zoom?: number; interactive?: boolean } = {},
) {
  const withCoords = places.filter((p) => p.lat != null && p.lng != null);
  const map = L.map(el, {
    scrollWheelZoom: false,
    attributionControl: true,
  });

  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap, &copy; CARTO",
    maxZoom: 19,
  }).addTo(map);

  const markers = new Map<string, L.Marker>();

  for (const place of withCoords) {
    const marker = L.marker([place.lat!, place.lng!], {
      icon: pinIcon(categoryColor[place.category]),
      title: place.name,
    }).addTo(map);

    marker.bindPopup(
      `<strong>${place.name}</strong><br>${place.barrio}<br><a href="/emprendimiento/${place.slug}">Ver ficha</a>`,
    );
    markers.set(place.slug, marker);
  }

  if (withCoords.length === 1) {
    map.setView([withCoords[0].lat!, withCoords[0].lng!], options.zoom ?? 16);
  } else if (withCoords.length > 1) {
    const bounds = L.latLngBounds(withCoords.map((p) => [p.lat!, p.lng!]));
    map.fitBounds(bounds, { padding: [28, 28], maxZoom: 14 });
  } else {
    map.setView(CALI, 12);
  }

  requestAnimationFrame(() => map.invalidateSize());

  return {
    map,
    filter(slugs: string[]) {
      const visible: L.LatLng[] = [];
      for (const [slug, marker] of markers) {
        const on = slugs.includes(slug);
        if (on) {
          marker.addTo(map);
          visible.push(marker.getLatLng());
        } else {
          map.removeLayer(marker);
        }
      }
      if (visible.length > 1) {
        map.fitBounds(L.latLngBounds(visible), { padding: [28, 28], maxZoom: 14 });
      } else if (visible.length === 1) {
        map.setView(visible[0], 15);
      }
    },
    open(slug: string) {
      markers.get(slug)?.openPopup();
    },
  };
}
