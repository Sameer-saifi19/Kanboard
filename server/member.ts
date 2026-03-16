"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { APIError } from "better-auth";
import { headers } from "next/headers";

export const listMembers = async (slug: string) => {
  try {
    const data = await prisma.organization.findUnique({
      where: { slug },
      include: {
        members: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!data) {
      return {
        status: 500,
        success: false,
        message: "Error getting members",
        data: null,
      };
    }

    return { status: 200, success: true, data: data };
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

export const updateMemberRole = async (role: string, memberId: string) => {
  try {
    const changeRole = await auth.api.updateMemberRole({
      body: {
        role,
        memberId,
      },
      headers: await headers(),
    });

    if (!changeRole) {
      return {
        status: 500,
        success: false,
        message: "Error switching members Role",
        data: null,
      };
    }

    return { status: 200, success: true };
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
