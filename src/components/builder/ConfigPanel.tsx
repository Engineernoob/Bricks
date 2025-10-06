"use client";

import * as React from "react";
import { ChangeEvent } from "react";
import { useProject } from "./ProjectProvider";
import type { Block } from "./ProjectProvider";
import { Settings2, Type, TextCursor, Table } from "lucide-react";

/**
 * Right-hand side config panel for editing block properties.
 */
export default function ConfigPanel(): React.JSX.Element {
  const { project, selectedBlock, updateBlock } = useProject();

  // ───────────────────────────────
  // Empty state: no project
  // ───────────────────────────────
  if (!project) {
    return (
      <aside className="w-full md:w-80 bg-white border-l border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Config</h3>
        <p className="text-sm text-gray-500">
          Create or load a project to start configuring blocks.
        </p>
      </aside>
    );
  }

  // ───────────────────────────────
  // Empty state: no block selected
  // ───────────────────────────────
  if (!selectedBlock) {
    return (
      <aside className="w-full md:w-80 bg-white border-l border-gray-200 p-6 flex flex-col items-center justify-center text-center">
        <Settings2 className="w-6 h-6 text-gray-400 mb-2" />
        <p className="text-sm text-gray-500">
          Select a block to edit its properties.
        </p>
      </aside>
    );
  }

  // ───────────────────────────────
  // Input handlers (type-safe)
  // ───────────────────────────────
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target;
    updateBlock(selectedBlock.id, { [name]: value });
  };

  // ───────────────────────────────
  // Block-specific config sections
  // ───────────────────────────────
  const renderConfig = (block: Block): React.JSX.Element => {
    switch (block.type) {
      case "text":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Text Content
              </label>
              <input
                name="text"
                type="text"
                value={(block.props.text as string) || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
                placeholder="Enter heading text"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                HTML Tag
              </label>
              <select
                name="tag"
                value={(block.props.tag as string) || "h2"}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
              >
                <option value="h1">h1</option>
                <option value="h2">h2</option>
                <option value="h3">h3</option>
                <option value="p">p</option>
              </select>
            </div>
          </div>
        );

      case "input":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Label
              </label>
              <input
                name="label"
                type="text"
                value={(block.props.label as string) || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
                placeholder="Label text"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Placeholder
              </label>
              <input
                name="placeholder"
                type="text"
                value={(block.props.placeholder as string) || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
                placeholder="Placeholder text"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Field Name
              </label>
              <input
                name="name"
                type="text"
                value={(block.props.name as string) || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
                placeholder="Input field name"
              />
            </div>
          </div>
        );

      case "table":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Columns (comma separated)
              </label>
              <input
                name="columns"
                type="text"
                value={(block.props.columns as string[])?.join(", ") || ""}
                onChange={(e) =>
                  updateBlock(block.id, {
                    columns: e.target.value
                      .split(",")
                      .map((c) => c.trim())
                      .filter(Boolean),
                  })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
                placeholder="Column 1, Column 2"
              />
            </div>
          </div>
        );

      default:
        return (
          <p className="text-gray-500 text-sm italic">
            No configuration available.
          </p>
        );
    }
  };

  // ───────────────────────────────
  // Layout
  // ───────────────────────────────
  return (
    <aside className="w-full md:w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Block Settings</h3>
        {selectedBlock.type === "text" && (
          <Type className="w-5 h-5 text-gray-500" />
        )}
        {selectedBlock.type === "input" && (
          <TextCursor className="w-5 h-5 text-gray-500" />
        )}
        {selectedBlock.type === "table" && (
          <Table className="w-5 h-5 text-gray-500" />
        )}
      </div>

      <div className="space-y-6">{renderConfig(selectedBlock)}</div>
    </aside>
  );
}
