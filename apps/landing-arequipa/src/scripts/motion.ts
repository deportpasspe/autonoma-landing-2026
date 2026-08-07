const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const STAGGER_MS = 130;
const COUNT_DURATION_MS = 1400;
/** Parallax off on small screens — keeps mobile scroll snappy for lead conversion. */
const PARALLAX_MIN_WIDTH = 768;

function prepareReveal(el: Element, delayMs = 0) {
  el.classList.add("reveal-init");
  (el as HTMLElement).style.setProperty("--reveal-delay", `${delayMs}ms`);
}

function revealNow(el: Element) {
  el.classList.add("is-visible");
}

function initReveals() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        revealNow(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );

  // Line masks are static in markup (no runtime DOM wrap → less CLS).
  document.querySelectorAll<HTMLElement>("[data-reveal-lines]").forEach((el) => {
    el.classList.add("reveal-lines");
    if (el.hasAttribute("data-reveal-eager") || el.classList.contains("is-visible")) {
      el.classList.add("reveal-instant");
      revealNow(el);
      return;
    }
    observer.observe(el);
  });

  document.querySelectorAll("[data-reveal-stagger]").forEach((group) => {
    const eager = group.hasAttribute("data-reveal-eager");
    const items = group.querySelectorAll(":scope > [data-reveal-item]");
    items.forEach((item, index) => {
      if (item.hasAttribute("data-reveal-lines")) {
        (item as HTMLElement).style.setProperty("--reveal-delay", `${index * STAGGER_MS}ms`);
        item.querySelectorAll<HTMLElement>(".reveal-line").forEach((line) => {
          line.style.setProperty("--reveal-delay", `${index * STAGGER_MS}ms`);
        });
        if (eager || item.hasAttribute("data-reveal-eager")) {
          // Above-the-fold: visible al instante (sin travel) para no retrasar LCP.
          item.classList.add("reveal-instant");
          revealNow(item);
          return;
        }
        observer.observe(item);
        return;
      }
      if (eager || item.hasAttribute("data-reveal-eager")) {
        // Above-the-fold: sin reveal-rise (opacity:0 retrasa FCP/LCP).
        revealNow(item);
        return;
      }
      prepareReveal(item, index * STAGGER_MS);
      observer.observe(item);
    });
  });

  document.querySelectorAll("[data-reveal]").forEach((el) => {
    if (el.closest("[data-reveal-stagger]") && el.matches("[data-reveal-item]")) return;
    if (el.hasAttribute("data-reveal-lines")) return;
    if (el.hasAttribute("data-reveal-eager")) {
      revealNow(el);
      return;
    }
    prepareReveal(el);
    observer.observe(el);
  });

  requestAnimationFrame(() => {
    const vh = window.innerHeight;
    document
      .querySelectorAll(".reveal-init:not(.is-visible), .reveal-lines:not(.is-visible)")
      .forEach((el) => {
        const rect = (el as HTMLElement).getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < vh * 0.92) revealNow(el);
      });
  });
}

function initCounters() {
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const counter = entry.target as HTMLElement;
        const countTo = Number(counter.dataset.countTo);
        const prefix = counter.dataset.countPrefix ?? "";
        const suffix = counter.dataset.countSuffix ?? "";
        const finalValue = counter.dataset.countFinal ?? `${prefix}${countTo}${suffix}`;
        const startTime = performance.now();

        const updateCount = (currentTime: number) => {
          const progress = Math.min((currentTime - startTime) / COUNT_DURATION_MS, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          const value = Math.round(countTo * easedProgress);

          counter.textContent = progress < 1 ? `${prefix}${value}${suffix}` : finalValue;

          if (progress < 1) requestAnimationFrame(updateCount);
        };

        requestAnimationFrame(updateCount);
        countObserver.unobserve(counter);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );

  document.querySelectorAll<HTMLElement>("[data-count-to]").forEach((counter) => {
    const prefix = counter.dataset.countPrefix ?? "";
    const suffix = counter.dataset.countSuffix ?? "";
    counter.textContent = `${prefix}0${suffix}`;
    countObserver.observe(counter);
  });
}

type ParallaxItem = {
  el: HTMLElement;
  speed: number;
  max: number;
};

function initParallax() {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
  if (!nodes.length) return;

  const items: ParallaxItem[] = nodes.map((el) => ({
    el,
    speed: Number(el.dataset.parallaxSpeed ?? "0.12") || 0.12,
    max: Number(el.dataset.parallaxMax ?? "48") || 48,
  }));

  let ticking = false;
  let enabled = window.innerWidth >= PARALLAX_MIN_WIDTH;

  const clear = () => {
    items.forEach(({ el }) => {
      el.style.removeProperty("transform");
      el.classList.remove("is-parallaxing");
    });
  };

  const update = () => {
    ticking = false;
    if (!enabled) return;

    const vh = window.innerHeight;
    items.forEach(({ el, speed, max }) => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < -80 || rect.top > vh + 80) return;

      const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      const y = Math.max(-max, Math.min(max, -progress * speed * 100));
      el.classList.add("is-parallaxing");
      el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(1.06)`;
    });
  };

  const onScroll = () => {
    if (!enabled || ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  const onResize = () => {
    enabled = window.innerWidth >= PARALLAX_MIN_WIDTH;
    if (!enabled) clear();
    else update();
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize, { passive: true });
  update();
}

function whenIdle(fn: () => void) {
  const ric = (window as Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  }).requestIdleCallback;
  if (typeof ric === "function") {
    ric(() => fn(), { timeout: 2000 });
  } else {
    globalThis.setTimeout(fn, 200);
  }
}

if (!prefersReducedMotion) {
  initReveals();
  whenIdle(() => {
    initCounters();
    initParallax();
  });
} else {
  document.querySelectorAll("[data-reveal], [data-reveal-item], [data-reveal-lines]").forEach(revealNow);
}
