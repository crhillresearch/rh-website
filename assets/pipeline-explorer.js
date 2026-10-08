(() => {
  document.querySelectorAll("[data-module-explorer]").forEach((explorer) => {
    const filters = Array.from(explorer.querySelectorAll("[data-module-filter]"));
    const cards = Array.from(explorer.querySelectorAll("[data-module-category]"));
    const count = explorer.querySelector("[data-module-count]");

    const apply = (category) => {
      let visible = 0;

      cards.forEach((card) => {
        const show = category === "All" || card.dataset.moduleCategory === category;
        card.hidden = !show;
        if (show) visible += 1;
      });

      filters.forEach((button) => {
        const active = button.dataset.moduleFilter === category;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", active ? "true" : "false");
      });

      if (count) {
        count.textContent = category === "All"
          ? `${visible} modules`
          : `${visible} ${category}`;
      }
    };

    filters.forEach((button) => {
      button.addEventListener("click", () => apply(button.dataset.moduleFilter));
    });
  });
})();
