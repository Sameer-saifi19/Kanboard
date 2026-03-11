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
import { ScrollArea } from "@/components/ui/scroll-area";
import ItemSheet from "../item-sheet";

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
}

export default function KanbanColumn({
  column,
  tasks,
}: KanbanColumnProps) {
  const taskIds = useMemo(() => tasks.map((t) => t.id), [tasks]);
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <>
      <div className="max-w-sm w-full flex flex-col gap-2 h-full bg-card rounded-lg p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1>{column.title}</h1>
            <Badge>{tasks.length}</Badge>
          </div>
          <div>
            <ItemSheet columnId={column.id} trigger={<Button variant={"ghost"}>
              <Plus className="h-8 w-8"/>
            </Button>}/>
          </div>
        </div>
        <div ref={setNodeRef} className="flex flex-col flex-1 min-h-0 ">
          <ScrollArea className="h-full">
            <div className="space-y-2">
              <SortableContext
                items={taskIds}
                strategy={verticalListSortingStrategy}
              >
                {tasks.map((task) => (
                  <TaskItem
                    onDelete={() => {}}
                    task={task}
                    key={task.id}
                  />
                ))}
              </SortableContext>
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  );
}
