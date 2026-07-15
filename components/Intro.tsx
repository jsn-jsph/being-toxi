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
    start: "top 70%",
    end: "bottom center",
    toggleActions: "play none none reverse",
  },
});

tl.to([leftPanelRef.current, rightPanelRef.current], {
  x: 0,
  opacity: 1,
  duration: 1.2,
  ease: "power4.out",
  stagger: 0.15,
})
.fromTo(
  [leftContentRef.current, rightContentRef.current],
  {
    y: 40,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.2,
  },
  "-=0.6"
);
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
  ref={sectionRef}
  className="relative flex flex-col lg:flex-row min-h-screen bg-black overflow-hidden"
> 
      {/* LEFT PANEL - JESSIN */}
      <div
        ref={leftPanelRef}
        className="group/left relative flex-1 min-h-[50vh] md:min-h-screen flex items-center justify-center transition-all duration-700 ease-out hover:md:flex-[1.2] hover:bg-neutral-950/40">
        {/* Outline background name */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[14vw] md:text-[8vw] font-black text-white/[0.01] uppercase tracking-[0.2em] pointer-events-none select-none transition-all duration-700 group-hover/left:text-red-600/[0.015] group-hover/left:scale-105">
          JESSIN
        </div>

        {/* Framing brackets inside the panel */}
        <div className="absolute inset-6 md:inset-10 border border-white/5 pointer-events-none transition-colors duration-500 group-hover/left:border-red-600/10">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover/left:border-red-600/40" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover/left:border-red-600/40" />
        </div>

        {/* Content wrapper */}
       <div
  ref={leftContentRef}
  className="relative z-10 w-[78%] max-w-xl"
>
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

          <p className="w-full text-neutral-400 font-light text-sm md:text-base leading-8 tracking-wide group-hover/left:text-neutral-300 transition-colors duration-500">
           Hi, I'm Jessin Joseph.
I am a 3rd-year BCA Data Science student with intermediate-level expertise in video production. From filming to post-production, I apply my skills in videography, editing, and direction to deliver polished, high-quality visual content.</p>
        </div>
      </div>

      {/* RIGHT PANEL - ABIN */}
      <div
  ref={rightPanelRef}
  className="group/right relative flex-1 min-h-[50vh] md:min-h-screen flex items-center justify-center transition-all duration-700 ease-out hover:md:flex-[1.2] hover:bg-neutral-950/40"
>
        {/* Outline background name */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[14vw] md:text-[8vw] font-black text-white/[0.01] uppercase tracking-[0.2em] pointer-events-none select-none transition-all duration-700 group-hover/right:text-red-600/[0.015] group-hover/right:scale-105">
          ABIN
        </div>

        {/* Framing brackets inside the panel */}
        <div className="absolute inset-6 md:inset-10 border border-white/5 pointer-events-none transition-colors duration-500 group-hover/right:border-red-600/10">
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover/right:border-red-600/40" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover/right:border-red-600/40" />
        </div>

        {/* Content wrapper */}
        <div
  ref={rightContentRef}
  className="relative z-10 flex flex-col items-start w-full max-w-lg"
>
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
            {["Videographer", "DOCUMENTATION", "TEXT EDITOR"].map((role) => (
              <span
                key={role}
                className="font-mono text-[10px] md:text-xs tracking-wider uppercase border border-white/10 px-3 py-1 rounded-full text-neutral-400 bg-neutral-900/50 transition-colors duration-300 group-hover/right:border-red-600/20 group-hover/right:text-neutral-200"
              >
                {role}
              </span>
            ))}
          </div>

          <p className="text-neutral-400 font-light text-sm md:text-base leading-relaxed tracking-wide group-hover/right:text-neutral-300 transition-colors duration-500">
          Hi, I'm Abin M Prakash.
I am a 3rd-year Mechanical Engineering student with intermediate-level skills in text editing and video production. I handle everything from polishing written copy to videography and direction, ensuring clear, well-structured, and visually engaging content.</p>
        </div>
      </div>
    </section>
  );
}