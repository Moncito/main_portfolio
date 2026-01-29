"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScrollWrapper({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.5,
        });

        // Use ONLY GSAP ticker for Lenis RAF to ensure perfect synchronization
        function update(time: number) {
            lenis.raf(time * 1000);
        }

        gsap.ticker.add(update);

        // Update ScrollTrigger on Lenis scroll
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.lagSmoothing(0);

        // Store lenis in window for access by other components
        (window as any).lenis = lenis;

        return () => {
            lenis.destroy();
            gsap.ticker.remove(update);
            delete (window as any).lenis;
        };
    }, []);

    return <>{children}</>;
}
