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

type Task = {
  id: number;
  task: string;
  owner?: string;
  dueDate?: string;
  completed: boolean;
};

const DataTable = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      task: "Send invoice",
      owner: "Rahul",
      dueDate: "Friday",
      completed: false,
    },
    {
      id: 2,
      task: "Prepare presentation",
      owner: "Anita",
      dueDate: "Next Monday",
      completed: false,
    },
  ]);

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <section className="w-full bg-white rounded-xl shadow-sm border p-6">
      <Table>
        <TableCaption>
          Extracted Action Items
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Done</TableHead>
            <TableHead>Task</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Due</TableHead>
            <TableHead className="text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tasks.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-gray-500"
              >
                No action items yet.
              </TableCell>
            </TableRow>
          )}

          {tasks.map((task) => (
            <TableRow key={task.id}>
              {/* Done Checkbox */}
              <TableCell>
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() =>
                    toggleTask(task.id)
                  }
                />
              </TableCell>

              {/* Task */}
              <TableCell
                className={`font-medium ${
                  task.completed
                    ? "line-through text-gray-400"
                    : ""
                }`}
              >
                {task.task}
              </TableCell>

              {/* Owner */}
              <TableCell>
                {task.owner || "—"}
              </TableCell>

              {/* Due Date */}
              <TableCell>
                {task.dueDate || "—"}
              </TableCell>

              {/* Actions */}
              <TableCell className="text-right space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() =>
                    deleteTask(task.id)
                  }
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default DataTable;
