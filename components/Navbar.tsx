"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import PrimaryButton from "@/ui/PrimaryButton";
import { Menu, X, ChevronDown } from "lucide-react"; // Install lucide-react or use your SVGs

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
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
      setIsOpen(false); // Close menu on scroll
    } else {
      setHidden(false);
    }
  });

  const menuVariants = {
    closed: { opacity: 0, scale: 0.95, y: -20 },
    open: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: -100 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-10 py-6 pointer-events-none"
      >
        {/* LOGO PILL */}
        <div className="flex items-center gap-3 pointer-events-auto bg-white/80 backdrop-blur-md lg:bg-transparent p-2 lg:p-0 rounded-2xl">
          <div className="relative z-10 flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-[#de1f25] rounded-lg flex items-center justify-center font-black text-white italic">
              M
            </div>
            <span className="font-bold tracking-tighter text-xl uppercase text-[#1e1e1e]">
              Monk<span className="text-[#de1f25]">.</span>
            </span>
          </div>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden lg:flex items-center gap-8 px-8 py-4 rounded-[40px]">
            {navLinks.map((link) => (
              <div key={link.name} className="group flex items-center gap-1 cursor-pointer">
                <span className="text-[#1e1e1e] font-medium text-[15px] hover:text-[#de1f25] transition-colors">
                  {link.name}
                </span>
                {link.hasDropdown && (
                  <ChevronDown className="w-4 h-4 text-[#1e1e1e] group-hover:text-[#de1f25] transition-transform group-hover:rotate-180" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: CTA & HAMBURGER */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <div className="hidden sm:block">
            <PrimaryButton text="Let's Talk" variant="tertiary" />
          </div>
          
          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-3 bg-white border border-gray-200 rounded-full shadow-sm text-[#1e1e1e]"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-x-4 top-24 z-[49] lg:hidden bg-white border border-gray-100 rounded-3xl shadow-2xl p-6 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
              >
                <span className="text-lg font-semibold text-[#1e1e1e]">{link.name}</span>
                {link.hasDropdown && <ChevronDown size={20} className="text-gray-400" />}
              </div>
            ))}
            <div className="mt-4 sm:hidden">
                <PrimaryButton text="Let's Talk" variant="tertiary" className="w-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}