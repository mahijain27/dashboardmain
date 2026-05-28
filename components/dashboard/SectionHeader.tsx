"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Plus,
  SlidersHorizontal,
  X,
  Sparkles,
  Code2,
  Layers,
  Network,
  BookOpen,
  Check,
  Info,
  Loader2,
} from "lucide-react";
import { addCourseAction } from "@/lib/actions";
import { cn } from "@/components/utils/cn";

const availableIcons = [
  { name: "BookOpen", icon: BookOpen, label: "Education" },
  { name: "Code2", icon: Code2, label: "Coding" },
  { name: "Sparkles", icon: Sparkles, label: "Design" },
  { name: "Layers", icon: Layers, label: "Stack" },
  { name: "Network", icon: Network, label: "Systems" },
];

export function SectionHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentFilter = searchParams.get("filter") || "all";
  const currentSort = searchParams.get("sort") || "date";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Form State
  const [title, setTitle] = useState("");
  const [progress, setProgress] = useState(50);
  const [selectedIcon, setSelectedIcon] = useState("BookOpen");
  
  // Loading & Error States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState(false);

  // URL-based filtering handler
  const handleFilterChange = (filterVal: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (filterVal === "all") {
      params.delete("filter");
    } else {
      params.set("filter", filterVal);
    }
    router.push(`?${params.toString()}`);
  };

  const handleSortChange = (sortVal: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (sortVal === "date") {
      params.delete("sort");
    } else {
      params.set("sort", sortVal);
    }
    router.push(`?${params.toString()}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    setDbError(null);
    setSuccessMsg(false);

    const result = await addCourseAction({
      title,
      progress,
      iconName: selectedIcon,
    });

    setIsSubmitting(false);

    if (result.success) {
      setSuccessMsg(true);
      setTitle("");
      setProgress(50);
      setSelectedIcon("BookOpen");
      
      // Auto close success alert after 2 seconds
      setTimeout(() => {
        setSuccessMsg(false);
        setIsModalOpen(false);
      }, 2000);
    } else {
      // Handle Supabase/RLS insert error
      setDbError(result.error || "Failed to create course.");
    }
  };

  return (
    <div className="relative mb-8">
      {/* Main Header Row */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-mono tracking-widest text-text-muted uppercase mb-1">
            Overview
          </p>
          <h2 className="font-display font-bold text-2xl lg:text-3xl text-text-primary tracking-tight">
            Dashboard
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Filter Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={cn(
              "flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-colors duration-150",
              isFilterOpen 
                ? "bg-accent-violet/20 border-accent-violet text-accent-violet" 
                : "bg-bg-elevated border-border-subtle text-text-secondary hover:text-text-primary hover:border-border-glow"
            )}
            aria-label="Filter options"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </motion.button>

          {/* Add Course Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              setIsModalOpen(true);
              setDbError(null);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-accent-violet to-accent-blue text-white text-xs font-bold shadow-glow hover:brightness-110 active:scale-[0.98] transition-all duration-150"
            aria-label="Add new course"
          >
            <Plus className="w-4 h-4" />
            <span>Add Course</span>
          </motion.button>
        </div>
      </div>

      {/* Interactive Filters Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="mt-4 p-4 rounded-2xl bg-bg-secondary/40 backdrop-blur-xl border border-border-subtle/80 shadow-card flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between"
          >
            {/* Filter Tabs */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">Filter Progress</span>
              <div className="flex gap-2">
                {["all", "in-progress", "completed"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleFilterChange(tab)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all duration-150",
                      currentFilter === tab
                        ? "bg-accent-violet/20 border border-accent-violet/30 text-accent-violet shadow-sm"
                        : "bg-bg-elevated/20 border border-border-subtle text-text-secondary hover:text-text-primary"
                    )}
                  >
                    {tab.replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Tabs */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">Sort By</span>
              <div className="flex gap-2">
                {[
                  { id: "date", label: "Date Added" },
                  { id: "progress", label: "Progress Level" },
                  { id: "name", label: "Alphabetical" },
                ].map((sortOption) => (
                  <button
                    key={sortOption.id}
                    onClick={() => handleSortChange(sortOption.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150",
                      currentSort === sortOption.id
                        ? "bg-accent-blue/20 border border-accent-blue/30 text-accent-blue shadow-sm"
                        : "bg-bg-elevated/20 border border-border-subtle text-text-secondary hover:text-text-primary"
                    )}
                  >
                    {sortOption.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Course Glassmorphic Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!isSubmitting) setIsModalOpen(false);
              }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal content wrapper */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 24 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border-subtle bg-bg-secondary/95 backdrop-blur-2xl p-6 lg:p-8 shadow-card-hover z-10"
            >
              {/* Close button */}
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
                className="absolute top-4 right-4 text-text-muted hover:text-text-primary p-1.5 rounded-lg hover:bg-bg-elevated transition-colors duration-150"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="font-display font-bold text-xl text-text-primary mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent-violet" />
                Add New Course
              </h3>
              <p className="text-text-secondary text-xs mb-6">
                Create a new course entry which will instantly update your Supabase backend.
              </p>

              {/* Success state */}
              {successMsg && (
                <motion.div 
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-4 rounded-xl bg-accent-emerald/10 border border-accent-emerald/20 text-accent-emerald text-xs font-semibold text-center flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Course added successfully! Refreshing...
                </motion.div>
              )}

              {/* RLS Error Helper */}
              {dbError && (
                <motion.div 
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-4 rounded-xl bg-accent-rose/10 border border-accent-rose/25 text-accent-rose text-xs leading-relaxed"
                >
                  <div className="flex items-center gap-1.5 font-bold mb-1.5">
                    <Info className="w-4 h-4 flex-shrink-0" />
                    Supabase Database Setup Required
                  </div>
                  <p className="mb-2">
                    To insert courses from this button, ensure you have enabled **INSERT** permissions for anonymous access in your Supabase SQL editor:
                  </p>
                  <pre className="p-2.5 rounded-lg bg-black/40 text-[10px] font-mono overflow-x-auto text-text-primary border border-white/5">
                    {`create policy "Allow anonymous inserts"
  on public.courses
  for insert
  with check (true);`}
                  </pre>
                </motion.div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-text-secondary">Course Title</label>
                  <input
                    type="text"
                    required
                    disabled={isSubmitting}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Next.js Architecture Patterns"
                    className="w-full px-4 py-2.5 rounded-xl bg-bg-elevated/50 border border-border-subtle text-text-primary text-xs focus:outline-none focus:border-border-glow transition-all duration-200"
                  />
                </div>

                {/* Progress */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-text-secondary">
                    <span>Current Progress</span>
                    <span className="text-accent-violet font-bold">{progress}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    disabled={isSubmitting}
                    value={progress}
                    onChange={(e) => setProgress(Number(e.target.value))}
                    className="w-full accent-accent-violet cursor-pointer bg-bg-elevated h-1 rounded-lg border-none"
                  />
                </div>

                {/* Icon Grid */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-text-secondary">Select Course Icon</label>
                  <div className="grid grid-cols-5 gap-2">
                    {availableIcons.map((iObj) => {
                      const IconComponent = iObj.icon;
                      const isSelected = selectedIcon === iObj.name;
                      return (
                        <button
                          key={iObj.name}
                          type="button"
                          disabled={isSubmitting}
                          onClick={() => setSelectedIcon(iObj.name)}
                          className={cn(
                            "flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all duration-200 gap-1.5",
                            isSelected
                              ? "bg-accent-violet/20 border-accent-violet text-accent-violet shadow-sm shadow-accent-violet/10"
                              : "bg-bg-elevated/45 border-border-subtle text-text-muted hover:text-text-secondary hover:bg-bg-elevated/85"
                          )}
                          title={iObj.label}
                        >
                          <IconComponent className="w-5 h-5" />
                          <span className="text-[8px] font-mono uppercase tracking-wider">{iObj.name.substring(0, 4)}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-border-subtle/50">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-border-subtle bg-bg-elevated/20 text-text-primary text-xs font-bold hover:bg-bg-elevated/40 transition-colors duration-150"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-accent-violet to-accent-blue text-white text-xs font-bold shadow-glow hover:brightness-110 active:scale-[0.98] transition-all duration-150 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Add Course"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
