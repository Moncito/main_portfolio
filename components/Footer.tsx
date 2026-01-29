"use client";
import React, { useState } from 'react'
import { socialMedia } from '@/data'
import { FaArrowUp, FaCopy, FaCheck } from 'react-icons/fa'

const Footer = () => {
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("moncitoglenn03@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <footer className='w-full pt-20 md:pt-40 pb-10 bg-black text-[#f8f8f8] relative overflow-hidden' id="contact">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-[50vw] h-full bg-white/[0.02] -skew-x-12 translate-x-1/2 pointer-events-none" />

            <div className='flex flex-col items-center px-6 md:px-10 relative z-10'>
                <div className="w-full flex flex-col items-center mb-24 md:mb-40 text-center">
                    <span className="font-syne font-black text-[8px] md:text-[10px] uppercase tracking-[1em] opacity-40 mb-10 md:mb-12 animate-pulse">
                        Available for Collaborations
                    </span>

                    <div className="group cursor-pointer relative w-full" onClick={handleCopyEmail}>
                        <h1 className='text-[16vw] md:text-[12vw] font-black font-syne uppercase tracking-tighter leading-[0.75] mb-8 md:mb-10 overflow-hidden'>
                            LET&apos;S <br />
                            <span className='group-hover:text-white/20 transition-all duration-500 italic font-serif lowercase'>build</span>
                            <br /> YOUR VISION
                        </h1>

                        {/* Overlay for Email - Always visible on mobile, hover on desktop */}
                        <div className="flex md:absolute md:inset-0 items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 mt-6 md:mt-0">
                            <div className="bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-full flex items-center gap-3 shadow-2xl scale-100 md:scale-50 md:group-hover:scale-100 transition-transform">
                                <span className="font-syne font-black text-[10px] md:text-sm uppercase">moncitoglenn03@gmail.com</span>
                                {copied ? <FaCheck className="text-green-600" /> : <FaCopy />}
                            </div>
                        </div>
                    </div>

                    <p className="font-syne text-[8px] md:text-[10px] font-bold uppercase tracking-[0.5em] opacity-40 mt-10 hidden md:block">
                        Click text to copy email
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between w-full max-w-7xl pt-16 md:pt-20 border-t border-white/10 gap-16 md:gap-20">
                    <div className="flex flex-col items-center lg:items-start gap-10 md:gap-12 text-center lg:text-left w-full lg:w-auto">
                        <div className="flex flex-col gap-4">
                            <span className="font-syne font-black text-4xl md:text-6xl uppercase tracking-tighter">Sainty <br /> Hernandez</span>
                            <div className="flex items-center gap-4 justify-center lg:justify-start">
                                <span className="w-8 h-[1px] bg-white/20" />
                                <span className="font-syne text-[10px] font-bold uppercase opacity-40 tracking-widest">Digital Architect & Developer</span>
                            </div>
                        </div>

                        <div className='flex items-center gap-6'>
                            {socialMedia.map((profile) => (
                                <a
                                    key={profile.id}
                                    href={profile.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className='group'
                                >
                                    <div className='w-12 h-12 md:w-14 md:h-14 flex justify-center items-center rounded-2xl border border-white/10 group-hover:bg-white transition-all overflow-hidden'>
                                        <img
                                            src={profile.img}
                                            alt="social"
                                            width={20}
                                            height={20}
                                            className="invert group-hover:invert-0 group-hover:scale-110 transition-all opacity-60 group-hover:opacity-100"
                                        />
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col items-center lg:items-end gap-12 md:gap-16 w-full lg:w-auto">
                        <div className="flex flex-col lg:items-end gap-3 text-center lg:text-right">
                            <span className="font-syne text-[10px] font-black uppercase opacity-40 tracking-[0.5em]">Based In</span>
                            <span className="font-syne text-lg md:text-xl font-black uppercase tracking-widest">Earth, System Core</span>
                        </div>

                        <div
                            className="flex items-center gap-6 cursor-pointer group"
                            onClick={() => {
                                const lenis = (window as any).lenis;
                                if (lenis) {
                                    lenis.scrollTo(0, { duration: 2 });
                                } else {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                            }}
                        >
                            <div className="flex flex-col items-center md:items-end">
                                <span className="font-syne text-[10px] uppercase font-black tracking-[0.6em]">Back to top</span>
                                <span className="font-syne text-[8px] uppercase font-bold opacity-20 tracking-[1em]">Altitude 0.0</span>
                            </div>
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all group-hover:-translate-y-4">
                                <FaArrowUp className="text-sm" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-24 md:mt-40 px-6 md:px-10 flex flex-col md:flex-row justify-between items-center opacity-20 font-syne text-[8px] md:text-[10px] uppercase font-black tracking-[0.5em] md:tracking-[1em] border-t border-white/5 pt-10 md:pt-12 text-center gap-6'>
                <p>© 2026 Sainty Hernandez — All Rights Reserved</p>
                <div className="flex gap-6 md:gap-10">
                    <span className="hover:opacity-100 cursor-pointer transition-opacity">Design</span>
                    <span className="hover:opacity-100 cursor-pointer transition-opacity">Engineering</span>
                    <span className="hover:opacity-100 cursor-pointer transition-opacity">Strategy</span>
                </div>
                <p className='hidden md:block'>Built with Craft & System</p>
            </div>
        </footer>
    )
}

export default Footer
