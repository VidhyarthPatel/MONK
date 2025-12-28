"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useTransform, useMotionValueEvent } from "framer-motion";
import { useNavColor } from "@/context/NavColorContext";
import { useSmoothScroll } from "@/context/SmoothScrollContext";
import PrimaryButton from "@/ui/PrimaryButton";

export default function WorkExpansion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setNavColor } = useNavColor();
  const { scrollY } = useSmoothScroll(); // Get smooth scroll value
  const [offsetTop, setOffsetTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    const updateMeasurements = () => {
      if (containerRef.current) {
        setOffsetTop(containerRef.current.offsetTop);
        setContainerHeight(containerRef.current.offsetHeight);
        setViewportHeight(window.innerHeight);
      }
    };

    updateMeasurements();
    window.addEventListener("resize", updateMeasurements);
    return () => window.removeEventListener("resize", updateMeasurements);
  }, []);

  // Manual Sticky Logic
  // When scrollY >= offsetTop, we want to push the element down by (scrollY - offsetTop)
  // But we stop pushing when it reaches the bottom of the container (containerHeight - viewportHeight)
  const stickyY = useTransform(
    scrollY,
    [offsetTop, offsetTop + containerHeight - viewportHeight],
    [0, containerHeight - viewportHeight],
    { clamp: true }
  );

  // Re-implement scroll progress based on relative position
  // Progress 0 = start of section, Progress 1 = end of section
  const scrollYProgress = useTransform(
    scrollY,
    [offsetTop, offsetTop + containerHeight - viewportHeight],
    [0, 1]
  );

  // 1. Circle grows to fill the screen (Scale 1 to 35)
  const circleScale = useTransform(scrollYProgress, [0, 0.9], [1, 8.5]);

  /** * 2. Text Scale Adjustment:
   * We start very small (0.05).
   * We grow it, but we STOP growing it at a size that fits the screen.
   * If the text gets "too big," decrease the 1.5 value below.
   */
  const textScale = useTransform(scrollYProgress, [0, 0.1], [0.35, 0.4]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.1) {
      setNavColor("white");
    } else {
      setNavColor("black");
    }
  });

  return (
    <div ref={containerRef} className="h-[500vh] bg-[#FAF9F6] relative">
      {/* Replaced sticky with relative + transform */}
      <motion.div
        style={{ y: stickyY }}
        className="relative top-0 h-screen w-full flex items-center justify-center overflow-hidden"
      >

        {/* The Expanding Circle */}
        <motion.div
          style={{ scale: circleScale }}
          className="w-48 h-48 md:w-64 md:h-64 bg-tertiary cursor-pointer rounded-full flex items-center justify-center relative shadow-2xl"
        >
          {/* By wrapping the text in another motion div, we can control 
             the text size independently so it stays 'pinned' inside.
          */}
          <motion.div style={{ scale: textScale }} className="flex items-center justify-center">
            <h2 className="text-white font-black text-center leading-none pointer-events-none select-none uppercase whitespace-nowrap text-md xl:text-sm">
              Let&apos;s Work
              {/* <PrimaryButton text="Let's Work" className=""/> */}
            </h2>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}