"use client";
import React from 'react'
import { InfiniteMovingCards } from './ui/InfiniteMovingCards'
import { companies, testimonials } from '@/data'

const Clients = () => {
    return (
        <div className='py-20 flex flex-col items-center bg-[#f5f5f7]' id="testimonials">
            <h1 className='text-[8vw] md:text-[6vw] font-black text-center mb-10 uppercase font-syne tracking-tighter leading-none'>
                Trusted <span className='text-black/20'>By</span>
            </h1>
            <div className='flex flex-col items-center max-lg:mt-10 w-full lg:max-w-7xl'>
                <InfiniteMovingCards
                    items={testimonials}
                    direction='right'
                    speed='slow'
                />

                <div className='flex flex-wrap items-center justify-center gap-12 md:gap-24 mt-20 opacity-40'>
                    {companies.map(({ id, img, name, nameImg }) => (
                        <div key={id} className='flex md:max-w-60 max-w-32 gap-3 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500'>
                            <img
                                src={img}
                                alt={name}
                                className='md:w-12 w-8'
                            />
                            <img
                                src={nameImg}
                                alt={name}
                                className='md:w-28 w-24'
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Clients
