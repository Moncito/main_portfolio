"use client";
import { useEffect, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import GridOverlay from "@/components/GridOverlay";
import Cursor from "@/components/Cursor";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import Work from "@/components/Work";
import Apps from "@/components/Apps";
import Experience from "@/components/Experience";
import Marquee from "@/components/Marquee";
import Contact from "@/components/Contact";

export default function Home() {
  const [ready, setReady] = useState(false);

  // Children have mounted and sized the headline, so measure everything once.
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <>
      <Preloader onComplete={() => setReady(true)} />
      <Cursor />
      <GridOverlay ready={ready} />
      <Header ready={ready} />

      <main className="relative z-10 bg-paper">
        <Hero ready={ready} />
        <Statement />
        <Work />
        <Apps />
        <Experience />
        <Marquee />
        <div id="page-end" aria-hidden />
      </main>

      <Contact />
    </>
  );
}
