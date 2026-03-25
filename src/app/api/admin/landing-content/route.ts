import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/admin-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const content = await prisma.landingContent.findFirst({
    where: { id: 1 },
  });
  return NextResponse.json(content || {});
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Authorization check (redundant but safe if middleware had issues)
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updated = await prisma.landingContent.upsert({
      where: { id: 1 },
      update: body,
      create: { ...body, id: 1 },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}
