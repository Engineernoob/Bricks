"use client";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { motion } from "motion/react";
import { FallingBricks } from "@/components/FallingBricks";
import { BlogPost } from "./BlogPost";
import { BlogNavigation } from "@/components/Navigation";

export default function BlogPage() {
  const postsDir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));

  const posts = files
    .map((file) => {
      const filePath = path.join(postsDir, file);
      const source = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(source);
      const slug = file.replace(/\.mdx$/, "");

      return {
        slug,
        title: data.title || slug.replace(/-/g, " "),
        excerpt:
          data.excerpt ||
          "A quick look behind the scenes at what’s new and what’s next for Bricks.",
        date: data.date
          ? new Date(data.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "Coming soon",
        readTime: data.readTime || "5 min read",
        author: data.author || "Team Bricks",
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-50 to-white py-24">
      {/* 🧱 Animated falling bricks background */}
      <FallingBricks />
      <BlogNavigation />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-4"
          >
            <h2 className="text-5xl font-[Amiri] font-bold text-slate-900">
              Insights & Ideas
            </h2>
            <div className="w-12 h-px bg-slate-900 mx-auto" />
            <p className="max-w-2xl mx-auto mt-6 text-slate-600 font-[Inter]">
              Thoughts on no-code development, design, and building the future
              of software creation — one brick at a time.
            </p>
          </motion.div>
        </div>

        {/* Blog posts grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {posts.map((post, index) => (
            <BlogPost
              key={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              readTime={post.readTime}
              author={post.author}
              index={index}
              onClick={() => (window.location.href = `/blog/${post.slug}`)}
            />
          ))}
        </div>

        {/* Load More button */}
        {posts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="text-center mt-16"
          >
            <button className="px-6 py-3 text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 rounded-lg transition-colors duration-200">
              Load More Articles
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
