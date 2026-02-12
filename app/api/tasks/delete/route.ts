import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { tasks } from "@/database/schema";


export async function DELETE(req: Request) {
  const { id } = await req.json();

  await db.delete(tasks).where(eq(tasks.id, id));

  return NextResponse.json({ success: true });
}