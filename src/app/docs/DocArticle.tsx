"use client";

import { motion } from "motion/react";
import { FallingBricks } from "@/components/FallingBricks";
import { MarkdownRenderer } from "../MarkdownRenderer";
import { DocPage } from "@/lib/docs";

interface DocArticleProps {
  doc: DocPage;
  onBack: () => void;
}

export function DocArticle({ doc, onBack }: DocArticleProps) {
  return (
    <section className="relative min-h-screen bg-white py-24">
      {/* Animated falling bricks background */}
      <FallingBricks />

      {/* Content container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onClick={onBack}
          className="mb-8 text-slate-600 hover:text-slate-900 transition-colors duration-200 flex items-center space-x-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>Back to Documentation</span>
        </motion.button>

        {/* Article header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: "easeOut",
          }}
          className="mb-12"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 border border-slate-100">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-wide text-slate-400 font-medium">
                {doc.category}
              </span>
              <h1 className="text-slate-900">{doc.title}</h1>
              <div className="w-12 h-px bg-slate-900" />
              <p className="text-lg leading-relaxed text-slate-700 max-w-3xl">
                {doc.description}
              </p>
            </div>
          </div>
        </motion.header>

        {/* Article content */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.4,
            ease: "easeOut",
          }}
          className="max-w-none"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 border border-slate-100">
            <MarkdownRenderer content={doc.content} />
          </div>
        </motion.article>

        {/* Navigation footer */}
        <motion.footer
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.6,
            ease: "easeOut",
          }}
          className="mt-12"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 border border-slate-100">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div className="text-center sm:text-left">
                <p className="text-slate-600">Was this page helpful?</p>
              </div>
              <div className="flex space-x-3">
                <button className="px-4 py-2 text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 rounded-lg transition-colors duration-200">
                  👍 Yes
                </button>
                <button className="px-4 py-2 text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 rounded-lg transition-colors duration-200">
                  👎 No
                </button>
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
