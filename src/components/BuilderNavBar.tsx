"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Save, Play, Rocket } from "lucide-react";
import { useProject } from "@/components/builder/ProjectProvider";

export default function BuilderNavBar(): React.JSX.Element {
  const { project, saveProject } = useProject();
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  const handleSave = (): void => {
    if (!project) return;
    setIsSaving(true);
    saveProject();
    window.dispatchEvent(new Event("project-saved"));
    setTimeout(() => setIsSaving(false), 800);
  };

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white/80 backdrop-blur-sm px-6 py-3 sticky top-0 z-20">
      {/* Left: project name + status */}
      <div className="flex items-center gap-3">
        <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
        <h1 className="text-gray-800 font-medium text-sm md:text-base">
          {project ? project.name : "Untitled Project"}
        </h1>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Save */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSave}
          disabled={isSaving}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm font-medium transition ${
            isSaving
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-50 text-gray-800 border-gray-300"
          }`}
        >
          <Save className="w-4 h-4" />
          {isSaving ? "Saving..." : "Save"}
        </motion.button>

        {/* Deploy */}
        <motion.a
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          href={project ? `/deploy/${project.id}` : "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-300 text-gray-800 text-sm font-medium hover:bg-gray-50 transition"
        >
          <Rocket className="w-4 h-4 text-indigo-500" />
          Deploy
        </motion.a>

        {/* Preview toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowPreview((p) => !p)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium border transition ${
            showPreview
              ? "bg-gray-900 text-white border-gray-900 hover:opacity-90"
              : "border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          <Play className="w-4 h-4" />
          {showPreview ? "Hide Preview" : "Show Preview"}
        </motion.button>
      </div>
    </header>
  );
}
