"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ContactLink {
  name: string;
  value: string;
  href: string;
  icon: React.ReactNode;
}

const contactLinks: ContactLink[] = [
  {
    name: "Email",
    value: "jessinj36@gmail.com",
    href: "mailto:hello@beingtoxi.com",
    icon: (
      <svg className="w-6 h-6 text-red-500 fill-current" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    value: "@beingtoxi",
    href: "https://www.instagram.com/_being_toxi?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", // Fallback to main page or user can replace with their link
    icon: (
      <svg className="w-6 h-6 text-red-500 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },

  {
    name: "LinkedIn",
    value: "Jessin Joseph",
    href: "https://www.linkedin.com/in/jessin-joseph-240a5331a?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    icon: (
      <svg className="w-6 h-6 text-red-500 fill-current" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (linksRef.current) {
      gsap.fromTo(
        linksRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: linksRef.current,
            start: "top 85%",
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
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        {/* Section Headers */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-red-600 font-bold tracking-[0.35em] uppercase mb-4 block">
            GET IN TOUCH
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-wide text-white uppercase mb-6">
            START A PROJECT
          </h2>
          <p className="text-neutral-400 font-light text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            Have a project in mind, want to collaborate, or just want to chat about visuals? Drop us a line.
          </p>
        </div>

        {/* Big CTA Email */}
        <a
          href="mailto:hello@beingtoxi.com"
          className="group relative mb-20 text-3xl md:text-6xl lg:text-7xl font-black tracking-wider text-white hover:text-red-500 transition-colors duration-500 text-center uppercase"
        >
          hello@beingtoxi.com
          {/* Animated underline */}
          <span className="absolute left-0 bottom-0 w-0 h-[2px] md:h-[4px] bg-red-600 group-hover:w-full transition-all duration-500 ease-out" />
        </a>

        {/* Contact Grid links */}
        <div
          ref={linksRef}
          className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {contactLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/card flex items-center gap-4 bg-black/40 border border-white/5 rounded-xl p-6 backdrop-blur-md transition-all duration-500 hover:border-red-600/30 hover:bg-neutral-950/40 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(177,18,38,0.04)]"
            >
              {/* Icon Container with subtle animation */}
              <div className="w-12 h-12 rounded-lg bg-neutral-900 flex items-center justify-center border border-white/5 transition-colors duration-500 group-hover/card:bg-red-950/20 group-hover/card:border-red-600/20">
                <div className="group-hover/card:scale-110 transition-transform duration-300">
                  {link.icon}
                </div>
              </div>

              {/* Text metadata */}
              <div>
                <h4 className="font-mono text-[9px] tracking-widest text-neutral-500 uppercase font-semibold">
                  {link.name}
                </h4>
                <p className="text-white text-xs md:text-sm font-medium tracking-wide mt-0.5 group-hover/card:text-red-500 transition-colors duration-300">
                  {link.value}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}