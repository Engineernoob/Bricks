"use client";

import { motion } from "motion/react";

interface DocCardProps {
  title: string;
  description: string;
  category: string;
  index: number;
  onClick?: () => void;
}

export function DocCard({
  title,
  description,
  category,
  index,
  onClick,
}: DocCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      className="cursor-pointer group"
      onClick={onClick}
    >
      <div className="p-6 bg-white/80 backdrop-blur-sm border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
        <div className="text-xs uppercase tracking-wide text-slate-500 mb-2">
          {category}
        </div>
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
