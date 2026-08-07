const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const STAGGER_MS = 110;

function prepareReveal(el: Element, delayMs = 0) {
  el.classList.add("reveal-init");
  (el as HTMLElement).style.setProperty("--reveal-delay", `${delayMs}ms`);
}

function revealNow(el: Element) {
  el.classList.add("is-visible");
}

if (!prefersReducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        revealNow(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );

  document.querySelectorAll("[data-reveal-stagger]").forEach((group) => {
    const items = group.querySelectorAll(":scope > [data-reveal-item]");
    items.forEach((item, index) => {
      prepareReveal(item, index * STAGGER_MS);
      observer.observe(item);
    });
  });

  document.querySelectorAll("[data-reveal]").forEach((el) => {
    if (el.closest("[data-reveal-stagger]") && el.matches("[data-reveal-item]")) return;
    prepareReveal(el);
    observer.observe(el);
  });
} else {
  document.querySelectorAll("[data-reveal], [data-reveal-item]").forEach(revealNow);
}
