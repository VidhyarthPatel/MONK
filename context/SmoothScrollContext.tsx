"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { MotionValue, useMotionValue } from "framer-motion";

interface SmoothScrollContextType {
    scrollY: MotionValue<number>;
}

const SmoothScrollContext = createContext<SmoothScrollContextType | undefined>(undefined);

export function useSmoothScroll() {
    const context = useContext(SmoothScrollContext);
    if (context === undefined) {
        // Fallback if used outside provider (e.g. during initial render or tests)
        // We can return a dummy motion value or throw.
        // Returning a dummy value is safer for now.
        throw new Error("useSmoothScroll must be used within a SmoothScroll");
    }
    return context;
}

export const SmoothScrollProvider = SmoothScrollContext.Provider;
