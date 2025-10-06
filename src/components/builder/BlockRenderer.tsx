"use client";

import * as React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { Block } from "./ProjectProvider";

// Define the valid HTML tag names you support for text blocks
const ALLOWED_TAGS = ["h1", "h2", "h3", "h4", "p", "span"] as const;
type AllowedTag = (typeof ALLOWED_TAGS)[number];

interface BlockRendererProps {
  block: Block;
  isSelected: boolean;
  onSelect: (id: string | null) => void;
}

/**
 * Safe dynamic renderer for block types (text, input, table)
 */
export default function BlockRenderer({
  block,
  isSelected,
  onSelect,
}: BlockRendererProps): React.JSX.Element {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: block.id,
  });

  const style: React.CSSProperties = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    border: isSelected ? "2px solid #6366f1" : "1px solid #e5e7eb",
    borderRadius: "0.5rem",
    backgroundColor: "white",
    cursor: "grab",
    padding: "1rem",
    boxShadow: isSelected ? "0 0 0 2px #c7d2fe" : undefined,
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  };

  const handleClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    onSelect(block.id);
  };

  // ✅ Safe dynamic tag rendering helper
  const renderDynamicTag = (
    tag: string,
    children: React.ReactNode,
    className?: string,
  ): React.ReactNode => {
    const SafeTag = ALLOWED_TAGS.includes(tag as AllowedTag)
      ? (tag as AllowedTag)
      : "h2";

    // ✅ Explicitly cast the tag as a valid JSX element type
    return React.createElement(
      SafeTag as keyof React.JSX.IntrinsicElements,
      {
        className,
      },
      children,
    );
  };

  // ───────────────────────────────
  // Block type-specific rendering
  // ───────────────────────────────
  switch (block.type) {
    case "text": {
      const tag = (block.props.tag as string) || "h2";
      const text = (block.props.text as string) || "Heading";
      return (
        <div
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          style={style}
          onClick={handleClick}
        >
          {renderDynamicTag(tag, text, "font-semibold text-xl text-gray-800")}
        </div>
      );
    }

    case "input": {
      const label = (block.props.label as string) || "Label";
      const placeholder =
        (block.props.placeholder as string) || "Enter something";
      return (
        <div
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          style={style}
          onClick={handleClick}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
          <input
            type="text"
            placeholder={placeholder}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
            disabled
          />
        </div>
      );
    }

    case "table": {
      const columns = (block.props.columns as string[]) || ["Column 1"];
      const rows = (block.props.rows as string[][]) || [[""]];
      return (
        <div
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          style={style}
          onClick={handleClick}
        >
          <table className="w-full border border-gray-200 rounded-md text-sm">
            <thead>
              <tr>
                {columns.map((col, i) => (
                  <th
                    key={i}
                    className="border-b px-2 py-1 text-left font-semibold text-gray-700"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="border-t px-2 py-1 text-gray-600">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    default:
      return (
        <div
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          style={style}
          onClick={handleClick}
          className="text-gray-500 italic text-sm"
        >
          Unknown block type
        </div>
      );
  }
}
