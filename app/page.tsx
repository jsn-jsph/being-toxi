"use client";

import { useState, useEffect } from "react";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import FeaturedReel from "@/components/FeaturedReel";
import Projects from "@/components/Projects";
import Organizations from "@/components/Organizations";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);

  // Manage body scroll lock during loading state
  useEffect(() => {
    if (!hasEntered) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [hasEntered]);

  return (
    <>
      {/* Cinematic Opening Screen */}
      <Preloader onEnter={() => setHasEntered(true)} />

      {/* Main Experience Layout */}
      <main className={`relative transition-opacity duration-700 ${hasEntered ? "opacity-100" : "opacity-0"}`}>
        <Hero hasEntered={hasEntered} />
        <Intro />
       <FeaturedReel />
        <Projects />
        <Organizations />
        <Services />
        <Contact />
        <Footer />
      </main>
    </>
  );
}