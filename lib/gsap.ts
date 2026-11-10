import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import type Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, useGSAP);

// One signature curve for every reveal on the site.
CustomEase.create("index", "0.65, 0, 0.1, 1");
export const EASE = "index";

export const MQ = {
  desktop: "(min-width: 768px)",
  mobile: "(max-width: 767px)",
  motion: "(prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
};

// Shared Lenis instance, set by <SmoothScroll />.
export const scroller: { lenis: Lenis | null } = { lenis: null };

export function scrollToTarget(target: string) {
  const el = document.querySelector(target);
  if (!el) return;
  if (scroller.lenis) scroller.lenis.scrollTo(el as HTMLElement, { duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };

export const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia(MQ.reduce).matches;
