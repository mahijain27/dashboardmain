"use client";

import { motion } from "framer-motion";
import { Zap, Flame, Target, TrendingUp } from "lucide-react";
import { cn } from "@/components/utils/cn";
import { fadeUpVariants } from "@/components/utils/animations";;

interface HeroTileProps {
  name?: string;
  streak?: number;
}

export function HeroTile({ name = "Alex", streak = 12 }: HeroTileProps) {
  const stats = [
    { label: "Day Streak", value: streak, icon: Flame, color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20" },
    { label: "Courses Active", value: 4, icon: Target, color: "text-accent-violet", bg: "bg-accent-violet/10 border-accent-violet/20" },
    { label: "Hours This Week", value: "14h", icon: TrendingUp, color: "text-accent-cyan", bg: "bg-accent-cyan/10 border-accent-cyan/20" },
  ];

  return (
    <motion.article
      variants={fadeUpVariants}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border-subtle col-span-2 lg:col-span-2",
        "bg-bg-secondary group"
      )}
    >
      {/* Background gradient mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(at 10% 30%, rgba(124, 109, 240, 0.12) 0px, transparent 50%), radial-gradient(at 90% 70%, rgba(79, 142, 247, 0.08) 0px, transparent 50%)",
        }}
        aria-hidden="true"
      />

      {/* Decorative floating orb */}
      <div
        className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-20 bg-gradient-to-br from-accent-violet to-accent-blue blur-3xl animate-glow-pulse pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full opacity-10 bg-accent-cyan blur-3xl animate-glow-pulse [animation-delay:2s] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 p-6 lg:p-8">
        {/* Greeting */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono tracking-widest text-text-muted uppercase">
            Good morning
          </span>
          <span className="text-base">☀️</span>
        </div>
        <h1 className="font-display font-bold text-3xl lg:text-4xl text-text-primary mb-1 tracking-tight">
          Welcome back,{" "}
          <span
            className="text-transparent bg-clip-text bg-gradient-to-r from-accent-violet via-accent-blue to-accent-cyan"
            style={{ WebkitBackgroundClip: "text" }}
          >
            {name}
          </span>
        </h1>
        <p className="text-text-secondary text-sm mb-8">
          You're on a roll! Keep going to maintain your streak and hit your weekly goal.
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap gap-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 300, damping: 28 }}
              className={cn(
                "flex items-center gap-2.5 px-4 py-3 rounded-xl border",
                "bg-bg-elevated/60 backdrop-blur-sm",
                stat.bg
              )}
            >
              <stat.icon className={cn("w-4 h-4 flex-shrink-0", stat.color)} />
              <div>
                <p className={cn("font-display font-bold text-lg leading-none", stat.color)}>
                  {stat.value}
                </p>
                <p className="text-xs text-text-muted mt-0.5">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
