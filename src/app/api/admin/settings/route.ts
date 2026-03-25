import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/admin-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const settingsArr = await prisma.siteSetting.findMany();
  const settings = Object.fromEntries(settingsArr.map((s: { key: string, value: string }) => [s.key, s.value]));
  return NextResponse.json(settings);
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json(); // Map of key: value
    
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updates = await Promise.all(
      Object.entries(body).map(([key, value]) =>
        prisma.siteSetting.upsert({
          where: { key },
          update: { value: String(value) },
          create: { key, value: String(value) },
        })
      )
    );

    return NextResponse.json({ success: true, count: updates.length });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
