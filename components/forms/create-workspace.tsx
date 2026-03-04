import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Loader from "../global/loader";
import { useEffect, useTransition } from "react";
import {
  createWorkspaceSchema,
  createWorkspaceSchemaType,
} from "@/schema/workspace-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateSlug } from "@/utils/slug-generator";
import { createNewWorkspace } from "@/server/workspace";
import { toast } from "sonner";
import { router } from "better-auth/api";
import { useRouter } from "next/navigation";

export default function CreateWorkspaceForm() {
  const form = useForm<createWorkspaceSchemaType>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const slugFormat = form.watch("name");

  useEffect(() => {
    if (slugFormat) {
      form.setValue("slug", generateSlug(slugFormat), {
        shouldValidate: true,
      });
    }
  }, [slugFormat, form]);

  const [isPending, startTransition] = useTransition();
  const router = useRouter()
  function onSubmit(data: createWorkspaceSchemaType) {
    startTransition(async () => {
      try {
        const createResult = await createNewWorkspace(data);

        if (!createResult.success) {
          toast.error(createResult.error ?? "Error creating workspace");
          return;
        }
        
        toast.success("New workspace created");
        router.push(`/w/${createResult.data?.slug}/projects`)
      } catch (error) {
        toast.error("Something went wrong");
      }
    });
  }

  return (
    <>
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
                  autoComplete="off"
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
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <FieldGroup className="flex items-end mt-6">
          <Button type="submit" className="" size={"sm"}>
            {isPending ? <Loader text="creating" /> : "Create Workspace"}
          </Button>
        </FieldGroup>
      </form>
    </>
  );
}
