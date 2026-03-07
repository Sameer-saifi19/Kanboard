import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { organization } from "better-auth/plugins";
import prisma from "./prisma";
import {
  createWorkspaceOnSignup,
  verifyAccessToWorkspace,
} from "@/server/workspace";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    deleteUser: {
      enabled: true,
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await createWorkspaceOnSignup({
            name: `${user.name.split(" ")[0]}'s workspace`,
            slug: `${user.name.split(" ")[0]}-workspace`,
            userId: user.id,
          });
        },
      },
    },
    session: {
      create: {
        after: async (session) => {
          const access = await verifyAccessToWorkspace();

          await prisma.session.update({
            where: {
              id: session.id,
            },
            data: {
              activeOrganizationId: access.data?.organizationId,
            },
          });
        },
      },
    },
  },
  baseURL: process.env.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: false,
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
  session: {
    expiresIn: 24 * 60 * 60,
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
    },
  },
  plugins: [nextCookies(), organization()],
});
