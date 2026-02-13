import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { tasks } from "@/database/schema";

interface Params {
  params: Promise<Record<string, string>>;
}

export async function PATCH(req: Request, { params }: Params) {
  const id = (await params).id;
  const body = await req.json();

  await db
    .update(tasks)
    .set({ completed: body.completed })
    .where(eq(tasks.id, id));

  return NextResponse.json({ success: true });
}
