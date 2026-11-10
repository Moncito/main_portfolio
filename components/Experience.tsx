"use client";
import { useRef } from "react";
import { gsap, useGSAP, EASE, prefersReduced } from "@/lib/gsap";
import { experience } from "@/data";

export default function Experience() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReduced()) return;

      gsap.from(".xp-head-line", {
        yPercent: 110,
        duration: 1.1,
        ease: EASE,
        stagger: 0.06,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });

      gsap.utils.toArray<HTMLElement>(".xp-row").forEach((row) => {
        gsap
          .timeline({ scrollTrigger: { trigger: row, start: "top 88%" } })
          .from(row.querySelector(".xp-rule"), { scaleX: 0, duration: 1.2, ease: EASE })
          .from(row.querySelectorAll(".xp-line"), { yPercent: 110, duration: 0.9, ease: EASE, stagger: 0.05 }, 0.1)
          .from(row.querySelector(".xp-desc"), { autoAlpha: 0, y: 14, duration: 0.8, ease: EASE }, 0.25);
      });

      // A single marker rides down the list with the scroll.
      gsap.fromTo(
        ".xp-marker",
        { top: "0%" },
        { top: "100%", ease: "none", scrollTrigger: { trigger: ".xp-list", start: "top 60%", end: "bottom 60%", scrub: true } },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} data-section="Experience" className="py-28 md:py-44">
      <div className="grid-12 items-end gap-y-4 pb-8 md:pb-12">
        <div className="meta col-span-4 md:col-span-3">
          <span>(04)</span> <span className="text-mute">Experience</span>
        </div>
        <h2 className="display col-span-4 text-[15vw] md:col-span-9 md:text-[clamp(56px,8vw,150px)]">
          <span className="mask">
            <span className="xp-head-line block">People first,</span>
          </span>
          <span className="mask">
            <span className="xp-head-line block">then code</span>
          </span>
        </h2>
      </div>

      <ol className="xp-list relative px-[var(--margin)]">
        <span className="xp-marker absolute left-[var(--margin)] z-10 hidden h-[10px] w-[10px] -translate-x-[14px] bg-ink md:block" aria-hidden />
        {experience.map((job) => (
          <li key={job.title + job.org} className="xp-row">
            <div className="xp-rule rule-thin" />
            <div className="grid grid-cols-4 gap-x-[var(--gutter)] gap-y-2 py-5 md:grid-cols-12 md:py-6">
              <span className="mask meta col-span-4 text-mute md:col-span-3">
                <span className="xp-line block">{job.period || " "}</span>
              </span>
              <div className="col-span-4 md:col-span-4">
                <span className="mask">
                  <span className="xp-line block text-[22px] font-semibold leading-[1.05] tracking-[-0.025em] md:text-[clamp(20px,1.9vw,30px)]">
                    {job.title}
                  </span>
                </span>
                <span className="mask meta mt-1">
                  <span className="xp-line block">{job.org}</span>
                </span>
              </div>
              <p className="xp-desc col-span-4 max-w-[52ch] text-[15px] leading-[1.4] md:col-span-5 md:col-start-8">{job.desc}</p>
            </div>
          </li>
        ))}
        <li className="rule-thin" aria-hidden />
      </ol>
    </section>
  );
}
