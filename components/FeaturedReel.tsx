"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FeaturedReel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Fade-in animation for the video player container
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Autoplay handling on scroll trigger
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 60%",
      end: "bottom 20%",
      onEnter: () => {
        if (videoRef.current) {
          videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      },
      onLeave: () => {
        if (videoRef.current) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      onEnterBack: () => {
        if (videoRef.current) {
          videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      },
      onLeaveBack: () => {
        if (videoRef.current) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Update progress bar
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent triggering play/pause
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Scrub video playback
  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    if (videoRef.current && videoRef.current.duration) {
      const newTime = (clickX / width) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setProgress((clickX / width) * 100);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-[#050505] flex items-center justify-center overflow-hidden border-b border-white/5"
    >
      {/* Visual background wrapper */}
      <div
        ref={containerRef}
        onClick={togglePlay}
        className="group relative w-[90%] h-[80%] md:w-[94%] md:h-[86%] bg-black overflow-hidden cursor-pointer border border-white/10 rounded-lg shadow-2xl transition-all duration-700"
      >
        {/* Cinema Letterbox squeeze overlay (Top and Bottom black bars that expand slightly on hover) */}
        <div className="absolute top-0 left-0 right-0 h-0 group-hover:h-6 md:group-hover:h-12 bg-[#050505] transition-all duration-500 ease-in-out z-20 flex items-center px-6 pointer-events-none border-b border-white/5 opacity-0 group-hover:opacity-100">
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-neutral-500">
            CINEMATIC ASPECT RATIO 2.39:1
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-0 group-hover:h-6 md:group-hover:h-12 bg-[#050505] transition-all duration-500 ease-in-out z-20 flex items-center justify-end px-6 pointer-events-none border-t border-white/5 opacity-0 group-hover:opacity-100">
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-neutral-500">
            BEING TOXI SHOWREEL
          </span>
        </div>

        {/* Video Player */}
        <video
          ref={videoRef}
          onTimeUpdate={handleTimeUpdate}
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-102 transition-all duration-700 ease-out"
          loop
          muted={isMuted}
          playsInline
        >
          {/* Main user-supplied project reel */}
          <source src="https://res.cloudinary.com/ubsmxhqk/video/upload/v1784184655/finale_w3jojw.mp4" type="video/mp4" />
          {/* High-quality cinematic public fallback stream */}
          <source
            src="https://www.instagram.com/reel/DYhSp2hhmoo/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
            type="video/mp4"
          />
        </video>

        {/* Gradient dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50 pointer-events-none z-10" />

        {/* Cinematic HUD details overlay */}
        <div className="absolute top-8 left-8 z-20 font-mono text-[10px] md:text-xs tracking-widest text-neutral-400 opacity-80 pointer-events-none group-hover:translate-y-4 md:group-hover:translate-y-8 transition-transform duration-500">
          <p className="text-red-500">● LIVE FEED</p>
          <p className="mt-1">SHOWCASE_REEL_v01.RAW</p>
        </div>

        {/* Glassmorphic Play/Pause Button Indicator */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div
            className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-500 ${
              isPlaying ? "scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100" : "scale-100 opacity-100"
            }`}
          >
            {isPlaying ? (
              // Pause Icon
              <svg
                className="w-6 h-6 md:w-8 md:h-8 text-white fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M6 19h4V5h-4v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              // Play Icon
              <svg
                className="w-6 h-6 md:w-8 md:h-8 text-white fill-current translate-x-0.5"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </div>
        </div>

        {/* Bottom Video Controls Overlay */}
        <div
          onClick={(e) => e.stopPropagation()} // don't toggle playback on click
          className="absolute bottom-8 left-8 right-8 z-30 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:-translate-y-4 md:group-hover:-translate-y-8"
        >
          {/* Progress Timeline Scrub Bar */}
          <div
            onClick={handleScrub}
            className="w-full h-1 bg-white/25 rounded cursor-pointer relative group/timeline hover:h-2 transition-all duration-300"
          >
            {/* Active Progress */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-red-600 rounded transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
            {/* Scrub Handle */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white scale-0 group-hover/timeline:scale-100 transition-transform duration-200"
              style={{ left: `calc(${progress}% - 6px)` }}
            />
          </div>

          {/* Control Buttons */}
          <div className="flex justify-between items-center text-xs md:text-sm font-mono text-neutral-300">
            <button
              onClick={togglePlay}
              className="hover:text-white uppercase tracking-wider text-[11px]"
            >
              {isPlaying ? "PAUSE" : "PLAY"}
            </button>

            {/* Mute toggle button */}
            <button
              onClick={toggleMute}
              className="hover:text-white flex items-center gap-2 uppercase tracking-wider text-[11px]"
            >
              {isMuted ? (
                <>
                  <span>UNMUTE</span>
                  <svg className="w-4 h-4 text-neutral-400 fill-current" viewBox="0 0 24 24">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zM4.34 2.93L2.93 4.34 7.59 9H3v6h4l5 5v-6.59l4.18 4.18c-.65.49-1.37.88-2.18 1.11v2.06c1.37-.3 2.61-.95 3.65-1.81l2.42 2.42 1.41-1.41L4.34 2.93zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                </>
              ) : (
                <>
                  <span>MUTE</span>
                  <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}