"use client";

export default function Footer() {
  return (
    <footer className="bg-black py-10 border-t border-white/5 select-none text-neutral-500 font-mono text-[10px] md:text-xs tracking-widest uppercase">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left Side: Copyright & Attribution */}
        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <p className="text-white font-semibold">
            © {new Date().getFullYear()} BEING TOXI. ALL RIGHTS RESERVED.
          </p>
          <p className="text-neutral-600 font-light text-[9px] md:text-[10px]">
            Designed & Developed by Jessin Joseph & Abin M Prakash
          </p>
        </div>

        {/* Right Side: Film Metadata */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-center md:text-right">
          <div>
            <span className="text-neutral-600">LOC: </span>
            <span className="text-neutral-400">COCHIN, IN / AVAILABLE GLOBAL</span>
          </div>
          <div className="hidden md:block w-[1px] h-4 bg-white/10" />
          <div>
            <span className="text-neutral-600">TZ: </span>
            <span className="text-neutral-400">IST (GMT +5:30)</span>
          </div>
        </div>

      </div>
    </footer>
  );
}