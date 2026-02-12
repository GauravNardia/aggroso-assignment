import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { tasks } from "@/database/schema";

export async function PATCH(req: Request) {
  const { id, completed } = await req.json();

  await db
    .update(tasks)
    .set({ completed: true })
    .where(eq(tasks.id, id));

  return NextResponse.json({ success: true });
}
