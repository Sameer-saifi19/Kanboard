import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Column, Task } from "@/types/kanban";
import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useMemo } from "react";
import TaskItem from "./item";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  onAddTask: (columnId: UniqueIdentifier) => void;
  onDeleteTask: (id: UniqueIdentifier) => void;
}

export default function KanbanColumn({
  column,
  tasks,
  onAddTask,
  onDeleteTask,
}: KanbanColumnProps) {
  const taskIds = useMemo(() => tasks.map((t) => t.id), [tasks]);
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <>
        <Card className="max-w-sm w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <CardTitle>
                  {column.title}
                </CardTitle>
                <Badge className="">{tasks.length}</Badge>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 text-slate-400 hover:text-slate-600"
                onClick={() => onAddTask(column.id)}
              >
                <Plus className="h-2 w-2" />
              </Button>
            </div>
          </CardHeader>
          <CardContent ref={setNodeRef} className="space-y-4">
            <SortableContext
              items={taskIds}
              strategy={verticalListSortingStrategy}
            >
              {tasks.map((task) => (
                <TaskItem onDelete={() => {}} task={task} key={task.id} />
              ))}
            </SortableContext>
            {tasks.length === 0 && (
              <p className="text-xs text-slate-300 text-center mt-6">
                Drop here
              </p>
            )}
          </CardContent>
        </Card>
    </>
  );
}
