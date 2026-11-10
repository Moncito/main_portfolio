"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, SplitText, useGSAP, EASE, prefersReduced } from "@/lib/gsap";
import { profile } from "@/data";

function ManilaTime() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Manila", hour: "2-digit", minute: "2-digit" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 20000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time} PHT</span>;
}

export { ManilaTime };

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);

  // Size each headline line so it spans the full content width.
  useEffect(() => {
    const fit = () => {
      const wrap = root.current?.querySelector<HTMLElement>(".hero-name");
      if (!wrap) return;
      const els = Array.from(wrap.querySelectorAll<HTMLElement>("[data-fit]"));
      // Width each line needs per pixel of font size.
      const ratios = els.map((el) => {
        el.style.fontSize = "100px";
        return el.getBoundingClientRect().width / 100;
      });
      if (ratios.some((r) => r <= 0)) return;
      const full = wrap.clientWidth;
      // Both lines span the same width; cap it so the pair never outgrows the viewport.
      const heightAt = (w: number) => ratios.reduce((sum, r) => sum + (w / r) * 0.84, 0);
      const maxH = window.innerHeight * (window.innerWidth >= 768 ? 0.44 : 0.34);
      const width = Math.min(full, (full * maxH) / heightAt(full));
      els.forEach((el, i) => {
        el.style.fontSize = `${(width * 0.995) / ratios[i]}px`;
      });
    };
    fit();
    ScrollTrigger.addEventListener("refreshInit", fit);
    return () => ScrollTrigger.removeEventListener("refreshInit", fit);
  }, []);

  useGSAP(
    () => {
      if (prefersReduced()) return;

      if (!ready) {
        gsap.set(".hero-line", { yPercent: 110 });
        gsap.set(".hero-rule", { scaleX: 0 });
        gsap.set(".hero-photo", { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(".hero-photo img", { scale: 1.35 });
        gsap.set(".hero-last", { autoAlpha: 0 });
        return;
      }

      const split = SplitText.create(".hero-last", { type: "chars", mask: "chars" });
      gsap.set(".hero-last", { autoAlpha: 1 });

      gsap
        .timeline({ defaults: { ease: EASE } })
        .from(split.chars, { yPercent: 110, duration: 1.1, stagger: 0.035 }, 0.1)
        .to(".hero-rule", { scaleX: 1, duration: 1.2 }, 0.1)
        .to(".hero-photo", { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3 }, 0.2)
        .to(".hero-photo img", { scale: 1, duration: 1.6 }, 0.2)
        .to(".hero-line", { yPercent: 0, duration: 0.9, stagger: 0.04 }, 0.45);

      gsap.to(".hero-photo img", {
        yPercent: 14,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section
      ref={root}
      id="top"
      data-section="Index"
      className="relative flex min-h-[100svh] flex-col justify-between pb-4 pt-[72px] md:pb-5 md:pt-[104px]"
    >
      <div className="grid-12 meta gap-y-6">
        <div className="col-span-2 md:col-span-3">
          <span className="mask">
            <span className="hero-line block">Portfolio</span>
          </span>
          <span className="mask">
            <span className="hero-line block text-mute">Index 2026</span>
          </span>
        </div>
        <div className="col-span-2 md:col-span-3 md:col-start-5">
          <span className="mask">
            <span className="hero-line block">{profile.role}</span>
          </span>
          <span className="mask">
            <span className="hero-line block text-mute">Web platforms, mobile apps</span>
          </span>
        </div>
        <div className="col-span-2 md:col-span-2 md:col-start-9">
          <span className="mask">
            <span className="hero-line block">{profile.location}</span>
          </span>
          <span className="mask">
            <span className="hero-line block text-mute">
              <ManilaTime />
            </span>
          </span>
        </div>
        <div className="col-span-2 md:col-span-2 md:col-start-11 md:text-right">
          <span className="mask">
            <span className="hero-line flex items-center gap-2 md:justify-end">
              <span className="blink inline-block h-2 w-2 bg-ink" />
              Open to work
            </span>
          </span>
          <span className="mask">
            <span className="hero-line block text-mute">Full time, freelance</span>
          </span>
        </div>
      </div>

      <div className="grid-12 mt-10 flex-1 items-end md:mt-6">
        <p className="col-span-4 mb-8 max-w-[26ch] text-[22px] font-medium leading-[1.1] tracking-[-0.02em] md:col-span-4 md:mb-0 md:text-[clamp(22px,2.1vw,34px)]">
          <span className="mask">
            <span className="hero-line block">I build web platforms</span>
          </span>
          <span className="mask">
            <span className="hero-line block">and mobile apps,</span>
          </span>
          <span className="mask">
            <span className="hero-line block">end to end.</span>
          </span>
        </p>
        <div className="hero-photo relative col-span-2 col-start-3 aspect-[4/5] overflow-hidden bg-ink md:col-span-2 md:col-start-11 md:aspect-auto md:h-[25svh]">
          <Image
            src="/images/pfp.jpg"
            alt="Portrait of Moncito Hernandez"
            fill
            priority
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-cover object-[50%_30%] grayscale"
          />
        </div>
      </div>

      <div className="mt-6 px-[var(--margin)]">
        <div className="hero-rule rule mb-3 md:mb-4" />
        <h1 className="hero-name display" aria-label={`${profile.first} ${profile.last}`}>
          {/* The fixed header wordmark sits exactly on this slot at scroll 0. */}
          <span className="block">
            <span data-hero-slot data-fit aria-hidden className="invisible inline-block whitespace-nowrap">
              {profile.first}
            </span>
          </span>
          <span className="block">
            <span data-fit aria-hidden className="hero-last inline-block whitespace-nowrap">
              {profile.last}
            </span>
          </span>
        </h1>
        <div className="meta mt-3 flex justify-between text-mute">
          <span>(Scroll)</span>
          <span>07 projects / 04 web / 03 mobile</span>
        </div>
      </div>
    </section>
  );
}
