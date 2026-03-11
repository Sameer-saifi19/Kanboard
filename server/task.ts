"use server";

import prisma from "@/lib/prisma";
import { taskSchemaType } from "@/schema/task-schema";
import { UniqueIdentifier } from "@dnd-kit/core";
import { revalidatePath } from "next/cache";

export const addNewTask = async (
  columnId: UniqueIdentifier,
  values: taskSchemaType,
) => {
  try {
    const addTask = await prisma.task.create({
      data: {
        title: values.title,
        description: values.description,
        order: 1,
        columnId: columnId as string,
      },
    });

    if (!addTask) {
      return { success: false };
    }

    revalidatePath('/p/123', "layout")
    return { success: true, message: "Task Created" };
  } catch (error) {
    return { success: false, message: error };
  }
};
