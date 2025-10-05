import { motion } from "motion/react";
import { FallingBricks } from "@/components/FallingBricks";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { BlogPost } from "@/lib/mdx";
import { formatDate } from "@/lib/mdx";

interface BlogArticleProps {
  post: BlogPost;
  onBack: () => void;
}

export function BlogArticle({ post, onBack }: BlogArticleProps) {
  return (
    <section className="relative min-h-screen bg-white py-24">
      {/* Animated falling bricks background */}
      <FallingBricks />

      {/* Content container */}
      <div className="relative z-10 max-w-3xl mx-auto px-6">
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
          <span>Back to Blog</span>
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
          className="mb-12 text-center"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 border border-slate-100">
            <h1 className="text-slate-900 mb-4">{post.title}</h1>
            <div className="w-12 h-px bg-slate-900 mx-auto mb-6" />
            <div className="flex items-center justify-center space-x-6 text-sm text-slate-500">
              <span>{post.author}</span>
              <span>•</span>
              <span>{formatDate(post.date)}</span>
              <span>•</span>
              <span>{post.readTime}</span>
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
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-slate-700">
                {post.excerpt}
              </p>

              <div className="w-12 h-px bg-slate-300" />

              <MarkdownRenderer content={post.content} />
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
