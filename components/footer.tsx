"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CreativeFooter() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: "Projects", href: "#work" },
    { name: "Process", href: "#methodology" },
    { name: "Services", href: "#services" },
    { name: "Manifesto", href: "#manifesto" },
  ];

  const socials = ["Instagram", "LinkedIn", "Twitter", "Behance"];

  return (
    <footer className="bg-background pt-20 pb-10 px-6 md:px-20 border-t border-white/5 relative overflow-hidden">
      
      {/* 1. THE GIANT LOGO / BRAND MARK */}
      <div className="mb-20 overflow-hidden">
        <motion.h2 
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[30vw] font-bold text-[#ff6d42] leading-none uppercase tracking-tighter"
        >
          MONK
        </motion.h2>
      </div>

      {/* 2. THE MAIN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
        
        {/* Navigation Section */}
        <div className="md:col-span-4 space-y-8">
          <p className="font-mono text-[10px] text-black uppercase tracking-[0.4em]">Navigation</p>
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className="text-2xl text-black hover:text-[#ff6d42] transition-colors duration-300 uppercase italic font-medium"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Live System Info Section */}
        <div className="md:col-span-4 space-y-8">
          <p className="font-mono text-[10px] text-black uppercase tracking-[0.4em]">System Status</p>
          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="text-black text-xs font-mono mb-1 uppercase">Local Time</span>
              <span className="text-black text-3xl font-mono">{time}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#ff6d42] rounded-full animate-pulse shadow-[0_0_10px_#ff6d42]" />
              <span className="text-black text-xs font-mono uppercase tracking-widest">Available for new projects</span>
            </div>
          </div>
        </div>

        {/* Social / Contact Section */}
        <div className="md:col-span-4 space-y-8 md:text-right">
          <p className="font-mono text-[10px] text-black uppercase tracking-[0.4em] md:justify-end">Connect</p>
          <div className="flex flex-col md:items-end gap-4">
            {socials.map((social) => (
              <motion.a 
                key={social}
                href="#"
                whileHover={{ x: -10 }}
                className="text-xl text-black hover:text-white transition-colors uppercase tracking-tight"
              >
                {social}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* 3. THE SUB-FOOTER (LEGAL & CREDITS) */}
      <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-8 text-[10px] font-mono text-white/20 uppercase tracking-widest">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
        
        <p className="text-[10px] font-mono text-white/10 uppercase tracking-[0.2em]">
          Designed for the Avant-Garde &copy; 2025
        </p>

        <div className="flex items-center gap-2">
           <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest italic">Back to Top</span>
           <button 
             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
             className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-[#ff6d42] hover:text-[#ff6d42] transition-all"
           >
             &uarr;
           </button>
        </div>
      </div>
    </footer>
  );
}