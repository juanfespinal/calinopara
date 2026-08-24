export function initDishModal() {
  const dialog = document.querySelector<HTMLDialogElement>("[data-dish-modal]");
  if (!dialog) return;

  const panel = dialog.querySelector<HTMLElement>("[data-dish-panel]");
  const photo = dialog.querySelector<HTMLImageElement>("[data-dish-photo]");
  const title = dialog.querySelector<HTMLElement>("[data-dish-title]");
  const desc = dialog.querySelector<HTMLElement>("[data-dish-desc]");
  const price = dialog.querySelector<HTMLElement>("[data-dish-price]");
  const closeBtn = dialog.querySelector<HTMLButtonElement>("[data-dish-close]");
  const cards = [...document.querySelectorAll<HTMLButtonElement>("[data-dish]")];

  function openFrom(card: HTMLButtonElement) {
    const name = card.querySelector("strong")?.textContent?.trim() ?? "";
    const copy = card.querySelector(".menu-copy p")?.textContent?.trim() ?? "";
    const amount = card.querySelector(".menu-price")?.textContent?.trim() ?? "";
    const img = card.querySelector<HTMLImageElement>("img");

    if (title) title.textContent = name;
    if (desc) {
      desc.textContent = copy;
      desc.hidden = !copy;
    }
    if (price) price.textContent = amount;
    if (photo) {
      if (img?.src) {
        photo.src = img.currentSrc || img.src;
        photo.alt = name;
        photo.hidden = false;
      } else {
        photo.removeAttribute("src");
        photo.alt = "";
        photo.hidden = true;
      }
    }

    dialog.showModal();
    closeBtn?.focus();
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => openFrom(card));
  });

  closeBtn?.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    if (!panel) {
      dialog.close();
      return;
    }
    const box = panel.getBoundingClientRect();
    const { clientX: x, clientY: y } = event;
    if (x < box.left || x > box.right || y < box.top || y > box.bottom) {
      dialog.close();
    }
  });
}
