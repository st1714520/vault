gsap.registerPlugin(ScrollTrigger);
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const mm = gsap.matchMedia();

function makeIntro(){return gsap.timeline({defaults:{ease:"power3.out"}}).from(".nav",{y:-78,autoAlpha:0,duration:.7}).from(".kicker",{y:20,autoAlpha:0,duration:.45},"<.2").from(".hero h1 span",{yPercent:110,duration:.9,stagger:.11},"<").from(".subtitle,.hero-rule",{y:30,autoAlpha:0,duration:.65,stagger:.1},"<.35").from(".hero-image",{xPercent:18,autoAlpha:0,duration:1},"<-.35").from(".hero-image img",{scale:1.18,duration:1.2},"<")}
let intro=reduceMotion?null:makeIntro();document.querySelector(".replay").addEventListener("click",()=>intro?.restart());

mm.add({desktop:"(min-width:851px)",mobile:"(max-width:850px)",reduced:"(prefers-reduced-motion:reduce)"},({conditions})=>{if(conditions.reduced)return;
  gsap.to(".meter i",{scaleX:1,ease:"none",scrollTrigger:{trigger:document.documentElement,start:"top top",end:"bottom bottom",scrub:.2}});
  gsap.from(".why h2,.why-copy",{y:70,autoAlpha:0,stagger:.12,duration:.85,scrollTrigger:{trigger:".why",start:"top 72%",once:true}});
  gsap.from(".share-bars > div",{x:70,autoAlpha:0,stagger:.09,duration:.65,scrollTrigger:{trigger:".rescue-share",start:"top 76%",once:true}});
  ScrollTrigger.batch(".hazard-grid article",{start:"top 82%",once:true,onEnter:els=>gsap.from(els,{y:60,autoAlpha:0,stagger:.1,duration:.7,overwrite:true})});
  gsap.from(".scope-board article",{rotationY:25,x:55,autoAlpha:0,stagger:.15,duration:.85,scrollTrigger:{trigger:".scope-board",start:"top 75%",once:true}});
  const steps=document.querySelector(".steps");gsap.to(steps,{x:()=>-(steps.scrollWidth-innerWidth*(conditions.desktop?.6:.9)),ease:"none",scrollTrigger:{trigger:".assess",start:"top top",end:"bottom bottom",scrub:.8,invalidateOnRefresh:true}});
  gsap.from(".damage-grid article",{y:70,autoAlpha:0,stagger:.13,duration:.8,scrollTrigger:{trigger:".damage-grid",start:"top 78%",once:true}});
  gsap.from(".team-image img",{scale:1.18,duration:1.3,ease:"power2.out",scrollTrigger:{trigger:".team-image",start:"top 72%",once:true}});
  gsap.to(".team-image img",{yPercent:8,ease:"none",scrollTrigger:{trigger:".team-image",start:"top bottom",end:"bottom top",scrub:.8}});
  gsap.from(".fema-mark",{rotation:8,scale:.75,autoAlpha:0,duration:1,ease:"back.out(1.2)",scrollTrigger:{trigger:".marks",start:"top 70%",once:true}});
  gsap.from(".search-rules article",{y:55,autoAlpha:0,stagger:.1,duration:.7,scrollTrigger:{trigger:".search-rules",start:"top 82%",once:true}});
  gsap.from(".collapse figure",{x:80,autoAlpha:0,duration:.9,scrollTrigger:{trigger:".collapse",start:"top 72%",once:true}});
  gsap.from(".triangulation .p",{scale:0,stagger:.16,duration:.55,ease:"back.out(1.6)",scrollTrigger:{trigger:".locate",start:"top 70%",once:true}});
  gsap.to(".triangulation b",{scale:1.25,duration:.9,repeat:-1,yoyo:true,ease:"sine.inOut"});
  gsap.from(".lever em",{scaleX:0,transformOrigin:"left",duration:.9,scrollTrigger:{trigger:".cribbing",start:"top 76%",once:true}});
  gsap.from(".wood i",{scaleX:0,stagger:.08,duration:.5,scrollTrigger:{trigger:".crib-types",start:"top 76%",once:true}});
  gsap.from(".carry-grid article",{y:55,autoAlpha:0,stagger:.08,duration:.65,scrollTrigger:{trigger:".carry-grid",start:"top 82%",once:true}});
  gsap.from(".final-copy > *",{y:50,autoAlpha:0,stagger:.12,duration:.75,scrollTrigger:{trigger:".final",start:"top 68%",once:true}});
});
addEventListener("load",()=>ScrollTrigger.refresh());
