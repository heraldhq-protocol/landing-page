"use client";

import { motion } from "motion/react";

export default function AnimatedIcon({
  icon: Icon,
  className,
  size,
}: {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  className?: string;
  size?: number;
}) {
  return (
    <motion.span
      className="inline-flex items-center justify-center"
      whileHover={{ scale: 1.12 }}
      transition={{ type: "spring", stiffness: 350, damping: 12 }}
    >
      <Icon className={className} size={size} />
    </motion.span>
  );
}
