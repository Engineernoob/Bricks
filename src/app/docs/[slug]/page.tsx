import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

export default async function DocPage(props: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ Await params before usage
  const { slug } = await props.params;

  const filePath = path.join(process.cwd(), "content/docs", `${slug}.mdx`);
  const { content, data } = matter(fs.readFileSync(filePath, "utf-8"));

  return (
    <main className="max-w-4xl mx-auto py-20 px-6">
      <Link
        href="/docs"
        className="text-blue-600 hover:underline text-sm font-medium"
      >
        ← Back to Docs
      </Link>

      <h1 className="text-4xl font-bold mt-6 mb-8">{data.title || slug}</h1>

      <article className="prose prose-slate">
        {/* Render MDX content */}
        <MDXRemote source={content} />
      </article>
    </main>
  );
}
