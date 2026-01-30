"use client";
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { FaArrowRight } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const titleTopRef = useRef<HTMLHeadingElement>(null);
    const titleBottomRef = useRef<HTMLHeadingElement>(null);
    const cardStackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!titleTopRef.current || !titleBottomRef.current) return;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // DESKTOP CONFIG (Preserved)
            mm.add("(min-width: 768px)", () => {
                const splitTop = new SplitType(titleTopRef.current!, { types: 'chars' });
                const splitBottom = new SplitType(titleBottomRef.current!, { types: 'chars' });

                const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

                tl.from(splitTop.chars, {
                    y: 150,
                    stagger: 0.02,
                    duration: 1.2,
                })
                    .from(splitBottom.chars, {
                        y: 150,
                        stagger: 0.02,
                        duration: 1.2,
                    }, "-=1")
                    .from(".floating-card", {
                        opacity: 0,
                        y: 50,
                        stagger: 0.1,
                        duration: 1,
                    }, "-=0.8");

                gsap.to(".card-1", {
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                    x: -150,
                    y: -80,
                    rotate: -15,
                });

                gsap.to(".card-2", {
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                    x: 150,
                    y: -120,
                    rotate: 15,
                });

                gsap.to(".card-3", {
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                    scale: 1.1,
                    y: 40,
                });

                gsap.to(titleTopRef.current, {
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                    x: -80,
                });

                gsap.to(titleBottomRef.current, {
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                    x: 80,
                });
            });

            // MOBILE CONFIG (Optimized Spacing & Size)
            mm.add("(max-width: 767px)", () => {
                const splitTop = new SplitType(titleTopRef.current!, { types: 'chars' });
                const splitBottom = new SplitType(titleBottomRef.current!, { types: 'chars' });

                const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

                tl.from(splitTop.chars, {
                    opacity: 0,
                    y: 50,
                    stagger: 0.02,
                    duration: 1,
                })
                    .from(splitBottom.chars, {
                        opacity: 0,
                        y: 50,
                        stagger: 0.02,
                        duration: 1,
                    }, "-=0.8")
                    .from(".floating-card", {
                        opacity: 0,
                        scale: 0.9,
                        y: 50,
                        stagger: 0.1,
                        duration: 1,
                    }, "-=0.5");

                // Parallax for mobile
                gsap.to(".card-1", {
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: 1,
                    },
                    xPercent: -30,
                    y: -40,
                    rotate: -10,
                });

                gsap.to(".card-2", {
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: 1,
                    },
                    xPercent: 30,
                    y: -60,
                    rotate: 10,
                });

                gsap.to(".card-3", {
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: 1,
                    },
                    scale: 1.15,
                    y: 40,
                });

                gsap.to(titleTopRef.current, {
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                    y: -30,
                    opacity: 0.3,
                });

                gsap.to(titleBottomRef.current, {
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                    y: 30,
                    opacity: 0.3,
                });
            });

        }, heroRef);

        return () => ctx.revert();
    }, []);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
        e.preventDefault();
        const targetId = link.replace("#", "");
        const lenis = (window as any).lenis;
        if (lenis) {
            lenis.scrollTo(`#${targetId}`, {
                duration: 1.5,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
        } else {
            const elem = document.getElementById(targetId);
            if (elem) {
                elem.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <section className="relative w-full min-h-[110vh] md:min-h-[140vh] flex flex-col items-center pt-12 md:pt-20 bg-[#f8f8f8] overflow-hidden" ref={heroRef}>
            {/* Minimalist Grid Background */}
            <div className="absolute inset-0 bg-grid-minimal pointer-events-none opacity-20 md:opacity-40" />

            {/* Navigation / Branding */}
            <div className="w-full max-w-7xl px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-6 z-50">
                <span className="font-syne font-black text-2xl tracking-tighter uppercase text-black">Sainty Hernandez</span>
                <div className="flex gap-8 md:gap-10 font-syne text-[10px] font-black uppercase tracking-[0.3em]">
                    <a href="#projects" onClick={(e) => handleScroll(e, "#projects")} className="hover:opacity-40 transition-opacity">Projects</a>
                    <a href="#about" onClick={(e) => handleScroll(e, "#about")} className="hover:opacity-40 transition-opacity">About</a>
                    <a href="#contact" onClick={(e) => handleScroll(e, "#contact")} className="italic font-serif hover:opacity-40 transition-opacity capitalize tracking-normal text-sm">Contact</a>
                </div>
            </div>

            {/* Hero Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center relative w-full mt-10 md:mt-20">
                <h1
                    ref={titleTopRef}
                    className="text-[15vw] md:text-[15vw] leading-none font-black font-syne uppercase tracking-tighter text-black select-none z-10"
                >
                    Design
                </h1>

                {/* Scroll Triggered Card Stack */}
                <div ref={cardStackRef} className="relative w-48 h-64 md:w-[450px] md:h-[600px] z-30 my-2 md:my-[-8vw]">
                    {/* Background Cards */}
                    <div className="floating-card card-1 absolute inset-0 bg-black/5 rounded-2xl border border-black/5 shadow-xl flex items-center justify-center overflow-hidden">
                        <div className="w-full h-full bg-[#f0f0f0] fractal-noise opacity-20" />
                    </div>
                    <div className="floating-card card-2 absolute inset-0 bg-black/5 rounded-2xl border border-black/5 shadow-xl translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4 overflow-hidden">
                        <div className="w-full h-full bg-grey-100/10 fractal-noise" />
                    </div>

                    {/* Main High-Impact Card */}
                    <div className="floating-card card-3 absolute inset-0 bg-white rounded-2xl shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] md:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-black/5 overflow-hidden translate-x-4 translate-y-4 md:translate-x-8 md:translate-y-8 p-1">
                        <div className="w-full h-full rounded-xl overflow-hidden bg-[#f8f8f8] flex items-center justify-center relative">
                            <img
                                src="/images/pfp.jpg"
                                alt="Sainty Hernandez"
                                className="w-full h-full object-cover grayscale brightness-95"
                            />
                        </div>
                        {/* Card Badge */}
                        <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 flex justify-between items-end text-black">
                            <div className="font-syne font-black text-[8px] md:text-[10px] uppercase tracking-widest leading-none">
                                <span className="block opacity-40 mb-1">Architect</span>
                                <span>Works 2026</span>
                            </div>
                            <div className="w-7 h-7 md:w-10 md:h-10 rounded-full border border-black/10 flex items-center justify-center bg-white shadow-lg">
                                <FaArrowRight className="-rotate-45 text-[10px] md:text-xs" />
                            </div>
                        </div>
                    </div>
                </div>

                <h1
                    ref={titleBottomRef}
                    className="text-[14vw] md:text-[12vw] leading-none font-black font-syne uppercase tracking-tighter text-black select-none z-10"
                >
                    System
                </h1>
            </div>

            {/* Bottom Details - Editorial Mobile Layout */}
            <div className="w-full max-w-7xl px-8 md:px-10 pb-16 md:pb-20 flex flex-col md:flex-row justify-between items-center md:items-end gap-12 md:gap-0 z-40 text-center md:text-left">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <span className="font-syne text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] opacity-30">Location</span>
                    <div className="font-syne text-[10px] md:text-[12px] font-black uppercase tracking-[0.2em] leading-relaxed">
                        Currently Operating <br className="hidden md:block" /> In Decentralized Space.
                    </div>
                </div>

                <div className="flex flex-col items-center md:items-end gap-6 md:gap-8 w-full md:w-auto">
                    <div className="flex gap-4">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="w-8 md:w-12 h-[1px] bg-black opacity-10" />
                        ))}
                    </div>
                    <p className="font-syne text-[9px] md:text-[11px] font-black uppercase tracking-tight max-w-xs md:max-w-[300px] leading-relaxed">
                        Architecture that prioritizes <br />
                        <span className="text-black/30 italic font-serif lowercase tracking-normal text-sm md:text-lg">Motion,</span>
                        <br className="md:hidden" /> structure and human experience.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Hero
