"use client";
import React, { useEffect, useRef } from 'react'
import { projects } from '@/data'
import { FaArrowRight, FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

const RecentProjects = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const pin = gsap.fromTo(
            sectionRef.current,
            {
                x: 0,
            },
            {
                x: "-300vw",
                ease: "none",
                duration: 1,
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
        return () => {
            pin.kill();
        };
    }, []);

    return (
        <div className='overflow-hidden bg-[#f8f8f8]' id="projects">
            <div ref={triggerRef}>
                <div ref={sectionRef} className='flex w-[400vw] h-screen relative items-center'>
                    {/* Intro Slide */}
                    <div className='w-[100vw] h-full flex flex-col items-center justify-center p-20'>
                        <span className="font-syne font-black text-[12px] uppercase tracking-[1em] text-black/20 mb-6 px-4 border-l-4 border-black">Work Selection</span>
                        <h1 className='text-[12vw] font-black uppercase font-syne tracking-tighter leading-[0.8] text-center'>
                            Recent <br /> <span className='text-black/5 italic font-serif lowercase'>Projects</span>
                        </h1>
                        <div className="mt-20 flex items-center gap-4 animate-bounce">
                            <span className="font-syne text-[10px] font-black uppercase tracking-widest">Scroll to Explore</span>
                            <FaArrowRight className="text-black" />
                        </div>
                    </div>

                    {/* Project Slides */}
                    {projects.map(({ id, title, des, img, iconLists, link }) => (
                        <div key={id} className='w-[100vw] h-full flex items-center justify-center p-10 md:p-20 relative'>
                            <div className="w-full h-full max-w-7xl flex flex-col md:flex-row items-center gap-10 md:gap-20">
                                {/* Project Visual */}
                                <div className="relative w-full md:w-3/5 aspect-[16/10] group cursor-pointer overflow-hidden rounded-3xl border border-black/5 shadow-2xl">
                                    <img
                                        src={img}
                                        alt={title}
                                        className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0'
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 shadow-xl">
                                            <FaExternalLinkAlt className="text-black text-2xl" />
                                        </div>
                                    </div>
                                </div>

                                {/* Project Details */}
                                <div className="flex-1 flex flex-col items-start">
                                    <div className="flex gap-3 mb-8">
                                        {iconLists.map((icon, idx) => (
                                            <div key={idx} className="w-10 h-10 rounded-xl border border-black/5 bg-white p-2 shadow-sm flex items-center justify-center">
                                                <img src={icon} alt="tech" className="w-full h-full object-contain grayscale opacity-60" />
                                            </div>
                                        ))}
                                    </div>

                                    <h1 className="text-5xl md:text-7xl font-black font-syne uppercase tracking-tighter leading-none mb-6">
                                        {title}
                                    </h1>

                                    <p className="text-lg md:text-xl font-medium text-black/40 font-syne uppercase tracking-tight mb-10 leading-relaxed max-w-md">
                                        {des}
                                    </p>

                                    <a
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-4 border-b-2 border-black pb-2 hover:opacity-50 transition-all"
                                    >
                                        <span className="font-syne font-black text-xs uppercase tracking-widest">
                                            {link.includes('github') ? 'View Source' : 'Visit Live Site'}
                                        </span>
                                        {link.includes('github') ? <FaGithub /> : <FaArrowRight className="-rotate-45" />}
                                    </a>
                                </div>
                            </div>

                            {/* Background Decorative Number */}
                            <div className="absolute -bottom-20 -right-20 text-[30vw] font-black font-syne text-black/5 leading-none pointer-events-none select-none">
                                0{id}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RecentProjects
