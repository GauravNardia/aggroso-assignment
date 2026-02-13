import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { tasks } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const transcriptId = params.id;

  const result = await db
    .select()
    .from(tasks)
    .where(eq(tasks.transcriptId, transcriptId));

  return NextResponse.json(result);
}
