"use client";

import { Column, Task } from "@/types/kanban";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useMemo } from "react";
import TaskItem from "./item";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import ItemSheet from "../item-sheet";

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  onTaskAdded: (task: Task) => void;
  onTaskDeleted: (taskId: string) => void;
  onTaskEdited: (task: Task) => void;
}

export default function KanbanColumn({
  column,
  tasks,
  onTaskAdded,
  onTaskDeleted,
  onTaskEdited,
}: KanbanColumnProps) {
  const taskIds = useMemo(() => tasks.map((t) => t.id), [tasks]);

  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <div className="max-w-sm w-full shrink-0 flex flex-col gap-2 h-full bg-card rounded-lg p-4 transition-colors duration-150"
      style={{ background: isOver ? "hsl(var(--accent)/0.4)" : undefined }}
    >
      {/* Column header */}
      <div className="flex items-center justify-between px-2 py-1">
        <div className="flex items-center gap-3">
          <h2 className="font-semibold text-sm text-foreground">{column.title}</h2>
          <Badge variant="secondary" className="text-xs tabular-nums">
            {tasks.length}
          </Badge>
        </div>
        <ItemSheet
          columnId={column.id}
          onSuccess={onTaskAdded}
          trigger={
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Plus className="h-4 w-4" />
            </Button>
          }
        />
      </div>

      {/* Task list */}
      <div ref={setNodeRef} className="flex flex-col flex-1 min-h-0">
        <ScrollArea className="h-full px-1">
          <div className="space-y-2 pb-2">
            <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
              {tasks.map((task) => (
                <TaskItem key={task.id} task={task} onDelete={onTaskDeleted} onEdit={onTaskEdited} />
              ))}
            </SortableContext>

            {tasks.length === 0 && (
              <div className="flex items-center justify-center h-20 border border-dashed border-border rounded-md text-xs text-muted-foreground">
                Drop tasks here
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}