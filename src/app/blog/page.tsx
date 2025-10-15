import fs from "fs";
import path from "path";
import matter from "gray-matter";

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

  return (
    <div style={{ display: "grid", gap: "1.5rem", padding: "1rem" }}>
      {posts.map(({ slug, title, excerpt, date, author }) => (
        <article key={slug} style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
          <h2 style={{ margin: "0 0 0.5rem 0" }}>{title}</h2>
          <p style={{ fontSize: "0.9rem", color: "#666", margin: "0 0 0.25rem 0" }}>
            {date} &mdash; {author}
          </p>
          <p style={{ margin: "0 0 1rem 0" }}>{excerpt}</p>
          <a href={`/blog/${slug}`} style={{ color: "#0070f3", textDecoration: "none" }}>
            Read more &rarr;
          </a>
        </article>
      ))}
    </div>
  );
}
