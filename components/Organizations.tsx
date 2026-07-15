"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const brandsRow1 = [
  "ADOTZEE.in","Acharya.Homies","Malayali From Bangalore"
];

const brandsRow2 = [
  "VOGUE",
  "NIKE",
  "NATIONAL GEOGRAPHIC",
  "VANGUARD APPAREL",
  "MTV INDIA",
  "PUMA",
  "A24 FILMS",
];

export default function Organizations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-36 bg-[#050505] overflow-hidden border-b border-white/5 select-none"
    >
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <span className="font-mono text-xs text-red-600 font-bold tracking-[0.35em] uppercase mb-4 block">
          PARTNERSHIPS
        </span>
        <h2
          ref={titleRef}
          className="text-3xl md:text-5xl font-black tracking-wide text-white uppercase"
        >
          COLLABORATORS & CLIENTS
        </h2>
      </div>

      {/* Marquee Rows Container */}
      <div className="flex flex-col gap-6 md:gap-10 w-full relative">
        {/* Row 1 - Left to Right */}
        <div className="w-full overflow-hidden flex whitespace-nowrap mask-gradient relative">
          <div className="animate-marquee flex gap-8 md:gap-16">
            {/* Duplicate the array twice to ensure seamless infinite scroll */}
            {[...brandsRow1, ...brandsRow1].map((brand, idx) => (
              <span
                key={`${brand}-${idx}`}
                className="text-4xl md:text-7xl font-black text-transparent stroke-text tracking-widest uppercase opacity-20 hover:opacity-70 hover:text-white hover:scale-105 transition-all duration-500 cursor-default"
                style={{
                  WebkitTextStroke: "1px rgba(255, 255, 255, 0.4)",
                }}
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 - Right to Left */}
        <div className="w-full overflow-hidden flex whitespace-nowrap mask-gradient relative">
          <div className="animate-marquee-reverse flex gap-8 md:gap-16">
            {[...brandsRow2, ...brandsRow2].map((brand, idx) => (
              <span
                key={`${brand}-${idx}`}
                className="text-4xl md:text-7xl font-black text-transparent stroke-text tracking-widest uppercase opacity-20 hover:opacity-70 hover:text-white hover:scale-105 transition-all duration-500 cursor-default"
                style={{
                  WebkitTextStroke: "1px rgba(255, 255, 255, 0.4)",
                }}
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* CSS overlay gradient to fade out left/right edges */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#050505] via-transparent to-[#050505] z-10" />
    </section>
  );
}