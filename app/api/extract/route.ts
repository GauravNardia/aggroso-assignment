import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { tasks, transcripts } from "@/database/schema";
import { db } from "@/database/drizzle";
import { extractionPrompt } from "@/lib/prompt";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const { transcript } = await req.json();

    if (!transcript || transcript.trim() === "") {
      return NextResponse.json(
        { error: "Transcript is required" },
        { status: 400 }
      );
    }

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: extractionPrompt(transcript) },
      ],
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0].message.content;

    if (!content) {
      throw new Error("Empty AI response");
    }

    const parsed = JSON.parse(content);
    const tasksArray = parsed.actionItems;

    if (!Array.isArray(tasksArray)) {
    throw new Error("Invalid AI response format");
    }


    // Save transcript first
    const [savedTranscript] = await db
      .insert(transcripts)
      .values({ text: transcript })
      .returning();

    // Save tasks
    const insertedTasks = await Promise.all(
      tasksArray.map((item: any) =>
        db
          .insert(tasks)
          .values({
            transcriptId: savedTranscript.id,
            task: item.task,
            owner: item.owner,
            due_date: item.due_date,
          })
          .returning()
      )
    );

    revalidatePath(`/`, "layout")

    return NextResponse.json({
      transcriptId: savedTranscript.id,
      tasks: insertedTasks.flat(),
    });

  } catch (error) {
    console.error("Extraction error:", error);

    return NextResponse.json(
      { error: "Extraction failed" },
      { status: 500 }
    );
  }
}
