import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { DocsClient } from "../docs/DocClient";

export default async function DocsPage() {
  const docsDir = path.join(process.cwd(), "content/docs");
  const files = fs.existsSync(docsDir)
    ? fs.readdirSync(docsDir).filter((f) => f.endsWith(".mdx"))
    : [];

  const parsedDocs = files.map((file) => {
    const source = fs.readFileSync(path.join(docsDir, file), "utf-8");
    const { data } = matter(source);
    const slug = file.replace(".mdx", "");

    return {
      slug,
      title: data.title || slug.replace(/-/g, " "),
      description:
        data.description ||
        "Learn how to use Bricks — from setup to deployment.",
      category: data.category || "General",
    };
  });

  return <DocsClient parsedDocs={parsedDocs} />;
}
