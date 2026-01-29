"use client";
import React, { useState } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const FloatingNav = ({
    navItems,
    className,
}: {
    navItems: {
        name: string;
        link: string;
        icon?: React.ReactNode;
    }[];
    className?: string;
}) => {
    const { scrollYProgress } = useScroll();

    const [visible, setVisible] = useState(false);

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        if (typeof current === "number") {
            let direction = current! - scrollYProgress.getPrevious()!;

            if (scrollYProgress.get() < 0.05) {
                setVisible(false);
            } else {
                if (direction < 0) {
                    setVisible(true);
                } else {
                    setVisible(false);
                }
            }
        }
    });

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{
                    opacity: 1,
                    y: -100,
                }}
                animate={{
                    y: visible ? 0 : -100,
                    opacity: visible ? 1 : 0,
                }}
                transition={{
                    duration: 0.2,
                }}
                className={cn(
                    "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-black/5 rounded-full bg-white/80 backdrop-blur-md z-[5000] pr-2 pl-8 py-3 items-center justify-center space-x-6 shadow-xl shadow-black/5",
                    className
                )}
            >
                {navItems.map((navItem: any, idx: number) => (
                    <Link
                        key={`link=${idx}`}
                        href={navItem.link}
                        className={cn(
                            "relative text-black items-center flex space-x-1 hover:opacity-40 transition-opacity font-syne font-black text-[10px] uppercase tracking-widest"
                        )}
                    >
                        <span className="block sm:hidden">{navItem.icon}</span>
                        <span className="hidden sm:block">{navItem.name}</span>
                    </Link>
                ))}
                <button className="border border-black text-[10px] font-black uppercase tracking-widest bg-black text-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all font-syne italic">
                    <span>Let&apos;s Talk</span>
                </button>
            </motion.div>
        </AnimatePresence>
    );
};
