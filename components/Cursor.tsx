"use client";
import { useEffect, useRef } from "react";
import { gsap, EASE } from "@/lib/gsap";

/** Dot cursor. Elements with data-cursor="Label" turn it into a labelled disc. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = dot.current;
    const text = label.current;
    if (!el || !text) return;

    document.documentElement.classList.add("has-cursor");
    gsap.set(el, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });

    let state = "";
    const setState = (next: string) => {
      if (next === state) return;
      state = next;
      const isLabel = next !== "" && next !== "link";
      text.textContent = isLabel ? next : "";
      const size = isLabel ? 92 : next === "link" ? 40 : 12;
      gsap.to(el, { width: size, height: size, duration: 0.45, ease: EASE, overwrite: "auto" });
    };

    const onMove = (e: MouseEvent) => {
      x(e.clientX);
      y(e.clientY);
      gsap.to(el, { autoAlpha: 1, duration: 0.2, overwrite: "auto" });
      const target = e.target as Element | null;
      const labelled = target?.closest?.("[data-cursor]");
      if (labelled) setState(labelled.getAttribute("data-cursor") ?? "");
      else if (target?.closest?.("a, button")) setState("link");
      else setState("");
    };
    const onLeave = () => gsap.to(el, { autoAlpha: 0, duration: 0.2 });

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none invisible fixed left-0 top-0 z-[90] flex h-3 w-3 items-center justify-center rounded-full bg-white mix-blend-difference"
    >
      <span ref={label} className="meta text-black" />
    </div>
  );
}
