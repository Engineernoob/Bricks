import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { DocContentClient } from "../DocsContentClient"; // ✅ use correct component

export default async function DocPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  // ✅ Read MDX file from /content/docs/
  const filePath = path.join(process.cwd(), "content/docs", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return (
      <div className="text-center mt-20 text-slate-500">Doc not found.</div>
    );
  }

  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(fileContents);

  // ✅ Pass structured props to client component
  return (
    <DocContentClient
      title={data.title || slug}
      content={content}
      description={data.description || ""}
      date={data.date || ""}
    />
  );
}
