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

        const splitTop = new SplitType(titleTopRef.current, { types: 'chars' });
        const splitBottom = new SplitType(titleBottomRef.current, { types: 'chars' });

        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        // Initial Entrance
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

        // Scroll Animation for Cards
        gsap.to(".card-1", {
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
            x: -200,
            y: -100,
            rotate: -15,
        });

        gsap.to(".card-2", {
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
            x: 200,
            y: -150,
            rotate: 15,
        });

        gsap.to(".card-3", {
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
            scale: 1.2,
            y: 50,
        });

        // Parallax for titles
        gsap.to(titleTopRef.current, {
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
            x: -100,
        });

        gsap.to(titleBottomRef.current, {
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
            x: 100,
        });

        return () => {
            splitTop.revert();
            splitBottom.revert();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section className="relative w-full min-h-[140vh] flex flex-col items-center pt-20 bg-[#f8f8f8] overflow-hidden" ref={heroRef}>
            {/* Minimalist Grid Background */}
            <div className="absolute inset-0 bg-grid-minimal pointer-events-none opacity-40" />

            {/* Navigation / Branding */}
            <div className="w-full max-w-7xl px-10 flex justify-between items-center z-50">
                <span className="font-syne font-black text-2xl tracking-tighter uppercase text-black">Sainty Hernandez</span>
                <div className="flex gap-10 font-syne text-[10px] font-black uppercase tracking-[0.3em]">
                    <a href="#projects" className="hover:opacity-40 transition-opacity">Projects</a>
                    <a href="#about" className="hover:opacity-40 transition-opacity">About</a>
                    <a href="#contact" className="italic font-serif hover:opacity-40 transition-opacity capitalize tracking-normal text-sm">Contact</a>
                </div>
            </div>

            {/* Hero Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center relative w-full mt-20">
                <h1
                    ref={titleTopRef}
                    className="text-[15vw] leading-[0.75] font-black font-syne uppercase tracking-tighter text-black select-none z-10"
                >
                    Design
                </h1>

                {/* Scroll Triggered Card Stack */}
                <div ref={cardStackRef} className="relative w-72 h-96 md:w-[450px] md:h-[600px] z-30 my-[-10vw]">
                    {/* Background Cards */}
                    <div className="floating-card card-1 absolute inset-0 bg-grey-200/20 rounded-2xl border border-black/5 shadow-xl flex items-center justify-center overflow-hidden">
                        <div className="w-full h-full bg-[#f0f0f0] fractal-noise opacity-20" />
                    </div>
                    <div className="floating-card card-2 absolute inset-0 bg-black/5 rounded-2xl border border-black/5 shadow-xl translate-x-4 translate-y-4 overflow-hidden">
                        <div className="w-full h-full bg-grey-100/10 fractal-noise" />
                    </div>

                    {/* Main High-Impact Card */}
                    <div className="floating-card card-3 absolute inset-0 bg-white rounded-2xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-black/5 overflow-hidden translate-x-8 translate-y-8 p-1">
                        <div className="w-full h-full rounded-xl overflow-hidden bg-[#f8f8f8] flex items-center justify-center">
                            <img
                                src="/images/sainty.jpg"
                                alt="Modern Architecture"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Card Badge */}
                        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-black">
                            <div className="font-syne font-black text-[10px] uppercase tracking-widest leading-none">
                                <span className="block opacity-40 mb-1">Portfolio</span>
                                <span>Selected Works 2024</span>
                            </div>
                            <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center bg-white shadow-lg">
                                <FaArrowRight className="-rotate-45 text-xs" />
                            </div>
                        </div>
                    </div>
                </div>

                <h1
                    ref={titleBottomRef}
                    className="text-[13vw] leading-[0.75] font-black font-syne uppercase tracking-tighter text-black select-none z-10"
                >
                    System
                </h1>
            </div>

            {/* Bottom Details */}
            <div className="w-full max-w-7xl px-10 pb-20 flex justify-between items-end z-40">
                <div className="font-syne text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed max-w-[200px]">
                    <span className="opacity-40 block mb-2">Location</span>
                    <span>Currently Operating <br /> In Decentralized Space.</span>
                </div>

                <div className="flex flex-col items-end gap-6">
                    <div className="flex gap-4">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="w-12 h-[1px] bg-black opacity-20" />
                        ))}
                    </div>
                    <p className="font-syne text-[10px] font-black uppercase tracking-widest text-right max-w-[300px] leading-relaxed">
                        Architecture that prioritizes <br /> <span className="italic font-serif capitalize tracking-normal text-sm">Structure,</span> motion and human experience.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Hero
