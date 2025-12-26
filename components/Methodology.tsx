"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const STEPS = [
  {
    id: "01",
    phase: "Discovery",
    title: "Deep Dive & Strategy",
    desc: "We dissect your market position and technical requirements to build a roadmap rooted in logic.",
  },
  {
    id: "02",
    phase: "Architecture",
    title: "System Design",
    desc: "Defining the tech stack and user flows. We build the skeleton before we flesh out the soul.",
  },
  {
    id: "03",
    phase: "Execution",
    title: "The Craft",
    desc: "Precision engineering meets avant-garde design. This is where the magic begins to take shape.",
  },
  {
    id: "04",
    phase: "Optimization",
    title: "Refinement",
    desc: "Rigorous testing and performance tuning to ensure the final product outpaces the competition.",
  },
];

export default function Methodology() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Progress tracking for the vertical line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    // Changed bg to Deep Obsidian
    <section ref={containerRef} className="bg-[#1e1e1e] py-32 px-6 md:px-20 relative overflow-hidden">
      
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ff6d42] opacity-[0.02] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 relative z-10">
        
        {/* LEFT COLUMN: Sticky Header */}
        <div className="md:w-1/3">
          <div className="sticky top-32">
            <span className="font-mono text-[#ff6d42] text-xs font-bold uppercase tracking-[0.4em] mb-6 block">
              Methodology
            </span>
            <h2 className="text-6xl md:text-8xl font-medium tracking-tighter text-white leading-none uppercase italic">
              Our <br /> <span className="text-[#ff6d42]">Process</span>
            </h2>
            <p className="mt-10 text-white/30 text-sm max-w-[280px] leading-relaxed uppercase tracking-widest font-mono">
              From raw data to refined digital experiences. We bridge the gap between complexity and clarity.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: The Stepper */}
        <div className="md:w-2/3 relative pl-12 md:pl-20">
          
          {/* BACKGROUND LINE (Dimmed for Dark Mode) */}
          <div className="absolute left-0 top-0 w-[1px] h-full bg-white/10" />
          
          {/* ACTIVE PROGRESS LINE (Glowing Orange) */}
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute left-0 top-0 w-[1px] h-full bg-[#ff6d42] z-10 shadow-[0_0_15px_rgba(255,109,66,0.5)]"
          />

          {/* THE STEPS */}
          <div className="flex flex-col gap-32">
            {STEPS.map((step) => (
              <StepItem key={step.id} {...step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepItem({ id, phase, title, desc }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative group"
    >
      {/* Circle Indicator - Swapped colors for dark theme */}
      <div className="absolute -left-[52.5px] md:-left-[84.5px] top-2 w-3 h-3 rounded-full bg-tertiary border border-white/20 group-hover:border-[#ff6d42] group-hover:bg-[#ff6d42] transition-all duration-500 z-20 shadow-[0_0_10px_rgba(255,109,66,0)] group-hover:shadow-[0_0_15px_rgba(255,109,66,0.6)]" />
      
      <div className="flex flex-col">
        <span className="font-mono text-[10px] text-[#ff6d42] font-bold tracking-[0.3em] uppercase mb-4 opacity-80">
          Phase {id} / {phase}
        </span>
        <h3 className="text-4xl md:text-6xl font-medium tracking-tighter text-white uppercase mb-6 group-hover:text-[#ff6d42] transition-colors duration-500">
          {title}
        </h3>
        <p className="text-white/40 text-lg md:text-xl max-w-xl leading-relaxed font-light group-hover:text-white/70 transition-colors duration-500">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}