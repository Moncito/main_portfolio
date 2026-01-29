"use client";
import React, { useEffect, useRef } from 'react'
import { companies, testimonials } from '@/data'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

const Clients = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Logo Marquee Animation
            const marquee = marqueeRef.current;
            if (marquee) {
                const logos = marquee.querySelectorAll('.logo-item');
                const totalWidth = Array.from(logos).reduce((acc, el) => acc + (el as HTMLElement).offsetWidth + 60, 0);

                gsap.to(marquee, {
                    x: -totalWidth / 2,
                    duration: 25, // Slower for readability
                    ease: 'none',
                    repeat: -1,
                });
            }

            // Testimonial Reveal
            gsap.utils.toArray('.testimonial-row').forEach((row: any, i) => {
                gsap.fromTo(row, {
                    x: i % 2 === 0 ? -50 : 50,
                    opacity: 0
                }, {
                    x: 0,
                    opacity: 1,
                    scrollTrigger: {
                        trigger: row,
                        start: "top 95%",
                        end: "top 60%",
                        scrub: 1,
                    }
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className='relative py-20 md:py-40 flex flex-col items-center bg-[#f8f8f8] overflow-hidden' id="testimonials" ref={sectionRef}>
            {/* Minimalist Grid Background */}
            <div className="absolute inset-0 bg-grid-minimal pointer-events-none opacity-40" />

            {/* Massive Heading */}
            <div className="w-full max-w-7xl px-6 md:px-10 mb-20 md:mb-32">
                <span className="font-syne font-black text-[10px] uppercase tracking-[0.5em] text-black/40 mb-4 px-2 border-l-2 border-black">Endorsement</span>
                <h1 className='text-[15vw] md:text-[8vw] font-black uppercase font-syne tracking-tighter leading-[0.8]'>
                    Verified <br /> <span className='text-black/10'>Impact</span>
                </h1>
            </div>

            {/* Kinetic Testimonials */}
            <div className="w-full flex flex-col gap-12 md:gap-40">
                {testimonials.map((item, idx) => (
                    <div
                        key={idx}
                        className={`testimonial-row flex flex-col ${idx % 2 === 0 ? 'items-start px-6 md:pl-[5vw]' : 'items-end px-6 md:pr-[5vw]'} max-w-full`}
                    >
                        <blockquote className={`max-w-4xl ${idx % 2 === 0 ? 'text-left' : 'text-right'}`}>
                            <p className="text-2xl md:text-5xl lg:text-7xl font-black font-syne uppercase tracking-tighter leading-[0.9] mb-6 md:mb-8 text-black">
                                &quot;{item.quote.split(' ').slice(0, 12).join(' ')}...&quot;
                            </p>
                            <div className={`flex flex-col ${idx % 2 === 0 ? 'items-start' : 'items-end'}`}>
                                <cite className="not-italic font-syne font-black text-xs md:text-sm uppercase tracking-widest text-black mb-1">
                                    {item.name}
                                </cite>
                                <span className="font-syne text-[8px] md:text-[10px] font-bold uppercase text-black/30 tracking-[0.3em]">
                                    {item.title}
                                </span>
                            </div>
                        </blockquote>
                    </div>
                ))}
            </div>

            {/* Brutalist Logo Marquee */}
            <div className="w-full mt-32 md:mt-60 relative">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-black/5" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black/5" />

                <div className="py-12 md:py-20 overflow-hidden flex">
                    <div ref={marqueeRef} className="flex gap-12 md:gap-30 items-center whitespace-nowrap px-6 md:px-10">
                        {[...companies, ...companies].map((company, idx) => (
                            <div key={idx} className="logo-item flex items-center gap-4 grayscale opacity-20 hover:opacity-100 hover:grayscale-0 transition-all duration-500 cursor-none group">
                                <img
                                    src={company.img}
                                    alt={company.name}
                                    className='h-8 md:h-16 w-auto object-contain'
                                />
                                <span className="font-syne font-black text-lg md:text-2xl uppercase tracking-tighter hidden md:block group-hover:block transition-all">
                                    {company.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Subtle Call to Action */}
            <div className="mt-20 md:mt-40 font-syne text-[8px] md:text-[10px] font-black uppercase tracking-[0.8em] text-black/20 animate-pulse">
                Systematic Collaboration
            </div>
        </section>
    )
}

export default Clients
