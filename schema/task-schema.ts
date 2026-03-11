import z from "zod";

export const taskSchema = z.object({
    title: z.string("title is required").min(1, "Title should be atleast one character"),
    description: z.string().optional(),
})

export type taskSchemaType = z.infer<typeof taskSchema>