"use client";

import { Button } from "@/components/ui/button";
import { deleteTask } from "@/server/task";
import { Task } from "@/types/kanban";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Pencil, Trash2 } from "lucide-react";
import { useTransition } from "react";
import ItemSheet from "../item-sheet";

interface TaskItemProps {
  task: Task;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
}

export default function TaskItem({ task, onDelete, onEdit }: TaskItemProps) {
  const [isPending, startTransition] = useTransition();

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: { type: "task", task },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  function handleDelete(e: React.MouseEvent) {
    // CRITICAL: stop drag listeners from firing on button click
    e.stopPropagation();
    startTransition(async () => {
      // Optimistic: remove from UI immediately via parent callback
      onDelete(task.id);
      const result = await deleteTask(task.id);
      if (!result.success) {
        // Parent would need to re-add — for now log; extend with toast
        console.error("Delete failed:", result.message);
      }
    });
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="rounded-md border border-dashed border-primary/30 bg-primary/5 h-18"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group bg-sidebar-accent border border-transparent hover:border-border rounded-md px-4 py-4 flex items-center justify-between gap-2 shadow-sm transition-all duration-100"
    >
      {/* Drag handle area */}
      <div
        className="flex-1 cursor-grab active:cursor-grabbing min-w-0"
        {...attributes}
        {...listeners}
      >
        <span className="text-sm text-primary font-medium truncate block">
          {task.title}
        </span>
        {task.description && (
          <span className="text-xs text-muted-foreground truncate block mt-0.5">
            {task.description}
          </span>
        )}
      </div>

      {/* Action buttons — isolated from drag listeners */}
      <div
        className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <ItemSheet
          mode="edit"
          task={task}
          onEdited={onEdit}
          trigger={
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={(e) => e.stopPropagation()}
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>
          }
        />

        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleDelete}
          disabled={isPending}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}