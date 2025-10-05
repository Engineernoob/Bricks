import fs from "fs";
import path from "path";
import Link from "next/link";

export default function DocsPage() {
  const docsDir = path.join(process.cwd(), "content/docs");
  const files = fs.readdirSync(docsDir);

  return (
    <main className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold mb-6">Documentation</h1>
      <p className="text-slate-600 mb-8">
        Learn how to use Bricks - from setup to deployment.
      </p>
      <ul className="space-y-3">
        {files.map((file) => {
          const slug = file.replace(".mdx", "");
          return (
            <li key={slug}>
              <Link
                href={`/docs/${slug}`}
                className="text-blue-600 hover:underline"
              >
                {slug.replace(/-/g, "")}
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
