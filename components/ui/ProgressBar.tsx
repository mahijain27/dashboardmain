"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { cn } from "@/utils/cn";

interface ProgressBarProps {
  value: number;
  className?: string;
  colorClass?: string;
  height?: "sm" | "md" | "lg";
  showLabel?: boolean;
  delay?: number;
}

const heightMap = {
  sm: "h-1",
  md: "h-1.5",
  lg: "h-2",
};

export function ProgressBar({
  value,
  className,
  colorClass = "bg-gradient-to-r from-accent-violet to-accent-blue",
  height = "md",
  showLabel = false,
  delay = 0.3,
}: ProgressBarProps) {
  const motionValue = useMotionValue(0);
  const width = useTransform(motionValue, (v) => `${v}%`);

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 1.2,
      delay,
      ease: [0.4, 0, 0.2, 1],
    });
    return controls.stop;
  }, [value, delay, motionValue]);

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between mb-1.5">
          <span className="text-xs text-text-secondary">Progress</span>
          <span className="text-xs font-mono text-text-primary">{value}%</span>
        </div>
      )}
      <div
        className={cn(
          "w-full rounded-full bg-bg-elevated border border-border-subtle overflow-hidden",
          heightMap[height]
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          style={{ width }}
          className={cn("h-full rounded-full relative", colorClass)}
        >
          {/* Shimmer glow on bar */}
          <div
            className="absolute inset-0 opacity-60 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
            }}
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </div>
  );
}
