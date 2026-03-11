import { Button } from "@/components/ui/button";
import { Task } from "@/types/kanban";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Pencil, Trash } from "lucide-react";

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
        className="bg-card border rounded-md px-4 py-6 flex items-center justify-between gap-2 shadow-sm"
        ref={setNodeRef}
        style={style}
      >
        <div
          className="flex items-center cursor-pointer justify-between w-full"
          {...attributes}
          {...listeners}
        >
          <div>
            <span className="flex-1 text-sm text-slate-700">{task.title}</span>
          </div>
          <div>
            <Button
              onClick={() => {}}
              variant={"ghost"}
              size={"icon-sm"}
            >
              <Pencil size={6}/>
            </Button>

            <Button
              onClick={() => onDelete(task.id)}
              variant={"ghost"}
              className="text-red-400 hover:text-red-400"
              size={"icon-sm"}
            >
              <Trash size={6} /> 
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
