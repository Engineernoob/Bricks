"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { useProject } from "@/components/builder/ProjectProvider";
import { Save, Play, Rocket } from "lucide-react";

interface BuilderTopbarProps {
  onTogglePreview?: () => void;
  showPreview?: boolean;
  onSave?: () => void;
}

export default function BuilderTopbar({
  onTogglePreview,
  showPreview,
  onSave,
}: BuilderTopbarProps): React.JSX.Element {
  const { project } = useProject();
  const [isSaving, setIsSaving] = useState(false);

  // Handle Save button
  const handleSaveClick = (): void => {
    if (!onSave) return;
    setIsSaving(true);
    onSave();
    setTimeout(() => setIsSaving(false), 700);
  };

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white/80 backdrop-blur-sm px-6 py-3 sticky top-0 z-20">
      {/* Left: Project Name */}
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
        <h1 className="text-gray-800 font-medium text-sm md:text-base">
          {project ? project.name : "No Project Loaded"}
        </h1>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Save */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSaveClick}
          disabled={isSaving}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm font-medium transition-all ${
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
          whileTap={{ scale: 0.95 }}
          href={project ? `/deploy/${project.id}` : "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-300 text-gray-800 text-sm font-medium hover:bg-gray-50 transition-all"
        >
          <Rocket className="w-4 h-4 text-indigo-500" />
          Deploy
        </motion.a>

        {/* Preview Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={onTogglePreview}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium border transition-all ${
            showPreview
              ? "bg-gray-900 text-white border-gray-900 hover:opacity-90"
              : "border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          <Play className="w-4 h-4" />
          {showPreview ? "Hide Preview" : "Preview"}
        </motion.button>
      </div>
    </header>
  );
}
