export function initInitiativeDialog() {
  const dialog = document.querySelector<HTMLDialogElement>("[data-initiative-dialog]");
  if (!dialog) return;

  const panel = dialog.querySelector<HTMLElement>("[data-initiative-panel]");
  const openers = [...document.querySelectorAll<HTMLButtonElement>("[data-initiative-open]")];
  const closers = [...dialog.querySelectorAll<HTMLElement>("[data-initiative-close]")];

  openers.forEach((opener) => {
    opener.addEventListener("click", () => {
      dialog.showModal();
    });
  });

  closers.forEach((closer) => {
    closer.addEventListener("click", () => {
      dialog.close();
    });
  });

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
