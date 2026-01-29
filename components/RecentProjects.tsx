"use client";
import React, { useEffect } from 'react'
import { projects } from '@/data'
import { FaArrowRight } from 'react-icons/fa'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

const RecentProjects = () => {
    useEffect(() => {
        const cards = gsap.utils.toArray('.project-card');

        cards.forEach((card: any) => {
            gsap.fromTo(card, {
                opacity: 0,
                y: 100,
            }, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                }
            });
        });
    }, []);

    return (
        <div className='py-32 flex flex-col items-center bg-[#f8f8f8]' id="projects">
            <div className="w-full mb-20 flex flex-col items-start px-2">
                <span className="font-syne font-black text-[10px] uppercase tracking-[0.5em] text-black/40 mb-4 px-2 border-l-2 border-black">Selected Archive</span>
                <h1 className='text-[10vw] md:text-[7vw] font-black uppercase font-syne tracking-tighter leading-[0.8]'>
                    Latest <br /> <span className='text-black/10'>Movements</span>
                </h1>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32 w-full'>
                {projects.map(({ id, title, des, img, iconLists, link }) => (
                    <div key={id} className='project-card flex flex-col items-start group cursor-none'>
                        <div className='relative w-full overflow-hidden aspect-[16/10] mb-10 bg-white rounded-3xl border border-black/5'>
                            <img
                                src={img}
                                alt={title}
                                className='z-10 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0'
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                <div className="w-20 h-20 rounded-full bg-[#f8f8f8] flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500">
                                    <span className="font-syne font-black text-[10px] uppercase tracking-widest text-black">View</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-end w-full px-4">
                            <div className="flex-1">
                                <div className="flex gap-2 mb-4">
                                    {iconLists.slice(0, 3).map((icon) => (
                                        <div key={icon} className="w-6 h-6 rounded-full border border-black/5 bg-white p-1.5 grayscale opacity-40">
                                            <img src={icon} alt="tech" className="w-full h-full" />
                                        </div>
                                    ))}
                                </div>
                                <h1 className='font-black text-3xl md:text-5xl font-syne uppercase tracking-tighter leading-none'>
                                    {title}
                                </h1>
                                <p className='text-sm font-medium text-black/40 mt-4 max-w-sm font-syne uppercase tracking-[0.1em] leading-relaxed'>
                                    {des}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecentProjects
