"use client";

import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Task, Status } from "@/types/kanban";
import TaskCard from "./task-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  id: Status;
  title: string;
  tasks: Task[];
  onAddTask: (columnId: Status, title: string, description?: string) => void;
  onDeleteTask: (id: string) => void;
}

const columnConfig: Record<Status, {
  badge: string;
  dot: string;
  borderTop: string;
  isOver: string;
}> = {
  todo: {
    badge: "bg-slate-100 text-slate-600 hover:bg-slate-100",
    dot: "bg-slate-400",
    borderTop: "border-t-slate-400",
    isOver: "bg-slate-50",
  },
  progress: {
    badge: "bg-blue-50 text-blue-600 hover:bg-blue-50",
    dot: "bg-blue-400",
    borderTop: "border-t-blue-400",
    isOver: "bg-blue-50/50",
  },
  done: {
    badge: "bg-emerald-50 text-emerald-600 hover:bg-emerald-50",
    dot: "bg-emerald-400",
    borderTop: "border-t-emerald-400",
    isOver: "bg-emerald-50/50",
  },
};

export default function Column({ id, title, tasks, onAddTask, onDeleteTask }: Props) {
  const [adding, setAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const { setNodeRef, isOver } = useDroppable({ id });
  const config = columnConfig[id];

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    onAddTask(id, newTitle.trim(), newDesc.trim() || undefined);
    setNewTitle("");
    setNewDesc("");
    setAdding(false);
  };

  const handleCancel = () => {
    setAdding(false);
    setNewTitle("");
    setNewDesc("");
  };

  return (
    <Card
      className={cn(
        "flex flex-col w-[320px] shrink-0 border-t-4 shadow-sm",
        config.borderTop
      )}
    >
      <CardHeader className="pb-3 pt-4 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={cn("w-2 h-2 rounded-full", config.dot)} />
            <h2 className="font-semibold text-sm text-foreground tracking-wide">
              {title}
            </h2>
          </div>
          <Badge className={cn("text-xs font-semibold", config.badge)}>
            {tasks.length}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 px-3 pb-3 gap-2">
        <div
          ref={setNodeRef}
          className={cn(
            "flex flex-col gap-2 flex-1 min-h-100 rounded-lg p-1 transition-colors duration-150",
            isOver && config.isOver
          )}
        >
          <SortableContext
            items={tasks.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onDelete={onDeleteTask} />
            ))}
          </SortableContext>

          {tasks.length === 0 && !adding && (
            <div className="flex flex-1 items-center justify-center py-10">
              <p className="text-xs text-muted-foreground">No tasks yet</p>
            </div>
          )}
        </div>

        {adding ? (
          <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-3 shadow-sm">
            <Input
              autoFocus
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              placeholder="Task title..."
              className="h-8 text-sm"
            />
            <Textarea
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Description (optional)..."
              className="text-xs min-h-15 resize-none"
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleAdd} className="h-7 text-xs gap-1">
                <Check className="w-3 h-3" />
                Add
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCancel}
                className="h-7 text-xs gap-1"
              >
                <X className="w-3 h-3" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setAdding(true)}
            className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground h-8 text-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            Add task
          </Button>
        )}
      </CardContent>
    </Card>
  );
}