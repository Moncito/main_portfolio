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

        // Entrance animation
        gsap.fromTo(el, {
            opacity: 0,
            y: 100,
        }, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
                trigger: el,
                start: "top 95%",
            }
        });

        // Parallax effect on image
        if (imgRef.current) {
            gsap.to(imgRef.current, {
                y: -30,
                ease: "none",
                scrollTrigger: {
                    trigger: el,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                }
            });
        }

        // Subtle tilt effect on mouse move
        const handleMouseMove = (e: MouseEvent) => {
            const { left, top, width, height } = el.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;

            gsap.to(el, {
                rotationY: x * 10,
                rotationX: -y * 10,
                duration: 0.5,
                ease: "power2.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(el, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        };

        el.addEventListener("mousemove", handleMouseMove);
        el.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            el.removeEventListener("mousemove", handleMouseMove);
            el.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [id]);

    return (
        <div
            ref={itemRef}
            className={cn(
                `bento-item-${id} row-span-1 relative overflow-hidden rounded-3xl group/bento transition duration-500 justify-between flex flex-col space-y-4 border border-black/[0.05] bg-white shadow-sm hover:shadow-2xl perspective-1000`,
                className
            )}
        >
            <div className={`${id === 6 && "flex justify-center"} h-full min-h-[300px]`}>
                <div className="w-full h-full absolute top-0 left-0 overflow-hidden">
                    {img && (
                        <img
                            ref={imgRef}
                            src={img}
                            alt={img}
                            className={cn(imgClassName, "object-cover object-center w-full h-[120%] -top-[10%] absolute grayscale hover:grayscale-0 transition-all duration-1000")}
                        />
                    )}
                </div>

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60 pointer-events-none" />

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
