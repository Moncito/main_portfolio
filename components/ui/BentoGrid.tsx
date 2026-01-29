"use client";
import React, { useEffect } from "react";
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
    useEffect(() => {
        gsap.fromTo(`.bento-item-${id}`, {
            opacity: 0,
            y: 50,
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: `.bento-item-${id}`,
                start: "top 95%",
            }
        });
    }, [id]);

    return (
        <div
            className={cn(
                `bento-item-${id} row-span-1 relative overflow-hidden rounded-2xl group/bento transition duration-500 justify-between flex flex-col space-y-4 border border-black/[0.05] bg-white shadow-sm hover:shadow-xl hover:border-black/10`,
                className
            )}
        >
            <div className={`${id === 6 && "flex justify-center"} h-full min-h-[250px]`}>
                <div className="w-full h-full absolute">
                    {img && (
                        <img
                            src={img}
                            alt={img}
                            className={cn(imgClassName, "object-cover object-center group-hover:scale-110 transition-transform duration-1000 grayscale")}
                        />
                    )}
                </div>
                <div
                    className={`absolute right-0 bottom-0 ${id === 5 && "w-full opacity-60"
                        } `}
                >
                    {spareImg && (
                        <img
                            src={spareImg}
                            alt={spareImg}
                            className="object-cover object-center w-full h-full grayscale opacity-20"
                        />
                    )}
                </div>

                <div
                    className={cn(
                        titleClassName,
                        "group-hover/bento:translate-x-2 transition duration-500 relative h-full flex flex-col px-8 p-8 lg:p-12 justify-end"
                    )}
                >
                    <div className="font-syne font-black text-[10px] uppercase tracking-[0.2em] text-black/40 z-10 mb-2">
                        {description}
                    </div>
                    <div
                        className={`font-syne text-2xl lg:text-3xl font-black z-10 uppercase leading-none text-black tracking-tighter`}
                    >
                        {title}
                    </div>
                </div>
            </div>
        </div>
    );
};
