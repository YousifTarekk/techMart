"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
        >
          {/* Spinner */}
          <div className="relative flex items-center justify-center">
            <motion.div
              className="h-16 w-16 rounded-full border-4 border-primary/20"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              style={{ borderTopColor: "hsl(var(--primary))" }}
            />
            <span className="absolute text-xs font-bold tracking-wider text-primary">
              TM
            </span>
          </div>

          {/* Brand name */}
          <motion.p
            className="mt-6 text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            TECHMART
          </motion.p>

          {/* Progress bar at top */}
          <motion.div
            className="fixed top-0 left-0 h-[3px] bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: "85%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
