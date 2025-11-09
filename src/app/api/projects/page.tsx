"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusCircle, Folder, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // 🧠 Load projects from API
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data.projects || []);
      } catch (err) {
        console.error("Failed to load projects:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // ➕ Create a new project
  async function handleCreate() {
    const name = prompt("Enter project name:");
    if (!name) return;
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      setProjects((prev) => [data.project, ...prev]);
    } catch (err) {
      console.error("Failed to create project:", err);
    }
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-[Amiri] font-bold text-slate-900">
              Your Projects
            </h1>
            <p className="text-slate-600 font-[Inter] mt-2">
              Manage and open your Bricks projects.
            </p>
          </div>

          <Button
            onClick={handleCreate}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white"
          >
            <PlusCircle className="w-4 h-4" />
            New Project
          </Button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12 text-slate-600">
            <Loader2 className="animate-spin w-6 h-6 mr-2" /> Loading
            projects...
          </div>
        )}

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <div className="text-center text-slate-500 py-20">
            <Folder className="w-10 h-10 mx-auto mb-4 opacity-70" />
            <p>No projects found. Start by creating a new one!</p>
          </div>
        )}

        {/* Project Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/app/${project.id}`}
              className="block group bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <h3 className="text-lg font-semibold text-slate-900 group-hover:text-slate-700">
                {project.name}
              </h3>
              <p className="text-sm text-slate-500 mt-2">
                {project.description || "No description"}
              </p>
              <p className="text-xs text-slate-400 mt-4">
                Created {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
