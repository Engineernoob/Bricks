"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { FallingBricks } from "@/components/FallingBricks";
import { DocCard } from "@/components/DocCard";

// --- Types ---
interface DocPage {
  slug: string;
  title: string;
  description: string;
  category: string;
}

// --- Group docs by category ---
function groupDocsByCategory(docs: DocPage[]): Record<string, DocPage[]> {
  return docs.reduce(
    (groups, doc) => {
      const category = doc.category || "General";
      if (!groups[category]) groups[category] = [];
      groups[category].push(doc);
      return groups;
    },
    {} as Record<string, DocPage[]>,
  );
}

export default function DocsPage() {
  const [docs, setDocs] = useState<DocPage[]>([]);
  const [groupedDocs, setGroupedDocs] = useState<Record<string, DocPage[]>>({});

  // Load docs client-side from /content/docs
  useEffect(() => {
    const docsDir = path.join(process.cwd(), "content/docs");
    const files = fs.readdirSync(docsDir).filter((f) => f.endsWith(".mdx"));

    const parsedDocs = files.map((file) => {
      const source = fs.readFileSync(path.join(docsDir, file), "utf-8");
      const { data } = matter(source);
      const slug = file.replace(".mdx", "");
      return {
        slug,
        title: data.title || slug.replace(/-/g, " "),
        description:
          data.description ||
          "Learn how to use Bricks — from setup to deployment.",
        category: data.category || "General",
      };
    });

    setDocs(parsedDocs);
    setGroupedDocs(groupDocsByCategory(parsedDocs));
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-50 to-white py-24">
      {/* 🧱 Animated falling bricks background */}
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

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {categoryDocs.map((doc, index) => (
                    <DocCard
                      key={doc.slug}
                      title={doc.title}
                      description={doc.description}
                      category={doc.category}
                      index={i * 3 + index + 2}
                      onClick={() =>
                        (window.location.href = `/docs/${doc.slug}`)
                      }
                    />
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

        {/* Quick links footer */}
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
