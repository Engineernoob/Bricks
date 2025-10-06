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

  createProject: (name: string) => Project;
  loadProject: (id: string) => void;
  saveProject: () => void;
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

// LocalStorage keys
const STORAGE_KEY = "bricks_projects_v1";
const LAST_OPEN_KEY = "bricks_last_project";

// ───────────────────────────────
// Helpers
// ───────────────────────────────
function loadAll(): Project[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Project[];
  } catch {
    return [];
  }
}

function persistAll(list: Project[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// ───────────────────────────────
// Provider Component
// ───────────────────────────────
export function ProjectProvider({ children }: { children: ReactNode }) {
  const [project, setProject] = useState<Project | null>(null);
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  // Load all projects on mount
  useEffect(() => {
    const list = loadAll();
    setProjectsList(list);

    const last = localStorage.getItem(LAST_OPEN_KEY);
    if (last) {
      const found = list.find((p) => p.id === last);
      if (found) setProject(found);
    }
  }, []);

  // Persist last opened project
  useEffect(() => {
    if (project) localStorage.setItem(LAST_OPEN_KEY, project.id);
  }, [project]);

  // ───────────────────────────────
  // Core Actions
  // ───────────────────────────────
  function createProject(name: string): Project {
    const newProj: Project = {
      id: uuid(),
      name,
      blocks: [],
      schema: [],
      createdAt: new Date().toISOString(),
    };
    const updated = [newProj, ...projectsList];
    persistAll(updated);
    setProjectsList(updated);
    setProject(newProj);
    return newProj;
  }

  function loadProject(id: string): void {
    const list = loadAll();
    const found = list.find((p) => p.id === id) || null;
    setProject(found);
    setProjectsList(list);
  }

  function saveProject(): void {
    if (!project) return;
    const list = loadAll();
    const idx = list.findIndex((p) => p.id === project.id);
    if (idx >= 0) list[idx] = project;
    else list.unshift(project);
    persistAll(list);
    setProjectsList(list);
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
    persistAll([updated, ...projectsList.filter((p) => p.id !== project.id)]);
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
