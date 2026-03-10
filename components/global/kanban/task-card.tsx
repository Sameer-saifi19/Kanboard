"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@/types/kanban";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GripVertical, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  task: Task;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onDelete }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        "group border shadow-xs hover:shadow-md transition-shadow duration-150 cursor-default",
        isDragging && "opacity-40 shadow-none"
        // opacity-40 on original, full card shown in DragOverlay
      )}
    >
      <CardContent className="p-3">
        <div className="flex items-start gap-2">

          {/* Drag handle — only this area triggers drag */}
          <button
            {...attributes}
            {...listeners}
            className="mt-0.5 text-muted-foreground/40 hover:text-muted-foreground cursor-grab active:cursor-grabbing transition-colors shrink-0"
          >
            <GripVertical className="w-4 h-4" />
          </button>

          {/* Task content */}
          <div className="flex-1 min-w-0">
            {/* min-w-0 prevents text overflow escaping the flex container */}
            <p className="text-sm font-medium text-foreground leading-snug truncate">
              {task.title}
            </p>
            {task.description && (
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                {task.description}
              </p>
            )}
          </div>

          {/* Delete button — hidden until hover */}
          <Button
            variant="ghost"
            size="icon"
            className="w-6 h-6 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onPointerDown={(e) => e.stopPropagation()}
            // stopPropagation prevents drag from starting on delete click
            onClick={() => onDelete(task.id)}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>

        </div>
      </CardContent>
    </Card>
  );
}