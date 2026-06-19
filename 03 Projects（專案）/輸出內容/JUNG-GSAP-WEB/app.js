gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const mm = gsap.matchMedia();

function introTimeline() {
  return gsap.timeline({ defaults: { ease: "power3.out" } })
    .from(".nav", { y: -76, autoAlpha: 0, duration: .7 })
    .from(".eyebrow", { y: 20, autoAlpha: 0, duration: .5 }, "<.2")
    .from(".hero h1 span", { yPercent: 120, rotation: 2, duration: 1, stagger: .12 }, "<")
    .from(".hero-question", { y: 30, autoAlpha: 0, duration: .7 }, "<.45")
    .from(".psyche", { scale: .82, rotation: -12, autoAlpha: 0, duration: 1.2 }, "<-.2")
    .from(".psyche-labels span", { autoAlpha: 0, x: -12, stagger: .1, duration: .35 }, "<.5");
}

let intro = reduceMotion ? null : introTimeline();
document.querySelector(".replay").addEventListener("click", () => intro?.restart());

mm.add({ desktop: "(min-width: 851px)", mobile: "(max-width: 850px)", reduced: "(prefers-reduced-motion: reduce)" }, ({ conditions }) => {
  const { desktop, reduced } = conditions;
  if (reduced) return;

  gsap.to(".progress i", { scaleX: 1, ease: "none", scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: .2 } });

  gsap.to(".o1", { rotation: 360, svgOrigin: "300 300", duration: 30, repeat: -1, ease: "none" });
  gsap.to(".o2", { rotation: -360, svgOrigin: "300 300", duration: 24, repeat: -1, ease: "none" });
  gsap.to(".self", { scale: 1.18, transformOrigin: "center", duration: 1.4, repeat: -1, yoyo: true, ease: "sine.inOut" });

  gsap.from(".now h2, .now-copy", { y: 75, autoAlpha: 0, stagger: .12, duration: .9, scrollTrigger: { trigger: ".now", start: "top 72%", once: true } });
  gsap.from(".lens-row > *", { y: 25, autoAlpha: 0, stagger: .08, duration: .55, scrollTrigger: { trigger: ".lens-row", start: "top 84%", once: true } });

  if (desktop) {
    const track = document.querySelector(".journey-track");
    gsap.to(track, { x: () => -(track.scrollWidth - window.innerWidth * .58), ease: "none", scrollTrigger: { trigger: ".journey", start: "top top", end: "bottom bottom", scrub: .8, invalidateOnRefresh: true } });
  } else {
    gsap.to(".journey-track", { x: () => -(document.querySelector(".journey-track").scrollWidth - window.innerWidth * .9), ease: "none", scrollTrigger: { trigger: ".journey", start: "top top", end: "bottom bottom", scrub: .6, invalidateOnRefresh: true } });
  }

  document.querySelectorAll(".chapter-head").forEach(head => gsap.from(head.children, { y: 55, autoAlpha: 0, stagger: .12, duration: .8, scrollTrigger: { trigger: head, start: "top 76%", once: true } }));
  gsap.from(".sun", { scale: .45, rotation: -25, autoAlpha: 0, duration: 1.1, ease: "back.out(1.3)", scrollTrigger: { trigger: ".midday", start: "top 70%", once: true } });
  gsap.to(".sun", { yPercent: -12, ease: "none", scrollTrigger: { trigger: ".midday", start: "top bottom", end: "bottom top", scrub: .8 } });
  gsap.from(".versus article", { y: 80, autoAlpha: 0, stagger: .2, duration: .9, scrollTrigger: { trigger: ".versus", start: "top 76%", once: true } });

  const letterTl = gsap.timeline({ scrollTrigger: { trigger: ".dream-intro", start: "top 68%", once: true } });
  letterTl.from(".dream-intro h2", { y: 70, autoAlpha: 0, duration: .9 }).from(".letter", { rotationY: 80, autoAlpha: 0, duration: 1 }, "<.15");

  gsap.from(".ice", { scale: .6, autoAlpha: 0, stagger: .13, duration: .8, ease: "back.out(1.35)", scrollTrigger: { trigger: ".iceberg", start: "top 72%", once: true } });
  ScrollTrigger.batch(".dream-process li", { start: "top 85%", once: true, onEnter: items => gsap.from(items, { y: 45, autoAlpha: 0, stagger: .08, duration: .65, overwrite: true }) });
  gsap.from(".family-tree article", { y: 50, autoAlpha: 0, stagger: .15, duration: .75, scrollTrigger: { trigger: ".family-tree", start: "top 75%", once: true } });
  gsap.from(".acceptance > div", { x: (_, el) => el.classList.contains("not") ? -55 : 55, autoAlpha: 0, stagger: .15, duration: .85, scrollTrigger: { trigger: ".acceptance", start: "top 75%", once: true } });
  gsap.to(".mandala", { rotation: 90, scale: 1.1, ease: "none", scrollTrigger: { trigger: ".integration", start: "top bottom", end: "bottom top", scrub: 1 } });
  gsap.from(".integration h2, .questions p", { y: 55, autoAlpha: 0, stagger: .12, duration: .8, scrollTrigger: { trigger: ".integration", start: "top 65%", once: true } });
});

if (!reduceMotion && window.matchMedia("(pointer:fine)").matches) {
  const xTo = gsap.quickTo(".cursor-orbit", "x", { duration: .35, ease: "power3" });
  const yTo = gsap.quickTo(".cursor-orbit", "y", { duration: .35, ease: "power3" });
  window.addEventListener("pointermove", event => { xTo(event.clientX - 17); yTo(event.clientY - 17); });
}

window.addEventListener("load", () => ScrollTrigger.refresh());
