"use server";

import prisma from "@/lib/prisma";
import { taskSchemaType } from "@/schema/task-schema";
import { revalidatePath } from "next/cache";

// Helper: get the project slug for a column (needed for correct revalidation)
async function getProjectSlugByColumnId(columnId: string): Promise<string | null> {
  const column = await prisma.column.findUnique({
    where: { id: columnId },
    include: { project: { select: { slug: true } } },
  });
  return column?.project?.slug ?? null;
}

export const addNewTask = async (columnId: string, values: taskSchemaType) => {
  try {
    // Get the current max order in this column so new task goes to the bottom
    const lastTask = await prisma.task.findFirst({
      where: { columnId },
      orderBy: { order: "desc" },
      select: { order: true },
    });
    const nextOrder = (lastTask?.order ?? -1) + 1;

    const task = await prisma.task.create({
      data: {
        title: values.title,
        description: values.description,
        order: nextOrder,
        columnId,
      },
    });

    // FIX: revalidate the project page, not the task
    const slug = await getProjectSlugByColumnId(columnId);
    if (slug) revalidatePath(`/p/${slug}`, "page");

    return { success: true, message: "Task created", data: task };
  } catch (error) {
    return { success: false, message: String(error) };
  }
};

export const editTask = async (taskId: string, values: taskSchemaType) => {
  try {
    const task = await prisma.task.update({
      where: { id: taskId },
      data: {
        title: values.title,
        description: values.description,
      },
    });

    const slug = await getProjectSlugByColumnId(task.columnId);
    if (slug) revalidatePath(`/p/${slug}`, "page");

    return { success: true, message: "Task updated", data: task };
  } catch (error) {
    return { success: false, message: String(error) };
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    const task = await prisma.task.delete({
      where: { id: taskId },
    });

    const slug = await getProjectSlugByColumnId(task.columnId);
    if (slug) revalidatePath(`/p/${slug}`, "page");

    return { success: true, message: "Task deleted" };
  } catch (error) {
    return { success: false, message: String(error) };
  }
};

/**
 * Called by onDragEnd to persist column change + new order for all affected tasks.
 * Batched in a transaction so it's atomic.
 */
export const moveTask = async (
  taskId: string,
  newColumnId: string,
  orderUpdates: { id: string; order: number }[],
) => {
  try {
    await prisma.$transaction([
      // Update the moved task's column
      prisma.task.update({
        where: { id: taskId },
        data: { columnId: newColumnId },
      }),
      // Rewrite order for all tasks in the destination column
      ...orderUpdates.map(({ id, order }) =>
        prisma.task.update({ where: { id }, data: { order } }),
      ),
    ]);

    const slug = await getProjectSlugByColumnId(newColumnId);
    if (slug) revalidatePath(`/p/${slug}`, "page");

    return { success: true };
  } catch (error) {
    return { success: false, message: String(error) };
  }
};