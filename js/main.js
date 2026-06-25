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
    }
  });
}, observerOptions);

// Observar elementos para animación
document.addEventListener("DOMContentLoaded", () => {
  const elementsToAnimate = document.querySelectorAll(
    ".feature-card, .testimonial-card"
  );
  elementsToAnimate.forEach((el) => observer.observe(el));
});

// Efectos de hover para tarjetas (mantenido, aunque el CSS también los tiene)
document
  .querySelectorAll(".feature-card, .testimonial-card")
  .forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px)";
      card.style.transition = "transform 0.3s ease";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });