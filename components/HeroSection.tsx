"use client";

import { motion } from "framer-motion";
import Counter from "./Counter";

export default function HeroSection() {
  return (
    <section className="relative bg-[#f3e5da] h-screen pt-24 md:pt-40 flex flex-col justify-between overflow-hidden">
      
      {/* 1. TOP CONTENT GRID */}
      <div className="max-w-9xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center justify-center">

        {/* Left: Main Headline */}
        <div className="lg:col-span-7">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[92px] font-medium leading-[1] lg:leading-[0.95] tracking-tight text-[#111111] lg:w-[50vw]">
            Let&apos;s sharpen your brand with quality work
          </h1>
        </div>

        {/* Right: Stats & Description */}
        <div className="lg:col-span-5 space-y-10 md:space-y-12">
          {/* Stats Row */}
          <div className="flex flex-wrap gap-10 md:gap-20">
            <div className="flex-1 min-w-[120px]">
              <Counter value={98} label={``} suffix="%"/>
              <p className="text-[10px] md:text-xs uppercase opacity-60 mt-2 leading-tight tracking-wider font-bold">
                Average clients satisfied<br className="hidden md:block"/> and repeating
              </p>
            </div>
            <div className="flex-1 min-w-[120px]">
              <Counter value={120} label={``} suffix="+"/>
              <p className="text-[10px] md:text-xs uppercase opacity-60 mt-2 leading-tight tracking-wider font-bold">
                Successfully projects done<br className="hidden md:block"/> in 24 countries
              </p>
            </div>
          </div>
          
          {/* Description Block */}
          <div className="pt-8 border-t border-black/10">
            <p className="text-xl md:text-2xl text-[#111111]/80 max-w-[400px] leading-relaxed">
              We&apos;re a digital products design & development agency that works passionately with digital experiences.
            </p>
          </div>
        </div>
      </div>

      {/* 2. BIG BOLD TEXT (BOTTOM) */}
      <div className="relative mt-12 md:mt-0">
        <motion.div 
            initial={{ y: "20%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
            className="w-full flex justify-center items-end pb-0"
        >
          {/* Adjusted text size for mobile and used negative margin to "tuck" it into the bottom */}
          <h2 className="text-[32vw] font-black text-[#ff6d42] leading-[0.8] uppercase tracking-tighter select-none -mb-[5vw] md:-mb-[8vw]">
            MONK
          </h2>
        </motion.div>
      </div>
      
    </section>
  );
}