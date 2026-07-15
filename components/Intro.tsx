"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Intro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger on client mount
    gsap.registerPlugin(ScrollTrigger);

    // Initial states for GSAP scroll entrance animation
    gsap.set(leftPanelRef.current, { x: "-50%", opacity: 0 });
    gsap.set(rightPanelRef.current, { x: "50%", opacity: 0 });
    gsap.set([leftContentRef.current, rightContentRef.current], { opacity: 0, y: 30 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%", // Trigger when section top is 75% down the viewport
        toggleActions: "play none none reverse",
      },
    });

    tl.to(
      [leftPanelRef.current, rightPanelRef.current],
      {
        x: "05%",
        opacity: 1,
        duration: 1.0,
        ease: "power4.out",
        stagger: 0.1,
      }
    ).to(
      [leftContentRef.current, rightContentRef.current],
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
      },
      "-=0.4"
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#050505] flex flex-col md:flex-row overflow-hidden select-none border-b border-white/5"
    >
      {/* Decorative vertical divider line */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5 z-20" />

      {/* LEFT PANEL - JESSIN */}
      <div
        ref={leftPanelRef}
        className="group/left relative flex-1 min-h-[50vh] md:min-h-screen flex flex-col justify-center p-8 md:p-20 lg:p-24 transition-all duration-700 ease-out hover:md:flex-[1.2] hover:bg-neutral-950/40"
      >
        {/* Outline background name */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[14vw] md:text-[8vw] font-black text-white/[0.01] uppercase tracking-[0.2em] pointer-events-none select-none transition-all duration-700 group-hover/left:text-red-600/[0.015] group-hover/left:scale-105">
          JESSIN
        </div>

        {/* Framing brackets inside the panel */}
        <div className="absolute inset-4 md:inset-8 border border-white/5 pointer-events-none transition-colors duration-500 group-hover/left:border-red-600/10">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover/left:border-red-600/40" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover/left:border-red-600/40" />
        </div>

        {/* Content wrapper */}
        <div ref={leftContentRef} className="relative z-10 max-w-lg">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-red-600 font-bold tracking-widest uppercase">
              CREATOR 01
            </span>
            <div className="h-[1px] w-12 bg-red-600/50" />
          </div>

         <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-none mb-5 transition-colors duration-500 group-hover/left:text-red-500">
  JESSIN JOSEPH
</h2>

          <div className="flex flex-wrap gap-2 mb-8">
            {["Director", "Videographer", "Editor"].map((role) => (
              <span
                key={role}
                className="font-mono text-[10px] md:text-xs tracking-wider uppercase border border-white/10 px-3 py-1 rounded-full text-neutral-400 bg-neutral-900/50 transition-colors duration-300 group-hover/left:border-red-600/20 group-hover/left:text-neutral-200"
              >
                {role}
              </span>
            ))}
          </div>

          <p className="text-neutral-400 font-light text-sm md:text-base leading-relaxed tracking-wide group-hover/left:text-neutral-300 transition-colors duration-500">
            Sculpting visual narratives through deliberate framing and precise pacing. Specialist in commercials, narrative films, and high-energy music videos that command attention and define brands.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL - ABIN */}
      <div
        ref={rightPanelRef}
        className="group/right relative flex-1 min-h-[50vh] md:min-h-screen flex flex-col justify-center p-8 md:p-20 lg:p-24 transition-all duration-700 ease-out hover:md:flex-[1.2] hover:bg-neutral-950/40"
      >
        {/* Outline background name */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[14vw] md:text-[8vw] font-black text-white/[0.01] uppercase tracking-[0.2em] pointer-events-none select-none transition-all duration-700 group-hover/right:text-red-600/[0.015] group-hover/right:scale-105">
          ABIN
        </div>

        {/* Framing brackets inside the panel */}
        <div className="absolute inset-4 md:inset-8 border border-white/5 pointer-events-none transition-colors duration-500 group-hover/right:border-red-600/10">
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover/right:border-red-600/40" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover/right:border-red-600/40" />
        </div>

        {/* Content wrapper */}
        <div ref={rightContentRef} className="relative z-10 max-w-lg">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-red-600 font-bold tracking-widest uppercase">
              CREATOR 02
            </span>
            <div className="h-[1px] w-12 bg-red-600/50" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-none mb-5 transition-colors duration-500 group-hover/right:text-red-500">
  ABIN M PRAKASH
</h2>

          <div className="flex flex-wrap gap-2 mb-8">
            {["Videographer", "Editor", "Motion Designer"].map((role) => (
              <span
                key={role}
                className="font-mono text-[10px] md:text-xs tracking-wider uppercase border border-white/10 px-3 py-1 rounded-full text-neutral-400 bg-neutral-900/50 transition-colors duration-300 group-hover/right:border-red-600/20 group-hover/right:text-neutral-200"
              >
                {role}
              </span>
            ))}
          </div>

          <p className="text-neutral-400 font-light text-sm md:text-base leading-relaxed tracking-wide group-hover/right:text-neutral-300 transition-colors duration-500">
            Fusing dynamic physical camera movement with cutting-edge 3D graphics and VFX. Elevating cinematic films, brand promos, and custom spatial audio design into high-fidelity digital art.
          </p>
        </div>
      </div>
    </section>
  );
}