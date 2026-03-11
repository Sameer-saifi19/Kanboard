'use client'

import KanbanColumn from "@/components/global/kanban/column";
import { Card, CardContent } from "@/components/ui/card";
import { Column, Task } from "@/types/kanban";
import { DndContext, DragOverlay, PointerSensor, UniqueIdentifier, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { GripVertical } from "lucide-react";
import { useState } from "react";

const COLUMNS: Column[] = [
  { id: "todo", title: "To Do" },
  { id: "inprogress", title: "In Progress" },
  { id: "done", title: "Done" },
];

export default function KanbanBoard() {
  const [task, setTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  function addTask(ColumnId: UniqueIdentifier) {
    const newTask: Task = { id: `t-${Date.now()}`, ColumnId, title: "New task" };
    setTasks((prev) => [...prev, newTask]);
  }

  function deleteTask(id: UniqueIdentifier) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function onDragStart({ active }: { active: any }) {
    setActiveTask(active.data.current?.task ?? null);
  }

  function onDragOver({ active, over }: { active: any; over: any }) {
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    const isOverTask   = over.data.current?.type === "task";
    const isOverColumn = COLUMNS.some((c) => c.id === overId);

    setTasks((prev) => {
      const activeIndex = prev.findIndex((t) => t.id === activeId);

      if (isOverTask) {
        const overIndex = prev.findIndex((t) => t.id === overId);
        const updated = [...prev];
        updated[activeIndex] = { ...updated[activeIndex], ColumnId: updated[overIndex].ColumnId };
        return arrayMove(updated, activeIndex, overIndex);
      }

      if (isOverColumn) {
        const updated = [...prev];
        updated[activeIndex] = { ...updated[activeIndex], ColumnId: overId };
        return updated;
      }

      return prev;
    });
  }

  function onDragEnd() {
    setActiveTask(null);
  }

  return (
    <>
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
        >
          <div className="flex items-start gap-4 h-full overflow-hidden">
            {COLUMNS.map((col) => (
              <KanbanColumn
                key={col.id}
                column={col}
                tasks={task.filter((t) => t.ColumnId === col.id)}
                onAddTask={addTask}
                onDeleteTask={deleteTask}
              />
            ))}
          </div>

          
            <DragOverlay>
              {activeTask && (
                <Card className="bg-white border border-slate-300 shadow-lg rotate-1 w-72">
                  <CardContent className="p-3 flex items-center gap-2">
                    <GripVertical size={14} className="text-slate-300" />
                    <span className="text-sm text-slate-700">
                      {activeTask.title}
                    </span>
                  </CardContent>
                </Card>
              )}
            </DragOverlay>
        </DndContext>
    </>
  );
}
