const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  const elements = document.querySelectorAll("[data-reveal]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );

  elements.forEach((el) => {
    el.classList.add("reveal-init");
    observer.observe(el);
  });
} else {
  document.querySelectorAll("[data-reveal]").forEach((el) => {
    el.classList.add("is-visible");
  });
}
