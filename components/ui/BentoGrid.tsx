"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

    useEffect(() => {
        const el = itemRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            // Entrance animation
            gsap.fromTo(el, {
                opacity: 0,
                y: 50,
            }, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 95%",
                    toggleActions: "play none none reverse"
                }
            });

            // Parallax effect on image - optimized scrub
            if (imgRef.current) {
                gsap.to(imgRef.current, {
                    y: -40,
                    ease: "none",
                    scrollTrigger: {
                        trigger: el,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.5, // Added slight scrub for smoothness
                    }
                });
            }
        }, el);

        // Subtle tilt effect on mouse move - optimized with requestAnimationFrame logic
        let mouseX = 0;
        let mouseY = 0;
        let rafId: number;

        const handleMouseMove = (e: MouseEvent) => {
            const { left, top, width, height } = el.getBoundingClientRect();
            mouseX = (e.clientX - left) / width - 0.5;
            mouseY = (e.clientY - top) / height - 0.5;

            if (!rafId) {
                rafId = requestAnimationFrame(updateTilt);
            }
        };

        const updateTilt = () => {
            gsap.to(el, {
                rotationY: mouseX * 8, // Reduced intensity for stability
                rotationX: -mouseY * 8,
                duration: 0.8,
                ease: "power2.out",
                overwrite: 'auto'
            });
            rafId = 0;
        };

        const handleMouseLeave = () => {
            if (rafId) cancelAnimationFrame(rafId);
            gsap.to(el, {
                rotationY: 0,
                rotationX: 0,
                duration: 1,
                ease: "elastic.out(1, 0.3)"
            });
        };

        el.addEventListener("mousemove", handleMouseMove);
        el.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            ctx.revert(); // Clean up all GSAP
            el.removeEventListener("mousemove", handleMouseMove);
            el.removeEventListener("mouseleave", handleMouseLeave);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [id]);

    return (
        <div
            ref={itemRef}
            className={cn(
                `bento-item-${id} row-span-1 relative overflow-hidden rounded-3xl group/bento transition-all duration-500 justify-between flex flex-col space-y-4 border border-black/[0.05] bg-white shadow-sm hover:shadow-2xl perspective-1000 will-change-transform`,
                className
            )}
        >
            <div className={`${id === 6 && "flex justify-center"} h-full min-h-[300px]`}>
                <div className="w-full h-full absolute top-0 left-0 overflow-hidden pointer-events-none">
                    {img && (
                        <img
                            ref={imgRef}
                            src={img}
                            alt={img}
                            className={cn(imgClassName, "object-cover object-center w-full h-[130%] -top-[15%] absolute grayscale group-hover/bento:grayscale-0 transition-all duration-700 will-change-transform")}
                        />
                    )}
                </div>

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent opacity-60 pointer-events-none" />

                <div
                    ref={textRef}
                    className={cn(
                        titleClassName,
                        "group-hover/bento:translate-x-2 transition duration-500 relative h-full flex flex-col px-8 p-8 lg:p-12 justify-end z-10"
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
