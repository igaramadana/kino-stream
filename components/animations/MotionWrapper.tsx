"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type MotionWrapperProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function FadeInUp({
  children,
  className,
  delay = 0,
}: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({
  children,
  className,
  delay = 0,
}: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.45,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HoverScale({
  children,
  className,
}: MotionWrapperProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}