"use client";

import { motion } from "motion/react";

interface BlogPostProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  index: number;
  onClick?: () => void;
}

export function BlogPost({
  title,
  excerpt,
  date,
  readTime,
  author,
  index,
  onClick,
}: BlogPostProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="space-y-4 p-6 rounded-lg bg-white/80 backdrop-blur-sm border border-slate-100 hover:bg-white/90 transition-colors duration-300">
        <div className="space-y-2">
          <h3 className="text-slate-900 group-hover:text-slate-700 transition-colors duration-200">
            {title}
          </h3>
          <div className="w-8 h-px bg-slate-300" />
        </div>

        <p className="leading-relaxed">{excerpt}</p>

        <div className="flex items-center justify-between text-sm text-slate-500 pt-2">
          <div className="flex items-center space-x-4">
            <span>{author}</span>
            <span>•</span>
            <span>{date}</span>
          </div>
          <span>{readTime}</span>
        </div>
      </div>
    </motion.article>
  );
}
