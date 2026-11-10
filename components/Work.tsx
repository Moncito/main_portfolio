"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, EASE, MQ, prefersReduced } from "@/lib/gsap";
import { webProjects } from "@/data";
import Magnetic from "./Magnetic";

export default function Work() {
  const root = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);

  // Index list: an image preview that trails the pointer.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`(hover: hover) and (pointer: fine) and ${MQ.desktop}`, () => {
        const box = preview.current;
        if (!box) return;
        const imgs = gsap.utils.toArray<HTMLElement>(".pv-img", box);
        gsap.set(box, { xPercent: -50, yPercent: -50, scale: 0.6, autoAlpha: 0 });
        const x = gsap.quickTo(box, "x", { duration: 0.6, ease: "power3" });
        const y = gsap.quickTo(box, "y", { duration: 0.6, ease: "power3" });
        const skew = gsap.quickTo(box, "skewX", { duration: 0.5, ease: "power3" });
        let lastX = 0;

        const list = root.current?.querySelector<HTMLElement>(".wk-list");
        const rows = gsap.utils.toArray<HTMLElement>(".wk-row", root.current);
        if (!list) return;

        const onMove = (e: MouseEvent) => {
          x(e.clientX);
          y(e.clientY);
          skew(gsap.utils.clamp(-12, 12, (e.clientX - lastX) * 0.6));
          lastX = e.clientX;
        };
        const onEnterList = () => gsap.to(box, { autoAlpha: 1, scale: 1, duration: 0.5, ease: EASE });
        const onLeaveList = () => {
          gsap.to(box, { autoAlpha: 0, scale: 0.6, duration: 0.4, ease: EASE });
          gsap.to(rows, { opacity: 1, duration: 0.3 });
          skew(0);
        };
        const enters = rows.map((row, i) => () => {
          gsap.to(rows, { opacity: (j) => (j === i ? 1 : 0.25), duration: 0.3, overwrite: "auto" });
          gsap.to(imgs, { autoAlpha: (j) => (j === i ? 1 : 0), duration: 0.35, overwrite: "auto" });
        });

        list.addEventListener("mousemove", onMove);
        list.addEventListener("mouseenter", onEnterList);
        list.addEventListener("mouseleave", onLeaveList);
        rows.forEach((row, i) => row.addEventListener("mouseenter", enters[i]));
        return () => {
          list.removeEventListener("mousemove", onMove);
          list.removeEventListener("mouseenter", onEnterList);
          list.removeEventListener("mouseleave", onLeaveList);
          rows.forEach((row, i) => row.removeEventListener("mouseenter", enters[i]));
        };
      });
    },
    { scope: root },
  );

  // Reveals and the sticky panel stack.
  useGSAP(
    () => {
      if (prefersReduced()) return;

      gsap.from(".wk-head-line", {
        yPercent: 110,
        duration: 1.1,
        ease: EASE,
        stagger: 0.06,
        scrollTrigger: { trigger: ".wk-head", start: "top 80%" },
      });

      gsap.utils.toArray<HTMLElement>(".wk-row").forEach((row) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 90%" } });
        tl.from(row.querySelector(".wk-row-rule"), { scaleX: 0, duration: 1.1, ease: EASE }).from(
          row.querySelectorAll(".wk-row-line"),
          { yPercent: 110, duration: 0.9, ease: EASE, stagger: 0.04 },
          0.1,
        );
      });

      const panels = gsap.utils.toArray<HTMLElement>(".wk-panel");
      panels.forEach((panel, i) => {
        const media = panel.querySelector(".wk-media");
        const img = panel.querySelector(".wk-media img");

        gsap.fromTo(
          media,
          { clipPath: "inset(14% 10% 14% 10%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: { trigger: panel, start: "top bottom", end: "top top", scrub: true },
          },
        );
        gsap.fromTo(
          img,
          { scale: 1.25 },
          { scale: 1, ease: "none", scrollTrigger: { trigger: panel, start: "top bottom", end: "top top", scrub: true } },
        );

        gsap
          .timeline({ scrollTrigger: { trigger: panel, start: "top 45%" } })
          .from(panel.querySelector(".wk-rule"), { scaleX: 0, duration: 1.2, ease: EASE })
          .from(panel.querySelectorAll(".wk-line"), { yPercent: 110, duration: 1, ease: EASE, stagger: 0.05 }, 0.1);

        // The panel underneath recedes as the next one slides over it.
        const next = panels[i + 1];
        if (next) {
          gsap.to(panel.querySelector(".wk-inner"), {
            scale: 0.93,
            opacity: 0.35,
            ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true },
          });
        }
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="work" data-section="Web work">
      <div className="wk-head grid-12 items-end gap-y-4 pb-8 md:pb-12">
        <div className="meta col-span-4 md:col-span-3">
          <span>(02)</span> <span className="text-mute">Selected work, web</span>
        </div>
        <h2 className="display col-span-4 text-[17vw] md:col-span-9 md:text-[clamp(64px,10.5vw,190px)]">
          <span className="mask">
            <span className="wk-head-line block">Web</span>
          </span>
          <span className="mask">
            <span className="wk-head-line block">Platforms</span>
          </span>
        </h2>
      </div>

      <ul className="wk-list px-[var(--margin)]">
        {webProjects.map((p) => (
          <li key={p.no} className="wk-row">
            <div className="wk-row-rule rule" />
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Visit"
              className="grid grid-cols-4 gap-x-[var(--gutter)] py-4 md:grid-cols-12 md:py-5"
            >
              <span className="mask meta col-span-1">
                <span className="wk-row-line block">{p.no}</span>
              </span>
              <span className="mask col-span-3 md:col-span-5 md:col-start-4">
                <span className="wk-row-line block text-[28px] font-semibold leading-none tracking-[-0.03em] md:text-[clamp(28px,3.2vw,54px)]">
                  {p.title}
                </span>
              </span>
              <span className="mask meta col-span-2 col-start-2 mt-2 md:col-span-2 md:col-start-9 md:mt-0">
                <span className="wk-row-line block">{p.kind}</span>
              </span>
              <span className="mask meta col-span-2 mt-2 text-mute md:col-span-2 md:col-start-11 md:mt-0 md:text-right">
                <span className="wk-row-line block">{p.role}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div
        ref={preview}
        aria-hidden
        className="pointer-events-none invisible fixed left-0 top-0 z-30 hidden aspect-[16/10] w-[26vw] overflow-hidden bg-ink md:block"
      >
        {webProjects.map((p) => (
          <div key={p.no} className="pv-img invisible absolute inset-0">
            <Image src={p.image} alt="" fill sizes="26vw" className="object-cover object-top" />
          </div>
        ))}
      </div>

      <div className="mt-24 md:mt-40">
        {webProjects.map((p) => (
          <article key={p.no} className="wk-panel sticky top-0 h-[100svh] overflow-hidden bg-paper">
            <div className="wk-inner flex h-full origin-top flex-col px-[var(--margin)] pb-4 pt-[68px] md:pb-5 md:pt-[92px]">
              <div className="wk-rule rule" />
              <div className="grid flex-1 grid-cols-4 gap-x-[var(--gutter)] gap-y-4 pt-3 md:grid-cols-12 md:pt-4">
                <div className="col-span-4 flex flex-col md:col-span-4">
                  <div className="meta flex justify-between md:block">
                    <span className="mask">
                      <span className="wk-line block">{p.no} / 04</span>
                    </span>
                    <span className="mask">
                      <span className="wk-line block text-mute">{p.kind}</span>
                    </span>
                  </div>
                  <h3 className="display mt-3 text-[13vw] md:mt-8 md:text-[clamp(40px,5.2vw,92px)]">
                    {p.title.split(" ").map((w) => (
                      <span key={w} className="mask">
                        <span className="wk-line block">{w}</span>
                      </span>
                    ))}
                  </h3>
                  <p className="mt-4 max-w-[38ch] text-[15px] leading-[1.35] md:mt-auto md:text-[17px]">{p.summary}</p>
                  <ul className="meta mt-4 hidden text-mute md:block">
                    {p.points.map((pt) => (
                      <li key={pt} className="border-t border-ink/15 py-1.5">
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 md:mt-6">
                    <Magnetic>
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="meta inline-flex items-center gap-3 bg-ink px-4 py-3 text-paper transition-colors duration-300 hover:bg-accent hover:text-ink"
                      >
                        Visit {p.host} <span aria-hidden>↗</span>
                      </a>
                    </Magnetic>
                  </div>
                </div>

                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="Visit"
                  aria-label={`Open ${p.title}`}
                  className="wk-media relative col-span-4 min-h-[34svh] overflow-hidden bg-ink md:col-span-8 md:col-start-5 md:min-h-0"
                >
                  <Image
                    src={p.image}
                    alt={`${p.title} home page`}
                    fill
                    sizes="(min-width: 768px) 66vw, 100vw"
                    className="object-cover object-left-top"
                  />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
