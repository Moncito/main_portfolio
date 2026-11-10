"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, EASE, MQ } from "@/lib/gsap";
import { appProjects, type AppProject } from "@/data";
import Magnetic from "./Magnetic";

function Phone({ app }: { app: AppProject }) {
  const visible = 100 - app.crop.top - app.crop.bottom;
  return (
    <div
      className="app-phone relative h-[58svh] max-h-[620px] rounded-[2.4rem] bg-black p-[9px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)] md:h-[68svh] md:max-h-[720px]"
      style={{ aspectRatio: String(app.aspect) }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[1.85rem] bg-black">
        <div
          className="absolute inset-x-0"
          style={{ height: `${(100 / visible) * 100}%`, top: `${-(app.crop.top / visible) * 100}%` }}
        >
          <Image
            src={app.screen}
            alt={`${app.title} app screen`}
            fill
            sizes="(min-width: 768px) 30vw, 70vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

/** Taglish in, structured job out. Mirrors what the on-device model does. */
function TrabaFlow({ accent }: { accent: string }) {
  const rows = [
    ["Service", "Electrician"],
    ["Task", "Sparking outlet"],
    ["Urgency", "Emergency"],
    ["Hazard", "Electrical, keep clear"],
  ];
  return (
    <div className="w-full max-w-[340px]">
      <p className="meta mb-3 opacity-60">Input, Taglish</p>
      <p className="app-fx rounded-2xl rounded-bl-sm bg-white px-4 py-3 text-[15px] leading-snug text-black">
        Ayaw gumana ng saksakan sa kusina, nag-spark kanina
      </p>
      <div className="app-fx my-4 flex items-center gap-3">
        <span className="h-px flex-1 bg-current opacity-30" />
        <span className="meta">On-device model</span>
        <span className="h-px flex-1 bg-current opacity-30" />
      </div>
      <div className="app-fx border border-white/25">
        <p className="meta px-4 py-2 text-black" style={{ background: accent }}>
          Booking card
        </p>
        {rows.map(([k, v]) => (
          <p key={k} className="meta flex justify-between border-t border-white/15 px-4 py-2">
            <span className="opacity-60">{k}</span>
            <span>{v}</span>
          </p>
        ))}
      </div>
      <p className="app-fx meta mt-4 flex items-center gap-2">
        <span className="blink inline-block h-2 w-2" style={{ background: accent }} />
        Airplane mode on, still working
      </p>
    </div>
  );
}

/** The daily log grid Groove builds as you check habits off. */
function GrooveGrid({ accent }: { accent: string }) {
  const weeks = 16;
  const cells = Array.from({ length: weeks * 7 }, (_, i) => ((i * 7919 + (i % 7) * 31) % 11) % 5);
  const habits = ["Running", "Reading", "Development"];
  return (
    <div className="w-full max-w-[380px]">
      <p className="meta mb-3 opacity-60">Daily log, last 16 weeks</p>
      <div className="grid grid-flow-col grid-rows-7 gap-[4px]" style={{ gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))` }}>
        {cells.map((level, i) => (
          <span
            key={i}
            className="app-cell aspect-square"
            style={{ background: level === 0 ? "rgba(18,16,12,0.08)" : accent, opacity: level === 0 ? 1 : 0.25 + level * 0.1875 }}
          />
        ))}
      </div>
      <ul className="mt-5">
        {habits.map((h, i) => (
          <li key={h} className="app-fx meta flex justify-between border-t border-black/15 py-2">
            <span>{h}</span>
            <span className="opacity-60">{[12, 5, 31][i]} day streak</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LuwasPlan({ accent }: { accent: string }) {
  const stops = [
    ["Day 01", "El Nido, Palawan", "Adventure"],
    ["Day 03", "Baguio City, Benguet", "Cool climate"],
    ["Day 05", "General Luna, Siargao", "Surf"],
  ];
  return (
    <div className="w-full max-w-[340px]">
      <p className="meta mb-3 opacity-60">Itinerary</p>
      {stops.map(([day, place, tag]) => (
        <div key={day} className="app-fx border-t border-white/20 py-3">
          <p className="meta flex justify-between">
            <span className="opacity-60">{day}</span>
            <span style={{ color: accent }}>{tag}</span>
          </p>
          <p className="mt-1 text-[20px] font-medium leading-tight tracking-[-0.02em]">{place}</p>
        </div>
      ))}
      <p className="app-fx meta mt-2 border-t border-white/20 pt-3 opacity-60">Chat support, weather, reviews</p>
    </div>
  );
}

export default function Apps() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: vertical scroll drives a pinned horizontal track.
      mm.add(`${MQ.desktop} and ${MQ.motion}`, () => {
        const el = track.current;
        if (!el) return;
        const distance = () => el.scrollWidth - window.innerWidth;

        const scrollTween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            pin: true,
            scrub: 0.6,
            start: "top top",
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        gsap.utils.toArray<HTMLElement>(".app-panel").forEach((panel) => {
          gsap.fromTo(
            panel.querySelector(".app-phone"),
            { yPercent: 16, rotate: 4 },
            {
              yPercent: -6,
              rotate: -2,
              ease: "none",
              scrollTrigger: { trigger: panel, containerAnimation: scrollTween, start: "left right", end: "right left", scrub: true },
            },
          );
          gsap
            .timeline({ scrollTrigger: { trigger: panel, containerAnimation: scrollTween, start: "left 55%" } })
            .from(panel.querySelectorAll(".app-line"), { yPercent: 110, duration: 1, ease: EASE, stagger: 0.05 })
            .from(panel.querySelectorAll(".app-fx"), { y: 24, autoAlpha: 0, duration: 0.8, ease: EASE, stagger: 0.07 }, 0.2)
            .from(
              panel.querySelectorAll(".app-cell"),
              { scale: 0, duration: 0.5, ease: EASE, stagger: { each: 0.006, from: "start" } },
              0.2,
            );
        });
      });

      // Mobile: panels stack and reveal on enter.
      mm.add(`${MQ.mobile} and ${MQ.motion}`, () => {
        gsap.utils.toArray<HTMLElement>(".app-panel").forEach((panel) => {
          gsap
            .timeline({ scrollTrigger: { trigger: panel, start: "top 65%" } })
            .from(panel.querySelectorAll(".app-line"), { yPercent: 110, duration: 1, ease: EASE, stagger: 0.05 })
            .from(panel.querySelector(".app-phone"), { y: 60, autoAlpha: 0, duration: 1, ease: EASE }, 0.1)
            .from(panel.querySelectorAll(".app-fx"), { y: 24, autoAlpha: 0, duration: 0.8, ease: EASE, stagger: 0.07 }, 0.3);
        });
      });

      mm.add(MQ.motion, () => {
        gsap.from(".app-intro-line", {
          yPercent: 110,
          duration: 1.1,
          ease: EASE,
          stagger: 0.06,
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="apps" data-section="Mobile apps" className="relative z-10 overflow-hidden bg-ink text-paper">
      <div ref={track} className="flex flex-col md:h-[100svh] md:w-max md:flex-row">
        <div className="flex shrink-0 flex-col justify-between px-[var(--margin)] pb-10 pt-28 md:h-full md:w-[62vw] md:pb-5 md:pt-[104px]">
          <div className="meta">
            <span>(03)</span> <span className="opacity-60">Selected work, mobile</span>
          </div>
          <div>
            <h2 className="display text-[17vw] md:text-[clamp(64px,10.5vw,190px)]">
              <span className="mask">
                <span className="app-intro-line block">Mobile</span>
              </span>
              <span className="mask">
                <span className="app-intro-line block">Apps</span>
              </span>
            </h2>
            <p className="mt-6 max-w-[34ch] text-[17px] leading-[1.3] opacity-80 md:text-[20px]">
              Three apps built with React Native and Expo. One of them runs its AI entirely on the phone.
            </p>
            <p className="meta mt-8 hidden opacity-60 md:block">Keep scrolling →</p>
          </div>
        </div>

        {appProjects.map((app) => (
          <article
            key={app.slug}
            className="app-panel relative flex shrink-0 flex-col gap-10 px-[var(--margin)] py-16 md:h-full md:w-[100vw] md:flex-row md:items-center md:gap-[4vw] md:px-[5vw] md:py-0"
            style={{ background: app.theme.bg, color: app.theme.fg }}
          >
            <div className="md:w-[34%]">
              <p className="meta flex gap-4">
                <span>{app.no} / 07</span>
                <span className="opacity-60">{app.kind}</span>
              </p>
              <h3 className="display mt-4 text-[15vw] md:text-[clamp(44px,6vw,108px)]">
                <span className="mask">
                  <span className="app-line block">{app.title}</span>
                </span>
              </h3>
              <p className="mt-5 max-w-[40ch] text-[16px] leading-[1.35] md:text-[18px]">{app.summary}</p>
              {app.note && (
                <p className="meta mt-4 inline-block px-2 py-1 text-black" style={{ background: app.theme.accent }}>
                  {app.note}
                </p>
              )}
              <ul className="meta mt-6 flex flex-wrap gap-x-4 gap-y-1 opacity-70">
                {app.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <div className="mt-7">
                <Magnetic>
                  <a
                    href={app.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="meta inline-flex items-center gap-3 border border-current px-4 py-3 transition-opacity duration-300 hover:opacity-60"
                  >
                    View on GitHub <span aria-hidden>↗</span>
                  </a>
                </Magnetic>
              </div>
            </div>

            <div className="flex justify-center md:w-[30%]">
              <Phone app={app} />
            </div>

            <div className="flex justify-start md:w-[30%] md:justify-center">
              {app.slug === "trabawho" && <TrabaFlow accent={app.theme.accent} />}
              {app.slug === "groove" && <GrooveGrid accent={app.theme.accent} />}
              {app.slug === "luwas" && <LuwasPlan accent={app.theme.accent} />}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
