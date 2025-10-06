"use client";

import * as React from "react";
import { useState, ChangeEvent } from "react";
import { useProject } from "./ProjectProvider";
import { Plus, Database } from "lucide-react";
import type { SchemaField } from "./ProjectProvider";

/**
 * Sidebar component for managing schema collections and fields.
 */
export default function SchemaEditor(): React.JSX.Element {
  const { project, createCollection, addFieldToCollection } = useProject();
  const [newCollection, setNewCollection] = useState<string>("");
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null,
  );
  const [newField, setNewField] = useState<SchemaField>({
    name: "",
    type: "string",
  });

  // ───────────────────────────────
  // Empty state (no project loaded)
  // ───────────────────────────────
  if (!project) {
    return (
      <aside className="w-full md:w-80 bg-white border-l border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Schema</h3>
        <p className="text-gray-500 text-sm">
          Create or load a project to start defining data models.
        </p>
      </aside>
    );
  }

  // ───────────────────────────────
  // Handlers
  // ───────────────────────────────
  const handleCreateCollection = (): void => {
    if (newCollection.trim()) {
      createCollection(newCollection.trim());
      setNewCollection("");
    }
  };

  const handleAddField = (): void => {
    if (!selectedCollection || !newField.name.trim()) return;
    addFieldToCollection(selectedCollection, {
      name: newField.name.trim(),
      type: newField.type,
    });
    setNewField({ name: "", type: "string" });
  };

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target;
    setNewField((prev) => ({ ...prev, [name]: value }));
  };

  const current = project.schema.find((s) => s.id === selectedCollection);

  // ───────────────────────────────
  // Render
  // ───────────────────────────────
  return (
    <aside className="w-full md:w-80 bg-white border-l border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Schema</h3>
        <Database className="w-5 h-5 text-gray-500" />
      </div>

      {/* Create Collection */}
      <div className="space-y-3 mb-6">
        <label className="block text-sm font-medium text-gray-600">
          New Collection
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newCollection}
            onChange={(e) => setNewCollection(e.target.value)}
            placeholder="e.g. Users"
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
          />
          <button
            type="button"
            onClick={handleCreateCollection}
            className="px-3 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
            aria-label="Add collection"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Collection List */}
      <div className="space-y-2 mb-6">
        {project.schema.length === 0 ? (
          <p className="text-gray-500 text-sm">No collections yet.</p>
        ) : (
          project.schema.map((col) => (
            <button
              key={col.id}
              type="button"
              onClick={() => setSelectedCollection(col.id)}
              className={`w-full text-left px-3 py-2 rounded-md border transition-colors text-sm font-medium ${
                selectedCollection === col.id
                  ? "border-gray-700 bg-gray-50"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              {col.name}
            </button>
          ))
        )}
      </div>

      {/* Fields Editor */}
      {current && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Fields in <span className="text-gray-900">{current.name}</span>
          </h4>
          <ul className="space-y-1 mb-3">
            {current.fields.map((f) => (
              <li
                key={`${f.name}-${f.type}`}
                className="flex justify-between text-sm text-gray-700 border-b border-gray-100 py-1"
              >
                <span>{f.name}</span>
                <span className="text-gray-400">{f.type}</span>
              </li>
            ))}
          </ul>

          {/* Add New Field */}
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                name="name"
                placeholder="Field name"
                value={newField.name}
                onChange={handleFieldChange}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
              />
              <select
                name="type"
                value={newField.type}
                onChange={handleFieldChange}
                className="border border-gray-300 rounded-md px-2 py-2 text-sm focus:ring-2 focus:ring-gray-800 outline-none"
              >
                <option value="string">String</option>
                <option value="number">Number</option>
                <option value="boolean">Boolean</option>
                <option value="date">Date</option>
              </select>
              <button
                type="button"
                onClick={handleAddField}
                className="px-3 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
                aria-label="Add field"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
