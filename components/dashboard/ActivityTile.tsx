"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { cn } from "@/components/utils/cn";

import type { ActivityDay } from "@/types/database";
import { fadeUpVariants } from "@/components/utils/animations";
import { useMemo } from "react";
import { generateActivityData, getActivityColor } from "@/components/utils/activity";
const WEEKS = 20;
const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function ActivityTile() {
  const activityData = useMemo(() => generateActivityData(WEEKS), []);

  // Group by week columns
  const weeks: ActivityDay[][] = [];
  for (let i = 0; i < activityData.length; i += 7) {
    weeks.push(activityData.slice(i, i + 7));
  }

  const totalActiveDays = activityData.filter((d) => d.count > 0).length;
  const totalContributions = activityData.reduce((sum, d) => sum + d.count, 0);

  return (
    <motion.article
      variants={fadeUpVariants}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border-subtle col-span-2 lg:col-span-2",
        "card-mesh-blue group"
      )}
    >
      {/* Decorative glow */}
      <div
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-15 bg-accent-blue blur-3xl animate-glow-pulse pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 p-5 lg:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-accent-blue/15 border border-accent-blue/25 flex items-center justify-center">
              <Activity className="w-4 h-4 text-accent-blue" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-text-primary text-sm">Learning Activity</h2>
              <p className="text-xs text-text-muted">{totalContributions} sessions, last 20 weeks</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-lg font-display font-bold text-accent-blue leading-none">{totalActiveDays}</p>
              <p className="text-[10px] text-text-muted mt-0.5">active days</p>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="overflow-x-auto pb-1">
          <div className="flex gap-1 min-w-fit">
            {/* Day labels */}
            <div className="flex flex-col gap-1 mr-1">
              <div className="h-2.5" />
              {DAYS_OF_WEEK.map((day, i) => (
                <div key={day} className="h-2.5 flex items-center">
                  {i % 2 === 1 && (
                    <span className="text-[9px] font-mono text-text-muted w-6">{day.slice(0, 1)}</span>
                  )}
                  {i % 2 === 0 && <span className="w-6" />}
                </div>
              ))}
            </div>

            {/* Activity columns */}
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                <div className="h-2.5" />
                {week.map((day, di) => (
                  <motion.div
                    key={day.date}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: (wi * 7 + di) * 0.003,
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className={cn(
                      "w-2.5 h-2.5 rounded-sm cursor-pointer transition-opacity duration-150 hover:opacity-80",
                      getActivityColor(day.level)
                    )}
                    title={`${day.date}: ${day.count} sessions`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 mt-4">
          <span className="text-[10px] text-text-muted mr-1">Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={cn(
                "w-2.5 h-2.5 rounded-sm",
                getActivityColor(level as ActivityDay["level"])
              )}
            />
          ))}
          <span className="text-[10px] text-text-muted ml-1">More</span>
        </div>
      </div>
    </motion.article>
  );
}
