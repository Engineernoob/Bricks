"use client";

import * as React from "react";
import { motion } from "motion/react";
import { useProject } from "./ProjectProvider";
import { Type, TextCursorInput, Table } from "lucide-react";
import type { BlockType } from "./ProjectProvider";

// ───────────────────────────────
// Tool definitions
// ───────────────────────────────
interface Tool {
  name: string;
  type: BlockType;
  icon: React.ReactElement;
}

// ───────────────────────────────
// Component
// ───────────────────────────────
export default function Toolbox(): React.JSX.Element {
  const { addBlock } = useProject();

  const tools: readonly Tool[] = [
    { name: "Text", type: "text", icon: <Type className="w-4 h-4" /> },
    {
      name: "Input",
      type: "input",
      icon: <TextCursorInput className="w-4 h-4" />,
    },
    { name: "Table", type: "table", icon: <Table className="w-4 h-4" /> },
  ] as const;

  return (
    <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Toolbox</h3>
      <p className="text-sm text-gray-500 mb-6">
        Click a block to add it to your canvas.
      </p>

      <div className="space-y-3">
        {tools.map((tool) => (
          <motion.button
            key={tool.type}
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => addBlock(tool.type)}
            className="w-full flex items-center justify-between px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-sm font-medium text-gray-700"
          >
            <div className="flex items-center gap-2">
              {tool.icon}
              <span>{tool.name}</span>
            </div>
            <span className="text-gray-400">+</span>
          </motion.button>
        ))}
      </div>
    </aside>
  );
}
