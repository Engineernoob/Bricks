"use client";

import React from "react";
import {
  DndContext,
  closestCenter,
  useDroppable,
  useDraggable,
  DragEndEvent,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useProject } from "./ProjectProvider";
import type { Block } from "./ProjectProvider";

// ───────────────────────────────
// Block Renderer
// ───────────────────────────────
interface BlockRendererProps {
  block: Block;
  isSelected: boolean;
  onSelect: (id: string | null) => void;
}

function BlockRenderer({ block, isSelected, onSelect }: BlockRendererProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: block.id,
  });

  const style: React.CSSProperties = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    border: isSelected ? "2px solid #6366f1" : "1px solid #e5e7eb",
    padding: "1rem",
    borderRadius: "0.5rem",
    background: "white",
    cursor: "grab",
    boxShadow: isSelected ? "0 0 0 2px #c7d2fe" : undefined,
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(block.id);
  };

  switch (block.type) {
    case "text":
      return (
        <div
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          style={style}
          onClick={handleClick}
        >
          <h2 className="text-xl font-semibold">
            {(block.props.text as string) || "Heading"}
          </h2>
        </div>
      );

    case "input":
      return (
        <div
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          style={style}
          onClick={handleClick}
        >
          <label className="block text-sm font-medium mb-1">
            {(block.props.label as string) || "Label"}
          </label>
          <input
            placeholder={(block.props.placeholder as string) || "Enter text"}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            disabled
          />
        </div>
      );

    case "table":
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
                {(block.props.columns as string[]).map(
                  (c: string, i: number) => (
                    <th key={i} className="border-b px-2 py-1 text-left">
                      {c}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {(block.props.rows as string[][]).map(
                (r: string[], ri: number) => (
                  <tr key={ri}>
                    {r.map((cell: string, ci: number) => (
                      <td key={ci} className="border-t px-2 py-1">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      );

    default:
      return (
        <div
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          style={style}
          onClick={handleClick}
        >
          Unknown block type
        </div>
      );
  }
}

// ───────────────────────────────
// Droppable Zone
// ───────────────────────────────
function DropZone({ children }: { children: React.ReactNode }) {
  const { setNodeRef } = useDroppable({ id: "canvas" });

  return (
    <div
      ref={setNodeRef}
      className="min-h-[400px] p-6 bg-gray-50 rounded-lg border border-dashed border-gray-300"
    >
      {children}
    </div>
  );
}

// ───────────────────────────────
// Main Builder Canvas
// ───────────────────────────────
export default function BuilderCanvas(): React.JSX.Element {
  const { project, moveBlocks, selectBlock, selectedBlockId } = useProject();

  if (!project) {
    return (
      <div className="text-center text-gray-500 py-12">
        Create or load a project to start building.
      </div>
    );
  }

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const blocks = project.blocks ?? [];
    const oldIndex = blocks.findIndex((b) => b.id === active.id);
    const newIndex = blocks.findIndex((b) => b.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const updated = [...blocks];
    const [moved] = updated.splice(oldIndex, 1);
    updated.splice(newIndex, 0, moved);
    moveBlocks(updated);
  };

  return (
    <section
      className="p-8 bg-white rounded-xl shadow-sm border border-gray-200"
      onClick={() => selectBlock(null)} // Deselect on empty click
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        {project.name}
      </h2>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <DropZone>
          <div className="space-y-4">
            {project.blocks.length > 0 ? (
              project.blocks.map((block) => (
                <BlockRenderer
                  key={block.id}
                  block={block}
                  isSelected={block.id === selectedBlockId}
                  onSelect={selectBlock}
                />
              ))
            ) : (
              <p className="text-gray-400 text-center py-8">
                Add or drag a block here to get started.
              </p>
            )}
          </div>
        </DropZone>
      </DndContext>
    </section>
  );
}
