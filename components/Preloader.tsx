"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onEnter: () => void;
}

export default function Preloader({ onEnter }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  
  // Shutter panels for the exit transition
  const topShutterRef = useRef<HTMLDivElement>(null);
  const bottomShutterRef = useRef<HTMLDivElement>(null);

  const [timecode, setTimecode] = useState("00:00:00:00");
  const [isBlinking, setIsBlinking] = useState(true);

  // Timecode ticking at 24fps (SMPTE style)
  useEffect(() => {
    let start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const totalFrames = Math.floor(elapsed / (1000 / 24));
      
      const frames = totalFrames % 24;
      const totalSeconds = Math.floor(totalFrames / 24);
      const seconds = totalSeconds % 60;
      const totalMinutes = Math.floor(totalSeconds / 60);
      const minutes = totalMinutes % 60;
      const hours = Math.floor(totalMinutes / 60) % 24;

      const pad = (num: number) => String(num).padStart(2, "0");
      setTimecode(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`);
    }, 41.67); // 1000ms / 24 frames ≈ 41.67ms

    return () => clearInterval(interval);
  }, []);

  // Blinking REC dot
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking((b) => !b);
    }, 1000);
    return () => clearInterval(blinkInterval);
  }, []);

  // Entrance animations for Preloader elements
  useEffect(() => {
    const tl = gsap.timeline();

    // Reset shutter positions just in case
    gsap.set([topShutterRef.current, bottomShutterRef.current], { height: 0 });

    tl.fromTo(
      hudRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power2.out" }
    );

    // Cinematic split-character text reveal for "BEING TOXI"
    if (titleRef.current) {
      const text = titleRef.current.innerText;
      titleRef.current.innerHTML = text
        .split("")
        .map((char) => `<span class="inline-block opacity-0">${char === " " ? "&nbsp;" : char}</span>`)
        .join("");

      tl.to(
        titleRef.current.querySelectorAll("span"),
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.5"
      );
    }

    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 15 },
      { opacity: 0.7, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    );

    tl.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );
  }, []);

  const handleEnter = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Callback to notify parent that the preloader sequence is complete
        onEnter();
      },
    });

    // Shutter Sound Visual Mimicry: Fast Shutter snap closed -> open
    tl.to([topShutterRef.current, bottomShutterRef.current], {
      height: "50vh",
      duration: 0.35,
      ease: "power4.inOut",
    })
      .to(
        [hudRef.current, titleRef.current, subtitleRef.current, buttonRef.current],
        {
          opacity: 0,
          duration: 0.1,
        },
        "-=0.15"
      )
      .to([topShutterRef.current, bottomShutterRef.current], {
        height: 0,
        duration: 0.55,
        ease: "power4.inOut",
        delay: 0.15, // brief black screen moment
      })
      .to(containerRef.current, {
        display: "none",
        duration: 0,
      });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center overflow-hidden select-none"
    >
      {/* Visual Shutter Panels */}
      <div
        ref={topShutterRef}
        className="fixed top-0 left-0 right-0 bg-[#080808] z-50 border-b border-neutral-800"
        style={{ height: 0 }}
      />
      <div
        ref={bottomShutterRef}
        className="fixed bottom-0 left-0 right-0 bg-[#080808] z-50 border-t border-neutral-800"
        style={{ height: 0 }}
      />

      {/* CAMERA HUD LAYER */}
      <div
        ref={hudRef}
        className="absolute inset-0 p-6 md:p-12 flex flex-col justify-between pointer-events-none text-xs md:text-sm font-mono tracking-widest text-neutral-400"
      >
        {/* Top HUD */}
        <div className="flex justify-between items-start w-full">
          <div className="flex items-center gap-2">
            <span
              className={`inline-block w-3 h-3 rounded-full bg-red-600 transition-opacity duration-300 ${
                isBlinking ? "opacity-100" : "opacity-20"
              }`}
            />
            <span className="text-white font-bold">REC</span>
          </div>
          <div>{timecode}</div>
        </div>

        {/* Center Crosshair Viewfinder Brackets */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          {/* Brackets */}
          <div className="relative w-64 h-64 md:w-96 md:h-96">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white" />
            {/* Center + */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-light text-2xl">
              +
            </div>
          </div>
        </div>

        {/* Bottom HUD */}
        <div className="flex justify-between items-end w-full">
          <div>16:9 RAW</div>
          <div className="flex items-center gap-4">
            <span>4K 60FPS</span>
            <span className="border border-neutral-500 px-1 py-0.5 rounded text-[10px] md:text-xs">
              🔋 100%
            </span>
          </div>
        </div>
      </div>

      {/* CENTER CINEMATIC TEXT & ACTION */}
      <div className="text-center px-6 z-10 flex flex-col items-center">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold tracking-[0.25em] text-white select-none leading-none mb-4"
        >
          BEING TOXI
        </h1>
        <p
          ref={subtitleRef}
          className="text-neutral-400 font-sans tracking-wide text-sm md:text-lg max-w-md uppercase font-light"
        >
          Two Creators. One Vision.
        </p>

        {/* Enter Experience Button */}
        <button
          ref={buttonRef}
          onClick={handleEnter}
          className="group mt-12 relative px-8 py-3 border border-red-600 rounded-full text-white text-xs md:text-sm font-semibold tracking-[0.2em] uppercase overflow-hidden cursor-pointer hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all duration-300"
        >
          <span className="relative z-10">View Portfolio</span>
          <span className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </button>
      </div>
    </div>
  );
}
