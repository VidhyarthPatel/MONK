"use client";

import React, { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { useNavColor } from "@/context/NavColorContext";

interface SectionTrackerProps {
    color: "black" | "white";
    children: React.ReactNode;
    className?: string;
}

export default function SectionTracker({ color, children, className = "" }: SectionTrackerProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.5 }); // Trigger when 50% visible
    const { setNavColor } = useNavColor();

    useEffect(() => {
        if (isInView) {
            setNavColor(color);
        }
    }, [isInView, color, setNavColor]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
