"use client";

import { motion } from "framer-motion";
import Counter from "./Counter";

export default function HeroSection() {
  return (
    <section className="relative bg-[#f3e5da] min-h-screen pt-40 flex flex-col justify-between overflow-hidden">
      
      {/* 1. TOP CONTENT GRID */}
      <div className="flex items-center justify-center">

        {/* left: Main Headline */}
        <div className="col-span-12 lg:col-span-6 w-[50vw] mx-auto">
          <h1 className="text-7xl md:text-[92px] font-medium leading-[0.95] tracking-tight text-[#111111]">
            Let&apos;s sharpen your brand with quality work
          </h1>
        </div>

        {/* Right: Stats & Description */}
        <div className="col-span-12 lg:col-span-5 lg:pl-10 space-y-12 mr-40">
          <div className="flex gap-20">
            <div>
              <Counter value={98} label={``} suffix="%"/>
              <p className="text-xs uppercase opacity-60 mt-2 leading-tight">Average clients satisfied<br/>and repeating</p>
            </div>
            <div>
              <Counter value={120} label={``} suffix="+"/>
              <p className="text-xs uppercase opacity-60 mt-2 leading-tight">Successfully projects done<br/>in 24 countries</p>
            </div>
          </div>
          
          <div className="pt-10 border-t border-black/10">
            <p className="text-2xl text-[#111111]/80 max-w-[400px]">
                We&apos;re a digital products design & development agency that works passionately with the digital experiences.
            </p>
          </div>
        </div>
      </div>

      {/* 2. BIG BOLD TEXT (BOTTOM) */}
      <div className="relative mt-20 md:mt-0">
        <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.5 }}
            className="w-full flex justify-center translate-y-[15%]"
        >
          <h2 className="text-[28vw] md:text-[32vw] font-black text-[#ff6d42] leading-none uppercase tracking-tighter select-none">
            MONK
          </h2>
        </motion.div>

        {/* <div className="h-screen bg-white"></div> */}


      </div>
      
    </section>
  );
}