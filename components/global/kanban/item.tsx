import { Card, CardContent } from "@/components/ui/card";
import { Task } from "@/types/kanban";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X } from "lucide-react";

interface TaskItemProps {
  task: Task;
  onDelete: (id: UniqueIdentifier) => void;
}

export default function TaskItem({ task, onDelete }: TaskItemProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "task",
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.35 : 1,
  };

  return (
    <>
      <Card
        ref={setNodeRef}
        style={style}
      >
        <CardContent className="px-4 flex items-center gap-2">
          <div
            {...attributes}
            {...listeners}
          >
            <GripVertical size={14} />
          </div>
          <span className="flex-1 text-sm text-slate-700">{task.title}</span>
          <button
            onClick={() => onDelete(task.id)}
            className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-400 transition-opacity"
          >
            <X size={13} />
          </button>
        </CardContent>
      </Card>
    </>
  );
}
