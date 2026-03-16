"use client";

import { useTransition, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createProjectSchemaType,
  createProjectSchema,
} from "@/schema/project-schema";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { generateSlug } from "@/utils/slug-generator";
import { createProject } from "@/server/project";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import Loader from "../global/loader";

export function CreateProjectSheet() {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const form = useForm<createProjectSchemaType>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
    },
  });

  function onSubmit(values: createProjectSchemaType) {
    startTransition(async () => {
      try {
        const res = await createProject(values);
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        toast.success("Project Created Successfully");
        form.reset();
      } catch {
        toast.error("Something went wrong");
      }
    });
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <SheetTrigger asChild>
        <Button>
          {" "}
          <Plus /> Create new Project
        </Button>
      </SheetTrigger>

      {/* Sheet Panel */}
      <SheetContent
        showCloseButton={false}
        side="right"
        className="w-90 px-4 py-4 sm:max-w-lg overflow-y-auto"
      >
        <SheetTitle className="text-xl mt-4 font-semibold">
          Create New Project
        </SheetTitle>

        <div className="mt-6">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                      {...field}
                      id="name"
                      type="text"
                      required
                      placeholder="Workspace name"
                      onChange={(e) => {
                        field.onChange(e);

                        const slug = generateSlug(e.target.value);
                        form.setValue("slug", slug, {
                          shouldValidate: true,
                        });
                      }}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="slug"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="slug">Slug</FieldLabel>
                    <Input
                      {...field}
                      id="slug"
                      type="text"
                      required
                      placeholder="my-org"
                    />
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
            <FieldGroup className="flex items-end mt-6">
              <Button type="submit" className="w-full" size={"sm"}>
                {isPending ? <Loader text="creating" /> : "Create new Project"}
              </Button>
            </FieldGroup>
          </form>
        </div>
        <SheetClose asChild>
          <Button variant="outline">Cancel</Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
