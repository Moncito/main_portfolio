"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [percent, setPercent] = useState(0);

    const words = [
        { text: "SAINTY", font: "font-syne" },
        { text: "Hernandez", font: "font-serif italic" },
        { text: "STRUCTURE", font: "font-syne" },
        { text: "Motion.", font: "font-serif italic" }
    ];

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                gsap.to(containerRef.current, {
                    y: "-100%",
                    duration: 1.2,
                    ease: "expo.inOut",
                    onComplete,
                });
            },
        });

        // Initial state
        gsap.set(".preloader-word", { opacity: 0, y: 50 });

        // Counter animation
        const counterObj = { value: 0 };
        tl.to(counterObj, {
            value: 100,
            duration: 3.5,
            ease: "power3.inOut",
            onUpdate: () => {
                setPercent(Math.floor(counterObj.value));
            }
        }, 0);

        // Staggered words animation
        words.forEach((word, index) => {
            tl.to(`.word-${index}`, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power4.out",
            }, index * 0.7 + 0.2)
                .to(`.word-${index}`, {
                    opacity: 0,
                    y: -50,
                    duration: 0.5,
                    ease: "power4.in",
                }, index * 0.7 + 0.75);
        });

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#f8f8f8] overflow-hidden"
        >
            {/* Structural Lines for Preloader */}
            <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/5" />
            <div className="absolute inset-y-0 left-1/2 w-[1px] bg-black/5" />

            <div className="relative h-32 md:h-48 flex items-center justify-center">
                {words.map((word, i) => (
                    <div
                        key={i}
                        className={`preloader-word word-${i} absolute text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter whitespace-nowrap text-black ${word.font}`}
                    >
                        {word.text}
                    </div>
                ))}
            </div>

            <div className="absolute bottom-20 flex flex-col items-center gap-6">
                <div className="font-syne text-4xl md:text-6xl font-black tabular-nums text-black brightness-0 opacity-10">
                    {percent.toString().padStart(3, '0')}
                </div>
                <div className="h-[2px] w-64 bg-black/5 relative overflow-hidden">
                    <div
                        className="absolute top-0 left-0 h-full bg-black transition-all duration-100 ease-linear"
                        style={{ width: `${percent}%` }}
                    />
                </div>
            </div>

            <div className="absolute top-20 font-syne text-[10px] font-black tracking-[1em] uppercase text-black opacity-20">
                System Initializing
            </div>
        </div>
    );
};

export default Preloader;
