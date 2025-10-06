"use client";

import { motion } from "motion/react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { FallingBricks } from "@/components/FallingBricks";
import Link from "next/link";

interface DocContentProps {
  title: string;
  content: string;
  description?: string;
  date?: string;
}

export function DocContentClient({
  title,
  content,
  description,
  date,
}: DocContentProps) {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-50 to-white py-24">
      <FallingBricks />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-[Amiri] font-bold text-slate-900 mb-3">
            {title}
          </h1>
          {description && (
            <p className="text-slate-600 font-[Inter] text-lg">{description}</p>
          )}
          {date && (
            <p className="text-slate-400 text-sm mt-2 font-[Inter]">
              Last updated: {date}
            </p>
          )}
        </motion.div>

        {/* MDX Content */}
        <article className="prose prose-slate lg:prose-lg max-w-none">
          <MDXRemote source={content} />
        </article>

        {/* Footer Navigation */}
        <div className="mt-20 text-center">
          <Link href="/docs">
            <button className="px-6 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-700 transition">
              ← Back to Docs
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
