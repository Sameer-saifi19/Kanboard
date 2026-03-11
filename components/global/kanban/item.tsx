import { Task } from "@/types/kanban";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X } from "lucide-react";

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
      <div
        className="bg-card-foreground border rounded-md px-4 py-6 flex items-center justify-between gap-2 shadow-sm"
        ref={setNodeRef}
        style={style}
      >
        <div
          className="flex items-center cursor-pointer justify-between"
          {...attributes}
          {...listeners}
        >
          <div>
            <span className="flex-1 text-sm text-slate-700">{task.title}</span>
          </div>
          <div>
            <button
              onClick={() => onDelete(task.id)}
              className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-400 transition-opacity"
            >
              <X size={13} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
