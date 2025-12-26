"use client";
import React, { useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const items = ["Strategy", "Next.js", "Three.js", "Branding", "Creative Code"];

export default function Playground() {
  return (
    // Background: Deep Obsidian / Black
    <section className="py-32 bg-[#0A0A0A] overflow-hidden flex flex-col items-center justify-center relative">
      
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ff6d42] opacity-[0.03] blur-[120px] pointer-events-none" />

      <div className="container px-10 mb-20 relative z-10">
        <h2 className="font-display text-8xl md:text-[14rem] text-white leading-none uppercase select-none tracking-tighter italic">
          The <span className="text-[#ff6d42]">Lab</span>
        </h2>
        <div className="flex items-center gap-4 mt-4">
          <div className="h-[1px] w-12 bg-[#ff6d42]" />
          <p className="text-white/30 font-mono uppercase tracking-[0.4em] text-xs">
            Magnetic Prototyping
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-6 max-w-5xl px-10 relative z-10">
        {items.map((item, index) => (
          <MagneticItem key={index} label={item} />
        ))}
      </div>
    </section>
  );
}

function MagneticItem({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Snappier spring for a more "energetic" dark mode feel
  const springConfig = { damping: 12, stiffness: 200 };
  const dx = useSpring(x, springConfig);
  const dy = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Increased pull multiplier (0.5) for a more "tactile" dark mode response
    x.set((clientX - centerX) * 0.5);
    y.set((clientY - centerY) * 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: dx, y: dy }}
      className="relative group"
    >
      <div className="px-10 py-5 border border-white/10 rounded-full bg-white/[0.02] backdrop-blur-sm group-hover:border-[#ff6d42] group-hover:bg-[#ff6d42] transition-all duration-500 ease-out flex items-center justify-center overflow-hidden">
        <span className="font-display text-3xl md:text-4xl text-white uppercase tracking-tighter relative z-10 transition-colors duration-300 group-hover:text-white">
          {label}
        </span>
        
        {/* The "Inner Glow" that follows the mouse inside */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#ff6d42] to-[#ff9171] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Outer Shadow Glow that appears on hover */}
      <div className="absolute inset-0 rounded-full bg-[#ff6d42]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10" />
    </motion.div>
  );
}