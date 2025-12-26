"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "motion/react";

interface CounterProps {
  value: number;
  label: string;
  suffix?: string;
}

const Counter = ({ value, label, suffix = "" }: CounterProps) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 7,
        ease: [0.19, 1, 0.22, 1],
      });
      return controls.stop;
    }
  }, [isInView, value, count]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center px-1">
      <div className="text-7xl font-medium tracking-tighter">
        <motion.span>{rounded}</motion.span>
        <span>{suffix}</span>
      </div>
      <div className="text-xs uppercase opacity-60 mt-2 leading-tight">
        {label}
      </div>
    </div>
  );
};

export default Counter;