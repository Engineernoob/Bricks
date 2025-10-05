import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { motion } from "motion/react";
import { FallingBricks } from "@/components/FallingBricks";
import { ArrowLeft } from "lucide-react";

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  // Load MDX file content
  const filePath = path.join(process.cwd(), "content/blog", `${slug}.mdx`);
  const { content, data } = matter(fs.readFileSync(filePath, "utf-8"));

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-50 to-white py-24">
      {/* 🧱 Animated falling bricks background */}
      <FallingBricks />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* 🔙 Back to Blog */}
        <div className="mb-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm font-medium transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
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
            {data.title || slug}
          </h1>

          {(data.author || data.date || data.readTime) && (
            <p className="text-sm text-slate-500 font-[Inter]">
              {data.author && <span>{data.author}</span>}
              {data.author && data.date && " • "}
              {data.date &&
                new Date(data.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              {data.readTime && (data.author || data.date) && " • "}
              {data.readTime && <span>{data.readTime}</span>}
            </p>
          )}
        </motion.div>

        {/* Blog content */}
        <motion.article
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="prose prose-slate prose-lg max-w-none font-[Inter] bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-10 shadow-md"
        >
          <MDXRemote source={content} />
        </motion.article>

        {/* Decorative fade at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
