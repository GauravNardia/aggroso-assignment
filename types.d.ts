export type Task = {
  id: string
  transcriptId: string | null
  task: string | null
  owner: string | null
  due_date: string | null
  completed: boolean | null
  createdAt: Date | null
}

export type HistoryItem = {
  id: string;
  createdAt: Date | null;
  taskCount: number;
}
