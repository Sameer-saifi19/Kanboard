"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { createWorkspaceSchemaType } from "@/schema/workspace-schema";
import { APIError } from "better-auth/api";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

interface Props {
  name: string;
  slug: string;
  userId: string;
}

export const createWorkspaceOnSignup = async ({
  name,
  slug,
  userId,
}: Props) => {
  try {
    const data = await auth.api.createOrganization({
      body: {
        name,
        slug,
        userId,
      },
    });

    if (!data) {
      return { success: false, status: 409 };
    }

    return { success: true, status: 201, data: data };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "something went wrong",
    };
  }
};

export const verifyAccessToWorkspace = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const isUserInWorkspace = await prisma.member.findFirst({
      where: {
        userId: session?.user.id,
      },
      select: {
        organizationId: true,
      },
    });

    return { data: isUserInWorkspace };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "something went wrong",
    };
  }
};

export const getAllUserWorkspace = async () => {
  try {
    const data = await auth.api.listOrganizations({
      headers: await headers(),
    });

    if (!data) {
      return { success: false, status: 404 };
    }

    return { success: true, data: data };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "something went wrong",
    };
  }
};

export const createNewWorkspace = async ({
  name,
  slug,
}: createWorkspaceSchemaType) => {
  try {
    const response = await auth.api.createOrganization({
      body: { name, slug, keepCurrentActiveOrganization: false },
      headers: await headers()
    });

    if (!response) {
      return {
        success: false,
        error: "Failed to create workspace",
      };
    }

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "Something went wrong",
    };
  }
};
