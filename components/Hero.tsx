"use client";
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { FaArrowRight, FaGithub } from "react-icons/fa";

const GitHubCalendarNoSSR = dynamic(
    () => import("react-github-calendar").then((m) => m.GitHubCalendar),
    {
        ssr: false,
        loading: () => <div className="h-[130px] md:h-[150px] w-full border border-white/10 bg-black/30" />,
    }
);

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const ACCENT = "#d9ff3f";

    const heroRef = useRef<HTMLDivElement>(null);
    const kineticWordRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLHeadingElement>(null);
    const roleRef = useRef<HTMLDivElement>(null);
    const photoRef = useRef<HTMLDivElement>(null);
    const stripRefs = useRef<(HTMLDivElement | null)[]>([]);
    const counterRef = useRef<HTMLSpanElement>(null);
    const scrollLineRef = useRef<HTMLDivElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const scanlineRef = useRef<HTMLDivElement>(null);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
        e.preventDefault();
        const targetId = link.replace("#", "");
        const lenis = (window as unknown as Record<string, unknown>).lenis as
            | { scrollTo: (target: string, opts: Record<string, unknown>) => void }
            | undefined;
        if (lenis) {
            lenis.scrollTo(`#${targetId}`, {
                duration: 1.5,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
        } else {
            document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        if (!heroRef.current) return;

        const ctx = gsap.context(() => {
            const counter = { val: 0 };
            gsap.to(counter, {
                val: 26,
                duration: 2,
                ease: "power2.inOut",
                delay: 0.3,
                onUpdate: () => {
                    if (counterRef.current) {
                        counterRef.current.textContent = String(Math.floor(counter.val)).padStart(2, "0");
                    }
                },
            });

            gsap.from(stripRefs.current, {
                scaleX: 0,
                transformOrigin: "left center",
                duration: 0.8,
                stagger: 0.07,
                ease: "expo.out",
                delay: 0.15,
            });

            if (scanlineRef.current) {
                gsap.to(scanlineRef.current, {
                    backgroundPositionY: 120,
                    duration: 2.4,
                    repeat: -1,
                    ease: "none",
                });
            }

            const intro = gsap.timeline({ defaults: { ease: "expo.out" } });

            intro
                .from(kineticWordRef.current, {
                    yPercent: 20,
                    opacity: 0,
                    duration: 1,
                })
                .from(photoRef.current, {
                    clipPath: "inset(100% 0 0 0)",
                    scale: 1.18,
                    duration: 1.2,
                    ease: "expo.inOut",
                }, "-=0.75")
                .from(".frame-marker", {
                    scale: 0,
                    rotate: -45,
                    transformOrigin: "center center",
                    stagger: 0.1,
                    duration: 0.5,
                    ease: "back.out(2)",
                }, "-=0.7")
                .from(roleRef.current, {
                    y: 22,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                }, "-=0.55");

            if (nameRef.current) {
                const splitName = new SplitType(nameRef.current, { types: "chars" });
                splitName.chars?.forEach((c) => {
                    const w = document.createElement("span");
                    w.style.overflow = "hidden";
                    w.style.display = "inline-block";
                    w.style.verticalAlign = "top";
                    c.parentNode?.insertBefore(w, c);
                    w.appendChild(c);
                });

                intro.from(splitName.chars, {
                    y: "108%",
                    skewY: 6,
                    stagger: 0.035,
                    duration: 1,
                }, "-=0.95");
            }

            if (scrollLineRef.current) {
                gsap.fromTo(scrollLineRef.current,
                    { scaleY: 0, transformOrigin: "top center" },
                    { scaleY: 1, duration: 0.9, ease: "expo.out", delay: 1.7 }
                );
                gsap.to(scrollLineRef.current, {
                    opacity: 0.25,
                    duration: 1.2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: 2.5,
                });
            }

            const mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                if (!nameRef.current) return;

                gsap.to(photoRef.current, {
                    scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
                    y: -115,
                    rotate: -2,
                    scale: 0.93,
                });

                gsap.to(nameRef.current, {
                    scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
                    xPercent: -10,
                    opacity: 0.2,
                });

                gsap.to(kineticWordRef.current, {
                    scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
                    xPercent: 18,
                    opacity: 0.18,
                });

                stripRefs.current.forEach((strip, i) => {
                    if (!strip) return;
                    gsap.to(strip, {
                        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "70% top", scrub: true },
                        xPercent: i % 2 === 0 ? -70 : 70,
                        opacity: 0,
                    });
                });

                gsap.fromTo(dividerRef.current,
                    { scaleX: 0.2 },
                    {
                        scaleX: 1,
                        transformOrigin: "left center",
                        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
                    }
                );

                gsap.to(".frame-shell", {
                    x: 1.5,
                    y: -1,
                    duration: 0.08,
                    repeat: -1,
                    yoyo: true,
                    ease: "steps(1)",
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        toggleActions: "play pause resume pause",
                    },
                });
            });

            mm.add("(max-width: 767px)", () => {
                gsap.to(photoRef.current, {
                    scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
                    y: -58,
                    scale: 0.95,
                });

                gsap.to(kineticWordRef.current, {
                    scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
                    opacity: 0.14,
                    xPercent: 8,
                });

                gsap.fromTo(dividerRef.current,
                    { scaleX: 0.28 },
                    {
                        scaleX: 1,
                        transformOrigin: "left center",
                        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
                    }
                );
            });

            const onMove = (e: MouseEvent) => {
                if (!photoRef.current || !heroRef.current || window.innerWidth < 768) return;
                const r = heroRef.current.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width - 0.5;
                const y = (e.clientY - r.top) / r.height - 0.5;
                gsap.to(photoRef.current, {
                    rotateY: x * 10,
                    rotateX: -y * 6,
                    duration: 0.8,
                    ease: "power2.out",
                });
            };
            const onLeave = () => {
                if (!photoRef.current) return;
                gsap.to(photoRef.current, { rotateY: 0, rotateX: 0, duration: 1, ease: "elastic.out(1,0.4)" });
            };

            heroRef.current!.addEventListener("mousemove", onMove);
            heroRef.current!.addEventListener("mouseleave", onLeave);
            return () => {
                heroRef.current?.removeEventListener("mousemove", onMove);
                heroRef.current?.removeEventListener("mouseleave", onLeave);
            };
        }, heroRef);

        return () => ctx.revert();
    }, []);

    const stripLabels = ["FRONTEND", "MOTION", "ARCHITECTURE", "2026", "SYSTEMS"];

    return (
        <section
            ref={heroRef}
            data-dark-bg
            className="relative w-full min-h-[100svh] md:min-h-screen bg-black text-white overflow-hidden"
            style={{ perspective: "1200px" }}
        >
            <div
                className="absolute inset-0 z-[60] pointer-events-none opacity-[0.035] mix-blend-overlay"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
            />
            <div
                ref={scanlineRef}
                className="absolute inset-0 z-[61] pointer-events-none opacity-[0.07]"
                style={{
                    backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
                    backgroundSize: "100% 4px",
                    backgroundPositionY: 0,
                }}
            />

            {/* ── Horizontal Brutalist Strips ── */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none py-8 md:py-12 z-0">
                {stripLabels.map((label, i) => (
                    <div
                        key={label}
                        ref={(el) => { stripRefs.current[i] = el; }}
                        className="w-full h-[1px] bg-white/[0.06] relative"
                    >
                        <span className="absolute -top-3 left-4 md:left-8 font-syne text-[8px] md:text-[10px] font-bold uppercase tracking-[0.35em] text-white/35">
                            {label}
                        </span>
                        <span
                            className="absolute -top-[2px] right-4 md:right-10 w-5 h-[3px]"
                            style={{ backgroundColor: ACCENT, opacity: 0.65 }}
                        />
                    </div>
                ))}
            </div>

            {/* ── Nav ── */}
            <div className="relative w-full max-w-7xl mx-auto px-6 md:px-10 pt-5 md:pt-10 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-6 z-50">
                <span className="font-syne font-black text-lg md:text-xl tracking-tighter uppercase">
                    Sainty Hernandez
                </span>
                <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 md:gap-8 font-syne text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] md:tracking-[0.25em] items-center">
                    <a href="#projects" onClick={(e) => handleScroll(e, "#projects")} className="hover:text-white/40 transition-colors">Projects</a>
                    <a href="#about" onClick={(e) => handleScroll(e, "#about")} className="hover:text-white/40 transition-colors">About</a>
                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white/40 transition-colors border-b pb-0.5" style={{ borderColor: "rgba(217,255,63,0.35)" }}>Resume</a>
                    <a href="#contact" onClick={(e) => handleScroll(e, "#contact")} className="italic font-serif hover:text-white/40 transition-colors capitalize tracking-normal text-xs md:text-sm">Contact</a>
                </div>
            </div>

            {/* ── Main Content: Grid single-cell overlap ── */}
            <div className="relative w-full max-w-[1400px] mx-auto px-4 md:px-10 mt-10 md:mt-24 grid min-h-[50vh] md:min-h-[68vh]" style={{ gridTemplate: "1fr / 1fr" }}>

                <div
                    ref={kineticWordRef}
                    className="[grid-area:1/1] self-center justify-self-start md:justify-self-center z-10 pointer-events-none font-syne font-black uppercase leading-[0.82] tracking-tight text-[24vw] md:text-[14vw] text-white/12 md:text-white/10"
                >
                    Archi<br />tect
                </div>

                {/* Name — left-aligned, bleeds over the photo */}
                <div className="hidden md:block [grid-area:1/1] self-start md:self-center z-50 pointer-events-none mt-5 md:mt-0">
                    <h1
                        ref={nameRef}
                        className="font-syne font-black text-[12.8vw] md:text-[8vw] leading-[0.84] uppercase tracking-tight md:tracking-tighter select-none text-white md:mix-blend-difference drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)] md:drop-shadow-none"
                    >
                        <span className="block whitespace-nowrap">Sainty</span>
                        <span className="block whitespace-nowrap">Hernandez</span>
                    </h1>
                    
                    <div ref={roleRef} className="mt-3 md:mt-8 inline-flex items-center gap-3 md:gap-4 pointer-events-auto bg-black/45 md:bg-transparent px-2 py-1 md:px-0 md:py-0">
                        <div className="w-6 md:w-14 h-[2px] bg-white/45 md:bg-white/30" />
                        <span className="font-syne text-[9px] md:text-[11px] font-bold uppercase tracking-[0.18em] md:tracking-[0.35em] text-white/80 md:text-white/50">
                            Creative Architect &amp; Developer
                        </span>
                    </div>
                </div>

                {/* Photo — right-aligned, name bleeds over it */}
                <div
                    ref={photoRef}
                    className="[grid-area:1/1] self-start md:self-center justify-self-center md:justify-self-end w-[74vw] max-w-[298px] md:w-[26vw] md:max-w-[330px] aspect-[3/4] z-30 relative mt-14 md:mt-2 translate-x-0 md:translate-x-6"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <div className="absolute -inset-2 md:-inset-3 border border-white/10 frame-shell" />
                    <div className="absolute -inset-1 md:-inset-1.5 border border-white/5 frame-shell" />
                    <div className="absolute -left-[2px] top-0 bottom-0 w-[6px] frame-shell" style={{ backgroundColor: "rgba(255,255,255,0.14)" }} />

                    <div className="absolute top-2 left-2 md:top-3 md:left-3 px-2 py-[2px] bg-black/70 border border-white/20 text-[8px] font-syne uppercase tracking-[0.25em] text-white/70 frame-marker">
                        Frame-01
                    </div>

                    <div className="w-full h-full overflow-hidden bg-white/5">
                        <img
                            src="/images/pfp.jpg"
                            alt="Sainty Hernandez"
                            className="w-full h-full object-cover grayscale contrast-110 brightness-90"
                        />
                    </div>

                    {/* Corner badge */}
                    <div className="absolute bottom-2 left-2 md:-bottom-6 md:-left-6 bg-white text-black px-3 py-2 md:px-5 md:py-3 z-40 frame-marker">
                        <span className="font-syne font-black text-[10px] md:text-xs uppercase tracking-widest">
                            ©<span ref={counterRef}>00</span>
                        </span>
                    </div>

                    {/* Floating arrow */}
                    <div className="absolute top-2 right-2 md:-top-5 md:-right-5 w-9 h-9 md:w-14 md:h-14 text-black flex items-center justify-center z-40 frame-marker" style={{ backgroundColor: ACCENT }}>
                        <FaArrowRight className="-rotate-45 text-sm md:text-lg" />
                    </div>
                </div>
            </div>

            <div className="relative w-full max-w-7xl mx-auto px-4 md:px-10 mt-8 md:mt-14 z-40">
                <div className="border border-white/15 bg-black/45 backdrop-blur-[2px]">
                    <div className="flex items-center justify-between px-3 md:px-5 py-2.5 border-b border-white/10">
                        <div className="flex items-center gap-2">
                            <FaGithub className="text-sm text-white/70" />
                            <span className="font-syne text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">
                                GitHub Contributions
                            </span>
                        </div>
                        <a
                            href="https://github.com/Moncito?tab=overview&from=2026-03-01&to=2026-03-31"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-syne text-[8px] md:text-[9px] font-bold uppercase tracking-[0.22em] text-white/45 hover:text-white/75 transition-colors"
                        >
                            Open GitHub
                        </a>
                    </div>

                    <div className="px-3 py-3 md:px-5 md:py-4 overflow-x-auto">
                        <div className="min-w-[620px] md:min-w-0">
                            <GitHubCalendarNoSSR
                                username="Moncito"
                                colorScheme="dark"
                                blockSize={12}
                                blockMargin={4}
                                fontSize={11}
                                showWeekdayLabels
                                labels={{
                                    totalCount: "{{count}} contributions in the last year",
                                }}
                                theme={{
                                    dark: ["#161616", "#3a3a3a", "#6b6b6b", "#a8a8a8", "#e0e0e0"],
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Scroll Indicator ── */}
            <div className="hidden md:flex flex-col items-center gap-3 mt-6 md:mt-10 z-40 relative">
                <span className="font-syne text-[7px] md:text-[8px] font-bold uppercase tracking-[0.5em] text-white/20">Scroll</span>
                <div ref={scrollLineRef} className="w-[1px] h-10 md:h-14 bg-white/40" />
            </div>

            {/* ── Bottom Info Bar ── */}
            <div className="hidden md:flex relative w-full max-w-7xl mx-auto px-6 md:px-10 pb-8 md:pb-12 pt-8 md:pt-12 flex-col md:flex-row justify-between items-center md:items-end gap-8 md:gap-0 z-40 text-center md:text-left">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <span className="font-syne text-[8px] md:text-[9px] font-bold uppercase tracking-[0.5em] text-white/25">Location</span>
                    <div className="font-syne text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 leading-relaxed">
                        Decentralized<br />Space.
                    </div>
                </div>
                <div className="flex flex-col items-center md:items-end gap-4">
                    <div className="flex gap-3">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="w-6 md:w-10 h-[1px] bg-white/10" />
                        ))}
                    </div>
                    <p className="font-syne text-[9px] md:text-[10px] font-bold uppercase tracking-wide max-w-[260px] leading-relaxed text-white/30">
                        Architecture that prioritizes{" "}
                        <span className="italic font-serif lowercase tracking-normal text-sm md:text-base text-white/50">motion</span>
                        , structure &amp; experience.
                    </p>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-px bg-white/20 z-40 origin-left" ref={dividerRef} />
            <div className="absolute bottom-0 left-0 w-14 md:w-20 h-[2px] z-40" style={{ backgroundColor: ACCENT }} />
        </section>
    );
};

export default Hero;
