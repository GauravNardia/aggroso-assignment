import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { tasks, transcripts } from "@/database/schema";
import { db } from "@/database/drizzle";
import { extractionPrompt } from "@/lib/prompt";

export async function POST(req: Request) {
  try {
    const { transcript } = await req.json();

    if (!transcript || transcript.trim() === "") {
      return NextResponse.json(
        { error: "Transcript is required" },
        { status: 400 }
      );
    }

    // OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: extractionPrompt(transcript) },
      ],
      response_format: { type: "json_object" },
    });

    const parsed = JSON.parse(completion.choices[0].message.content!);

    // Save transcript
    const [savedTranscript] = await db
      .insert(transcripts)
      .values({ text: transcript })
      .returning();

    // Save tasks
    const insertedTasks = await Promise.all(
      parsed.map((item: any) =>
        db.insert(tasks).values({
          transcriptId: savedTranscript.id,
          task: item.task,
          owner: item.owner,
          due_date: item.due_date,
        }).returning()
      )
    );

    return NextResponse.json({
      transcriptId: savedTranscript.id,
      tasks: insertedTasks.flat(),
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Extraction failed" },
      { status: 500 }
    );
  }
}
