"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Trophy,
  Settings,
  Bell,
  ChevronLeft,
  ChevronRight,
  Zap,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { sidebarItemVariants } from "@/utils/animations";
import { StaggerContainer } from "@/components/animations/MotionWrapper";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { id: "courses", label: "My Courses", icon: BookOpen, href: "/dashboard/courses", badge: 4 },
  { id: "analytics", label: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
  { id: "achievements", label: "Achievements", icon: Trophy, href: "/dashboard/achievements" },
];

const bottomItems = [
  { id: "notifications", label: "Notifications", icon: Bell, href: "/dashboard/notifications", badge: 3 },
  { id: "settings", label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "relative hidden lg:flex flex-col flex-shrink-0 h-screen",
        "bg-bg-secondary border-r border-border-subtle overflow-hidden"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 p-4 h-16 border-b border-border-subtle">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-accent-violet to-accent-blue flex items-center justify-center shadow-glow-sm">
          <GraduationCap className="w-4 h-4 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="font-display font-bold text-text-primary text-lg tracking-tight whitespace-nowrap"
            >
              Horizon
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5" role="navigation" aria-label="Main navigation">
        <StaggerContainer>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <motion.div key={item.id} variants={sidebarItemVariants}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-3 px-3 py-2.5 rounded-xl",
                    "transition-colors duration-150 group",
                    isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {/* Animated background highlight */}
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active-bg"
                      className="absolute inset-0 rounded-xl bg-bg-hover border border-border-glow/40"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      aria-hidden="true"
                    />
                  )}
                  {/* Icon */}
                  <span className="relative z-10 flex-shrink-0">
                    <item.icon
                      className={cn(
                        "w-[18px] h-[18px] transition-colors duration-150",
                        isActive ? "text-accent-violet" : "text-text-muted group-hover:text-text-secondary"
                      )}
                    />
                  </span>
                  {/* Label */}
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 28 }}
                        className="relative z-10 text-sm font-medium whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {/* Badge */}
                  {item.badge && !collapsed && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="relative z-10 ml-auto text-[10px] font-mono font-medium px-1.5 py-0.5 rounded-full bg-accent-violet/20 text-accent-violet border border-accent-violet/30"
                    >
                      {item.badge}
                    </motion.span>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </StaggerContainer>
      </nav>

      {/* Divider */}
      <div className="mx-3 border-t border-border-subtle" />

      {/* Bottom items */}
      <nav className="p-3 space-y-0.5" aria-label="Secondary navigation">
        {bottomItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "relative flex items-center gap-3 px-3 py-2.5 rounded-xl",
                "transition-colors duration-150 group",
                isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-bg"
                  className="absolute inset-0 rounded-xl bg-bg-hover border border-border-glow/40"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10 flex-shrink-0">
                <item.icon className="w-[18px] h-[18px] text-text-muted group-hover:text-text-secondary transition-colors duration-150" />
              </span>
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    className="relative z-10 text-sm font-medium whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {item.badge && !collapsed && (
                <span className="relative z-10 ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-accent-rose/20 text-accent-rose border border-rose-500/20">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User card */}
      <div className={cn("p-3 border-t border-border-subtle")}>
        <div className={cn("flex items-center gap-3 p-2 rounded-xl bg-bg-elevated border border-border-subtle")}>
          <div className="relative flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-violet to-accent-blue flex items-center justify-center text-sm font-bold text-white">
              A
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-accent-emerald border-2 border-bg-secondary" aria-label="Online" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium text-text-primary truncate">Alex Chen</p>
                <p className="text-xs text-text-muted truncate">Pro Member</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-[60px] -right-3 z-20 w-6 h-6 rounded-full bg-bg-elevated border border-border-default flex items-center justify-center text-text-muted hover:text-text-primary hover:border-border-glow transition-colors duration-150 shadow-card"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronLeft className="w-3 h-3" />
        )}
      </button>
    </motion.aside>
  );
}

/* ---- Mobile Bottom Navigation ---- */
export function MobileNav() {
  const pathname = usePathname();

  const items = [
    { id: "dashboard", label: "Home", icon: LayoutDashboard, href: "/dashboard" },
    { id: "courses", label: "Courses", icon: BookOpen, href: "/dashboard/courses" },
    { id: "analytics", label: "Stats", icon: BarChart3, href: "/dashboard/analytics" },
    { id: "achievements", label: "Wins", icon: Trophy, href: "/dashboard/achievements" },
    { id: "settings", label: "Settings", icon: Settings, href: "/dashboard/settings" },
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-border-subtle"
      role="navigation"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around px-2 py-2 safe-area-bottom">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              className="relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl"
              aria-current={isActive ? "page" : undefined}
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-active-bg"
                  className="absolute inset-0 rounded-xl bg-accent-violet/10 border border-accent-violet/20"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  aria-hidden="true"
                />
              )}
              <item.icon
                className={cn(
                  "w-5 h-5 relative z-10 transition-colors duration-150",
                  isActive ? "text-accent-violet" : "text-text-muted"
                )}
              />
              <span
                className={cn(
                  "text-[10px] font-medium relative z-10 transition-colors duration-150",
                  isActive ? "text-accent-violet" : "text-text-muted"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
