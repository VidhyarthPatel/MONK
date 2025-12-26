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

export default function InfiniteMagneticShowcase() {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardSize, setCardSize] = useState({ width: 600, gap: 40 });

  // 1. DYNAMIC MATH FOR RESPONSIVENESS
  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 768) {
        // Mobile sizes
        setCardSize({ width: window.innerWidth * 0.85, gap: 20 });
      } else {
        // Desktop sizes
        setCardSize({ width: 600, gap: 40 });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const totalStep = cardSize.width + cardSize.gap;
  const baseWidth = PROJECTS.length * totalStep;

  useEffect(() => {
    x.set(-baseWidth);
  }, [baseWidth, x]);

  const scrollTo = (targetX: number) => {
    animate(x, targetX, {
      type: "spring",
      stiffness: 200,
      damping: 30,
      onUpdate: (latest) => {
        // Seamless loop logic
        if (latest <= -(baseWidth * 2)) {
          x.set(latest + baseWidth);
        } else if (latest >= 0) {
          x.set(latest - baseWidth);
        }
      }
    });
  };

  const handleDragEnd = (event: any, info: any) => {
    const currentX = x.get();
    // Snap to the closest card
    const snappedX = Math.round(currentX / totalStep) * totalStep;
    scrollTo(snappedX);
  };

  return (
    <section className="bg-[#FAF9F6] py-16 md:py-24 overflow-hidden select-none relative">
      {/* HEADER: Adjusted for Mobile Stack */}
      <div className="px-6 md:px-20 mb-12 md:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative z-10">
        <div className="max-w-2xl">
          <span className="font-mono text-[#ff6d42] text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 block font-bold">
            Selected Works
          </span>
          <h2 className="text-6xl md:text-8xl font-medium tracking-tighter text-black leading-[0.9] uppercase italic">
            Recent <br /> <span className="text-[#ff6d42]">Work</span>
          </h2>
        </div>
        
        <div className="flex gap-3 md:gap-4 self-end md:self-auto">
          <NavButton onClick={() => scrollTo(x.get() + totalStep)} icon={<FiArrowLeft size={20} />} />
          <NavButton onClick={() => scrollTo(x.get() - totalStep)} icon={<FiArrowRight size={20} />} />
        </div>
      </div>

      {/* CAROUSEL */}
      <div className="relative w-full cursor-grab active:cursor-grabbing">
        <motion.div
          ref={containerRef}
          drag="x"
          // Constraint to prevent dragging too far away from the loopable area
          dragConstraints={{ left: -(baseWidth * 2.5), right: 0 }}
          onDragEnd={handleDragEnd}
          className="flex"
          style={{ x, gap: cardSize.gap, paddingLeft: "1.5rem", paddingRight: "1.5rem" }}
        >
          {INFINITE_PROJECTS.map((project, i) => (
            <Card key={i} project={project} width={cardSize.width} />
          ))}
        </motion.div>
      </div>

      {/* BACKGROUND BRANDING: Hidden or scaled on mobile */}
      <div className="absolute bottom-4 left-4 md:bottom-10 md:left-10 pointer-events-none opacity-[0.03] md:opacity-10">
        <h3 className="text-[20vw] md:text-[12vw] font-black text-black leading-none">MONK</h3>
      </div>
    </section>
  );
}

function NavButton({ onClick, icon }: { onClick: () => void; icon: React.ReactNode }) {
  return (
    <button 
      onClick={onClick}
      className="p-4 md:p-5 rounded-full border-2 border-black bg-white text-black hover:bg-[#ff6d42] hover:border-[#ff6d42] hover:text-white transition-all duration-300 active:scale-90 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
    >
      {icon}
    </button>
  );
}

function Card({ project, width }: { project: any; width: number }) {
  return (
    <motion.div 
      style={{ width }}
      className="flex-shrink-0"
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative aspect-[6/4] rounded-2xl md:rounded-[1.5rem] overflow-hidden bg-white shadow-xl border border-black/5">
        <img
          src={project.img}
          alt={project.title}
          draggable={false}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>

      <div className="mt-6 md:mt-8 px-1 md:px-2 flex justify-between items-start">
        <div>
          <h3 className="text-2xl md:text-4xl font-bold tracking-tighter text-black uppercase">
            {project.title}
          </h3>
          <p className="text-[10px] md:text-xs font-bold text-black/40 uppercase tracking-[0.2em] mt-1 md:mt-2">
            {project.sub}
          </p>
        </div>
        <div className="h-[1px] w-8 md:w-12 bg-[#ff6d42] mt-4 md:mt-5" />
      </div>
    </motion.div>
  );
}