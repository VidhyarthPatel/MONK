"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const PROJECTS = [
  { id: 1, title: "NEOMARKET", sub: "BRANDING • PRODUCT DESIGN", img: "https://images.unsplash.com/photo-1517816428104-797678c7cf0c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 2, title: "STOREFRONT", sub: "BRANDING • PRODUCT DESIGN", img: "https://wp.ravextheme.com/redox/wp-content/uploads/2025/05/ax-pf-dt-portfolio-03.webp" },
  { id: 3, title: "RESHAPE", sub: "BRANDING • PRODUCT DESIGN", img: "https://wp.ravextheme.com/redox/wp-content/uploads/2025/05/ax-pf-dt-portfolio-04.webp" },
  { id: 4, title: "DESIGNSHOP", sub: "PRODUCT DESIGN", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2564" },
  { id: 5, title: "LOCALART", sub: "PRODUCT DESIGN", img: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=2564" },
];

const INFINITE_PROJECTS = [...PROJECTS, ...PROJECTS, ...PROJECTS];

// UPDATED MATH FOR 600px WIDE CARDS
const CARD_WIDTH = 600; 
const GAP = 40; 
const TOTAL_WIDTH = CARD_WIDTH + GAP;

export default function InfiniteMagneticShowcase() {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const baseWidth = PROJECTS.length * TOTAL_WIDTH;

  useEffect(() => {
    x.set(-baseWidth);
  }, [baseWidth, x]);

  const scrollTo = (targetX: number) => {
    animate(x, targetX, {
      type: "spring",
      stiffness: 250, // Slightly smoother for premium feel
      damping: 30,
      restDelta: 0.5,
      onUpdate: (latest) => {
        if (latest <= -(baseWidth * 2)) {
          x.set(latest + baseWidth);
        } else if (latest >= 0) {
          x.set(latest - baseWidth);
        }
      }
    });
  };

  const handleDragEnd = () => {
    const currentX = x.get();
    const snappedX = Math.round(currentX / TOTAL_WIDTH) * TOTAL_WIDTH;
    scrollTo(snappedX);
  };

  return (
    // Changed bg to Redox Off-White
    <section className="bg-[#FAF9F6] min-h-screen py-24 overflow-hidden select-none relative">
      <div className="px-10 md:px-20 mb-16 flex justify-between items-end relative z-10">
        <div>
          <span className="font-mono text-[#ff6d42] text-xs uppercase tracking-[0.4em] mb-4 block font-bold">
            Selected Works
          </span>
          <h2 className="text-8xl font-medium tracking-tighter text-black leading-none uppercase italic">
            Recent <br /> <span className="text-[#ff6d42]">Work</span>
          </h2>
        </div>
        
        {/* Redox Branded Buttons */}
        <div className="flex gap-4 mb-4">
          <NavButton onClick={() => scrollTo(x.get() + TOTAL_WIDTH)} icon={<FiArrowLeft size={24} />} />
          <NavButton onClick={() => scrollTo(x.get() - TOTAL_WIDTH)} icon={<FiArrowRight size={24} />} />
        </div>
      </div>

      <div className="relative w-full h-full cursor-grab active:cursor-grabbing">
        <motion.div
          ref={containerRef}
          style={{ x }}
          drag="x"
          onDragEnd={handleDragEnd}
          className="flex gap-10 px-10 md:px-20"
        >
          {INFINITE_PROJECTS.map((project, i) => (
            <Card key={i} project={project} />
          ))}
        </motion.div>
      </div>

      {/* Decorative Branding */}
      <div className="absolute bottom-10 left-10 pointer-events-none opacity-10">
        <h3 className="text-[12vw] font-black text-black leading-none">MONK</h3>
      </div>
    </section>
  );
}

function NavButton({ onClick, icon }: { onClick: () => void; icon: React.ReactNode }) {
  return (
    <button 
      onClick={onClick}
      className="p-5 rounded-full border-2 border-black bg-white text-black hover:bg-[#ff6d42] hover:border-[#ff6d42] hover:text-white transition-all duration-300 active:scale-90 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
    >
      {icon}
    </button>
  );
}

function Card({ project }: { project: any }) {
  return (
    <motion.div 
      className="w-[85vw] md:w-[600px] flex-shrink-0"
      whileTap={{ scale: 0.98 }}
    >
      {/* 6:4 aspect ratio as requested */}
      <div className="relative aspect-[6/4] rounded-[1.5rem] overflow-hidden bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-black/5">
        <img
          src={project.img}
          alt={project.title}
          draggable={false}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>

      <div className="mt-8 px-2 flex justify-between items-start">
        <div>
          <h3 className="text-4xl font-bold tracking-tighter text-black uppercase">
            {project.title}
          </h3>
          <p className="text-xs font-bold text-black/40 uppercase tracking-[0.2em] mt-2">
            {project.sub}
          </p>
        </div>
        <div className="h-[1px] w-12 bg-[#ff6d42] mt-5" />
      </div>
    </motion.div>
  );
}