"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue, // 1. Import useMotionValue
} from "framer-motion";

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface MarqueeProps {
  children: string;
  baseVelocity: number;
}

function VelocityText({ children, baseVelocity = 100 }: MarqueeProps) {
  // 2. Change useRef to useMotionValue
  const baseX = useMotionValue(0); 
  
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  // 3. Now useTransform will work because baseX is a MotionValue
  const x = useTransform(baseX, (v) => `${wrap(-45, -20, v)}%`);

  const directionFactor = useRef<number>(1);
  
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    // 4. Update the MotionValue using .set() instead of .current
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="flex whitespace-nowrap flex-nowrap overflow-hidden leading-[0.8] mb-2 md:mb-0">
      <motion.div 
        className="flex whitespace-nowrap flex-nowrap font-display text-[12vw] md:text-[15vw] uppercase italic tracking-tighter" 
        style={{ x }}
      >
        <span className="mr-12">{children} </span>
        <span className="mr-12">{children} </span>
        <span className="mr-12">{children} </span>
        <span className="mr-12">{children} </span>
      </motion.div>
    </div>
  );
}

export default function MarqueeWall() {
  return (
    <section className="lg:py-20 bg-[#FAF9F6] overflow-hidden flex flex-col justify-center lg:min-h-[60vh] ">
      <div className="text-[#ff6d42]">
        <VelocityText baseVelocity={-1}>Creative ideas</VelocityText>
      </div>
      <div className="text-transparent" style={{ WebkitTextStroke: "2px var(--primary-orange)" }}>
        <VelocityText baseVelocity={1}>User Experience</VelocityText>
      </div>
      <div className="text-tertiary">
        <VelocityText baseVelocity={-1.5}>Digital Agency</VelocityText>
      </div>
      <div className="text-transparent" style={{ WebkitTextStroke: "2px var(--tertiary)" }}>
        <VelocityText baseVelocity={2}>Next.js • Motion</VelocityText>
      </div>
    </section>
  );
}