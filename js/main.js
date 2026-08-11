// Año dinámico en el footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Botón de copiar dirección BTC de donaciones
const copyBtcBtn = document.getElementById("copyBtcBtn");
if (copyBtcBtn) {
  copyBtcBtn.addEventListener("click", () => {
    const addr = document.getElementById("btcAddress").textContent;
    navigator.clipboard.writeText(addr).then(() => {
      const original = copyBtcBtn.innerHTML;
      copyBtcBtn.innerHTML = '<i class="fas fa-check"></i> Copiado';
      setTimeout(() => { copyBtcBtn.innerHTML = original; }, 2000);
    });
  });
}

// Navegación suave para enlaces de anclaje
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Funcionalidad del menú móvil (adaptado a la nueva estructura)
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    document.body.classList.toggle("nav-open");
  });
}

// Cerrar el menú móvil al pulsar cualquier enlace dentro de él
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    if (document.body.classList.contains("nav-open")) {
      document.body.classList.remove("nav-open");
    }
  });
});

// Desplegable "Más" del menú
const navDropdown = document.getElementById("navDropdown");
const navDropdownToggle = document.getElementById("navDropdownToggle");
if (navDropdown && navDropdownToggle) {
  navDropdownToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    navDropdown.classList.toggle("open");
  });
  document.addEventListener("click", (e) => {
    if (!navDropdown.contains(e.target)) {
      navDropdown.classList.remove("open");
    }
  });
  navDropdown.querySelectorAll(".nav-dropdown-link").forEach((link) => {
    link.addEventListener("click", () => {
      navDropdown.classList.remove("open");
      if (document.body.classList.contains("nav-open")) {
        document.body.classList.remove("nav-open");
      }
    });
  });
}

// Funcionalidad del acordeón de personalización avanzada
const advancedToggle = document.getElementById("advancedToggle");
if (advancedToggle) {
  advancedToggle.addEventListener("click", () => {
    const accordion = document.getElementById("advancedAccordion");
    if (accordion) accordion.classList.toggle("open");
  });
}

// Funcionalidad del acordeón FAQ
document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const item = question.parentElement;
    item.classList.toggle("active");

    // Cerrar otros items abiertos
    document.querySelectorAll(".faq-item").forEach((otherItem) => {
      if (otherItem !== item && otherItem.classList.contains("active")) {
        otherItem.classList.remove("active");
      }
    });
  });
});

// Efectos de animación al hacer scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));
});