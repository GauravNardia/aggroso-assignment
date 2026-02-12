CREATE TABLE "tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"transcriptId" uuid,
	"task" text,
	"owner" text,
	"due_date" text,
	"completed" boolean DEFAULT false,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "tasks_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "transcripts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"text" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "transcripts_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_transcriptId_transcripts_id_fk" FOREIGN KEY ("transcriptId") REFERENCES "public"."transcripts"("id") ON DELETE no action ON UPDATE no action;