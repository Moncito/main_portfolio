"use client";
import React from 'react'
import { socialMedia } from '@/data'
import { FaArrowUp } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className='w-full pt-40 pb-10 bg-black text-[#f8f8f8]' id="contact">
            <div className='flex flex-col items-center px-10'>
                <div className="w-full flex flex-col items-center mb-32">
                    <span className="font-syne font-black text-[10px] uppercase tracking-[0.8em] opacity-40 mb-10">Available for 2024 Collaborations</span>
                    <h1 className='text-[12vw] md:text-[10vw] font-black text-center font-syne uppercase tracking-tighter leading-[0.75]'>
                        SAY <br /> <span className='text-white/10 italic font-serif lowercase'>hello</span> <br /> SAINTY@HER.CO
                    </h1>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-end justify-between w-full max-w-7xl pt-10 border-t border-white/10 gap-16">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <span className="font-syne font-black text-3xl uppercase tracking-tighter">Sainty Hernandez</span>
                            <span className="font-syne text-[10px] font-bold uppercase opacity-40">Digital Architect & Developer</span>
                        </div>
                        <div className='flex items-center gap-6'>
                            {socialMedia.map((profile) => (
                                <a
                                    key={profile.id}
                                    href={profile.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className='group flex items-center gap-2'
                                >
                                    <div className='w-12 h-12 flex justify-center items-center rounded-full border border-white/10 group-hover:bg-white group-hover:text-black transition-all overflow-hidden'>
                                        <img src={profile.img} alt="social" width={20} height={20} className="invert group-hover:invert-0" />
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-10">
                        <div className="flex flex-col md:items-end gap-1">
                            <span className="font-syne text-[10px] font-black uppercase opacity-40">Based In</span>
                            <span className="font-syne text-sm font-black uppercase tracking-widest">Earth, Core System</span>
                        </div>
                        <div
                            className="flex items-center gap-4 cursor-pointer group"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            <span className="font-syne text-[10px] uppercase font-black tracking-[0.4em] group-hover:tracking-[0.6em] transition-all">Back To Top</span>
                            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:-translate-y-2 transition-transform">
                                <FaArrowUp className="text-xs" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-40 px-10 flex flex-col md:flex-row justify-between items-center opacity-20 font-syne text-[10px] uppercase font-black tracking-widest border-t border-white/5 pt-10'>
                <p>© 2024 Sainty Hernandez — All Rights Reserved</p>
                <div className="flex gap-10 mt-6 md:mt-0">
                    <span className="hover:opacity-100 cursor-pointer transition-opacity">Privacy</span>
                    <span className="hover:opacity-100 cursor-pointer transition-opacity">Terms</span>
                </div>
                <p className="mt-6 md:mt-0">Design & Code by Saint</p>
            </div>
        </footer>
    )
}

export default Footer
