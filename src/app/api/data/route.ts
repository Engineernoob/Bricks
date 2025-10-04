import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const collectionId = searchParams.get("collectionId");

  if (!collectionId)
    return NextResponse.json(
      { error: "Missing collectionId" },
      { status: 400 },
    );

  const data = await prisma.collectionData.findMany({
    where: { collectionId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { collectionId, data } = body;

  if (!collectionId)
    return NextResponse.json(
      { error: "Missing collectionId" },
      { status: 400 },
    );

  const inserted = await prisma.collectionData.create({
    data: {
      collectionId,
      data,
    },
  });

  return NextResponse.json(inserted);
}
