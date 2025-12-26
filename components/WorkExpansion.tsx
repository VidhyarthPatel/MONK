"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function WorkExpansion() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 1. Circle grows to fill the screen (Scale 1 to 35)
  const circleScale = useTransform(scrollYProgress, [0, 0.9], [1, 8.5]);
  
  /** * 2. Text Scale Adjustment:
   * We start very small (0.05).
   * We grow it, but we STOP growing it at a size that fits the screen.
   * If the text gets "too big," decrease the 1.5 value below.
   */
  const textScale = useTransform(scrollYProgress, [0, 0.1], [0.05, 0.4]);

  return (
    <div ref={containerRef} className="h-[500vh] bg-[#FAF9F6] relative">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* The Expanding Circle */}
        <motion.div
          style={{ scale: circleScale }}
          className="w-48 h-48 md:w-64 md:h-64 bg-tertiary rounded-full flex items-center justify-center relative shadow-2xl"
        >
          {/* By wrapping the text in another motion div, we can control 
             the text size independently so it stays 'pinned' inside.
          */}
          <motion.div style={{ scale: textScale }} className="flex items-center justify-center">
             <h2 className="text-white font-black text-center leading-none pointer-events-none select-none uppercase whitespace-nowrap text-4xl md:text-6xl">
               Let&apos;s Work
             </h2>
          </motion.div>
        </motion.div>

        {/* Floating Arrow - Keeps the clean look of your image */}
        <div className="absolute bottom-10 right-10 z-50">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center bg-white text-black shadow-lg transition-transform hover:scale-110 active:scale-95"
            >
                <span className="text-xl font-bold">↑</span>
            </button>
        </div>
      </div>
    </div>
  );
}