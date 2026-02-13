"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "../ui/input";

export type Task = {
  id: string
  transcriptId: string | null
  task: string | null
  owner: string | null
  due_date: string | null
  completed: boolean | null
  createdAt: Date | null
}


interface Props {
  initialTasks: Task[];
}

export default function DataTable({ initialTasks }: Props) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<Task>>({});

  // Toggle Complete
  const toggleTask = async (id: string, completed: boolean) => {
    await fetch(`/api/tasks/${id}/toggle`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });

    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed } : t
      )
    );
  };

  // Delete
  const deleteTask = async (id: string) => {
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks((prev) =>
      prev.filter((t) => t.id !== id)
    );
  };

    // Start Editing
  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setEditValues(task);
  };

    // Save Edit
  const saveEdit = async () => {
    if (!editingId) return;

    await fetch(`/api/tasks/${editingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editValues),
    });

    setTasks((prev) =>
      prev.map((t) =>
        t.id === editingId ? { ...t, ...editValues } : t
      )
    );

    setEditingId(null);
    setEditValues({});
  };


  return (
    <section className="w-full bg-white rounded-xl shadow-sm border p-6">
      <Table>
        <TableCaption>Extracted Action Items</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Done</TableHead>
            <TableHead>Task</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Due</TableHead>
            <TableHead className="text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              {/* Done */}
              <TableCell>
                <Checkbox
                  checked={task.completed!}
                  onCheckedChange={(val) =>
                    toggleTask(task.id, !!val)
                  }
                />
              </TableCell>

              {/* Task */}
              <TableCell>
                {editingId === task.id ? (
                  <Input
                    value={editValues.task || ""}
                    onChange={(e) =>
                      setEditValues({
                        ...editValues,
                        task: e.target.value,
                      })
                    }
                  />
                ) : (
                  <span
                    className={
                      task.completed
                        ? "line-through text-gray-400"
                        : ""
                    }
                  >
                    {task.task}
                  </span>
                )}
              </TableCell>

              {/* Owner */}
              <TableCell>
                {editingId === task.id ? (
                  <Input
                    value={editValues.owner || ""}
                    onChange={(e) =>
                      setEditValues({
                        ...editValues,
                        owner: e.target.value,
                      })
                    }
                  />
                ) : (
                  task.owner || "—"
                )}
              </TableCell>

              {/* Due Date */}
              <TableCell>
                {editingId === task.id ? (
                  <Input
                    value={editValues.due_date || ""}
                    onChange={(e) =>
                      setEditValues({
                        ...editValues,
                        due_date: e.target.value,
                      })
                    }
                  />
                ) : (
                  task.due_date || "—"
                )}
              </TableCell>

              {/* Actions */}
              <TableCell className="text-right space-x-2">
                {editingId === task.id ? (
                  <>
                    <Button size="sm" onClick={saveEdit} className="cursor-pointer">
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => startEdit(task)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="cursor-pointer"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}