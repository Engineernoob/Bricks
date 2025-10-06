"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

// ───────────────────────────────
// Types
// ───────────────────────────────
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
  createProject: (name: string) => Project;
  loadProject: (id: string) => void;
  saveProject: () => void;
  addBlock: (type: BlockType) => Block;
  moveBlocks: (newOrder: Block[]) => void;
  updateBlock: (id: string, patch: Partial<Block["props"]>) => void;
  removeBlock: (id: string) => void;
  createCollection: (name: string) => void;
  addFieldToCollection: (collectionId: string, field: SchemaField) => void;
  projectsList: Project[];
}

// ───────────────────────────────
// Context setup
// ───────────────────────────────
const ProjectContext = createContext<ProjectContextValue | undefined>(
  undefined,
);

const STORAGE_KEY = "bricks_projects_v1";
const LAST_OPEN_KEY = "bricks_last_project";

function loadAll(): Project[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: Project[] = JSON.parse(raw);
    return parsed;
  } catch {
    return [];
  }
}

function persistAll(list: Project[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// ───────────────────────────────
// Provider
// ───────────────────────────────
export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [project, setProject] = useState<Project | null>(null);
  const [projectsList, setProjectsList] = useState<Project[]>([]);

  // Load projects from localStorage
  useEffect(() => {
    const list = loadAll();
    setProjectsList(list);
    const last = localStorage.getItem(LAST_OPEN_KEY);
    if (last) {
      const p = list.find((x) => x.id === last);
      if (p) setProject(p);
    }
  }, []);

  // Persist last opened project id
  useEffect(() => {
    if (project) localStorage.setItem(LAST_OPEN_KEY, project.id);
  }, [project]);

  function createProject(name: string): Project {
    const newProj: Project = {
      id: uuid(),
      name,
      blocks: [],
      schema: [],
      createdAt: new Date().toISOString(),
    };
    const list = [newProj, ...projectsList];
    persistAll(list);
    setProjectsList(list);
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
    const defaultProps: Record<BlockType, Record<string, unknown>> = {
      text: { text: "Heading", tag: "h2" },
      input: { label: "Name", placeholder: "Enter value", name: "field" },
      table: { columns: ["Column 1", "Column 2"], rows: [["", ""]] },
    };
    const newBlock: Block = {
      id: uuid(),
      type,
      props: defaultProps[type],
    };
    const updated: Project = {
      ...project,
      blocks: [...project.blocks, newBlock],
    };
    setProject(updated);
    return newBlock;
  }

  function moveBlocks(newOrder: Block[]): void {
    if (!project) return;
    setProject({ ...project, blocks: newOrder });
  }

  function updateBlock(id: string, patch: Partial<Block["props"]>): void {
    if (!project) return;
    const blocks = project.blocks.map((b) =>
      b.id === id ? { ...b, props: { ...b.props, ...patch } } : b,
    );
    setProject({ ...project, blocks });
  }

  function removeBlock(id: string): void {
    if (!project) return;
    setProject({
      ...project,
      blocks: project.blocks.filter((b) => b.id !== id),
    });
  }

  function createCollection(name: string): void {
    if (!project) return;
    const col: SchemaCollection = { id: uuid(), name, fields: [] };
    setProject({ ...project, schema: [...project.schema, col] });
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
    setProject({ ...project, schema });
  }

  const value: ProjectContextValue = {
    project,
    createProject,
    loadProject,
    saveProject,
    addBlock,
    moveBlocks,
    updateBlock,
    removeBlock,
    createCollection,
    addFieldToCollection,
    projectsList,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}

export function useProject(): ProjectContextValue {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error("useProject must be used inside ProjectProvider");
  return ctx;
}
