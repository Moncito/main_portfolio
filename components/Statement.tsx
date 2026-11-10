"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP, EASE, prefersReduced } from "@/lib/gsap";
import { statement, facts } from "@/data";

export default function Statement() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReduced()) return;

      const split = SplitText.create(".st-text", { type: "words" });
      gsap.fromTo(
        split.words,
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.08,
          scrollTrigger: { trigger: ".st-text", start: "top 78%", end: "bottom 45%", scrub: true },
        },
      );

      gsap.from(".st-rule", {
        scaleX: 0,
        duration: 1.2,
        ease: EASE,
        stagger: 0.08,
        scrollTrigger: { trigger: ".st-facts", start: "top 85%" },
      });

      gsap.utils.toArray<HTMLElement>(".st-num").forEach((el) => {
        const target = Number(el.dataset.value);
        const pad = Number(el.dataset.pad);
        const state = { v: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: () =>
            gsap.to(state, {
              v: target,
              duration: 1.6,
              ease: "power3.out",
              onUpdate: () => {
                el.textContent = String(Math.round(state.v)).padStart(pad, "0");
              },
            }),
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="about" data-section="About" className="py-28 md:py-44">
      <div className="grid-12 gap-y-8">
        <div className="meta col-span-4 md:col-span-3">
          <span>(01)</span> <span className="text-mute">About</span>
        </div>
        <p className="st-text col-span-4 text-[30px] font-medium leading-[1.04] tracking-[-0.03em] md:col-span-9 md:text-[clamp(34px,4.3vw,72px)]">
          {statement}
        </p>
      </div>

      <div className="st-facts grid-12 mt-20 gap-y-10 md:mt-32">
        {facts.map((f, i) => (
          <div key={f.label} className={`col-span-4 md:col-span-3 ${i === 0 ? "md:col-start-4" : ""}`}>
            <div className="st-rule rule-thin mb-4" />
            <div className="display text-[18vw] md:text-[clamp(48px,6.2vw,104px)]">
              <span className="st-num tabular-nums" data-value={f.value} data-pad={f.pad}>
                {String(f.value).padStart(f.pad, "0")}
              </span>
              {f.suffix}
            </div>
            <p className="meta mt-3 text-mute">{f.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
