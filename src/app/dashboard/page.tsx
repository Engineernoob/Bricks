"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Layers,
  Plus,
  Settings,
  ExternalLink,
  Loader2,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// --- Types ---
interface Project {
  id: string;
  userId: string;
  name: string;
  slug: string;
  description: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

// --- Dashboard ---
export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    slug: "",
    description: "",
  });

  useEffect(() => {
    if (isLoaded && !user) router.push("/sign-in");
  }, [user, isLoaded, router]);

  useEffect(() => {
    if (user) loadProjects();
  }, [user]);

  // Fetch projects from your API (Prisma + Neon)
  const loadProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error("Failed to load projects", err);
    } finally {
      setLoading(false);
    }
  };

  // Create project via API route
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setCreating(true);

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newProject.name,
        slug: newProject.slug,
        description: newProject.description,
      }),
    });

    if (res.ok) {
      const project = await res.json();
      setProjects((prev) => [project, ...prev]);
      setDialogOpen(false);
      setNewProject({ name: "", slug: "", description: "" });
      router.push(`/builder/${project.id}`);
    }

    setCreating(false);
  };

  if (!isLoaded || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/70 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Layers className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-slate-900">Bricks</span>
            </Link>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={() => router.push("/sign-out")}
                className="text-slate-600 hover:text-slate-900"
              >
                Sign out
              </Button>
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 flex items-center justify-center text-white text-xs font-semibold">
                {user?.firstName?.[0] ?? "B"}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard content */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Welcome back, {user?.firstName || "Builder"} 👋
            </h1>
            <p className="mt-2 text-slate-600">
              Manage your projects or start building something new.
            </p>
          </div>

          {/* Create project modal */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Start building your app by creating a new project.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateProject}>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Project Name</Label>
                    <Input
                      id="name"
                      placeholder="My Awesome App"
                      value={newProject.name}
                      onChange={(e) =>
                        setNewProject({ ...newProject, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug (URL)</Label>
                    <Input
                      id="slug"
                      placeholder="my-awesome-app"
                      value={newProject.slug}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          slug: e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9-]/g, "-"),
                        })
                      }
                      required
                    />
                    <p className="text-xs text-slate-500">
                      Your app will be available at /app/
                      {newProject.slug || "your-slug"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      placeholder="A brief description of your app"
                      value={newProject.description}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={creating}>
                    {creating ? "Creating..." : "Create Project"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Project Grid */}
        {projects.length === 0 ? (
          <Card className="border-dashed border-2 border-slate-300 bg-white/50 backdrop-blur-sm shadow-none">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Layers className="h-12 w-12 text-slate-400" />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                No projects yet
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Get started by creating your first project.
              </p>
              <Button className="mt-6" onClick={() => setDialogOpen(true)}>
                Create Project
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="transition-all hover:shadow-lg bg-white/70 backdrop-blur-sm border border-slate-200"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{project.name}</CardTitle>
                      <CardDescription>
                        {project.description || "No description"}
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => router.push(`/builder/${project.id}`)}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-slate-100 rounded-md flex items-center justify-center text-slate-400 mb-4">
                    Preview coming soon
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Link href={`/builder/${project.id}`}>
                        <Button size="sm" variant="outline" className="gap-2">
                          <Settings className="h-3 w-3" />
                          Edit
                        </Button>
                      </Link>
                      {project.isPublished && (
                        <Link href={`/app/${project.slug}`} target="_blank">
                          <Button size="sm" variant="outline" className="gap-2">
                            <ExternalLink className="h-3 w-3" />
                            View
                          </Button>
                        </Link>
                      )}
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                        project.isPublished
                          ? "bg-green-50 text-green-700 ring-green-600/20"
                          : "bg-slate-50 text-slate-700 ring-slate-600/20"
                      }`}
                    >
                      {project.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
