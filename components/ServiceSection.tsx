"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const services = [
  { 
    id: "01", 
    title: "Web Engineering", 
    category: "Next.js / Performance", 
    desc: "Architecture designed for speed, SEO, and massive scalability.",
    img: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=1000"
  },
  {
    id: "02",
    title: "Product Design",
    category: "UX / UI Strategy",
    desc: "Human-centric interfaces that convert logic into magic.",
    img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000"
  },
  {
    id: "03",
    title: "AI Integration",
    category: "LLMs / Automation",
    desc: "Embedding intelligence into your workflow using custom GPTs.",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000"
  },
  { 
    id: "04", 
    title: "Brand Systems", 
    category: "Creative Direction", 
    desc: "Visual languages that command authority in saturated markets.",
    img: "https://images.unsplash.com/photo-1635405074683-96d6921a2a68?q=80&w=1000"
  },
];

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full bg-[#FAF9F6] py-32 px-6 md:px-20 overflow-hidden">
      
      {/* SECTION HEADER */}
      <div className="max-w-7xl mx-auto mb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[#ff6d42] font-mono text-xs font-bold uppercase tracking-[0.4em] mb-6 block"
            >
              Expertise & Capabilities
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-black text-6xl md:text-9xl font-medium tracking-tighter leading-[0.85]"
            >
              LOGIC MEETS <br />
              <span className="italic font-light text-[#ff6d42]">Magic.</span>
            </motion.h2>
          </div>
          <div className="md:max-w-xs">
            <p className="text-black/50 text-sm uppercase tracking-widest leading-relaxed">
              We don&apos;t just build features; we architect digital systems that redefine market positions.
            </p>
          </div>
        </div>
      </div>

      {/* SERVICE LIST */}
      <div className="max-w-7xl mx-auto border-t border-black/10">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="group relative flex flex-col md:flex-row items-start md:items-center py-16 border-b border-black/10 cursor-pointer transition-colors duration-500"
          >
            {/* Index Number */}
            <div className="relative z-10 w-20">
              <span className="font-mono text-sm text-black/30 group-hover:text-[#ff6d42] transition-colors duration-300">
                ({service.id})
              </span>
            </div>

            {/* Title & Category */}
            <div className="flex-1">
              <h3 className="text-black text-4xl md:text-7xl font-medium tracking-tighter transition-transform duration-500 group-hover:translate-x-4">
                {service.title}
              </h3>
              <p className="text-black/40 text-xs uppercase tracking-[0.3em] mt-4 font-bold transition-transform duration-500 group-hover:translate-x-6">
                {service.category}
              </p>
            </div>

            {/* Description (Visible on MD+) */}
            <div className="hidden md:block w-1/4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
               <p className="text-black/60 text-sm leading-relaxed">
                 {service.desc}
               </p>
            </div>

            {/* Kinetic Arrow Icon */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 overflow-hidden">
              <motion.div
                variants={{
                  initial: { y: 100, x: -100 },
                  hover: { y: 0, x: 0 }
                }}
                initial="initial"
                animate={hoveredIndex === index ? "hover" : "initial"}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-20 h-20 bg-[#ff6d42] rounded-full flex items-center justify-center text-white"
              >
                <ArrowUpRight size={40} />
              </motion.div>
            </div>

            {/* FLOATING IMAGE PREVIEW (Cursor Follower Effect) */}
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 5 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 0 }}
                  className="absolute left-[40%] top-[-20%] z-50 w-64 h-40 hidden lg:block pointer-events-none"
                >
                  <img 
                    src={service.img} 
                    className="w-full h-full object-cover rounded-2xl shadow-2xl border-4 border-white"
                    alt="preview"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* BOTTOM CTA: The "Elastic" Banner */}
     
    </section>
  );
}