// Edite este número para trocar o destino dos botões de WhatsApp.
const WHATSAPP_NUMBER = "5511999999999";
const WHATSAPP_MESSAGE =
  "Olá! Gostaria de agendar um horário para extensão de cílios.";

const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector(".nav-toggle");
const whatsappLinks = document.querySelectorAll("[data-whatsapp]");
const year = document.querySelector("[data-year]");

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

whatsappLinks.forEach((link) => {
  link.href = whatsappUrl;
});

if (year) {
  year.textContent = new Date().getFullYear();
}

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 16);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (nav && navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.classList.toggle("is-active", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.classList.remove("is-active");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });
}

// Animação leve de entrada para seções e cards.
const revealElements = document.querySelectorAll(".reveal");

revealElements.forEach((element, index) => {
  element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -45px 0px",
  }
);

revealElements.forEach((element) => revealObserver.observe(element));
