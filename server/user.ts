"use server";

import { auth } from "@/lib/auth";
import {
  signinSchema,
  signinSchemaType,
  signupSchema,
  signupSchemaType,
} from "@/schema/auth-schema";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import z from "zod";

export const createUserWithEmail = async (data: signupSchemaType) => {
  try {
    const parsed = signupSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        status: 409,
        error: z.treeifyError(parsed.error),
      };
    }

    const { name, email, password } = parsed.data;

    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        callbackURL: "/auth/sign-in"
      },
    });

    return { success: true, status: 201 };
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

export const loginUserWithEmail = async (data: signinSchemaType) => {
  try {
    const parsed = signinSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        error: z.treeifyError(parsed.error),
      };
    }

    const { email, password } = parsed.data;

    await auth.api.signInEmail({
      body: {
        email,
        password,
        callbackURL: "/workspace"
      },

      headers: await headers()
    });

    return { status: 200, success: true };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "User login failed",
    };
  }
};
