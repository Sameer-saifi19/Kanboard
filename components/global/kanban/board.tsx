"use client";

import { useState, useCallback } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Task, Status } from "@/types/kanban";
import Column from "./column";
import TaskCard from "./task-card";

const COLUMNS: { id: Status; title: string }[] = [
  { id: "todo", title: "To Do" },
  { id: "progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

const INITIAL_TASKS: Task[] = [
  { id: "1", title: "Research competitors", description: "Analyse top 5 products", status: "todo" },
  { id: "2", title: "Design wireframes", description: "Lo-fi mockups for onboarding", status: "todo" },
  { id: "3", title: "Set up Next.js project", description: "Tailwind + TypeScript", status: "progress" },
  { id: "4", title: "Implement auth", description: "NextAuth with Google provider", status: "progress" },
  { id: "5", title: "Write unit tests", status: "done" },
  { id: "6", title: "Deploy to Vercel", status: "done" },
];

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const getTasksByStatus = useCallback(
    (status: Status) => tasks.filter((t) => t.status === status),
    [tasks]
  );

  const onDragStart = ({ active }: DragStartEvent) => {
    setActiveTask(tasks.find((t) => t.id === active.id) ?? null);
  };

  const onDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return;
    const activeId = active.id as string;
    const overId = over.id as string;
    const overIsColumn = COLUMNS.some((c) => c.id === overId);

    setTasks((prev) => {
      const activeIndex = prev.findIndex((t) => t.id === activeId);
      if (activeIndex === -1) return prev;

      const newStatus: Status = overIsColumn
        ? (overId as Status)
        : (prev.find((t) => t.id === overId)?.status ?? prev[activeIndex].status);

      if (prev[activeIndex].status === newStatus && !overIsColumn) return prev;

      const updated = [...prev];
      updated[activeIndex] = { ...updated[activeIndex], status: newStatus };
      return updated;
    });
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveTask(null);
    if (!over) return;
    const activeId = active.id as string;
    const overId = over.id as string;

    setTasks((prev) => {
      const activeIndex = prev.findIndex((t) => t.id === activeId);
      const overIndex = prev.findIndex((t) => t.id === overId);
      if (activeIndex === -1 || overIndex === -1 || activeIndex === overIndex) return prev;
      return arrayMove(prev, activeIndex, overIndex);
    });
  };

  const addTask = (status: Status, title: string, description?: string) => {
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title, description, status },
    ]);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      {/* Horizontal scroll container */}
      <div className="flex flex-row gap-4 overflow-x-auto pb-4 items-start">
        {COLUMNS.map((col) => (
          <Column
            key={col.id}
            id={col.id}
            title={col.title}
            tasks={getTasksByStatus(col.id)}
            onAddTask={addTask}
            onDeleteTask={deleteTask}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask && (
          <div className="rotate-2 scale-105">
            <TaskCard task={activeTask} onDelete={() => {}} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}