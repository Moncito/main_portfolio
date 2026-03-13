"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        // Disable custom cursor on touch/coarse pointers (mobile/tablet UX).
        const media = window.matchMedia("(hover: hover) and (pointer: fine)");
        const update = () => setIsEnabled(media.matches);
        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, []);

    useEffect(() => {
        if (!isEnabled) return;

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
        };

        const onMouseEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            if (target?.closest("a") || target?.closest("button") || target?.classList.contains("cursor-pointer")) {
                gsap.to(follower, {
                    scale: 2.6,
                    backgroundColor: "rgba(255,255,255,0.12)",
                    duration: 0.3
                });
            }
        };

        const onMouseLeave = () => {
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
    }, [isEnabled]);

    if (!isEnabled) return null;

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 bg-white mix-blend-difference"
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-10 h-10 border border-white/60 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
            />
        </>
    );
};

export default CustomCursor;
