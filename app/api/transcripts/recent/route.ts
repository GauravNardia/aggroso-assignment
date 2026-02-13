import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { transcripts, tasks } from "@/database/schema";
import { desc, eq, sql } from "drizzle-orm";

export async function GET() {
  try {
    const recent = await db
      .select({
        id: transcripts.id,
        createdAt: transcripts.createdAt,
        taskCount: sql<number>`count(${tasks.id})`,
      })
      .from(transcripts)
      .leftJoin(tasks, eq(tasks.transcriptId, transcripts.id))
      .groupBy(transcripts.id)
      .orderBy(desc(transcripts.createdAt))
      .limit(5);

    return NextResponse.json(recent);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch history" },
      { status: 500 }
    );
  }
}
