import React from "react";
import Sidebar from "@/components/shared/Sidebar";
import { db } from "@/database/drizzle";
import { transcripts, tasks } from "@/database/schema";
import { desc, eq, sql } from "drizzle-orm";

export default async function WorkplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // 🔥 Fetch last 5 transcripts with task count
  const history = await db
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

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="hidden sm:flex">
        <Sidebar history={history} />
      </div>

      <main className="flex-1 overflow-y-auto p-3">
        {children}
      </main>
    </div>
  );
}
