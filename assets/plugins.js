(() => {
  const search = document.querySelector("#plugin-search");
  const buttons = [...document.querySelectorAll("[data-filter]")];
  const cards = [...document.querySelectorAll("[data-plugin]")];
  const groups = [...document.querySelectorAll("[data-group]")];
  const status = document.querySelector("#catalog-status");
  const noResults = document.querySelector("#no-results");

  if (!search || !cards.length) return;

  let activeType = "all";

  const normalize = (value) =>
    value
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[×≥→−]/g, " ");

  const apply = () => {
    const query = normalize(search.value.trim());
    let visible = 0;

    cards.forEach((card) => {
      const typeMatch = activeType === "all" || card.dataset.type === activeType;
      const haystack = normalize(card.textContent + " " + (card.dataset.search || ""));
      const searchMatch = !query || haystack.includes(query);
      const show = typeMatch && searchMatch;
      card.hidden = !show;
      if (show) visible += 1;
    });

    groups.forEach((group) => {
      group.hidden = !group.querySelector("[data-plugin]:not([hidden])");
    });

    noResults.hidden = visible !== 0;

    const noun = visible === 1 ? "plugin" : "plugins";
    if (!query && activeType === "all") {
      status.textContent = "Showing all 25 published plugins.";
    } else {
      status.textContent = `Showing ${visible} ${noun}.`;
    }
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      activeType = button.dataset.filter;
      buttons.forEach((candidate) => {
        const active = candidate === button;
        candidate.classList.toggle("active", active);
        candidate.setAttribute("aria-pressed", String(active));
      });
      apply();
    });
  });

  search.addEventListener("input", apply);
})();
