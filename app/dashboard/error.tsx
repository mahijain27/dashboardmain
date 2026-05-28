"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <section className="flex items-center justify-center min-h-[60vh] p-8">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="text-center max-w-md"
      >
        <div className="w-16 h-16 rounded-2xl bg-accent-rose/10 border border-accent-rose/20 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-accent-rose" />
        </div>

        <h2 className="font-display font-bold text-2xl text-text-primary mb-2">
          Something went wrong
        </h2>
        <p className="text-text-secondary text-sm mb-2">
          {error.message || "Failed to load dashboard data. Please check your Supabase connection."}
        </p>
        {error.digest && (
          <p className="text-text-muted text-xs font-mono mb-6">
            Error ID: {error.digest}
          </p>
        )}

        <motion.button
          onClick={reset}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-violet/10 border border-accent-violet/25 text-accent-violet text-sm font-medium hover:bg-accent-violet/15 transition-colors duration-150"
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </motion.button>
      </motion.div>
    </section>
  );
}
