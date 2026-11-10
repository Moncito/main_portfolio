"use client";
import { useRef, useState } from "react";
import { gsap, SplitText, useGSAP, EASE, prefersReduced } from "@/lib/gsap";
import { profile } from "@/data";
import { goTo } from "./Header";
import { ManilaTime } from "./Hero";
import Magnetic from "./Magnetic";

/** Sticky footer. The page above lifts like a curtain to uncover it. */
export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      if (prefersReduced()) return;
      const split = SplitText.create(".ct-title", { type: "words,chars", mask: "chars" });
      const trigger = { trigger: "#page-end", start: "top 55%" };

      gsap.from(split.chars, { yPercent: 110, duration: 1.1, ease: EASE, stagger: 0.03, scrollTrigger: trigger });
      gsap.from(".ct-line", { yPercent: 110, duration: 0.9, ease: EASE, stagger: 0.04, delay: 0.2, scrollTrigger: trigger });
      gsap.from(".ct-rule", { scaleX: 0, duration: 1.3, ease: EASE, scrollTrigger: trigger });

      // Slight lift so the footer feels deeper than the page leaving it.
      gsap.fromTo(
        ".ct-inner",
        { yPercent: -18 },
        { yPercent: 0, ease: "none", scrollTrigger: { trigger: "#page-end", start: "top bottom", end: "top top", scrub: true } },
      );
    },
    { scope: root },
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const links = [
    { label: "LinkedIn", href: profile.linkedin },
    { label: "GitHub", href: profile.github },
    { label: "Resume", href: profile.resume },
  ];

  return (
    <footer ref={root} id="contact" className="sticky bottom-0 z-0 h-[100svh] overflow-hidden bg-ink text-paper">
      <div className="ct-inner flex h-full flex-col justify-between px-[var(--margin)] pb-4 pt-[72px] md:pb-5 md:pt-[104px]">
        <div className="meta grid grid-cols-4 gap-x-[var(--gutter)] md:grid-cols-12">
          <span className="mask col-span-2 md:col-span-3">
            <span className="ct-line block">(05) Contact</span>
          </span>
          <span className="mask col-span-2 opacity-60 md:col-span-4 md:col-start-5">
            <span className="ct-line block">Open to full time roles and freelance projects</span>
          </span>
        </div>

        <div>
          <h2 className="ct-title display whitespace-nowrap text-[17vw] md:text-[17.6vw]">Let&rsquo;s talk</h2>
          <div className="ct-rule rule mt-3 bg-accent text-accent md:mt-5" />

          <div className="mt-5 grid grid-cols-4 items-end gap-x-[var(--gutter)] gap-y-6 md:mt-7 md:grid-cols-12">
            <div className="col-span-4 md:col-span-7">
              <Magnetic strength={0.15}>
                <button
                  type="button"
                  onClick={copy}
                  data-cursor={copied ? "Copied" : "Copy"}
                  aria-label={`Copy email address ${profile.email}`}
                  className="text-left text-[6.2vw] font-medium leading-[1.2] tracking-[-0.03em] md:text-[clamp(24px,3.1vw,54px)]"
                >
                  <span className="mask">
                    <span className="ct-line link-draw block">{profile.email}</span>
                  </span>
                </button>
              </Magnetic>
              <p className="meta mt-2 opacity-60" aria-live="polite">
                {copied ? "Copied to clipboard" : "Click to copy"}
              </p>
            </div>

            <ul className="meta col-span-4 flex gap-6 md:col-span-5 md:justify-end">
              {links.map((l) => (
                <li key={l.label} className="mask">
                  <Magnetic>
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="ct-line link-draw block py-1">
                      {l.label} ↗
                    </a>
                  </Magnetic>
                </li>
              ))}
            </ul>
          </div>

          <div className="meta mt-8 flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-paper/20 pt-3 opacity-70 md:mt-12">
            <span>© 2026 Moncito Hernandez</span>
            <span>
              {profile.location}, <ManilaTime />
            </span>
            <span className="hidden md:inline">Press G for the grid</span>
            <button type="button" onClick={() => goTo("#top")} className="link-draw meta">
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
