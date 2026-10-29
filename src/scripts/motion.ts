// Scroll-driven motion: reveals, header state, progress bar, active-section nav,
// experience timeline fill, count-ups and architecture-diagram playback.
// Everything degrades to static content without JS or with reduced motion.

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = <T extends Element = HTMLElement>(s: string) => document.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string) => Array.from(document.querySelectorAll<T>(s));
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

// Reveal once on entry.
const revealer = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add("in");
      revealer.unobserve(e.target);
    }
  },
  { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
);
$$(".reveal, .arch").forEach((el) => revealer.observe(el));

// Diagrams: only run the data-packet loop while on screen.
const live = new IntersectionObserver((entries) => {
  for (const e of entries) e.target.classList.toggle("live", e.isIntersecting);
});
$$(".arch").forEach((el) => live.observe(el));

// Count numbers up from 0 the first time they're mostly visible.
const counters = $$("[data-count]");
if (!reduced && counters.length) {
  const fmt = new Intl.NumberFormat("en-US");
  const counter = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        counter.unobserve(e.target);
        const el = e.target as HTMLElement;
        const target = Number(el.dataset.count);
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / 1300, 1);
          el.textContent = fmt.format(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    },
    { threshold: 0.6 }
  );
  counters.forEach((el) => {
    el.textContent = "0";
    counter.observe(el);
  });
}

// Active-section highlight in both navs, plus a sliding underline on desktop.
const links = $$<HTMLAnchorElement>("[data-nav] a");
const indicator = $("#nav-ind");
let active: string | null = null;

function setActive(id: string | null) {
  if (id === active) return;
  active = id;
  for (const a of links) {
    const on = a.hash === `#${id}`;
    a.classList.toggle("is-active", on);
    if (on) a.setAttribute("aria-current", "true");
    else a.removeAttribute("aria-current");
  }
  placeIndicator();
}

function placeIndicator() {
  if (!indicator) return;
  const a = links.find((l) => l.hash === `#${active}` && l.offsetParent && indicator.parentElement?.contains(l));
  indicator.style.opacity = a ? "1" : "0";
  if (a) {
    indicator.style.width = `${a.offsetWidth}px`;
    indicator.style.transform = `translateX(${a.offsetLeft}px)`;
  }
}

const sections = $$("main section[id]");
const navIds = new Set(links.map((a) => a.hash.slice(1)));
const spy = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const id = e.target.id;
      // Sections without a nav link (e.g. certifications) keep the previous highlight.
      if (navIds.has(id)) setActive(id);
      else if (id === "top") setActive(null);
    }
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => spy.observe(s));
addEventListener("resize", placeIndicator);
document.fonts?.ready.then(placeIndicator);

// Per-frame scroll work, batched into one rAF.
const progress = $("#progress");
const header = $("#site-header");
const timeline = $("#timeline");
const tlFill = $("#tl-fill");
const tlDots = $$(".tl-dot");
let queued = false;

function onScroll() {
  queued = false;
  const y = scrollY;
  const vh = innerHeight;
  const max = document.documentElement.scrollHeight - vh;

  if (progress) progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  header?.classList.toggle("is-scrolled", y > 30);

  // The last section may never reach the middle of a tall viewport.
  if (sections.length && max > 0 && y >= max - 2) {
    const last = links.at(-1)?.hash.slice(1);
    if (last && document.getElementById(last)) setActive(last);
  }

  if (timeline && tlFill) {
    const r = timeline.getBoundingClientRect();
    const line = vh * 0.6;
    tlFill.style.transform = `scaleY(${clamp((line - r.top) / r.height, 0, 1).toFixed(3)})`;
    tlDots.forEach((d) => d.classList.toggle("on", d.getBoundingClientRect().top < line));
  }
}

const schedule = () => {
  if (queued) return;
  queued = true;
  requestAnimationFrame(onScroll);
};
addEventListener("scroll", schedule, { passive: true });
addEventListener("resize", schedule);
onScroll();
