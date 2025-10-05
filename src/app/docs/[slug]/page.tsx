import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";

export default function DocPage({ params }: { params: { slug: string } }) {
  const filePath = path.join(
    process.cwd(),
    "content/docs",
    `${params.slug}.mdx`,
  );
  const { content, data } = matter(fs.readFileSync(filePath, "utf-8"));

  return (
    <main className="max-w-4xl mx-auto py-20 px-6 prose prose-slate">
      <h1>{data.title}</h1>
      <MDXRemote source={content} />
    </main>
  );
}
