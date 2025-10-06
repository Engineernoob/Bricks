import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { DocClient } from "../DocClient";

export default async function DocPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;

  // Read MDX file from the content directory
  const filePath = path.join(process.cwd(), "content/docs", `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf-8");

  // Parse frontmatter and content
  const { content, data } = matter(fileContents);

  // Pass content to the client component
  return (
    <DocClient
      title={data.title || slug}
      content={content}
      description={data.description || ""}
      date={data.date || ""}
    />
  );
}
