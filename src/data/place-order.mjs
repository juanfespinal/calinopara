/**
 * Return a stable copy with businesses that have local video first.
 * The original editorial order is preserved within each group.
 *
 * @template {{ video?: string }} T
 * @param {readonly T[]} places
 * @returns {T[]}
 */
export function prioritizeVideoPlaces(places) {
  return places
    .map((place, index) => ({ place, index }))
    .sort((a, b) => Number(Boolean(b.place.video)) - Number(Boolean(a.place.video)) || a.index - b.index)
    .map(({ place }) => place);
}

/**
 * Derive user-facing actions without conflating a physical location with
 * whether a precise directions link is available.
 *
 * @param {{
 *   hasPhysicalLocation?: boolean,
 *   showDirections?: boolean,
 *   orderUrl?: string,
 *   whatsapp?: string,
 *   phone?: string,
 *   orderLabel?: string,
 * }} place
 */
export function derivePlaceActions(place) {
  const hasPhysicalLocation = place.hasPhysicalLocation !== false;
  const canGetDirections = hasPhysicalLocation && place.showDirections !== false;
  const wa = place.whatsapp ? `https://wa.me/${place.whatsapp}` : null;
  const tel = place.phone ? `tel:${place.phone}` : null;
  const orderHref = place.orderUrl ?? wa ?? tel;

  return {
    hasPhysicalLocation,
    canGetDirections,
    orderHref,
    orderNewTab: orderHref ? !orderHref.startsWith("tel:") : false,
    canOrder: Boolean(orderHref),
    orderLabel: place.orderLabel ?? "Pedir ahora",
  };
}
