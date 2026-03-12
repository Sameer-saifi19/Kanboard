"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { taskSchema, taskSchemaType } from "@/schema/task-schema";
import { addNewTask, editTask } from "@/server/task";
import { Task } from "@/types/kanban";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface AddMode {
  mode?: "add";
  columnId: string;
  task?: never;
  onSuccess?: (task: Task) => void;
  onEdited?: never;
}

interface EditMode {
  mode: "edit";
  task: Task;
  columnId?: never;
  onSuccess?: never;
  onEdited?: (task: Task) => void;
}

type Props = {
  trigger: React.ReactNode;
} & (AddMode | EditMode);

export default function ItemSheet({ trigger, ...props }: Props) {
  const isEdit = props.mode === "edit";
  const [isPending, startTransition] = useTransition();

  const form = useForm<taskSchemaType>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: isEdit ? props.task.title : "",
      description: isEdit ? (props.task.description ?? "") : "",
    },
  });

  function onSubmit(values: taskSchemaType) {
    startTransition(async () => {
      try {
        if (isEdit) {
          const result = await editTask(props.task.id, values);
          if (!result.success || !result.data) {
            toast.error("Failed to update task");
            return;
          }
          props.onEdited?.(result.data as Task);
          toast.success("Task updated");
        } else {
          const result = await addNewTask(props.columnId, values);
          if (!result.success || !result.data) {
            toast.error("Failed to create task");
            return;
          }
          props.onSuccess?.(result.data as Task);
          toast.success("Task created");
          form.reset();
        }
      } catch {
        toast.error("Something went wrong");
      }
    });
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="px-4 w-full">
        <SheetHeader>
          <SheetTitle>{isEdit ? "Edit task" : "Add new task"}</SheetTitle>
        </SheetHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">Title</FieldLabel>
                  <Input {...field} id="title" type="text" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Textarea {...field} id="description" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <SheetFooter className="w-full">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : isEdit ? "Update" : "Save"}
            </Button>
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}