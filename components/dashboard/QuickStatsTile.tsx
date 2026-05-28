"use client";

"use client";

import { motion } from "framer-motion";
import { BookMarked, Clock, Award, Brain } from "lucide-react";
import { cn } from "@/utils/cn";
import { fadeUpVariants } from "@/utils/animations";

const stats = [
  { label: "Completed", value: "7", unit: "courses", icon: BookMarked, color: "text-accent-violet", glow: "shadow-[0_0_12px_rgba(124,109,240,0.3)]" },
  { label: "Study Time", value: "142", unit: "hours", icon: Clock, color: "text-accent-blue", glow: "shadow-[0_0_12px_rgba(79,142,247,0.3)]" },
  { label: "Certificates", value: "3", unit: "earned", icon: Award, color: "text-amber-400", glow: "shadow-[0_0_12px_rgba(251,191,36,0.3)]" },
  { label: "Concepts", value: "89", unit: "mastered", icon: Brain, color: "text-accent-emerald", glow: "shadow-[0_0_12px_rgba(52,211,153,0.3)]" },
];

export function QuickStatsTile() {
  return (
    <motion.article
      variants={fadeUpVariants}
      className="relative overflow-hidden rounded-2xl border border-border-subtle bg-bg-secondary card-mesh-violet"
    >
      <div className="p-5 lg:p-6">
        <h2 className="font-display font-semibold text-text-secondary text-xs tracking-widest uppercase mb-4">
          Your Progress
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.08, type: "spring", stiffness: 300, damping: 28 }}
              className="flex flex-col gap-2 p-3 rounded-xl bg-bg-elevated border border-border-subtle"
            >
              <div className={cn("w-7 h-7 rounded-lg bg-bg-secondary border border-border-default flex items-center justify-center", stat.glow)}>
                <stat.icon className={cn("w-3.5 h-3.5", stat.color)} />
              </div>
              <div>
                <p className={cn("font-display font-bold text-xl leading-none", stat.color)}>
                  {stat.value}
                </p>
                <p className="text-[11px] text-text-muted mt-1">{stat.unit}</p>
              </div>
              <p className="text-[10px] text-text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
