import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { slugify } from "@/lib/utils/slugify";

export async function POST(req: Request) {
  try {
    // ✅ Await the async call
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { name, description } = await req.json();
    const slug = slugify(name);

    const project = await prisma.project.create({
      data: {
        name,
        description,
        slug,
        user: {
          connect: { clerkId: userId },
        },
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 },
    );
  }
}