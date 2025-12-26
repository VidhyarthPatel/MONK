"use client";

import { motion } from "motion/react";
import React from "react";

type ButtonVariant = "primary" | "secondary" | "tertiary";

interface PrimaryButtonProps {
  text: string;
  variant?: ButtonVariant;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  text,
  variant = "primary", // Default to Red
  onClick,
  className = "",
  disabled = false,
  type = "button",
}) => {
  
  // Mapping variants to your specific CSS variables
  const variantConfig = {
    primary: {
      buttonBg: "bg-primary",   
      hoverBg: "bg-secondary",     
      initialText: "text-secondary", 
      hoverText: "text-tertiary",  
    },
    secondary: {
      buttonBg: "bg-secondary",    
      hoverBg: "bg-primary",     
      initialText: "text-tertiary", 
      hoverText: "text-secondary",   
    },
    tertiary: {
      buttonBg: "bg-tertiary",    
      hoverBg: "bg-primary",     
      initialText: "text-secondary", 
      hoverText: "text-secondary",    
    },
  };

  const colors = variantConfig[variant];

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      initial="initial"
      whileHover={!disabled ? "hover" : undefined}
      whileTap={!disabled ? { scale: 0.96 } : undefined}
      className={`
        relative overflow-hidden rounded-full
        px-8 py-4 font-medium font-display tracking-wider
        disabled:cursor-not-allowed cursor-pointer disabled:opacity-50
        ${colors.buttonBg} ${className}
      `}
    >
      {/* Sliding Background Layer */}
      <motion.div
        variants={{
          initial: { y: "100%" },
          hover: { y: "0%" },
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`absolute inset-0 z-0 ${colors.hoverBg}`}
      />

      {/* Text Wrapper */}
      <div className="relative z-10 h-6 overflow-hidden flex flex-col items-center">
        {/* Top Text (Slides Out) */}
        <motion.span
          variants={{
            initial: { y: "0%" },
            hover: { y: "-100%" },
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={`block text-3xl leading-6 ${colors.initialText}`}
        >
          {text}
        </motion.span>

        {/* Bottom Text (Slides In) */}
        <motion.span
          variants={{
            initial: { y: "0%" },
            hover: { y: "-100%" },
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={`block text-3xl leading-6 ${colors.hoverText}`}
        >
          {text}
        </motion.span>
      </div>
    </motion.button>
  );
};

export default PrimaryButton;