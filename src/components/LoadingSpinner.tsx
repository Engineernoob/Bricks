import { motion } from "motion/react";

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-2 border-slate-200 border-t-slate-900 rounded-full"
      ></motion.div>
    </div>
  );
}
