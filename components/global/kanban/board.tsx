"use client";

import KanbanColumn from "@/components/global/kanban/column";
import { Column, Task } from "@/types/kanban";
import { moveTask } from "@/server/task";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useOptimistic, useRef, useState, useTransition } from "react";

interface Props {
  columns: Column[];
}

export default function KanbanBoard({ columns }: Props) {
  const initialTasks = columns.flatMap((col) => col.tasks);

  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [optimisticTasks, updateOptimisticTasks] = useOptimistic(
    tasks,
    (_: Task[], newTasks: Task[]) => newTasks,
  );
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [, startTransition] = useTransition();

  // Ref tracks the live drag state so onDragEnd never reads stale closure values
  const dragStateRef = useRef<Task[]>(tasks);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  function onDragStart({ active }: DragStartEvent) {
    // Snapshot current tasks into ref at drag start
    dragStateRef.current = tasks;
    setActiveTask((active.data.current?.task as Task) ?? null);
  }

  function onDragOver({ active, over }: DragOverEvent) {
    if (!over) return;
    const activeId = active.id as string;
    const overId = over.id as string;
    if (activeId === overId) return;

    const isOverTask = over.data.current?.type === "task";
    const isOverColumn = columns.some((c) => c.id === overId);

    // Always derive from the ref so we never read stale state
    const next = [...dragStateRef.current];
    const activeIndex = next.findIndex((t) => t.id === activeId);
    if (activeIndex === -1) return;

    if (isOverTask) {
      const overIndex = next.findIndex((t) => t.id === overId);
      next[activeIndex] = {
        ...next[activeIndex],
        columnId: next[overIndex].columnId,
      };
      dragStateRef.current = arrayMove(next, activeIndex, overIndex);
    } else if (isOverColumn) {
      next[activeIndex] = { ...next[activeIndex], columnId: overId };
      dragStateRef.current = next;
    }

    startTransition(() => {
      updateOptimisticTasks(dragStateRef.current);
    });
  }

  function onDragEnd({ active, over }: DragEndEvent) {
    setActiveTask(null);
    if (!over) return;

    const activeId = active.id as string;

    // Read from ref — this is the final, correct state after all onDragOver calls
    const finalTasks = dragStateRef.current;
    const movedTask = finalTasks.find((t) => t.id === activeId);
    if (!movedTask) return;

    const newColumnId = movedTask.columnId;
    const columnTasks = finalTasks.filter((t) => t.columnId === newColumnId);
    const orderUpdates = columnTasks.map((t, i) => ({ id: t.id, order: i }));

    // Commit the ref state as the new real state
    setTasks(finalTasks);

    // Persist in background
    startTransition(async () => {
      await moveTask(activeId, newColumnId, orderUpdates);
    });
  }

  function handleTaskEdited(updated: Task) {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  }

  function handleTaskAdded(task: Task) {
    setTasks((prev) => [...prev, task]);
  }

  function handleTaskDeleted(taskId: string) {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <div className="flex items-start gap-4 h-full overflow-x-auto pb-4">
        {columns.map((col) => (
          <KanbanColumn
            key={col.id}
            column={col}
            tasks={optimisticTasks.filter((t) => t.columnId === col.id)}
            onTaskAdded={handleTaskAdded}
            onTaskDeleted={handleTaskDeleted}
            onTaskEdited={handleTaskEdited}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask && <TaskDragGhost task={activeTask} />}
      </DragOverlay>
    </DndContext>
  );
}

// Extracted so overlay and real card share identical markup
function TaskDragGhost({ task }: { task: Task }) {
  return (
    <div className="bg-sidebar-accent border-2 border-primary/20 rounded-md px-4 py-6 flex items-center justify-between gap-2 shadow-lg opacity-90 rotate-1 cursor-grabbing">
      <span className="text-sm text-primary font-medium">{task.title}</span>
    </div>
  );
}
