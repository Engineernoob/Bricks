import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { Metadata } from "next";

// 🧭 Page Metadata
export const metadata: Metadata = {
  title: "Bricks Blog – Building in Public",
  description:
    "Follow the journey of Bricks — from design to launch. Product updates, new features, and lessons learned.",
};

export default function BlogPage() {
  const postsDir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(postsDir);

  // Parse each MDX file’s frontmatter
  const posts = files.map((file) => {
    const filePath = path.join(postsDir, file);
    const source = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(source);
    const slug = file.replace(".mdx", "");

    return {
      slug,
      title: data.title || slug,
      date: data.date
        ? new Date(data.date).toLocaleDateString()
        : "Coming soon",
      excerpt: data.excerpt || "Stay tuned for our next update.",
    };
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-24 px-6">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-[Amiri] font-bold text-slate-900 mb-4">
          Building Bricks in Public
        </h1>
        <p className="text-lg text-slate-600 font-[Inter] max-w-2xl mx-auto">
          Updates, progress, and lessons from building the next generation of
          no-code tools — one brick at a time.
        </p>
      </div>

      {/* Posts grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm p-6 hover:shadow-lg transition-all"
          >
            <div className="mb-3 text-sm text-slate-500 font-[Inter]">
              {post.date}
            </div>
            <h2 className="text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors font-[Inter]">
              {post.title}
            </h2>
            <p className="mt-3 text-slate-600 text-sm leading-relaxed font-[Inter]">
              {post.excerpt}
            </p>
            <div className="mt-4 text-blue-600 text-sm font-medium group-hover:underline">
              Read more →
            </div>
          </Link>
        ))}
      </div>

      {/* Empty state */}
      {posts.length === 0 && (
        <div className="text-center text-slate-500 mt-16 font-[Inter]">
          No posts yet — new updates coming soon.
        </div>
      )}
    </main>
  );
}
