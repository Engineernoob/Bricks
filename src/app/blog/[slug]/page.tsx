import fs from "fs";
import path from "path";
import matter from "gray-matter";
import BlogPostClient from "./BlogPostClient"; // client component for motion + MDX
import { notFound } from "next/navigation";

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const filePath = path.join(process.cwd(), "content/blog", `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(fileContents);

  return (
    <BlogPostClient
      slug={slug}
      title={data.title || slug.replace(/-/g, " ")}
      category={data.category || ""}
      date={
        data.date
          ? new Date(data.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "Coming soon"
      }
      author={data.author || "Team Bricks"}
      content={content}
    />
  );
}
