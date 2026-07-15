"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface HeroProps {
  hasEntered: boolean;
}

export default function Hero({ hasEntered }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasEntered) return;

    const tl = gsap.timeline({ delay: 0.1 }); // Short delay to let the shutter open fully

    // Reset initial styles
    gsap.set([tagRef.current, titleRef.current, subtitleRef.current, scrollIndicatorRef.current], {
      opacity: 0,
      y: 40,
    });

    tl.to(tagRef.current, {
      opacity: 0.6,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power4.out",
        },
        "-=0.6"
      )
      .to(
        subtitleRef.current,
        {
          opacity: 0.8,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=1.0"
      )
      .to(
        scrollIndicatorRef.current,
        {
          opacity: 0.5,
          y: 0,
          duration: 1.0,
          ease: "power2.out",
        },
        "-=0.5"
      );
  }, [hasEntered]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden"
    >
      {/* Film Grain background noise overlay */}
      <div className="film-grain" />

      {/* Cinematic grid/radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(177,18,38,0.12)_0%,transparent_65%)] pointer-events-none" />

      {/* Viewfinder Border Framing */}
      <div className="absolute inset-6 md:inset-10 border border-white/5 pointer-events-none">
        {/* Border corner details */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/20" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/20" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20" />
      </div>

      <div className="text-center px-6 max-w-4xl z-10 flex flex-col items-center">
        {/* Creator Duo Tag */}
        <p
          ref={tagRef}
          className="text-xs md:text-sm tracking-[0.4em] text-red-600 uppercase font-mono font-bold mb-6 select-none opacity-0"
        >
          JESSIN JOSEPH × ABIN M PRAKASH
        </p>

        {/* Brand Name */}
        <h1
          ref={titleRef}
          className="text-6xl md:text-9xl font-extrabold tracking-[0.18em] leading-none mb-6 select-none opacity-0"
        >
          BEING TOXI
        </h1>

        {/* Roles/Capabilities */}
        <div
          ref={subtitleRef}
          className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-neutral-400 tracking-[0.2em] text-[10px] md:text-xs font-semibold uppercase select-none opacity-0"
        >
          <span>Direction</span>
          <span className="hidden md:inline text-neutral-700 select-none">•</span>
          <span>Videography</span>
          <span className="hidden md:inline text-neutral-700 select-none">•</span>
          <span>Video Editing</span>
          <span className="hidden md:inline text-neutral-700 select-none">•</span>
          <span>TEXT Design</span>
        </div>
      </div>

      {/* Cinematic Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 md:bottom-16 flex flex-col items-center gap-3 select-none opacity-0 pointer-events-none"
      >
        <span className="text-[9px] tracking-[0.35em] uppercase text-neutral-500 font-mono">
          Scroll to explore
        </span>
        <div className="w-[1px] h-14 bg-neutral-500 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-5 bg-red-600 animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}