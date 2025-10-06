"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FallingBricks } from "@/components/FallingBricks";
import { DocCard } from "@/components/DocCard";

interface DocPage {
  slug: string;
  title: string;
  description: string;
  category: string;
}

export function DocsClient({ parsedDocs }: { parsedDocs: DocPage[] }) {
  // Group docs by category
  const groupedDocs = parsedDocs.reduce(
    (groups, doc) => {
      const category = doc.category || "General";
      if (!groups[category]) groups[category] = [];
      groups[category].push(doc);
      return groups;
    },
    {} as Record<string, DocPage[]>,
  );

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-50 to-white py-24">
      {/* 🧱 Animated background */}
      <FallingBricks />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="space-y-4"
          >
            <h1 className="text-5xl font-[Amiri] font-bold text-slate-900">
              Documentation
            </h1>
            <div className="w-12 h-px bg-slate-900 mx-auto" />
            <p className="max-w-2xl mx-auto mt-6 text-slate-600 font-[Inter]">
              Everything you need to build, connect, and deploy with Bricks —
              from setup to advanced use.
            </p>
          </motion.div>
        </div>

        {/* Docs grid by category */}
        {Object.keys(groupedDocs).length > 0 ? (
          <div className="space-y-12">
            {Object.entries(groupedDocs).map(([category, categoryDocs], i) => (
              <div key={category}>
                {/* Category header */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3 + i * 0.1,
                    ease: "easeOut",
                  }}
                  className="mb-6"
                >
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {category}
                  </h3>
                  <div className="w-16 h-px bg-slate-300" />
                </motion.div>

                {/* Animated DocCard grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {categoryDocs.map((doc, index) => (
                    <motion.div
                      key={doc.slug}
                      whileHover={{ scale: 1.03, y: -3 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <Link href={`/docs/${doc.slug}`}>
                        <DocCard
                          title={doc.title}
                          description={doc.description}
                          category={doc.category}
                          index={i * 3 + index + 2}
                        />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-500 mt-16 font-[Inter]">
            No documentation available yet — coming soon.
          </div>
        )}

        {/* Footer Help CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          className="mt-20 text-center"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 border border-slate-100 shadow-sm">
            <h3 className="text-slate-900 font-semibold mb-3">Need Help?</h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Can’t find what you’re looking for? Our community and support team
              are here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/community">
                <button className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
                  Join Community
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-6 py-3 text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 rounded-lg transition-colors">
                  Contact Support
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
