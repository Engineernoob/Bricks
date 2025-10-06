"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  ProjectProvider,
  useProject,
} from "@/components/builder/ProjectProvider";
import Toolbox from "@/components/builder/Toolbox";
import BuilderCanvas from "@/components/builder/Canvas";
import SchemaEditor from "@/components/builder/SchemaEditor";
import ConfigPanel from "@/components/builder/ConfigPanel";
import { motion } from "motion/react";
import { Layers3, Settings2 } from "lucide-react";

// ───────────────────────────────
// Inner Builder Layout (inside provider)
// ───────────────────────────────
function BuilderWorkspace(): React.JSX.Element {
  const { project, loadProject, projectsList } = useProject();
  const params = useParams<{ projectId: string }>();
  const [activeTab, setActiveTab] = useState<"config" | "schema">("config");

  // Load the project on mount
  useEffect(() => {
    if (params?.projectId) {
      loadProject(params.projectId);
    }
  }, [params?.projectId, loadProject]);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-500">
        <p className="text-lg font-medium mb-2">No project loaded</p>
        {projectsList.length === 0 ? (
          <p className="text-sm">Create a new project to begin.</p>
        ) : (
          <p className="text-sm">Please ensure this project ID exists.</p>
        )}
      </div>
    );
  }

  return (
    <main className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Left sidebar: Toolbox */}
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex-shrink-0 border-r border-gray-200 bg-white w-full md:w-64 overflow-y-auto"
      >
        <Toolbox />
      </motion.div>

      {/* Center: Builder Canvas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex-1 overflow-y-auto bg-gray-50"
      >
        <BuilderCanvas />
      </motion.div>

      {/* Right sidebar: Config / Schema toggle */}
      <motion.div
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex-shrink-0 border-l border-gray-200 bg-white w-full md:w-80 relative"
      >
        {/* Mobile toggle */}
        <div className="flex md:hidden items-center justify-around border-b border-gray-100">
          <button
            onClick={() => setActiveTab("config")}
            className={`flex items-center gap-2 py-3 px-4 text-sm font-medium ${
              activeTab === "config"
                ? "text-gray-900 border-b-2 border-gray-800"
                : "text-gray-500"
            }`}
          >
            <Settings2 className="w-4 h-4" />
            Config
          </button>
          <button
            onClick={() => setActiveTab("schema")}
            className={`flex items-center gap-2 py-3 px-4 text-sm font-medium ${
              activeTab === "schema"
                ? "text-gray-900 border-b-2 border-gray-800"
                : "text-gray-500"
            }`}
          >
            <Layers3 className="w-4 h-4" />
            Schema
          </button>
        </div>

        {/* Panels */}
        <div className="hidden md:block h-full">
          <ConfigPanel />
          <SchemaEditor />
        </div>

        {/* Mobile tab content */}
        <div className="md:hidden">
          {activeTab === "config" && <ConfigPanel />}
          {activeTab === "schema" && <SchemaEditor />}
        </div>
      </motion.div>
    </main>
  );
}

// ───────────────────────────────
// Page entry (Provider wrapper)
// ───────────────────────────────
export default function ProjectPage(): React.JSX.Element {
  return (
    <ProjectProvider>
      <BuilderWorkspace />
    </ProjectProvider>
  );
}
