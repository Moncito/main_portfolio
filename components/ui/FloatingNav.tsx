"use client";
import React, { useState } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { FaHome, FaUser, FaProjectDiagram, FaComment, FaEnvelope } from "react-icons/fa";

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
    const [lastScrollY, setLastScrollY] = useState(0);

    // Map names to icons for mobile if not provided
    const getIcon = (name: string) => {
        switch (name.toLowerCase()) {
            case 'about': return <FaUser />;
            case 'projects': return <FaProjectDiagram />;
            case 'testimonials': return <FaComment />;
            case 'contact': return <FaEnvelope />;
            default: return <FaHome />;
        }
    };

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        if (typeof current === "number") {
            const currentScrollY = window.scrollY;
            const direction = currentScrollY - lastScrollY;

            if (currentScrollY < 150) {
                setVisible(false);
            } else if (direction > 10) {
                setVisible(false);
            } else if (direction < -10) {
                setVisible(true);
            }
            setLastScrollY(currentScrollY);
        }
    });

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, link: string) => {
        e.preventDefault();
        const targetId = link.replace("#", "");
        const lenis = (window as any).lenis;
        const elem = document.getElementById(targetId);

        if (lenis) {
            lenis.scrollTo(`#${targetId}`, {
                duration: 1.5,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
        } else if (elem) {
            elem.scrollIntoView({
                behavior: "smooth",
            });
        }
    };

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
                    duration: 0.4,
                    ease: [0.23, 1, 0.32, 1],
                }}
                className={cn(
                    "flex max-w-fit fixed top-4 md:top-8 inset-x-0 mx-auto z-[5000] px-4 md:px-6 py-2.5 items-center justify-center space-x-4 md:space-x-10 rounded-full border border-white/20 bg-white/40 backdrop-blur-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.08)]",
                    className
                )}
            >
                {navItems.map((navItem: any, idx: number) => (
                    <a
                        key={`link=${idx}`}
                        href={navItem.link}
                        onClick={(e) => handleScroll(e, navItem.link)}
                        className={cn(
                            "relative group text-black/50 hover:text-black items-center flex space-x-1 transition-all duration-300 font-syne font-black text-[10px] uppercase tracking-[0.1em] md:tracking-[0.2em]"
                        )}
                    >
                        <span className="block md:hidden text-lg">{navItem.icon || getIcon(navItem.name)}</span>
                        <span className="hidden md:block">{navItem.name}</span>

                        {/* Underline Indicator - Desktop Only */}
                        <span className="hidden md:block absolute -bottom-1 left-0 w-0 h-[1.5px] bg-black transition-all duration-500 group-hover:w-full" />
                    </a>
                ))}

                <button
                    onClick={(e) => handleScroll(e as any, "#contact")}
                    className="relative group overflow-hidden border border-black/5 text-[10px] font-black uppercase tracking-widest bg-black text-white px-4 md:px-8 py-2 md:py-2.5 rounded-full transition-all font-syne"
                >
                    <span className="relative z-10 group-hover:text-black group-hover:italic transition-all duration-300">
                        <span className="md:hidden">Talk</span>
                        <span className="hidden md:block">Let&apos;s Talk</span>
                    </span>
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                </button>
            </motion.div>
        </AnimatePresence>
    );
};
