"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { SmoothScrollProvider } from "@/context/SmoothScrollContext";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState(0);

    // 1. Measure content height to set the body height
    useEffect(() => {
        const handleResize = () => {
            if (contentRef.current) {
                setContentHeight(contentRef.current.scrollHeight);
            }
        };

        // Initial measure
        handleResize();

        // Observe changes
        const resizeObserver = new ResizeObserver(handleResize);
        if (contentRef.current) {
            resizeObserver.observe(contentRef.current);
        }

        window.addEventListener("resize", handleResize);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // 2. Scroll Physics
    const { scrollY } = useScroll();
    const smoothY = useSpring(scrollY, {
        damping: 50,
        stiffness: 400,
        mass: 0.1,
    });

    // 3. Map scroll to negative translation
    const y = useTransform(smoothY, (value) => -value);

    return (
        <SmoothScrollProvider value={{ scrollY: smoothY }}>
            {/* Spacer to allow native scrolling */}
            <div style={{ height: contentHeight }} />

            {/* Fixed Container that moves */}
            <motion.div
                ref={contentRef}
                style={{ y }}
                className="fixed top-0 left-0 w-full overflow-hidden"
            >
                {children}
            </motion.div>
        </SmoothScrollProvider>
    );
}
