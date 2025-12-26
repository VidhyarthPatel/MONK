"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type NavColor = "black" | "white";

interface NavColorContextType {
  navColor: NavColor;
  setNavColor: (color: NavColor) => void;
}

const NavColorContext = createContext<NavColorContextType | undefined>(undefined);

export function NavColorProvider({ children }: { children: ReactNode }) {
  const [navColor, setNavColor] = useState<NavColor>("black");

  return (
    <NavColorContext.Provider value={{ navColor, setNavColor }}>
      {children}
    </NavColorContext.Provider>
  );
}

export function useNavColor() {
  const context = useContext(NavColorContext);
  if (context === undefined) {
    throw new Error("useNavColor must be used within a NavColorProvider");
  }
  return context;
}
