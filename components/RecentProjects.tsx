"use client";
import React, { useEffect, useRef, useState } from 'react'
import { projects } from '@/data'
import { FaArrowRight, FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

const RecentProjects = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        let ctx = gsap.context(() => {
            // DESKTOP: Horizontal Pinning (Exact Preservation)
            if (window.innerWidth >= 768) {
                gsap.fromTo(
                    sectionRef.current,
                    { x: 0 },
                    {
                        x: "-300vw",
                        ease: "none",
                        scrollTrigger: {
                            trigger: triggerRef.current,
                            start: "top top",
                            end: "2000 top",
                            scrub: 0.6,
                            pin: true,
                            anticipatePin: 1,
                        },
                    }
                );
            } else {
                // MOBILE: Clean Reveal (Anti-Overlap Logic)
                const projectCards = gsap.utils.toArray('.project-slide');

                projectCards.forEach((card: any) => {
                    const visual = card.querySelector('.project-visual');
                    const content = card.querySelector('.project-content');

                    // Simple, stable reveal
                    gsap.fromTo(card,
                        { opacity: 0, y: 50 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 1,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: card,
                                start: "top 85%",
                                toggleActions: "play none none reverse",
                            }
                        }
                    );

                    // Smooth, deep image parallax (doesn't cause overlap)
                    gsap.to(visual.querySelector('img'), {
                        yPercent: 15,
                        ease: "none",
                        scrollTrigger: {
                            trigger: card,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true
                        }
                    });
                });
            }
        }, triggerRef);

        return () => {
            ctx.revert();
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    return (
        <div className='bg-[#f8f8f8]' id="projects">
            <div ref={triggerRef} className={`${isMobile ? 'block' : 'overflow-hidden'}`}>
                <div ref={sectionRef} className={`flex ${isMobile ? 'flex-col' : 'w-[400vw] h-screen relative'} items-center`}>

                    {/* Intro Slide */}
                    <div className={`${isMobile ? 'h-[60vh]' : 'w-[100vw] h-full'} flex flex-col items-center justify-center p-10 relative`}>
                        <span className="font-syne font-black text-[12px] uppercase tracking-[1em] text-black/20 mb-6 px-4 border-l-4 border-black">Work Selection</span>
                        <h1 className='text-[15vw] md:text-[12vw] font-black uppercase font-syne tracking-tighter leading-[0.8] text-center'>
                            Recent <br /> <span className='text-black/5 italic font-serif lowercase'>Projects</span>
                        </h1>
                        <div className="mt-16 flex flex-col items-center gap-4 animate-bounce opacity-30">
                            <span className="font-syne text-[9px] font-black uppercase tracking-widest">Scroll</span>
                            <FaArrowRight className="rotate-90 md:rotate-0" />
                        </div>
                    </div>

                    {/* Project Slides */}
                    {projects.map(({ id, title, des, img, iconLists, link }) => (
                        <div key={id} className={`project-slide w-full ${isMobile ? 'py-16' : 'w-[100vw] h-full'} flex items-center justify-center p-6 md:p-20 relative`}>
                            <div className="w-full h-full max-w-7xl flex flex-col md:flex-row items-center gap-10 md:gap-20">

                                {/* Project Visual - High Energy but Stable */}
                                <div className="project-visual relative w-full md:w-3/5 aspect-[16/10] group cursor-pointer overflow-hidden rounded-2xl border border-black/5 shadow-xl">
                                    <img
                                        src={img}
                                        alt={title}
                                        className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0'
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                        <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 shadow-xl">
                                            <FaExternalLinkAlt className="text-black text-xl md:text-2xl" />
                                        </div>
                                    </div>
                                </div>

                                {/* Project Details */}
                                <div className="project-content flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                                    <div className="flex gap-2 md:gap-3 mb-6">
                                        {iconLists.map((icon, idx) => (
                                            <div key={idx} className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl border border-black/5 bg-white p-2 shadow-sm flex items-center justify-center">
                                                <img src={icon} alt="tech" className="w-full h-full object-contain grayscale opacity-60" />
                                            </div>
                                        ))}
                                    </div>

                                    <h1 className="text-4xl md:text-7xl font-black font-syne uppercase tracking-tighter leading-none mb-6">
                                        {title}
                                    </h1>

                                    <p className="text-sm md:text-xl font-medium text-black/40 font-syne uppercase tracking-tight mb-8 md:mb-10 leading-relaxed max-w-md">
                                        {des}
                                    </p>

                                    <a
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center gap-4 border-b-2 border-black pb-2 hover:opacity-50 transition-all"
                                    >
                                        <span className="font-syne font-black text-[10px] md:text-xs uppercase tracking-widest">
                                            {link.includes('github') ? 'View Source' : 'Visit Live Site'}
                                        </span>
                                        {link.includes('github') ? <FaGithub /> : <FaArrowRight className="-rotate-45" />}
                                    </a>
                                </div>
                            </div>

                            {/* Background Numbering for Mobile (Simplified to avoid overlap) */}
                            {isMobile && (
                                <div className="absolute top-10 right-10 text-6xl font-black font-syne text-black/[0.03] pointer-events-none select-none">
                                    0{id}
                                </div>
                            )}

                            {/* Background Decorative Number - Desktop Only */}
                            {!isMobile && (
                                <div className="absolute -bottom-20 -right-20 text-[30vw] font-black font-syne text-black/5 leading-none pointer-events-none select-none">
                                    0{id}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RecentProjects
