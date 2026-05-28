"use client";

import { motion } from "framer-motion";
import { cn } from "@/components/utils/cn";
import type { ReactNode } from "react";
import { fadeUpVariants } from "@/components/utils/animations";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  meshClass?: string;
  glowOnHover?: boolean;
  noPadding?: boolean;
}

export function BentoCard({
  children,
  className,
  meshClass = "card-mesh-violet",
  glowOnHover = true,
  noPadding = false,
}: BentoCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      whileHover={glowOnHover ? { scale: 1.015 } : undefined}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border-subtle",
        meshClass,
        "group transition-shadow duration-300",
        "hover:border-border-glow hover:shadow-card-hover shadow-card",
        className
      )}
    >
      {/* Inner glow ring on hover */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
          "bg-gradient-to-br from-accent-violet/5 via-transparent to-accent-blue/5"
        )}
        aria-hidden="true"
      />
      {/* Content */}
      <div className={cn(!noPadding && "p-5 lg:p-6", "relative z-10")}>
        {children}
      </div>
    </motion.article>
  );
}
