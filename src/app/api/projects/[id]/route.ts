import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// ───────────────────────────────
// GET /api/projects/[id]
// ───────────────────────────────
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const project = await prisma.project.findFirst({
      where: { id: params.id, user: { clerkId: userId } },
      include: {
        components: true,
        collections: {
          include: { fields: true, data: true },
        },
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error loading project:", error);
    return NextResponse.json(
      { error: "Failed to load project" },
      { status: 500 }
    );
  }
}

// ───────────────────────────────
// PUT /api/projects/[id]
// ───────────────────────────────
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as {
      name?: string;
      description?: string;
      isPublished?: boolean;
      blocks?: Array<{ type: string; props: unknown; orderIndex?: number }>;
    };

    const projectExists = await prisma.project.findFirst({
      where: { id: params.id, user: { clerkId: userId } },
    });

    if (!projectExists) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const project = await prisma.project.update({
      where: { id: params.id },
      data: {
        name: body.name ?? projectExists.name,
        description: body.description ?? projectExists.description,
        isPublished: body.isPublished ?? projectExists.isPublished,
        components: {
          deleteMany: {},
          create:
            body.blocks?.map((b) => ({
              type: b.type,
              props: b.props,
              orderIndex: b.orderIndex ?? 0,
            })) ?? [],
        },
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error saving project:", error);
    return NextResponse.json(
      { error: "Failed to save project" },
      { status: 500 }
    );
  }
}
