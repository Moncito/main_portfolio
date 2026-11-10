"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, EASE, prefersReduced } from "@/lib/gsap";

/** The column system, drawn. Press G to bring it forward. */
export default function GridOverlay({ ready }: { ready: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const [strong, setStrong] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      if (e.key.toLowerCase() === "g" && !e.metaKey && !e.ctrlKey && !e.altKey) setStrong((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useGSAP(
    () => {
      if (prefersReduced()) return;
      if (!ready) {
        gsap.set(".grid-line", { scaleY: 0 });
        return;
      }
      gsap.to(".grid-line", { scaleY: 1, duration: 1.4, ease: EASE, stagger: 0.04 });
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <div ref={root} className="grid-12 pointer-events-none fixed inset-0 z-40" aria-hidden>
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className={`grid-line h-full origin-top border-x transition-colors duration-500 ${i >= 4 ? "hidden md:block" : ""}`}
          style={{
            borderColor: strong ? "rgba(128,128,128,0.55)" : "rgba(128,128,128,0.14)",
            background: strong ? "rgba(217,255,63,0.07)" : "transparent",
          }}
        />
      ))}
    </div>
  );
}
