import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { tasks } from "@/database/schema";
import { eq } from "drizzle-orm";

interface Params {
  params: Promise<Record<string, string>>;
}

export async function GET(req: Request, { params }: Params) {
  const transcriptId = (await params).id;

  const result = await db
    .select()
    .from(tasks)
    .where(eq(tasks.transcriptId, transcriptId));

  return NextResponse.json(result);
}
