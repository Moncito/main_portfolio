"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReduced } from "@/lib/gsap";
import { stack } from "@/data";

/** Two rows of the stack. Scroll speed and direction push them around. */
export default function Marquee() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReduced()) return;
      const rows = gsap.utils.toArray<HTMLElement>(".mq-row");
      const loops = rows.map((row, i) =>
        gsap.fromTo(
          row,
          { xPercent: i % 2 ? -50 : 0 },
          { xPercent: i % 2 ? 0 : -50, duration: 28, ease: "none", repeat: -1 },
        ),
      );

      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity();
          const boost = gsap.utils.clamp(-6, 6, v / 250);
          const dir = v < 0 ? -1 : 1;
          loops.forEach((loop) => {
            gsap.to(loop, { timeScale: dir * (1 + Math.abs(boost)), duration: 0.2, overwrite: true });
            gsap.to(loop, { timeScale: dir, duration: 1.2, delay: 0.2 });
          });
        },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="Tools and stack" className="overflow-hidden border-y-[10px] border-ink py-6 md:py-8">
      {stack.map((row, i) => (
        <div key={i} className="mq-row display flex w-max whitespace-nowrap text-[13vw] md:text-[clamp(48px,7.2vw,132px)]">
          {[0, 1].map((dup) => (
            <ul key={dup} className="flex" aria-hidden={dup === 1}>
              {row.map((item, j) => (
                <li key={item} className="flex items-center">
                  <span className={(i + j) % 3 === 0 ? "text-mute" : ""}>{item}</span>
                  <span className="mx-[0.25em] inline-block h-[0.14em] w-[0.14em] bg-ink" aria-hidden />
                </li>
              ))}
            </ul>
          ))}
        </div>
      ))}
    </section>
  );
}
