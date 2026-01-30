"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Only register plugin on client side
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto py-20",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    id,
    img,
    imgClassName,
    titleClassName,
    spareImg,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
    id?: number;
    img?: string;
    imgClassName?: string;
    titleClassName?: string;
    spareImg?: string;
}) => {
    const itemRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const mouseThrottle = useRef<number>(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const el = itemRef.current;
        if (!el || typeof window === 'undefined') return;

        // Configure ScrollTrigger for better performance (client-side only)
        ScrollTrigger.config({
            limitCallbacks: true,
            syncInterval: 100,
        });

        const ctx = gsap.context(() => {
            // Entrance animation - optimized
            gsap.fromTo(el, {
                opacity: 0,
                y: 30,
            }, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                    toggleActions: "play none none none",
                    once: true,
                }
            });

            // Parallax effect on image - highly optimized
            if (imgRef.current) {
                gsap.to(imgRef.current, {
                    y: -30,
                    ease: "none",
                    scrollTrigger: {
                        trigger: el,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                });
            }
        }, el);

        // Throttled mouse move for tilt effect
        let mouseX = 0;
        let mouseY = 0;
        let rafId: number | null = null;
        let isHovering = false;

        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();
            if (now - mouseThrottle.current < 16) return;
            mouseThrottle.current = now;

            const { left, top, width, height } = el.getBoundingClientRect();
            mouseX = (e.clientX - left) / width - 0.5;
            mouseY = (e.clientY - top) / height - 0.5;

            if (!rafId && isHovering && typeof window !== 'undefined') {
                rafId = window.requestAnimationFrame(updateTilt);
            }
        };

        const updateTilt = () => {
            gsap.to(el, {
                rotationY: mouseX * 5,
                rotationX: -mouseY * 5,
                duration: 0.6,
                ease: "power2.out",
                overwrite: 'auto'
            });
            rafId = null;
        };

        const handleMouseEnter = () => {
            isHovering = true;
        };

        const handleMouseLeave = () => {
            isHovering = false;
            if (rafId && typeof window !== 'undefined') {
                window.cancelAnimationFrame(rafId);
                rafId = null;
            }
            gsap.to(el, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.8,
                ease: "power2.out"
            });
        };

        el.addEventListener("mouseenter", handleMouseEnter, { passive: true });
        el.addEventListener("mousemove", handleMouseMove, { passive: true });
        el.addEventListener("mouseleave", handleMouseLeave, { passive: true });

        return () => {
            ctx.revert();
            el.removeEventListener("mouseenter", handleMouseEnter);
            el.removeEventListener("mousemove", handleMouseMove);
            el.removeEventListener("mouseleave", handleMouseLeave);
            if (rafId && typeof window !== 'undefined') {
                window.cancelAnimationFrame(rafId);
            }
        };
    }, [id, isMounted]);

    return (
        <div
            ref={itemRef}
            className={cn(
                `bento-item-${id} row-span-1 relative overflow-hidden rounded-3xl group/bento transition-shadow duration-300 justify-between flex flex-col space-y-4 border border-black/[0.05] bg-white shadow-sm hover:shadow-2xl perspective-1000`,
                className
            )}
            style={{ transform: 'translateZ(0)' }} // Force GPU acceleration
        >
            <div className={`${id === 6 && "flex justify-center"} h-full min-h-[300px]`}>
                <div className="w-full h-full absolute top-0 left-0 overflow-hidden pointer-events-none">
                    {img && (
                        <img
                            ref={imgRef}
                            src={img}
                            alt={img}
                            className={cn(imgClassName, "object-cover object-center w-full h-[130%] -top-[15%] absolute grayscale group-hover/bento:grayscale-0 transition-all duration-700")}
                            loading="lazy" // Add lazy loading
                        />
                    )}
                </div>

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent opacity-60 pointer-events-none" />

                <div
                    ref={textRef}
                    className={cn(
                        titleClassName,
                        "group-hover/bento:translate-x-2 transition duration-300 relative h-full flex flex-col px-8 p-8 lg:p-12 justify-end z-10"
                    )}
                >
                    <div className="font-syne font-black text-[10px] uppercase tracking-[0.3em] text-black/40 mb-3 bg-white/80 backdrop-blur-sm self-start px-2 py-1 rounded">
                        {description || "Insight"}
                    </div>
                    <div
                        className={`font-syne text-2xl lg:text-4xl font-black z-10 uppercase leading-[0.9] text-black tracking-tighter`}
                    >
                        {title}
                    </div>
                </div>
            </div>
        </div>
    );
};
