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
                    duration: 30,
                    ease: 'none',
                    repeat: -1,
                });
            }

            // Testimonial Scroll Animations - Optimized for visibility
            const testimonials = gsap.utils.toArray('.testimonial-card');

            testimonials.forEach((card: any, i) => {
                const quote = card.querySelector('.quote-text');
                const author = card.querySelector('.author-info');

                // Create timeline for each testimonial
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        end: "top 30%",
                        toggleActions: "play none none reverse",
                        markers: false, // Set to true to debug
                    }
                });

                // Stagger the entrance
                tl.fromTo(quote,
                    {
                        y: 60,
                        opacity: 0,
                        scale: 0.95
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1,
                        ease: "power3.out"
                    }
                )
                    .fromTo(author,
                        {
                            y: 30,
                            opacity: 0
                        },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.8,
                            ease: "power2.out"
                        },
                        "-=0.5"
                    );
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className='relative py-20 md:py-40 flex flex-col items-center bg-[#f8f8f8] overflow-hidden' id="testimonials" ref={sectionRef}>
            {/* Minimalist Grid Background */}
            <div className="absolute inset-0 bg-grid-minimal pointer-events-none opacity-40" />

            {/* Section Header - Mobile Optimized */}
            <div className="w-full max-w-7xl px-6 md:px-10 mb-16 md:mb-32">
                <span className="font-syne font-black text-[10px] uppercase tracking-[0.5em] text-black/40 mb-4 px-2 border-l-2 border-black inline-block">
                    Endorsement
                </span>
                <h1 className='text-[11vw] md:text-[8vw] font-black uppercase font-syne tracking-tighter leading-[1.2] md:leading-[0.8]'>
                    Verified <br /> <span className='text-black/10'>Impact</span>
                </h1>
            </div>

            {/* Testimonials Grid - Redesigned for Mobile */}
            <div className="w-full max-w-7xl px-6 md:px-10 flex flex-col gap-16 md:gap-32">
                {testimonials.map((item, idx) => (
                    <div
                        key={idx}
                        className="testimonial-card w-full"
                    >
                        <div className={`flex flex-col ${idx % 2 === 0 ? 'md:items-start' : 'md:items-end'} gap-6`}>
                            {/* Quote - Mobile First Typography */}
                            <blockquote className={`quote-text w-full md:max-w-4xl ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                                <p className="font-syne font-black uppercase tracking-tight text-black
                                    text-[7vw] leading-[1.15]
                                    sm:text-[5.5vw] sm:leading-[1.1]
                                    md:text-5xl md:leading-[1.05]
                                    lg:text-7xl lg:leading-[0.95]
                                    mb-6 md:mb-8">
                                    &quot;{item.quote.split(' ').slice(0, 12).join(' ')}...&quot;
                                </p>
                            </blockquote>

                            {/* Author Info - Clear Separation */}
                            <div className={`author-info flex flex-col gap-1 ${idx % 2 === 0 ? 'md:items-start' : 'md:items-end'}`}>
                                <cite className="not-italic font-syne font-black text-xs md:text-sm uppercase tracking-[0.2em] text-black">
                                    {item.name}
                                </cite>
                                <span className="font-syne text-[9px] md:text-[10px] font-medium uppercase text-black/40 tracking-[0.25em]">
                                    {item.title}
                                </span>
                            </div>
                        </div>

                        {/* Divider - Visual Separation */}
                        {idx < testimonials.length - 1 && (
                            <div className="w-full h-[1px] bg-black/5 mt-12 md:mt-20" />
                        )}
                    </div>
                ))}
            </div>

            {/* Brutalist Logo Marquee */}
            <div className="w-full mt-24 md:mt-60 relative">
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
