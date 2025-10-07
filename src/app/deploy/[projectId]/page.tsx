"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ProjectProvider,
  useProject,
} from "@/components/builder/ProjectProvider";
import { motion } from "motion/react";

// ───────────────────────────────
// Read-only block renderer
// ───────────────────────────────
function PreviewBlock({
  type,
  props,
}: {
  type: string;
  props: Record<string, unknown>;
}): React.JSX.Element {
  switch (type) {
    case "text": {
      const Tag = (props.tag as keyof React.JSX.IntrinsicElements) || "h2";
      return (
        <Tag className="font-semibold text-gray-900 text-2xl mb-4">
          {props.text as string}
        </Tag>
      );
    }

    case "input":
      return (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {props.label as string}
          </label>
          <input
            type="text"
            placeholder={props.placeholder as string}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            disabled
          />
        </div>
      );

    case "table":
      return (
        <div className="overflow-x-auto mb-6">
          <table className="w-full border border-gray-200 rounded-md text-sm">
            <thead className="bg-gray-50">
              <tr>
                {(props.columns as string[]).map((c, i) => (
                  <th
                    key={i}
                    className="border-b px-3 py-2 text-left font-medium text-gray-700"
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(props.rows as string[][]).map((r, ri) => (
                <tr key={ri}>
                  {r.map((cell, ci) => (
                    <td
                      key={ci}
                      className="border-t px-3 py-2 text-gray-600 whitespace-nowrap"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    default:
      return <p className="text-gray-400 italic">Unknown block type: {type}</p>;
  }
}

// ───────────────────────────────
// Main preview workspace
// ───────────────────────────────
function DeployWorkspace(): React.JSX.Element {
  const { project, loadProject } = useProject();
  const params = useParams<{ projectId: string }>();
  const router = useRouter();

  // Load project from storage
  useEffect(() => {
    if (params?.projectId) {
      loadProject(params.projectId);
    }
  }, [params?.projectId, loadProject]);

  // 🔁 Listen for save events from builder
  useEffect(() => {
    const listener = (e: MessageEvent) => {
      if (e.data?.type === "PROJECT_UPDATED") {
        window.location.reload();
      }
    };
    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, []);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-500">
        <p className="text-lg font-medium mb-3">Project not found</p>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 text-sm text-white bg-gray-800 rounded-md hover:bg-gray-700"
        >
          Back to Builder
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white text-gray-900 px-6 py-10 md:px-20"
    >
      <header className="mb-10">
        <h1 className="text-3xl font-bold">{project.name}</h1>
        <p className="text-gray-500 text-sm mt-1">
          Live Preview • {new Date(project.createdAt).toLocaleDateString()}
        </p>
      </header>

      <section className="max-w-3xl mx-auto space-y-6">
        {project.blocks.length > 0 ? (
          project.blocks.map((block) => (
            <PreviewBlock
              key={block.id}
              type={block.type}
              props={block.props}
            />
          ))
        ) : (
          <p className="text-gray-400 text-center italic py-10">
            No content yet — build something in the editor.
          </p>
        )}
      </section>
    </motion.div>
  );
}

// ───────────────────────────────
// Wrapper with ProjectProvider
// ───────────────────────────────
export default function DeployPage(): React.JSX.Element {
  return (
    <ProjectProvider>
      <DeployWorkspace />
    </ProjectProvider>
  );
}
