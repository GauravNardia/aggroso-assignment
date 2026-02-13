import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { tasks } from "@/database/schema";

export async function PATCH(  req: Request,
  { params }: { params: { id: string } }
) {

  const id = (await params).id;
  const body = await req.json();

  await db
    .update(tasks)
    .set({ completed: body.completed })
    .where(eq(tasks.id, id));

  return NextResponse.json({ success: true });
}
