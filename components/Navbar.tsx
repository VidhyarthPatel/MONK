"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import PrimaryButton from "@/ui/PrimaryButton";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { useNavColor } from "@/context/NavColorContext";

const navLinks = [
  { name: "Home", hasDropdown: true },
  { name: "About Us", hasDropdown: false },
  { name: "Service", hasDropdown: true },
  { name: "Pages", hasDropdown: true },
  { name: "Blog", hasDropdown: true },
  { name: "Contact", hasDropdown: false },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const { navColor } = useNavColor();

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
      setIsOpen(false);
    } else {
      setHidden(false);
    }
  });

  // Dynamic Styles (From Desktop Nav logic)
  const textColor = navColor === "white" ? "text-white" : "text-[#1e1e1e]";
  const logoBg = navColor === "white" ? "bg-white" : "bg-[#de1f25]";
  const logoText = navColor === "white" ? "text-[#de1f25]" : "text-white";
  const logoDot = navColor === "white" ? "text-white" : "text-[#de1f25]";
  const buttonVariant = navColor === "white" ? "primary" : "tertiary";

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: -100 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-6 lg:px-10 py-6 pointer-events-none"
      >
        {/* --- DESKTOP LOGO PILL --- */}
        <div
          className={`flex items-center gap-3 pointer-events-auto p-2 lg:p-0 rounded-2xl transition-colors duration-300 ${
            navColor === "black" ? "bg-white/80 backdrop-blur-md lg:bg-transparent" : ""
          }`}
        >
          <div className="relative z-10 flex items-center gap-2 cursor-pointer">
            <div
              className={`w-8 h-8 ${logoBg} rounded-lg flex items-center justify-center font-black ${logoText} italic transition-colors duration-300`}
            >
              M
            </div>
            <span
              className={`font-bold tracking-tighter text-xl uppercase ${textColor} transition-colors duration-300`}
            >
              Monk<span className={logoDot}>.</span>
            </span>
          </div>

          {/* --- DESKTOP NAV LINKS --- */}
          <div
            className={`hidden lg:flex items-center gap-8 px-8 py-4 rounded-[40px] transition-colors duration-300 ${
              navColor === "black" ? "bg-white/50 backdrop-blur-sm" : "bg-black/20 backdrop-blur-sm"
            }`}
          >
            {navLinks.map((link) => (
              <div key={link.name} className="group flex items-center gap-1 cursor-pointer">
                <span
                  className={`${textColor} font-medium text-[15px] hover:text-[#ff6d42] transition-colors duration-300`}
                >
                  {link.name}
                </span>
                {link.hasDropdown && (
                  <ChevronDown
                    className={`w-4 h-4 ${textColor} group-hover:text-[#ff6d42] transition-all duration-300 group-hover:rotate-180`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* --- RIGHT SIDE: CTA & HAMBURGER --- */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <div className="hidden sm:block">
            <PrimaryButton text="Let's Talk" variant={buttonVariant} />
          </div>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden relative z-[70] p-3 rounded-full shadow-sm transition-all duration-300 
              ${isOpen 
                ? "bg-[#ff6d42] text-white" 
                : navColor === "white" 
                  ? "text-white border-white/20 bg-white/10" 
                  : "text-[#1e1e1e] bg-white border-gray-200"
              }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* --- CREATIVE MOBILE OVERLAY (From Second Code) --- */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 90% 5%)" }}
            animate={{ clipPath: "circle(150% at 90% 5%)" }}
            exit={{ clipPath: "circle(0% at 90% 5%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[55] bg-[#1A1A1A] text-white flex flex-col justify-between p-8 pt-32 lg:hidden"
          >
            {/* Background Decorative Text */}
            <div className="absolute top-10 left-10 opacity-5 select-none pointer-events-none">
              <h2 className="text-[10rem] font-black italic">MONK</h2>
            </div>

            <div className="flex flex-col gap-6 relative z-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="group flex items-end gap-4 overflow-hidden"
                >
                  <span className="text-[#ff6d42] font-mono text-sm mb-2">0{i + 1}</span>
                  <button className="text-4xl sm:text-6xl font-bold tracking-tighter text-left group-hover:italic group-hover:text-[#ff6d42] transition-all uppercase">
                    {link.name}
                  </button>
                  {link.hasDropdown && (
                    <ArrowUpRight
                      className="mb-3 text-slate-600 group-hover:text-[#ff6d42] transition-colors"
                      size={28}
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Bottom Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10"
            >
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-widest mb-4">Socials</p>
                <div className="flex flex-col gap-2 font-medium">
                  <a href="#" className="hover:text-[#ff6d42] transition-colors">Instagram</a>
                  <a href="#" className="hover:text-[#ff6d42] transition-colors">Dribbble</a>
                </div>
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-widest mb-4">Contact</p>
                <p className="font-medium">hi@monk.studio</p>
                <p className="text-slate-400 text-sm italic">+1 234 567 890</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}