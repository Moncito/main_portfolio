"use client";
import React, { useEffect, useRef, useState } from 'react'
import { workExperience } from '@/data'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        let ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(max-width: 767px)", () => {
                // MOBILE: High-Velocity Reveal
                const items = gsap.utils.toArray('.exp-item');

                items.forEach((item: any, i) => {
                    const title = item.querySelector('.exp-title h2');
                    const num = item.querySelector('.exp-num span');
                    const line = item.querySelector('.exp-line');
                    const visual = item.querySelector('.exp-visual');
                    const desc = item.querySelector('.exp-desc p');

                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: item,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        }
                    });

                    tl.fromTo(num,
                        { x: -30, opacity: 0 },
                        { x: 0, opacity: 0.1, duration: 0.8, ease: "power4.out" }
                    )
                        .fromTo(line,
                            { scaleX: 0 },
                            { scaleX: 1, duration: 1, ease: "expo.out" },
                            "-=0.6"
                        )
                        .fromTo(title,
                            { y: 30, opacity: 0 },
                            { y: 0, opacity: 1, duration: 1, ease: "power4.out" },
                            "-=0.8"
                        )
                        .fromTo(visual,
                            { scale: 0.8, opacity: 0, rotate: 10 },
                            { scale: 1, opacity: 1, rotate: 0, duration: 1, ease: "back.out(1.7)" },
                            "-=0.7"
                        )
                        .fromTo(desc,
                            { y: 20, opacity: 0 },
                            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                            "-=0.6"
                        );
                });

                // Parallax for the massive background letters on mobile
                const bgText = gsap.utils.toArray('.exp-bg-text');
                bgText.forEach((text: any) => {
                    gsap.to(text, {
                        xPercent: 20,
                        ease: "none",
                        scrollTrigger: {
                            trigger: text,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true
                        }
                    });
                });
            });

            mm.add("(min-width: 768px)", () => {
                // DESKTOP: Smooth Pin & Reveal (Existing logic refined)
                const items = gsap.utils.toArray('.exp-item');

                items.forEach((item: any) => {
                    const title = item.querySelector('.exp-title h2');
                    const desc = item.querySelector('.exp-desc');
                    const num = item.querySelector('.exp-num');
                    const line = item.querySelector('.exp-line');

                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: item,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        }
                    });

                    tl.fromTo(num, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" })
                        .fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power4.out" }, "-=0.6")
                        .fromTo(desc, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power4.out" }, "-=0.8")
                        .fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: "expo.inOut" }, "-=1");
                });
            });

        }, sectionRef);

        return () => {
            ctx.revert();
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    return (
        <section className='py-16 md:py-40 relative bg-[#f8f8f8] overflow-hidden' id="experience" ref={sectionRef}>
            {/* Minimalist Grid Background */}
            <div className="absolute inset-0 bg-grid-minimal pointer-events-none opacity-40" />

            <div className="w-full max-w-7xl mx-auto px-4 md:px-10 mb-12 md:mb-32">
                <span className="font-syne font-black text-[10px] uppercase tracking-[0.8em] text-black/30 mb-3 md:mb-4 px-3 border-l-4 border-black block">Career Track</span>
                <h1 className='text-[9vw] sm:text-[10vw] md:text-[8vw] font-black uppercase font-syne tracking-tighter leading-[0.9] md:leading-[0.8] mt-2'>
                    Strategic <br /> <span className='text-black/10 italic font-serif lowercase'>History</span>
                </h1>
            </div>

            <div className="flex flex-col w-full max-w-7xl mx-auto px-4 md:px-10">
                {workExperience.map((card, i) => (
                    <div
                        key={card.id}
                        className="exp-item group relative w-full py-8 md:py-24 flex flex-col items-start gap-4 md:gap-8 border-b border-black/5 last:border-0"
                    >
                        {/* Numbering & Indicator */}
                        <div className="flex items-center gap-3 md:gap-6 exp-num">
                            <span className="font-syne font-black text-3xl md:text-6xl text-black/5 group-hover:text-black transition-colors duration-500">
                                0{i + 1}
                            </span>
                            <div className="exp-line h-[1px] w-12 md:w-24 bg-black/10 origin-left scale-x-0" />
                        </div>

                        {/* Title - Controlled Impact */}
                        <div className="exp-title w-full flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
                            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black font-syne uppercase tracking-tighter text-black leading-[0.95] md:leading-[0.9] max-w-4xl transition-transform group-hover:translate-x-4 duration-700">
                                {card.title}
                            </h2>

                            {/* Icon */}
                            <div className="exp-visual w-14 h-14 md:w-28 md:h-28 bg-white rounded-xl md:rounded-2xl border border-black/5 flex items-center justify-center p-3 md:p-5 shadow-xl group-hover:rotate-12 transition-transform duration-500 shrink-0 self-start md:self-auto">
                                <img
                                    src={card.thumbnail}
                                    alt={card.title}
                                    className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                        </div>

                        {/* Description - High Contrast */}
                        <div className="exp-desc max-w-3xl mt-1 md:mt-4">
                            <p className="font-syne text-sm sm:text-base md:text-2xl lg:text-3xl font-black uppercase tracking-tight text-black/30 group-hover:text-black transition-colors duration-500 leading-snug md:leading-tight">
                                {card.desc}
                            </p>
                        </div>

                        {/* Decorative Background Text (Responsive drift) */}
                        <div className="exp-bg-text absolute right-0 top-1/2 -translate-y-1/2 text-[20vw] font-black font-syne text-black/[0.02] pointer-events-none select-none hidden md:block uppercase tracking-tighter italic">
                            {card.title.split(' ').slice(-1)[0]}
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Details */}
            <div className="w-full max-w-7xl mx-auto px-4 md:px-10 mt-16 md:mt-40 flex flex-col md:flex-row justify-between items-center md:items-end gap-8 md:gap-0 opacity-20 text-center md:text-left">
                <div className="font-syne text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] max-w-[250px] leading-relaxed">
                    A legacy of technical architecture and strategic leadership.
                </div>
                <div className="text-4xl md:text-8xl font-black font-syne text-black/5 leading-none md:translate-y-1/3">
                    ARCHIVE
                </div>
            </div>
        </section>
    )
}

export default Experience
