"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, EASE, scrollToTarget, scroller, prefersReduced } from "@/lib/gsap";
import { nav, profile } from "@/data";

export function goTo(target: string) {
  // The contact block is a sticky footer, so its anchor is the end of the page.
  if (target === "#contact") {
    if (scroller.lenis) scroller.lenis.scrollTo("bottom", { duration: 1.8 });
    else window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
    return;
  }
  scrollToTarget(target);
}

export default function Header({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const mark = useRef<HTMLAnchorElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const section = useRef<HTMLSpanElement>(null);

  // The wordmark starts as the hero headline and scrubs into the header.
  useGSAP(
    () => {
      const m = mark.current;
      const slot = document.querySelector<HTMLElement>("[data-hero-slot]");
      if (!m || !slot) return;

      const geo = () => {
        const r = slot.getBoundingClientRect();
        return {
          s: r.width / m.offsetWidth,
          dx: r.left - m.offsetLeft,
          dy: r.top + window.scrollY - m.offsetTop,
        };
      };

      gsap.fromTo(
        m,
        { x: () => geo().dx, y: () => geo().dy, scale: () => geo().s },
        {
          x: 0,
          y: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: () => geo().dy, scrub: true, invalidateOnRefresh: true },
        },
      );

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          if (progress.current) progress.current.textContent = String(Math.round(self.progress * 100)).padStart(3, "0");
        },
      });

      // The footer has its own bottom row, so the progress readout steps aside.
      gsap.to(".hd-progress", {
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: { trigger: "#page-end", start: "top bottom", end: "top 70%", scrub: true },
      });

      gsap.utils.toArray<HTMLElement>("[data-section]").forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 50%",
          end: "bottom 50%",
          onToggle: (self) => {
            if (self.isActive && section.current) section.current.textContent = el.dataset.section ?? "";
          },
        });
      });
    },
    { scope: root },
  );

  useGSAP(
    () => {
      if (prefersReduced()) return;
      if (!ready) {
        gsap.set(mark.current, { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(".hd-item", { yPercent: 110 });
        return;
      }
      gsap.to(mark.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: EASE, clearProps: "clipPath" });
      gsap.to(".hd-item", { yPercent: 0, duration: 0.9, ease: EASE, stagger: 0.05, delay: 0.35 });
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <header ref={root} className="pointer-events-none fixed inset-0 z-50 text-white mix-blend-difference">
      <a
        ref={mark}
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          goTo("#top");
        }}
        aria-label={`${profile.first} ${profile.last}, back to top`}
        className="display pointer-events-auto absolute left-[var(--margin)] top-4 origin-top-left whitespace-nowrap text-[26px] will-change-transform md:top-5 md:text-[clamp(30px,3.3vw,56px)]"
      >
        {profile.first}
      </a>

      <nav className="absolute left-1/2 top-5 hidden -translate-x-1/2 md:block" aria-label="Primary">
        <ul className="meta flex gap-7">
          {nav.map((item) => (
            <li key={item.target} className="mask">
              <a
                href={item.target}
                onClick={(e) => {
                  e.preventDefault();
                  goTo(item.target);
                }}
                className="hd-item link-draw pointer-events-auto"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mask absolute right-[var(--margin)] top-4 md:top-5">
        <span className="hd-item display block text-[26px] md:text-[clamp(30px,3.3vw,56px)]">©26</span>
      </div>

      <div className="hd-progress meta absolute bottom-4 left-[var(--margin)] hidden gap-4 md:flex">
        <span className="mask">
          <span ref={progress} className="hd-item block tabular-nums">
            000
          </span>
        </span>
        <span className="mask">
          <span ref={section} className="hd-item block">
            Index
          </span>
        </span>
      </div>
    </header>
  );
}
