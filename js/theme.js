// Modo oscuro: persiste la preferencia y respeta el tema del sistema
(function () {
  const STORAGE_KEY = "qrgratis-theme";

  function getInitialTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }

  // Aplicar tema antes de pintar para evitar parpadeo
  applyTheme(getInitialTheme());

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".theme-toggle").forEach((btn) => {
      btn.setAttribute("aria-label", "Cambiar tema");
      btn.setAttribute("aria-pressed", "false");
      btn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        localStorage.setItem(STORAGE_KEY, next);
        applyTheme(next);
        btn.setAttribute("aria-pressed", next === "dark" ? "true" : "false");
      });
    });
  });
})();
