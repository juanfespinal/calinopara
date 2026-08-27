export function initMenuFilter() {
  const filterBars = document.querySelectorAll<HTMLElement>("[data-menu-filters]");

  filterBars.forEach((filterBar) => {
    const menuBlock = filterBar.closest<HTMLElement>(".menu-block");
    if (!menuBlock) return;

    const buttons = [...filterBar.querySelectorAll<HTMLButtonElement>("[data-menu-filter]")];
    const groups = [...menuBlock.querySelectorAll<HTMLElement>("[data-menu-section]")];

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const activeSection = button.dataset.menuFilter ?? "all";

        buttons.forEach((candidate) => {
          candidate.setAttribute("aria-pressed", String(candidate === button));
        });
        groups.forEach((group) => {
          group.hidden = activeSection !== "all" && group.dataset.menuSection !== activeSection;
        });
      });
    });
  });
}
