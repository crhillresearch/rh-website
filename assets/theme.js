(() => {
  const STORAGE_KEY = "rank-hunter-site-theme";
  const root = document.documentElement;
  const storedTheme = (() => {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  })();

  const validStoredTheme = storedTheme === "light" || storedTheme === "dark"
    ? storedTheme
    : null;

  const initialTheme = validStoredTheme || "light";
  root.dataset.theme = initialTheme;

  const updateThemeColor = (theme) => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", theme === "dark" ? "#0D1117" : "#F4F6FA");
    }
  };

  const updateToggle = (theme) => {
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      const darkOn = theme === "dark";
      button.setAttribute("aria-label", darkOn ? "Dark appearance on" : "Dark appearance off");
      button.setAttribute("aria-pressed", darkOn ? "true" : "false");
      button.setAttribute("title", "Toggle dark appearance");
    });

    updateThemeColor(theme);
  };

  const setTheme = (theme, persist = true) => {
    root.dataset.theme = theme;
    updateToggle(theme);

    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch {
        // The site remains functional when storage is unavailable.
      }
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    updateToggle(root.dataset.theme || initialTheme);

    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        setTheme(root.dataset.theme === "dark" ? "light" : "dark");
      });
    });
  });
})();
