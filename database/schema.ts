import { pgTable, text, timestamp, boolean, uuid } from 'drizzle-orm/pg-core'


export const transcripts = pgTable('transcripts', {
    id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
    text: text("text").notNull(),
    createdAt: timestamp('createdAt').defaultNow(),
});

export const tasks = pgTable('tasks', {
    id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
    transcriptId: uuid('transcriptId').references(() => transcripts.id),
    task: text("task"),
    owner: text("owner"),
    due_date: text("due_date"),
    completed: boolean("completed").default(false),
    createdAt: timestamp('createdAt').defaultNow(),
});
