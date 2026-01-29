"use client";
import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems } from "@/data";
import Clients from "@/components/Clients";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="relative bg-[#f8f8f8] w-full min-h-screen overflow-x-hidden">
      <CustomCursor />
      <div className="fixed inset-0 fractal-noise pointer-events-none z-[9998]" />
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <FloatingNav navItems={navItems} />

      <div className="flex flex-col items-center">
        <Hero />

        <div className="max-w-7xl w-full px-5 sm:px-10">
          <Grid />
          <RecentProjects />
          <Clients />
          <Experience />
        </div>

        <Footer />
      </div>
    </main>
  );
}