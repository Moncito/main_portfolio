"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isOnDark, setIsOnDark] = useState(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return;

        const onMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;

            gsap.to(cursor, {
                x: clientX,
                y: clientY,
                duration: 0.1,
            });

            gsap.to(follower, {
                x: clientX,
                y: clientY,
                duration: 0.3,
            });

            // Check if cursor is over dark background (footer)
            const elementUnderCursor = document.elementFromPoint(clientX, clientY);
            if (elementUnderCursor) {
                const isDarkBg = elementUnderCursor.closest('footer') ||
                    elementUnderCursor.closest('.dark-section') ||
                    elementUnderCursor.closest('[data-dark-bg]');
                setIsOnDark(!!isDarkBg);
            }
        };

        const onMouseEnter = (e: any) => {
            if (e.target.closest('a') || e.target.closest('button') || e.target.classList.contains('cursor-pointer')) {
                setIsHovering(true);
                gsap.to(follower, {
                    scale: 3,
                    backgroundColor: isOnDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                    duration: 0.3
                });
            }
        };

        const onMouseLeave = (e: any) => {
            setIsHovering(false);
            gsap.to(follower, {
                scale: 1,
                backgroundColor: "transparent",
                duration: 0.3
            });
        };

        window.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseover", onMouseEnter);
        document.addEventListener("mouseout", onMouseLeave);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseover", onMouseEnter);
            document.removeEventListener("mouseout", onMouseLeave);
        };
    }, [isOnDark]);

    return (
        <>
            <div
                ref={cursorRef}
                className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 hidden md:block transition-colors duration-300 ${isOnDark ? 'bg-white' : 'bg-black'
                    }`}
            />
            <div
                ref={followerRef}
                className={`fixed top-0 left-0 w-10 h-10 border rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block transition-colors duration-300 ${isOnDark ? 'border-white/20' : 'border-black/10'
                    }`}
            />
        </>
    );
};

export default CustomCursor;
