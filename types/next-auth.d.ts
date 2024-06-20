import NextAuth, { DefaultSession } from "next-auth";
import {UserRole} from "@Prisma/client"

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  hasAccess: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
