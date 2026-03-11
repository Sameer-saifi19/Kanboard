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
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { taskSchema, taskSchemaType } from "@/schema/task-schema";
import { addNewTask } from "@/server/task";
import { UniqueIdentifier } from "@dnd-kit/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  trigger: React.ReactNode;
  columnId: UniqueIdentifier;
}

export default function ItemSheet({ trigger, columnId }: Props) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<taskSchemaType>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(values: taskSchemaType) {
    startTransition(async () => {
      try {
        const addTask = await addNewTask(columnId, values);
        if (!addTask.success) {
          toast.error("error");
          return;
        }
        
        toast.success("Task created");
        form.reset()
      } catch (error) {
        toast.error("Something went wrong")
      }
    });
  }

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent className="px-4 w-full">
          <SheetHeader>
            <SheetTitle>Add/Edit new Item</SheetTitle>
          </SheetHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="title">Title</FieldLabel>
                    <Input {...field} id="title" type="text" required />
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
                    <Textarea {...field} id="description" required />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <SheetFooter className="w-full">
              <Button type="submit">Save changes</Button>
              <SheetClose asChild>
                <Button variant="outline">Close</Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}
