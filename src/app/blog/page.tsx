import fs from "fs";
import path from "path";
import matter from "gray-matter";
import BlogListClient from "./BlogListClient"; // client component (no dynamic import needed)

export default function BlogPage() {
  const postsDir = path.join(process.cwd(), "content/blog");
  const files = fs.existsSync(postsDir)
    ? fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"))
    : [];

  const posts = files.map((file) => {
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
  });

  return <BlogListClient posts={posts} />;
}
