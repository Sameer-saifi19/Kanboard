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

    revalidatePath(`/w`, "layout");
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

export const getAllProjects = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session)
      return {
        status: 409,
        success: false,
      };

    const project = await prisma.project.findMany({
      where: {
        organizationId: session.session.activeOrganizationId as string,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!project) {
      return { status: 404, success: false };
    }

    return { status: 200, data: project };
  } catch (error) {
    console.error(error);
    return { status: 500, success: false, message: "Internal server error" };
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const result = await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    if (!result) {
      return { status: 409, success: false, message: "Cannot delete project" };
    }

    revalidatePath("/w", "layout");
    return {
      status: 200,
      data: result,
      message: "Project deleted successfully",
    };
  } catch (error) {
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

export const updateProject = async (
  projectId: string,
  values: createProjectSchemaType,
) => {
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
        message: "An organization is already exist with this slug",
      };
    }

    const findProject = await prisma.project.findFirst({
      where: {
        id: projectId,
      },
    });

    const result = await prisma.project.update({
      where: {
        id: findProject?.id,
      },
      data: {
        name,
        slug: normalizeSlug,
        description,
        organizationId: session.session.activeOrganizationId as string,
        userId: session.user.id,
      },
    });

    if (!result) {
      return { status: 500, success: false, message: "Error updating project" };
    }

    revalidatePath("/w/", "layout");

    return {
      status: 200,
      data: result,
      message: "Project updated successfully",
    };
  } catch (error) {
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

export const updateProjectTitle = async (projectId: string, title: string) => {
  try {
    const updateTitle = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        name: title,
      },
    });

    if (!updateTitle) {
      return { success: false };
    }

    revalidatePath("/p/123","page")

    return { success: true, data: updateTitle };
  } catch (error) {
    console.error(error);
    return { success: false, message: "something went wrong" };
  }
};

export const getProjectBySlug = async (slug: string) => {
  try {
    const data = await prisma.project.findUnique({
      where: {
        slug: slug,
      },
    });

    if (!data) {
      return { success: false, message: "No project found" };
    }


    return { success: true, data: data };
  } catch (error) {
    return { success: false, error: error };
  }
};
