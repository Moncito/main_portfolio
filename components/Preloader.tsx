"use client";
import { useRef } from "react";
import { gsap, useGSAP, EASE, scroller, prefersReduced } from "@/lib/gsap";

const COLS = 12;

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
      const stopId = window.setTimeout(() => scroller.lenis?.stop(), 0);

      const finish = () => {
        scroller.lenis?.start();
        onComplete();
      };

      if (prefersReduced()) {
        gsap.to(root.current, { autoAlpha: 0, duration: 0.3, delay: 0.2, onComplete: finish });
        return () => window.clearTimeout(stopId);
      }

      const state = { v: 0 };
      const cells = gsap.utils.toArray<HTMLElement>(".pre-cell");
      const cols = gsap.utils.toArray<HTMLElement>(".pre-col");

      const tl = gsap.timeline({ onComplete: finish });
      tl.to(state, {
        v: 100,
        duration: 1.9,
        ease: "power2.inOut",
        onUpdate: () => {
          if (count.current) count.current.textContent = String(Math.round(state.v)).padStart(3, "0");
        },
      })
        .to(cells, { scaleY: 1, duration: 0.5, ease: EASE, stagger: { each: 0.045, from: "random" } }, 0.15)
        .to(".pre-ui", { autoAlpha: 0, duration: 0.3 }, ">-0.1")
        .to(cols, { yPercent: -101, duration: 0.95, ease: EASE, stagger: { each: 0.035, from: "center" } }, "<0.05")
        .set(root.current, { display: "none" });

      return () => window.clearTimeout(stopId);
    },
    { scope: root },
  );

  return (
    <div ref={root} className="fixed inset-0 z-[100] text-paper" aria-hidden>
      <div className="absolute inset-0 flex">
        {Array.from({ length: COLS }).map((_, i) => (
          <div key={i} className={`pre-col relative h-full flex-1 bg-ink ${i >= 4 ? "hidden md:block" : ""}`}>
            <div
              className="pre-cell absolute inset-x-0 bg-paper"
              style={{
                top: `${12 + ((i * 37) % 55)}%`,
                height: `${6 + ((i * 53) % 16)}%`,
                transform: "scaleY(0)",
                transformOrigin: i % 2 ? "top" : "bottom",
              }}
            />
          </div>
        ))}
      </div>

      <div className="pre-ui absolute inset-0 flex flex-col justify-between p-4 md:p-5 mix-blend-difference text-white">
        <div className="meta flex justify-between">
          <span>Moncito Hernandez</span>
          <span>Index 2026</span>
        </div>
        <div className="flex items-end justify-between">
          <span ref={count} className="display text-[22vw] md:text-[12vw] tabular-nums">
            000
          </span>
          <span className="meta pb-2">Loading</span>
        </div>
      </div>
    </div>
  );
}
