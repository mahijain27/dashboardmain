"use client";

import { Bell, Search, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export function TopBar() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-5 lg:px-8 h-16 glass border-b border-border-subtle">
      {/* Search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted group-focus-within:text-text-secondary transition-colors duration-150" />
          <input
            type="search"
            placeholder="Search courses, topics..."
            className={cn(
              "w-full pl-9 pr-4 py-2 text-sm rounded-xl",
              "bg-bg-elevated border border-border-subtle",
              "text-text-primary placeholder:text-text-muted",
              "focus:outline-none focus:border-border-glow focus:bg-bg-hover",
              "transition-all duration-200 font-body"
            )}
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-text-muted bg-bg-secondary border border-border-subtle px-1.5 py-0.5 rounded-md">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Streak badge */}
        <motion.div
          whileHover={{ scale: 1.04 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400"
        >
          <Zap className="w-3.5 h-3.5 fill-amber-400" />
          <span className="text-xs font-mono font-medium">12 day streak</span>
        </motion.div>

        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative w-9 h-9 rounded-xl bg-bg-elevated border border-border-subtle flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-border-glow transition-colors duration-150"
          aria-label="View notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-accent-violet" aria-hidden="true" />
        </motion.button>

        {/* Avatar */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-violet to-accent-blue flex items-center justify-center text-sm font-bold text-white shadow-glow-sm"
          aria-label="User profile"
        >
          A
        </motion.button>
      </div>
    </header>
  );
}
