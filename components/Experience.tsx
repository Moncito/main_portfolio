"use client";
import React from 'react'
import { workExperience } from '@/data'
import { Button } from '@/components/ui/MovingBorder'

const Experience = () => {
    return (
        <div className='py-32' id="experience">
            <div className="flex flex-col items-center mb-20">
                <span className="font-syne font-black text-[10px] uppercase tracking-[0.5em] text-black/40 mb-4 px-2 border-l-2 border-black">Background</span>
                <h1 className='text-[10vw] md:text-[6vw] font-black text-center uppercase font-syne tracking-tighter leading-none italic'>
                    Strategic <span className="text-black/10">Past</span>
                </h1>
            </div>

            <div className='w-full grid lg:grid-cols-2 grid-cols-1 gap-10'>
                {workExperience.map((card) => (
                    <div
                        key={card.id}
                        className='flex flex-col md:flex-row items-start md:items-center p-10 gap-8 bg-white border border-black/[0.05] rounded-3xl hover:border-black/10 hover:shadow-2xl transition-all duration-500 group'
                    >
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-[#f8f8f8] rounded-2xl flex items-center justify-center p-6 border border-black/[0.02]">
                            <img src={card.thumbnail} alt={card.thumbnail} className='w-full h-full grayscale group-hover:grayscale-0 transition-all' />
                        </div>
                        <div className='flex-1'>
                            <h1 className='text-3xl font-black font-syne uppercase tracking-tighter text-black'>
                                {card.title}
                            </h1>
                            <p className='text-black/40 mt-3 font-medium text-xs font-syne uppercase tracking-widest leading-relaxed max-w-md'>
                                {card.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Experience
