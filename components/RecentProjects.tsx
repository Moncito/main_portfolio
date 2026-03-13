"use client";
import React, { useEffect, useRef } from "react";
import { projects } from "@/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#d9ff3f";

const RecentProjects = () => {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const headRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapRef.current || !stripRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const wrap  = wrapRef.current!;
      const strip = stripRef.current!;
      const cards = gsap.utils.toArray<HTMLElement>(".rp-card", strip);
      const totalCards = cards.length;
      const cardAnimated: boolean[] = new Array(totalCards).fill(false);

      // Set initial states for card content
      cards.forEach((card) => {
        const num   = card.querySelector(".rp-num") as HTMLElement;
        const img   = card.querySelector(".rp-img-wrap") as HTMLElement;
        const meta  = card.querySelector(".rp-meta") as HTMLElement;
        const rule  = card.querySelector(".rp-rule") as HTMLElement;
        const tags  = gsap.utils.toArray<HTMLElement>(".rp-tag", card);
        const cta   = card.querySelector(".rp-cta") as HTMLElement;
        const noise = card.querySelector(".rp-noise") as HTMLElement;

        if (num)  gsap.set(num,  { y: 60, opacity: 0 });
        if (img)  gsap.set(img,  { scaleY: 0, transformOrigin: "bottom center" });
        if (meta) gsap.set(meta, { y: 40, opacity: 0 });
        if (rule) gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });
        if (tags.length) gsap.set(tags, { x: -20, opacity: 0 });
        if (cta)  gsap.set(cta,  { x: -30, opacity: 0 });
        if (noise) gsap.set(noise, { opacity: 0 });
      });

      /*
       * Horizontal scroll: pin the wrapper, scrub the strip.
       * GSAP's pin:true on the trigger (wrap) creates a pin-spacer
       * that takes up the full scroll runway in document flow,
       * pushing Clients/Experience below correctly.
       */
      gsap.to(strip, {
        x: () => -(strip.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => `+=${strip.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate(self) {
            // Per-card entrance (fires once per card)
            cards.forEach((card, i) => {
              if (cardAnimated[i]) return;
              const threshold = i === 0 ? 0.01 : (i / totalCards);
              if (self.progress >= threshold) {
                cardAnimated[i] = true;
                const num   = card.querySelector(".rp-num") as HTMLElement;
                const img   = card.querySelector(".rp-img-wrap") as HTMLElement;
                const meta  = card.querySelector(".rp-meta") as HTMLElement;
                const rule  = card.querySelector(".rp-rule") as HTMLElement;
                const tags  = gsap.utils.toArray<HTMLElement>(".rp-tag", card);
                const cta   = card.querySelector(".rp-cta") as HTMLElement;
                const noise = card.querySelector(".rp-noise") as HTMLElement;

                const tl = gsap.timeline();
                if (num)  tl.to(num,  { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
                if (img)  tl.to(img,  { scaleY: 1, duration: 0.7, ease: "expo.out" }, "-=0.3");
                if (rule) tl.to(rule, { scaleX: 1, duration: 0.5, ease: "power2.out" }, "-=0.4");
                if (meta) tl.to(meta, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, "-=0.4");
                if (tags.length) tl.to(tags, { x: 0, opacity: 1, duration: 0.4, stagger: 0.07, ease: "power2.out" }, "-=0.3");
                if (cta)  tl.to(cta,  { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.2");
                if (noise) tl.to(noise, { opacity: 1, duration: 0.3 }, "-=0.4");
              }
            });

            // Image parallax
            cards.forEach((card, i) => {
              const innerImg = card.querySelector(".rp-img") as HTMLElement;
              if (!innerImg) return;
              const offset = (self.progress - i / totalCards) * window.innerWidth * 0.12;
              gsap.set(innerImg, { x: offset });
            });

            // Progress bar
            const bar = document.getElementById("rp-progress");
            if (bar) bar.style.width = `${self.progress * 100}%`;
          },
        },
      });

      // Header fade
      if (headRef.current) {
        gsap.to(headRef.current, {
          opacity: 0, y: -30, ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: "top+=180 top",
            scrub: true,
          },
        });
      }
    });

    // Mobile: simple stacked reveal
    mm.add("(max-width: 767px)", () => {
      gsap.utils.toArray<HTMLElement>(".rp-card").forEach((card) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none reverse" },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div id="projects">
      <style>{`
        .rp-scanlines::after {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px);
          pointer-events: none;
          z-index: 10;
        }
        .rp-noise {
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
          mix-blend-mode: overlay; pointer-events: none; z-index: 5; opacity: 0;
        }
        #rp-progress {
          position: absolute; bottom: 0; left: 0; height: 2px;
          background: ${ACCENT}; width: 0%; z-index: 50;
        }
        .rp-cta-line {
          display: inline-block; width: 32px; height: 1px;
          background: currentColor; transition: width 0.3s ease;
          vertical-align: middle; margin-right: 10px;
        }
        .rp-cta:hover .rp-cta-line { width: 60px; }
        .rp-cta:hover { opacity: 0.7 !important; }
        .rp-bracket::before, .rp-bracket::after,
        .rp-bracket > span::before, .rp-bracket > span::after {
          content: ''; position: absolute; width: 14px; height: 14px;
          border-color: rgba(255,255,255,0.2); border-style: solid; z-index: 20;
        }
        .rp-bracket::before { top: 16px; left: 16px; border-width: 1px 0 0 1px; }
        .rp-bracket::after  { top: 16px; right: 16px; border-width: 1px 1px 0 0; }
        .rp-bracket > span::before { bottom: 16px; left: 16px; border-width: 0 0 1px 1px; }
        .rp-bracket > span::after  { bottom: 16px; right: 16px; border-width: 0 1px 1px 0; }
        @media (max-width: 767px) {
          #rp-wrap {
            height: auto !important;
            overflow: visible !important;
          }
          #rp-strip {
            flex-direction: column !important;
            width: 100% !important;
            height: auto !important;
            will-change: auto !important;
          }
          .rp-card {
            width: 100% !important;
            min-width: unset !important;
            height: auto !important;
          }
          .rp-card-body {
            grid-template-columns: 1fr !important;
          }
          .rp-img-cell {
            position: relative !important;
            height: 300px !important;
            overflow: hidden !important;
          }
          .rp-meta-cell {
            padding: 28px 24px !important;
          }
          .rp-head {
            position: relative !important;
            padding: 24px 20px !important;
            background: #080808;
          }
          .rp-head-title {
            font-size: 36px !important;
          }
          .rp-head-hint {
            display: none !important;
          }
          .rp-card-topbar {
            padding: 14px 20px !important;
          }
          .rp-card-bottombar {
            padding: 10px 20px !important;
          }
          .rp-num {
            font-size: 80px !important;
          }
          .rp-meta {
            font-size: 28px !important;
          }
          #rp-progress {
            display: none !important;
          }
        }
      `}</style>

      {/* 
        wrapRef is the pin target. It MUST be a block-level element
        with a measurable height (100vh) so GSAP's pin-spacer
        correctly takes up space in the document flow.
      */}
      <div
        id="rp-wrap"
        ref={wrapRef}
        style={{
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          background: "#080808",
          position: "relative",
        }}
      >
        {/* Header overlay */}
        <div
          ref={headRef}
          className="rp-head"
          style={{
            position: "absolute", top: 0, left: 0, right: 0, zIndex: 30,
            padding: "40px 48px",
            display: "flex", alignItems: "flex-start", justifyContent: "space-between",
            pointerEvents: "none",
          }}
        >
          <div>
            <span style={{
              fontFamily: "monospace", fontSize: 10, letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.2)", textTransform: "uppercase",
              display: "block", marginBottom: 12,
            }}>Selected Works</span>
            <h2 className="rp-head-title" style={{
              fontSize: "clamp(52px, 7vw, 96px)", fontWeight: 900, color: "#fff",
              lineHeight: 0.85, letterSpacing: "-0.04em", textTransform: "uppercase",
            }}>
              Case<br />
              <span style={{ color: "rgba(255,255,255,0.06)", fontStyle: "italic" }}>Files</span>
            </h2>
          </div>
          <div className="rp-head-hint" style={{
            fontFamily: "monospace", fontSize: 10, color: "rgba(255,255,255,0.15)",
            textTransform: "uppercase", letterSpacing: "0.2em", textAlign: "right", lineHeight: 2,
          }}>
            <div>Scroll to navigate</div>
            <div style={{ color: ACCENT }}>→ Horizontal</div>
          </div>
        </div>

        {/* Horizontal strip — GSAP moves this via translateX */}
        <div
          id="rp-strip"
          ref={stripRef}
          style={{
            display: "flex",
            width: `${projects.length * 100}vw`,
            height: "100vh",
            willChange: "transform",
            position: "relative",
          }}
        >
          <div id="rp-progress" />

            {projects.map(({ id, title, des, img, iconLists, link }, idx) => (
              <div
                key={id}
                className="rp-card"
                style={{
                  minWidth: "100vw",
                  width: "100vw",
                  height: "100vh",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  borderRight: idx < projects.length - 1
                    ? "1px solid rgba(255,255,255,0.04)"
                    : "none",
                  overflow: "hidden",
                  background: idx % 2 === 0 ? "#080808" : "#060606",
                }}
              >
                {/* ── Top bar ── */}
                <div className="rp-card-topbar" style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px 40px",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  zIndex: 20,
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontFamily: "monospace",
                    fontSize: 10,
                    letterSpacing: "0.35em",
                    color: ACCENT,
                    textTransform: "uppercase",
                  }}>
                    CASE&mdash;0{id}
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    {/* Card counter */}
                    <span style={{
                      fontFamily: "monospace",
                      fontSize: 10,
                      color: "rgba(255,255,255,0.12)",
                      letterSpacing: "0.2em",
                    }}>
                      {String(idx + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                    </span>
                    <div style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: ACCENT,
                    }} />
                  </div>
                </div>

                {/* ── Main body ── */}
                <div className="rp-card-body" style={{
                  flex: 1,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  overflow: "hidden",
                }}>

                  {/* Left: image */}
                  <div className="rp-img-cell" style={{ position: "relative", overflow: "hidden" }}>
                    <div
                      className="rp-img-wrap rp-bracket rp-scanlines"
                      style={{
                        position: "absolute",
                        inset: 0,
                        overflow: "hidden",
                      }}
                    >
                      <span /> {/* bracket corners */}
                      <img
                        src={img}
                        alt={title}
                        className="rp-img"
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "115%",
                          height: "115%",
                          objectFit: "cover",
                          filter: "grayscale(100%) contrast(1.1)",
                          transition: "filter 0.6s ease",
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0%) contrast(1)";
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLImageElement).style.filter = "grayscale(100%) contrast(1.1)";
                        }}
                      />
                      {/* Grain */}
                      <div className="rp-noise" />
                      {/* Vignette */}
                      <div style={{
                        position: "absolute",
                        inset: 0,
                        background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
                        zIndex: 3,
                        pointerEvents: "none",
                      }} />
                      {/* Coordinate readout */}
                      <div style={{
                        position: "absolute",
                        bottom: 24,
                        left: 24,
                        fontFamily: "monospace",
                        fontSize: 9,
                        color: "rgba(255,255,255,0.18)",
                        lineHeight: 1.8,
                        zIndex: 15,
                        letterSpacing: "0.1em",
                      }}>
                        <div>LAT 14.5995°N</div>
                        <div>LNG 120.984°E</div>
                        <div style={{ color: ACCENT, marginTop: 4 }}>
                          {link.includes("github") ? "[ OPEN SOURCE ]" : "[ PRODUCTION ]"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: metadata */}
                  <div className="rp-meta-cell" style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "60px 56px",
                    position: "relative",
                    overflow: "hidden",
                  }}>
                    {/* Giant watermark number */}
                    <div
                      className="rp-num"
                      style={{
                        position: "absolute",
                        top: -20,
                        right: -10,
                        fontSize: "clamp(120px, 16vw, 220px)",
                        fontWeight: 900,
                        color: "rgba(255,255,255,0.025)",
                        lineHeight: 1,
                        userSelect: "none",
                        pointerEvents: "none",
                        letterSpacing: "-0.05em",
                        fontFamily: "monospace",
                      }}
                    >
                      0{id}
                    </div>

                    {/* Tech stack tags */}
                    <div
                      className="rp-tags-wrap"
                      style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32, position: "relative", zIndex: 2 }}
                    >
                      {iconLists.map((icon, i) => (
                        <div
                          key={i}
                          className="rp-tag"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 36,
                            height: 36,
                            border: "1px solid rgba(255,255,255,0.07)",
                            background: "rgba(255,255,255,0.02)",
                          }}
                        >
                          <img
                            src={icon}
                            alt="tech"
                            style={{ width: 16, height: 16, objectFit: "contain", filter: "invert(1)", opacity: 0.35 }}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Horizontal rule */}
                    <div
                      className="rp-rule"
                      style={{
                        width: "100%",
                        height: 1,
                        background: `linear-gradient(90deg, ${ACCENT} 0%, rgba(255,255,255,0.05) 100%)`,
                        marginBottom: 28,
                        position: "relative",
                        zIndex: 2,
                      }}
                    />

                    {/* Title */}
                    <h3
                      className="rp-meta"
                      style={{
                        fontSize: "clamp(36px, 4.5vw, 72px)",
                        fontWeight: 900,
                        color: "#fff",
                        textTransform: "uppercase",
                        letterSpacing: "-0.04em",
                        lineHeight: 0.9,
                        marginBottom: 24,
                        position: "relative",
                        zIndex: 2,
                      }}
                    >
                      {title}
                    </h3>

                    {/* Description */}
                    <p style={{
                      fontSize: 13,
                      color: "rgba(255,255,255,0.3)",
                      lineHeight: 1.7,
                      maxWidth: 380,
                      marginBottom: 40,
                      position: "relative",
                      zIndex: 2,
                      fontFamily: "monospace",
                      letterSpacing: "0.02em",
                    }}>
                      {des}
                    </p>

                    {/* CTA */}
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rp-cta"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        color: ACCENT,
                        fontFamily: "monospace",
                        fontSize: 11,
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        position: "relative",
                        zIndex: 2,
                        transition: "opacity 0.2s ease",
                      }}
                    >
                      <span className="rp-cta-line" />
                      {link.includes("github") ? "View source" : "Visit live"}
                    </a>
                  </div>
                </div>

                {/* ── Bottom strip ── */}
                <div className="rp-card-bottombar" style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 40px",
                  borderTop: "1px solid rgba(255,255,255,0.04)",
                  flexShrink: 0,
                  zIndex: 20,
                }}>
                  <span style={{
                    fontFamily: "monospace",
                    fontSize: 9,
                    color: "rgba(255,255,255,0.1)",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}>
                    Status: Deployed
                  </span>
                  {/* Mini progress indicators */}
                  <div style={{ display: "flex", gap: 4 }}>
                    {projects.map((_, dotIdx) => (
                      <div
                        key={dotIdx}
                        style={{
                          width: dotIdx === idx ? 20 : 4,
                          height: 2,
                          background: dotIdx === idx ? ACCENT : "rgba(255,255,255,0.1)",
                          transition: "width 0.3s ease",
                        }}
                      />
                    ))}
                  </div>
                  <span style={{
                    fontFamily: "monospace",
                    fontSize: 9,
                    color: "rgba(255,255,255,0.1)",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}>
                    FRAME&mdash;0{id}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RecentProjects;