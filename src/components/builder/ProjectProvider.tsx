"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { v4 as uuid } from "uuid";

// ───────────────────────────────
// Types
// ───────────────────────────────
export interface BlockProps {
  [key: string]: string | string[] | number | boolean;
}

export type BlockType = "text" | "input" | "table";

export interface Block {
  id: string;
  type: BlockType;
  props: Record<string, unknown>;
}

export interface SchemaField {
  name: string;
  type: string;
}

export interface SchemaCollection {
  id: string;
  name: string;
  fields: SchemaField[];
}

export interface Project {
  id: string;
  name: string;
  blocks: Block[];
  schema: SchemaCollection[];
  createdAt: string;
}

export interface ProjectContextValue {
  project: Project | null;
  projectsList: Project[];
  selectedBlockId: string | null;
  selectedBlock: Block | null;

  createProject: (name: string) => Promise<Project>;
  loadProject: (id: string) => Promise<void>;
  saveProject: () => Promise<void>;
  addBlock: (type: BlockType) => Block;
  moveBlocks: (newOrder: Block[]) => void;
  updateBlock: (id: string, patch: Partial<Block["props"]>) => void;
  removeBlock: (id: string) => void;
  selectBlock: (id: string | null) => void;
  createCollection: (name: string) => void;
  addFieldToCollection: (collectionId: string, field: SchemaField) => void;
}

// ───────────────────────────────
// Context Setup
// ───────────────────────────────
const ProjectContext = createContext<ProjectContextValue | undefined>(
  undefined,
);

// ───────────────────────────────
// Provider Component
// ───────────────────────────────
export function ProjectProvider({ children }: { children: ReactNode }) {
  const [project, setProject] = useState<Project | null>(null);
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  // Load all projects on mount
  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const list = await res.json();
          setProjectsList(list);
          if (list.length > 0) {
            setProject(list[0]);
          }
        }
      } catch {
        // ignore errors
      }
    }
    fetchProjects();
  }, []);

  // ───────────────────────────────
  // Core Actions
  // ───────────────────────────────
  async function createProject(name: string): Promise<Project> {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const newProj = await res.json();
    setProjectsList((prev) => [newProj, ...prev]);
    setProject(newProj);
    return newProj;
  }

  async function loadProject(id: string): Promise<void> {
    const res = await fetch(`/api/projects/${id}`);
    const data = await res.json();
    setProject(data);
  }

  async function saveProject(): Promise<void> {
    if (!project) return;
    await fetch(`/api/projects/${project.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
  }

  function addBlock(type: BlockType): Block {
    if (!project) throw new Error("No project loaded");

    const defaults: Record<BlockType, Record<string, unknown>> = {
      text: { text: "Heading", tag: "h2" },
      input: { label: "Name", placeholder: "Enter text" },
      table: { columns: ["Column 1", "Column 2"], rows: [["", ""]] },
    };

    const newBlock: Block = { id: uuid(), type, props: defaults[type] };
    const updated = { ...project, blocks: [...project.blocks, newBlock] };

    setProject(updated);
    saveProject();
    return newBlock;
  }

  function moveBlocks(newOrder: Block[]): void {
    if (!project) return;
    const updated = { ...project, blocks: newOrder };
    setProject(updated);
    saveProject();
  }

  function updateBlock(id: string, patch: Partial<Block["props"]>): void {
    if (!project) return;
    const blocks = project.blocks.map((b) =>
      b.id === id ? { ...b, props: { ...b.props, ...patch } } : b,
    );
    const updated = { ...project, blocks };
    setProject(updated);
    saveProject();
  }

  function removeBlock(id: string): void {
    if (!project) return;
    const updated = {
      ...project,
      blocks: project.blocks.filter((b) => b.id !== id),
    };
    setProject(updated);
    saveProject();
  }

  // ───────────────────────────────
  // Schema Actions
  // ───────────────────────────────
  function createCollection(name: string): void {
    if (!project) return;
    const newCol: SchemaCollection = { id: uuid(), name, fields: [] };
    const updated = { ...project, schema: [...project.schema, newCol] };
    setProject(updated);
    saveProject();
  }

  function addFieldToCollection(
    collectionId: string,
    field: SchemaField,
  ): void {
    if (!project) return;
    const schema = project.schema.map((col) =>
      col.id === collectionId
        ? { ...col, fields: [...col.fields, field] }
        : col,
    );
    const updated = { ...project, schema };
    setProject(updated);
    saveProject();
  }

  // ───────────────────────────────
  // Block Selection
  // ───────────────────────────────
  function selectBlock(id: string | null): void {
    setSelectedBlockId(id);
  }

  const selectedBlock =
    project?.blocks.find((b) => b.id === selectedBlockId) || null;

  // ───────────────────────────────
  // Context Value
  // ───────────────────────────────
  const value: ProjectContextValue = {
    project,
    projectsList,
    selectedBlockId,
    selectedBlock,
    createProject,
    loadProject,
    saveProject,
    addBlock,
    moveBlocks,
    updateBlock,
    removeBlock,
    selectBlock,
    createCollection,
    addFieldToCollection,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}

// ───────────────────────────────
// Hook
// ───────────────────────────────
export function useProject(): ProjectContextValue {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error("useProject must be used within ProjectProvider");
  return ctx;
}
