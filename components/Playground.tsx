"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Different parallax speeds for the layers
  const xLeft = useTransform(scrollYProgress, [0, 1], ["20%", "-40%"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["-20%", "40%"]);
  const springXLeft = useSpring(xLeft, { stiffness: 50, damping: 20 });
  const springXRight = useSpring(xRight, { stiffness: 50, damping: 20 });

  return (
    <section 
      ref={containerRef} 
      className="bg-tertiary py-40 overflow-hidden relative flex flex-col justify-center"
    >
      {/* BACKGROUND ACCENT */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#ff6d42]/10 blur-[150px] pointer-events-none rounded-full" />

      {/* ROW 1: LARGE OUTLINE TEXT */}
      <motion.div style={{ x: springXLeft }} className="whitespace-nowrap mb-4">
        <h2 className="text-[15vw] font-bold uppercase leading-none text-transparent italic" 
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}>
          Disrupting the Ordinary — Disrupting the Ordinary
        </h2>
      </motion.div>

      {/* ROW 2: SOLID CORE MESSAGE */}
      <div className="relative z-10 px-6 md:px-20 py-10">
        <div className="max-w-4xl mx-auto text-center md:text-left">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-mono text-[#ff6d42] text-xs font-bold uppercase tracking-[0.5em] mb-8 block"
          >
            Our Manifesto
          </motion.span>
          <motion.h3 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl text-white font-medium tracking-tighter uppercase leading-[0.9]"
          >
            WE BUILD FOR THE <br /> 
            <span className="text-[#ff6d42]">REBEL MINDS</span> AND <br />
            SYSTEM SHAKERS.
          </motion.h3>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-white/40 text-lg md:text-2xl max-w-2xl leading-relaxed font-light"
          >
            In a world of templated solutions, we choose the difficult path. 
            We blend architectural precision with avant-garde chaos to create 
            digital artifacts that cannot be ignored.
          </motion.p>
        </div>
      </div>

      {/* ROW 3: LARGE OUTLINE TEXT (OPPOSITE DIRECTION) */}
      <motion.div style={{ x: springXRight }} className="whitespace-nowrap mt-4">
        <h2 className="text-[15vw] font-bold uppercase leading-none text-transparent italic" 
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}>
          Stay Radical — Stay Radical — Stay Radical
        </h2>
      </motion.div>

      {/* DECORATIVE TERMINAL STATS */}
      <div className="absolute bottom-10 left-10 hidden lg:block">
        <div className="font-mono text-[10px] text-white/10 uppercase tracking-widest space-y-1">
          <p>Status: Transmitting Beliefs</p>
          <p>Origin: 23.44° N / 12.01° E</p>
          <p>Protocol: Non-Conformist</p>
        </div>
      </div>
    </section>
  );
}