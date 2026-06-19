gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();

function buildIntro() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.from(".topbar", { y: -72, autoAlpha: 0, duration: 0.7 })
    .from(".hero-kicker span", { yPercent: 120, duration: 0.55 }, "<0.15")
    .from(".title-row b", { yPercent: 110, rotation: 2, duration: 1.05, stagger: 0.12 }, "<0.05")
    .from(".title-row em", { x: 30, autoAlpha: 0, duration: 0.65, stagger: 0.1 }, "<0.45")
    .from(".hero-intro", { y: 30, autoAlpha: 0, duration: 0.7 }, "<0.1")
    .from(".priority-stamp", { x: 35, autoAlpha: 0, duration: 0.7 }, "<")
    .from(".hero-rail > *", { y: -8, autoAlpha: 0, duration: 0.35, stagger: 0.06 }, "<0.15");
  return tl;
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let intro = prefersReducedMotion ? null : buildIntro();
document.querySelector(".replay").addEventListener("click", () => intro?.restart());

mm.add({
  desktop: "(min-width: 851px)",
  mobile: "(max-width: 850px)",
  reduceMotion: "(prefers-reduced-motion: reduce)"
}, (context) => {
  const { desktop, reduceMotion } = context.conditions;
  if (reduceMotion) {
    gsap.set(".hero *, .march-card, .paws-grid article, .mist-stack article", { clearProps: "all" });
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    return;
  }

  gsap.to(".scroll-meter span", {
    scaleY: 1,
    ease: "none",
    scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.25 }
  });

  gsap.from(".safety h2, .safety-copy", {
    y: 70,
    autoAlpha: 0,
    duration: 0.9,
    stagger: 0.12,
    scrollTrigger: { trigger: ".safety", start: "top 72%", toggleActions: "play none none reverse" }
  });

  ScrollTrigger.batch(".march-card", {
    start: "top 82%",
    once: true,
    interval: 0.12,
    batchMax: 2,
    onEnter: (cards) => gsap.from(cards, { y: 80, autoAlpha: 0, duration: 0.85, stagger: 0.12, ease: "power3.out", overwrite: true })
  });

  const loopTimeline = gsap.timeline({
    scrollTrigger: { trigger: ".loop", start: "top 70%", end: "bottom 60%", scrub: 0.8 }
  });
  loopTimeline
    .fromTo(".loop-orbit", { rotation: -45, scale: 0.82 }, { rotation: 20, scale: 1, ease: "none" })
    .from(".loop-copy, .loop-times", { x: 60, autoAlpha: 0, stagger: 0.1 }, "<0.1");

  gsap.from(".paws-grid article", {
    y: 90,
    autoAlpha: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: "power3.out",
    scrollTrigger: { trigger: ".paws-grid", start: "top 78%", once: true }
  });

  gsap.from(".mist-stack article", {
    x: desktop ? 80 : 0,
    y: desktop ? 0 : 45,
    autoAlpha: 0,
    duration: 0.75,
    stagger: 0.12,
    scrollTrigger: { trigger: ".mist-stack", start: "top 75%", once: true }
  });

  gsap.from(".final-call h2", {
    scale: 0.75,
    autoAlpha: 0,
    duration: 1,
    ease: "back.out(1.4)",
    scrollTrigger: { trigger: ".final-call", start: "top 70%", once: true }
  });
});

window.addEventListener("load", () => ScrollTrigger.refresh());
