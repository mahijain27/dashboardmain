"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/utils/cn";
import type { Course } from "@/types/database";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { fadeUpVariants } from "@/utils/animations";

const COURSE_STYLES = [
  {
    mesh: "card-mesh-violet",
    iconBg: "bg-accent-violet/15 border border-accent-violet/25",
    iconColor: "text-accent-violet",
    progressColor: "bg-gradient-to-r from-accent-violet to-accent-blue",
    labelColor: "text-accent-violet",
  },
  {
    mesh: "card-mesh-blue",
    iconBg: "bg-accent-blue/15 border border-accent-blue/25",
    iconColor: "text-accent-blue",
    progressColor: "bg-gradient-to-r from-accent-blue to-accent-cyan",
    labelColor: "text-accent-blue",
  },
  {
    mesh: "card-mesh-emerald",
    iconBg: "bg-accent-emerald/15 border border-accent-emerald/25",
    iconColor: "text-accent-emerald",
    progressColor: "bg-gradient-to-r from-accent-emerald to-accent-cyan",
    labelColor: "text-accent-emerald",
  },
  {
    mesh: "card-mesh-rose",
    iconBg: "bg-accent-rose/15 border border-accent-rose/25",
    iconColor: "text-accent-rose",
    progressColor: "bg-gradient-to-r from-accent-rose to-accent-amber",
    labelColor: "text-accent-rose",
  },
];

interface CourseCardProps {
  course: Course;
  index: number;
}

export function CourseCard({ course, index }: CourseCardProps) {
  const style = COURSE_STYLES[index % COURSE_STYLES.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.99 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border-subtle",
        style.mesh,
        "group cursor-pointer shadow-card hover:shadow-card-hover transition-shadow duration-300",
        "hover:border-border-glow"
      )}
    >
      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(124,109,240,0.04) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 p-5 lg:p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", style.iconBg)}>
            <DynamicIcon name={course.icon_name} className={cn("w-5 h-5", style.iconColor)} />
          </div>

          <motion.div
            whileHover={{ scale: 1.05, rotate: 8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-7 h-7 rounded-lg bg-bg-elevated border border-border-subtle flex items-center justify-center text-text-muted hover:text-text-primary hover:border-border-glow transition-colors duration-150"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="font-display font-semibold text-text-primary text-base leading-snug mb-1.5 flex-1">
          {course.title}
        </h3>
        <p className="text-xs text-text-muted mb-5">
          Updated recently · {Math.ceil((100 - course.progress) / 10)} lessons left
        </p>

        {/* Progress */}
        <div>
          <ProgressBar
            value={course.progress}
            colorClass={style.progressColor}
            height="sm"
            delay={0.4 + index * 0.1}
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-text-muted">Progress</span>
            <span className={cn("text-xs font-mono font-medium", style.labelColor)}>
              {course.progress}%
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
