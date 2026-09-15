"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "cn";

export type RevealVariant = "up" | "left" | "right" | "scale";

const variants: Record<RevealVariant, Variants> = {
  up: {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -22 },
    show: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 22 },
    show: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, y: 16, scale: 0.97 },
    show: { opacity: 1, y: 0, scale: 1 },
  },
};

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
}

export function Reveal({ children, className, variant = "up", delay = 0 }: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      data-reveal
      className={cn(className)}
      initial={reduced ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -48px 0px" }}
      variants={variants[variant]}
      transition={{
        duration: reduced ? 0 : 0.55,
        delay: reduced ? 0 : delay,
        ease: [0.16, 0.8, 0.24, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
