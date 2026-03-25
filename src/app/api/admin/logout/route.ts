import { deleteSession } from "@/lib/admin-auth";
import { NextResponse } from "next/server";

export async function POST() {
  await deleteSession();
  return NextResponse.json({ success: true, message: "Logged out successfully" });
}
