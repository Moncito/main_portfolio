"use client";
import React, { useEffect, useRef } from 'react'
import { workExperience } from '@/data'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const items = gsap.utils.toArray('.exp-item');

        items.forEach((item: any) => {
            const title = item.querySelector('.exp-title');
            const desc = item.querySelector('.exp-desc');
            const num = item.querySelector('.exp-num');
            const line = item.querySelector('.exp-line');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                }
            });

            tl.fromTo(num, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" })
                .fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power4.out" }, "-=0.6")
                .fromTo(desc, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power4.out" }, "-=0.8")
                .fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: "expo.inOut" }, "-=1");
        });
    }, []);

    return (
        <section className='py-40 relative bg-[#f8f8f8] overflow-hidden' id="experience" ref={sectionRef}>
            {/* Minimalist Grid Background */}
            <div className="absolute inset-0 bg-grid-minimal pointer-events-none opacity-40" />

            <div className="w-full max-w-7xl mx-auto px-10 mb-32">
                <span className="font-syne font-black text-[10px] uppercase tracking-[1em] text-black/40 mb-4 px-3 border-l-4 border-black">Career Track</span>
                <h1 className='text-[10vw] md:text-[8vw] font-black uppercase font-syne tracking-tighter leading-[0.8]'>
                    Strategic <br /> <span className='text-black/10 italic font-serif lowercase'>History</span>
                </h1>
            </div>

            <div className="flex flex-col w-full max-w-7xl mx-auto px-4 md:px-10">
                {workExperience.map((card, i) => (
                    <div
                        key={card.id}
                        className="exp-item group relative w-full py-16 md:py-24 flex flex-col items-start gap-8 border-b border-black/5 last:border-0"
                    >
                        {/* Numbering & Indicator */}
                        <div className="flex items-center gap-6 exp-num">
                            <span className="font-syne font-black text-6xl text-black/5 group-hover:text-black transition-colors duration-500">
                                0{i + 1}
                            </span>
                            <div className="exp-line h-[1px] w-24 bg-black/10 origin-left scale-x-0" />
                        </div>

                        {/* Title - Controlled Impact */}
                        <div className="exp-title w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <h2 className="text-4xl md:text-6xl lg:text-8xl font-black font-syne uppercase tracking-tighter text-black leading-[0.9] max-w-4xl transition-transform group-hover:translate-x-4 duration-700">
                                {card.title}
                            </h2>

                            {/* Icon */}
                            <div className="w-20 h-20 md:w-28 md:h-28 bg-white rounded-2xl border border-black/5 flex items-center justify-center p-5 shadow-xl group-hover:rotate-12 transition-transform duration-500 shrink-0 self-start md:self-auto">
                                <img
                                    src={card.thumbnail}
                                    alt={card.title}
                                    className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                        </div>

                        {/* Description - High Contrast & No Overlap */}
                        <div className="exp-desc max-w-3xl mt-4">
                            <p className="font-syne text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-tight text-black/30 group-hover:text-black transition-colors duration-500 leading-tight">
                                {card.desc}
                            </p>
                        </div>

                        {/* Decorative Background Text (Responsive hidden or restricted) */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[15vw] font-black font-syne text-black/[0.02] pointer-events-none select-none hidden lg:block uppercase tracking-tighter italic">
                            {card.title.split(' ').slice(-1)[0]}
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Details */}
            <div className="w-full max-w-7xl mx-auto px-10 mt-40 flex justify-between items-end opacity-20">
                <div className="font-syne text-[10px] font-black uppercase tracking-[0.6em] max-w-[250px] leading-relaxed">
                    A legacy of technical architecture and strategic leadership.
                </div>
                <div className="text-8xl font-black font-syne text-black/5 leading-none translate-y-1/3">
                    ARCHIVE
                </div>
            </div>
        </section>
    )
}

export default Experience
