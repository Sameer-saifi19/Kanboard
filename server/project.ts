"use server";

import { auth } from "@/lib/auth";
import { Prisma } from "@/lib/generated/prisma/client";
import prisma from "@/lib/prisma";
import {
  createProjectSchema,
  createProjectSchemaType,
} from "@/schema/project-schema";
import { APIError } from "better-auth/api";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

// export const getAllProjects = async () => {
//   try {
//     const session = await auth.api.getSession({
//       headers: await headers(),
//     });

//     if (!session) return { status: 409, success: false };

//     const projects = await prisma.project.findMany({
//       where: {
//         organizationId: session.session.activeOrganizationId as string,
//       },
//     });
//     console.log(projects)
//     if (!projects) return { status: 404, success: false };

//     return { status: 200, success: true, data: projects };
//   } catch (error) {
//     if (error) {
//       console.error(error);
//       return { success: false, message: "Something went wrong" };
//     }
//   }
// };

export const createProject = async (values: createProjectSchemaType) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      success: false,
      status: 401,
      message: "Unauthorized",
    };
  }

  const parsed = createProjectSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, message: "Invalid data" };
  }

  const { name, slug, description } = parsed.data;
  const normalizeSlug = slug.toLowerCase().trim().replace(/\s+/g, "-");
  try {
    const checkSlug = await prisma.project.findUnique({
      where: {
        slug: normalizeSlug,
      },
    });

    if (checkSlug) {
      return {
        status: 409,
        message: "Project is already exist with this slug",
      };
    }

    const data = await prisma.project.create({
      data: {
        name,
        slug: normalizeSlug,
        description,
        organizationId: session.session.activeOrganizationId as string,
        userId: session.user.id,
      },
    });

    if (!data) {
      return {
        success: false,
        status: 500,
      };
    }

    revalidatePath(`/w/${session.session.activeOrganizationId}`, "layout");
    return {
      success: true,
      status: 201,
      message: "Project created successfully",
      data: data,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          success: false,
          status: 409,
          message: "Project with this slug already exists",
        };
      }
    }

    if (error instanceof APIError) {
      return {
        success: false,
        status: error.status,
        message: error.message,
        code: error.statusCode,
      };
    }

    return {
      success: false,
      status: 500,
      message: "Internal server error",
    };
  }
};
