import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { motion } from "motion/react";
import { FallingBricks } from "@/components/FallingBricks";
import { ArrowLeft } from "lucide-react";

export default async function DocsPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  // Load MDX file content
  const filePath = path.join(process.cwd(), "content/docs", `${slug}.mdx`);
  const { content, data } = matter(fs.readFileSync(filePath, "utf-8"));

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-50 to-white py-24">
      {/* 🧱 Animated falling bricks background */}
      <FallingBricks />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* 🔙 Back to Docs */}
        <div className="mb-10">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm font-medium transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Docs
          </Link>
        </div>

        {/* Title + Metadata */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-[Amiri] font-bold text-slate-900 mb-4 leading-tight">
            {data.title || slug.replace(/-/g, " ")}
          </h1>

          {data.category && (
            <p className="text-sm text-blue-600 font-[Inter] uppercase tracking-wide">
              {data.category}
            </p>
          )}
        </motion.div>

        {/* Docs content */}
        <motion.article
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="prose prose-slate prose-lg max-w-none font-[Inter] bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl p-10 shadow-md"
        >
          <MDXRemote source={content} />
        </motion.article>

        {/* Decorative fade */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
