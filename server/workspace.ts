"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { APIError } from "better-auth/api";
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
        userId: session?.user.id
      },
      select: {
        organizationId: true
      }
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


export const getActiveWorkspaceSlug = async () => {
  try {
    
  } catch (error) {
    
  }
}