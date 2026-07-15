"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Project {
  id: string;
  number: string;
  title: string;
  videoSrc: string;
  externalLink?: string;
  description: string;
  behindEdit: string;
  credits: {
    jessin: string[];
    abin: string[];
  };
}

const projectsData: Project[] = [
  {
    id: "midnight-run",
    number: "PROJECT 01",
    title: "MIDNIGHT RUN",
    videoSrc: "/videos/showreel.mp4",
    description: "A neon-soaked, gritty short film capturing the adrenaline of a midnight escape through desolate city streets.",
    behindEdit: "To achieve the anamorphic lens flare look, we crafted custom post-processing glow maps and color-graded the shadows with deep teal-green undertones.",
    credits: {
      jessin: ["Direction", "Pacing & Edit"],
      abin: ["Cinematography", "Motion Design"],
    },
  },
  {
    id: "echovisions",
    number: "PROJECT 02",
    title: "ECHOVISIONS",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-animation-of-futuristic-devices-42223-large.mp4",
    description: "A surreal, glitch-art music video exploring memory loops, digital isolation, and cybernetic identity.",
    behindEdit: "We blended 3D volumetric light paths with live-action green screen clips, running them through a custom VHS damage shader in post-production.",
    credits: {
      jessin: ["Direction", "Creative Concept"],
      abin: ["3D Motion Graphics", "VFX Compositing"],
    },
  },
  {
    id: "vanguard-apparel",
    number: "PROJECT 03",
    title: "VANGUARD APPAREL",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-woman-modeling-athleisure-apparel-42240-large.mp4",
    description: "High-octane promotional campaign showcasing athletic wear dynamically in harsh, urban landscapes.",
    behindEdit: "Every cut is synchronized to the sound effects. We layered sub-bass drop effects and metallic whooshes directly in sync with lens whip-pans.",
    credits: {
      jessin: ["Co-direction", "Lead Editing"],
      abin: ["Camera Operator", "Sound Design"],
    },
  },
  {
    id: "solitude",
    number: "PROJECT 04",
    title: "SOLITUDE",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-waves-crashing-on-rocks-from-above-42232-large.mp4",
    description: "An intimate profile documentary of a lighthouse keeper living off the rugged, windswept coastline.",
    behindEdit: "Shot entirely in natural overcast lighting. The challenge was maintaining skin tone accuracy while applying a faded cinematic film stock LUT.",
    credits: {
      jessin: ["Interviewer", "Editing & Pacing"],
      abin: ["Drone Cinematography", "Lead Colorist"],
    },
  },
  {
    id: "metropolis-2088",
    number: "PROJECT 05",
    title: "METROPOLIS 2088",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-futuristic-cyberpunk-city-street-42226-large.mp4",
    externalLink: "https://www.instagram.com/reel/DXWyy6ZCO9F/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    description: "A speculative 3D environment concept trailer displaying a neon cyberpunk future cityscape.",
    behindEdit: "Rendered in Unreal Engine 5, we integrated physical camera tracking data to composite realistic lens dirt, grain, and chromatic aberration.",
    credits: {
      jessin: ["Art Direction", "Sound FX Design"],
      abin: ["3D Animation", "VFX Compositing"],
    },
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const rail = scrollRailRef.current;
    const section = sectionRef.current;
    if (!rail || !section) return;

    // Horizontal Scroll Pinning on all devices
    const getScrollAmount = () => -(rail.scrollWidth - window.innerWidth);

    const tween = gsap.to(rail, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${rail.scrollWidth}`,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full bg-[#050505] h-[600vh]">
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-[#050505]">
        
        {/* Scrollable horizontal rail track */}
        <div
          ref={scrollRailRef}
          className="flex flex-row flex-nowrap h-full w-max items-center"
        >
          {/* Introduction Slide */}
          <div className="w-screen h-screen flex-shrink-0 flex flex-col justify-center px-8 md:px-24 border-r border-white/5 select-none relative">
            <div className="absolute inset-8 md:inset-20 border border-white/5 pointer-events-none">
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20" />
            </div>
            
            <div className="max-w-2xl z-10">
              <span className="font-mono text-xs text-red-600 font-bold tracking-[0.3em] uppercase mb-4 block animate-pulse">
                CREATIVE ARCHIVE
              </span>
              <h2 className="text-4xl md:text-7xl font-extrabold tracking-wide text-white mb-6">
                FEATURED WORK
              </h2>
              <p className="text-neutral-400 font-light text-sm md:text-lg leading-relaxed tracking-wide">
                A showcase of selected videography, editing, and direction projects. 
                <span> Scroll down to navigate sideways.</span>
              </p>
            </div>
          </div>

          {/* Project Slides */}
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="w-screen h-screen flex-shrink-0 flex flex-col md:flex-row items-center justify-center p-6 md:p-20 lg:p-24 border-r border-white/5 select-none bg-black/20 relative"
            >
              {/* Left Side: Video Preview Card */}
              {project.externalLink ? (
                <a
                  href={project.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-[45%] max-w-[420px] aspect-[9/16] relative group/project overflow-hidden border border-white/10 rounded-[1.5rem] shadow-[0_25px_80px_rgba(0,0,0,0.45)] mb-6 md:mb-0 block"
                >
                  <video
                    className="w-full h-full object-cover object-center opacity-60 group-hover/project:opacity-90 group-hover/project:scale-[1.03] transition-all duration-700 ease-out"
                    src={project.videoSrc}
                    loop
                    muted
                    playsInline
                    autoPlay
                    preload="metadata"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="rounded-full border border-white/20 bg-black/40 px-4 py-2 text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-white backdrop-blur-sm">
                      Open Reel
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 font-mono text-[9px] md:text-xs text-neutral-400 tracking-wider">
                    PREVIEW FEED // {project.number}
                  </div>
                </a>
              ) : (
                <div className="w-full md:w-[45%] max-w-[420px] aspect-[9/16] relative group/project overflow-hidden border border-white/10 rounded-[1.5rem] shadow-[0_25px_80px_rgba(0,0,0,0.45)] mb-6 md:mb-0">
                  <video
                    className="w-full h-full object-cover object-center opacity-60 group-hover/project:opacity-90 group-hover/project:scale-[1.03] transition-all duration-700 ease-out"
                    src={project.videoSrc}
                    loop
                    muted
                    playsInline
                    autoPlay
                    preload="metadata"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 font-mono text-[9px] md:text-xs text-neutral-400 tracking-wider">
                    PREVIEW FEED // {project.number}
                  </div>
                </div>
              )}

              {/* Right Side: Project Info */}
              <div className="w-full md:w-1/2 md:pl-12 lg:pl-16 flex flex-col items-start text-left justify-center">
                <span className="font-mono text-[10px] md:text-xs text-red-600 tracking-widest font-bold mb-2">
                  {project.number}
                </span>
                
                <h3 className="text-2xl md:text-5xl font-black tracking-wide text-white mb-4">
                  {project.title}
                </h3>
                
                <p className="text-neutral-400 font-light text-xs md:text-base leading-relaxed mb-4 line-clamp-3 md:line-clamp-none">
                  {project.description}
                </p>

                {/* Behind the Edit Dropdown Box */}
                <div className="w-full bg-[#080808]/80 border border-white/5 rounded-lg p-4 mb-4 md:mb-6 backdrop-blur-md">
                  <h4 className="font-mono text-[9px] md:text-xs text-red-500 uppercase tracking-widest font-semibold mb-1">
                    Behind the Edit
                  </h4>
                  <p className="text-neutral-500 font-light text-[10px] md:text-sm leading-relaxed">
                    {project.behindEdit}
                  </p>
                </div>

                {/* Project Credits split */}
                <div className="grid grid-cols-2 gap-4 md:gap-8 w-full border-t border-white/10 pt-4">
                  <div>
                    <h5 className="font-mono text-[9px] md:text-xs text-neutral-400 uppercase tracking-wider font-semibold mb-1">
                      Jessin Joseph
                    </h5>
                    <div className="flex flex-col gap-0.5">
                      {project.credits.jessin.map((role) => (
                        <span key={role} className="text-[10px] md:text-xs text-neutral-500 font-light">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="font-mono text-[9px] md:text-xs text-neutral-400 uppercase tracking-wider font-semibold mb-1">
                      Abin M Prakash
                    </h5>
                    <div className="flex flex-col gap-0.5">
                      {project.credits.abin.map((role) => (
                        <span key={role} className="text-[10px] md:text-xs text-neutral-500 font-light">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
