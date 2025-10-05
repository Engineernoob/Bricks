"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface BlogNavigationProps {
  prev?: {
    slug: string;
    title: string;
  };
  next?: {
    slug: string;
    title: string;
  };
}

export function BlogNavigation({ prev, next }: BlogNavigationProps) {
  if (!prev && !next) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mt-16 flex items-center justify-between border-t border-slate-200 pt-8 font-[Inter]"
    >
      {/* Previous post */}
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="group flex items-center gap-2 text-slate-600 hover:text-blue-600 transition"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-500">Previous</span>
            <span className="font-medium">{prev.title}</span>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {/* Next post */}
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group flex items-center gap-2 text-slate-600 hover:text-blue-600 transition"
        >
          <div className="flex flex-col items-end">
            <span className="text-xs text-slate-500">Next</span>
            <span className="font-medium">{next.title}</span>
          </div>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      ) : (
        <div />
      )}
    </motion.nav>
  );
}
