"use server";

import prisma from "@/lib/prisma";

export const getColumnByProjectSlug = async (id: string) => {
  try {
    const columns = await prisma.column.findMany({
      where: {
        projectId: id,
      },
      include:{
        tasks: {
            orderBy: {
                order: "asc"
            }
        }
      }
    });

    if (!columns) {
      return { success: false };
    }

    return {success: true, data: columns}
  } catch (error) {
    return {success: false, message: error}
  }
};
