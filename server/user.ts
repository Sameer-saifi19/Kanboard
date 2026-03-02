"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { signupSchema, signupSchemaType } from "@/schema/auth-schema";
import { APIError } from "better-auth/api";
import z from "zod";

export const createUserWithEmail = async (data: signupSchemaType) => {
  try {
    const parsed = signupSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        error: z.treeifyError(parsed.error),
      };
    }

    const { name, email, password } = parsed.data;

    await auth.api.signUpEmail({
      body: {
        
        name,
        email,
        password,
      },
    });

    return { success: true, status: 200 };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "User creation failed",
    };
  }
};
