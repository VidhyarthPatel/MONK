"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const titleX = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section
      ref={ref}
      className="bg-tertiary py-40 px-6 md:px-20 overflow-hidden"
    >
      {/* Header */}
      <motion.div
        style={{ x: titleX }}
        className="mb-40"
      >
        <span className="font-mono text-[#ff6d42] tracking-[0.4em] uppercase text-xs">
          Methodology
        </span>
        <h2 className="text-7xl md:text-9xl uppercase italic text-white mt-6 leading-none">
          How We <br />
          <span className="text-[#ff6d42]">Build</span>
        </h2>
      </motion.div>

      {/* Steps */}
      <div className="flex flex-col gap-40">
        {STEPS.map((step, i) => (
          <MethodStep key={step.id} index={i} {...step} />
        ))}
      </div>
    </section>
  );
}

function MethodStep({
  id,
  phase,
  title,
  desc,
  index,
}: {
  id: string;
  phase: string;
  title: string;
  desc: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`relative grid md:grid-cols-2 gap-16 items-center ${
        index % 2 === 0 ? "" : "md:text-right"
      }`}
    >
      {/* Giant Number */}
      <div className="relative">
        <span className="absolute -top-20 text-[160px] md:text-[220px] font-bold italic text-white/5 select-none">
          {id}
        </span>
        <span className="font-mono text-[#ff6d42] tracking-[0.3em] uppercase text-xs">
          Phase {id} / {phase}
        </span>
      </div>

      {/* Content Card */}
      <motion.div
        whileHover={{ x: index % 2 === 0 ? 12 : -12 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        className="group"
      >
        <h3 className="text-5xl md:text-6xl uppercase text-white tracking-tighter mb-6 group-hover:text-[#ff6d42] transition-colors duration-500">
          {title}
        </h3>
        <p className="text-white/40 text-lg max-w-xl leading-relaxed group-hover:text-white/70 transition-colors duration-500">
          {desc}
        </p>

        {/* Underline Accent */}
        <div className="mt-8 h-[1px] w-24 bg-white/10 relative overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-0 bg-[#ff6d42] group-hover:w-full transition-all duration-700" />
        </div>
      </motion.div>
    </motion.div>
  );
}
