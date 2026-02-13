import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { tasks } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = (await params).id;
  const body = await req.json();


  await db
    .update(tasks)
    .set({
      task: body.task,
      owner: body.owner,
      due_date: body.due_date,
      completed: body.completed,
    })
    .where(eq(tasks.id, id));

  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = (await params).id;

  await db.delete(tasks).where(eq(tasks.id, id));

  return NextResponse.json({ success: true });
}
