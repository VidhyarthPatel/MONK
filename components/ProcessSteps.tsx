"use client";

import React, { useRef, useState } from "react";
import { motion, useTransform, useScroll, AnimatePresence } from "framer-motion";

interface Project {
  id: number;
  title: string;
  category: string;
  color: string;
  image: string;
}

const projects: Project[] = [
  { id: 1, title: "Fintech Dashboard", category: "Web App", color: "#ef4444", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: "HealthTrack AI", category: "Mobile App", color: "#3b82f6", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: "E-Commerce OS", category: "SaaS Platform", color: "#10b981", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
  { id: 4, title: "Cyber-Security Portal", category: "Security", color: "#8b5cf6", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" },
];

export default function HorizontalProjects() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [bgColor, setBgColor] = useState("#18181b"); // Default zinc-900

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Maps vertical scroll to horizontal percentage
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-zinc-950">
      {/* Background Atmosphere Layer */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-colors duration-700 ease-in-out opacity-20"
        style={{ backgroundColor: bgColor }}
      />
      <div className="pointer-events-none fixed inset-0 z-0 backdrop-blur-[120px]" />

      {/* Sticky Container */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute left-10 top-20 z-10">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-red-600">Selected Works</h2>
          <p className="text-4xl font-black text-white mt-2">Case Studies</p>
        </div>

        <motion.div style={{ x }} className="flex gap-8 px-10">
          {projects.map((project) => (
            <div
              key={project.id}
              onMouseEnter={() => setBgColor(project.color)}
              onMouseLeave={() => setBgColor("#18181b")}
              className="group relative h-[450px] w-[350px] flex-shrink-0 overflow-hidden rounded-2xl bg-zinc-800 md:h-[550px] md:w-[700px]"
            >
              {/* Image with Scale Effect */}
              <motion.img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent p-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-sm font-medium text-red-500">{project.category}</p>
                <h3 className="text-3xl font-bold text-white">{project.title}</h3>
                <button className="mt-4 w-fit rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black">
                  View Project
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}