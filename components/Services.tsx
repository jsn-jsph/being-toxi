"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ServiceItem {
  id: string;
  num: string;
  title: string;
  description: string;
  details: string[];
}

const servicesList: ServiceItem[] = [
  {
    id: "direction",
    num: "01",
    title: "Direction",
    description: "Developing the overarching creative vision and guiding the narrative arc from script to screen.",
    details: ["Concept Development", "Pre-visualization", "Creative Direction", "Talent Coordination"],
  },
  {
    id: "videography",
    num: "02",
    title: "Videography",
    description: "Capturing striking, high-fidelity moving images with professional gear and dynamic movement.",
    details: ["4K Cinematography", "FPV & Drone Footage", "Gimbal & Rig Operations", "Lighting Design"],
  },
  {
    id: "editing",
    num: "03",
    title: "Video Editing",
    description: "Sculpting raw clips into polished stories, pacing edits perfectly to rhythm and audio cues.",
    details: ["Continuity & Story Assembly", "Sound Design & Sync", "Color Grading (LUTs)", "Pacing & Rhythm Optimization"],
  },
  {
    id: "motion-design",
    num: "04",
    title: "Motion Design",
    description: "Designing custom graphic overlays, VFX, and title animations to elevate visual production.",
    details: ["3D Camera Tracking", "Glitch & Title Animation", "Green Screen Compositing", "Promotional Promos VFX"],
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-36 bg-[#050505] border-b border-white/5 select-none"
    >
      {/* Background cinematic highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-[radial-gradient(circle,rgba(177,18,38,0.04)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <span className="font-mono text-xs text-red-600 font-bold tracking-[0.35em] uppercase mb-4 block">
          CAPABILITIES
        </span>
        <h2 className="text-3xl md:text-5xl font-black tracking-wide text-white uppercase">
          WHAT WE DO
        </h2>
      </div>

      {/* Services Grid */}
      <div
        ref={cardsRef}
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10"
      >
        {servicesList.map((service) => (
          <div
            key={service.id}
            className="group relative bg-black/40 border border-white/5 rounded-xl p-8 backdrop-blur-md transition-all duration-500 hover:border-red-600/30 hover:shadow-[0_10px_30px_rgba(177,18,38,0.06)] hover:-translate-y-2 flex flex-col justify-between min-h-[320px]"
          >
            {/* Top Border Indicator */}
            <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-red-600/0 to-transparent group-hover:via-red-600/80 transition-all duration-700" />

            <div>
              {/* Number and Title */}
              <div className="flex justify-between items-start mb-6">
                <span className="font-mono text-xl text-red-600 font-black tracking-wider leading-none">
                  {service.num}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide mb-4 transition-colors duration-500 group-hover:text-red-500">
                {service.title}
              </h3>

              <p className="text-neutral-400 font-light text-xs md:text-sm leading-relaxed tracking-wide mb-6">
                {service.description}
              </p>
            </div>

            {/* Capability Bullets */}
            <div className="border-t border-white/5 pt-4">
              <ul className="flex flex-col gap-1.5">
                {service.details.map((detail) => (
                  <li
                    key={detail}
                    className="text-[10px] md:text-xs text-neutral-500 font-mono tracking-wide flex items-center gap-2 group-hover:text-neutral-400 transition-colors duration-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600/40 group-hover:bg-red-600" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}