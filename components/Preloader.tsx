"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [percent, setPercent] = useState(0);

    const words = [
        { text: "SAINTY", font: "font-syne" },
        { text: "Hernandez", font: "font-serif italic lowercase" },
        { text: "BUILD", font: "font-syne" },
        { text: "Motion.", font: "font-serif italic lowercase" }
    ];

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                gsap.to(containerRef.current, {
                    y: "-100%",
                    duration: 1,
                    ease: "expo.inOut",
                    onComplete,
                });
            },
        });

        // Initial states - hide everything
        gsap.set(".preloader-word", { opacity: 0, scale: 0.9, y: 40 });
        gsap.set(".progress-container", { opacity: 0, y: 20 });

        // Counter animation
        const counterObj = { value: 0 };
        tl.to(counterObj, {
            value: 100,
            duration: 3.2,
            ease: "power2.inOut",
            onUpdate: () => {
                setPercent(Math.floor(counterObj.value));
            }
        }, 0);

        // Progress bar entrance
        tl.to(".progress-container", {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out"
        }, 0.3);

        // Word cycling with proper timing to prevent overlap
        words.forEach((word, index) => {
            const startTime = index * 0.65;

            tl.to(`.word-${index}`, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.5,
                ease: "back.out(1.5)",
            }, startTime)
                .to(`.word-${index}`, {
                    opacity: 0,
                    scale: 0.95,
                    y: -30,
                    duration: 0.4,
                    ease: "power2.in",
                }, startTime + 0.5);
        });

        // Final fade out
        tl.to(".progress-container", {
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: "power2.in"
        }, 2.8);

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#f8f8f8] overflow-hidden"
        >
            {/* Minimal Grid Background */}
            <div className="absolute inset-0 bg-grid-minimal opacity-20" />

            {/* Structural Cross Lines */}
            <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/5" />
            <div className="absolute inset-y-0 left-1/2 w-[1px] bg-black/5" />

            {/* Center Stage for Words */}
            <div className="relative flex items-center justify-center mb-32 md:mb-40">
                <div className="relative h-32 md:h-40 flex items-center justify-center">
                    {words.map((word, i) => (
                        <div
                            key={i}
                            className={`preloader-word word-${i} absolute 
                                text-6xl md:text-8xl lg:text-9xl 
                                font-black uppercase tracking-tighter 
                                text-black ${word.font}
                                whitespace-nowrap
                            `}
                        >
                            {word.text}
                        </div>
                    ))}
                </div>
            </div>

            {/* Progress Indicator - Bottom */}
            <div className="progress-container absolute bottom-16 md:bottom-20 flex flex-col items-center gap-5">
                {/* Percentage Counter */}
                <div className="font-syne text-4xl md:text-5xl font-black tabular-nums text-black/10">
                    {percent.toString().padStart(2, '0')}%
                </div>

                {/* Progress Bar */}
                <div className="relative w-56 md:w-72 h-[2px] bg-black/5 overflow-hidden rounded-full">
                    <div
                        className="absolute top-0 left-0 h-full bg-black transition-all duration-100 ease-linear rounded-full"
                        style={{ width: `${percent}%` }}
                    />
                </div>

                {/* Loading Label */}
                <span className="font-syne text-[8px] md:text-[9px] font-black uppercase tracking-[0.5em] text-black/20 mt-2">
                    Initializing
                </span>
            </div>

            {/* Decorative Year Label */}
            <div className="absolute top-10 md:top-12 font-syne text-[9px] font-black uppercase tracking-[0.8em] text-black/10">
                Portfolio 2026
            </div>
        </div>
    );
};

export default Preloader;
