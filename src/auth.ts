import NextAuth, { type DefaultSession, type User as NextAuthUser } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: "ADMIN" | "USER" | "SUPERUSER";
    } & DefaultSession["user"];
  }
}

export const { handlers, auth } = NextAuth({
  trustHost: process.env.NEXTAUTH_URL === "https://eduburner.org",
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/auth',
  },
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { role: true },
        });

        if (dbUser) {
          session.user.id = user.id;
          session.user.role = dbUser.role;
        } else {
          throw new Error("User not found in database");
        }
      }
      return session;
    },
  },
  events: {
    createUser: async (message) => {
      const { user } = message;
      if (user?.email) {
        const emailUsername = user.email.split('@')[0];
        let username = emailUsername;
        let suffix = 1;

        // Check username availability and add suffix if needed
        while (true) {
          const existingUser = await prisma.user.findUnique({
            where: { username },
          });

          if (!existingUser) {
            break; // Username is available
          }

          // Username taken, try with a number suffix
          username = `${emailUsername}${suffix}`;
          suffix++;
        }

        // Update user with the available username
        await prisma.user.update({
          where: { id: user.id },
          data: { username },
        });
      }
    },
  },
});