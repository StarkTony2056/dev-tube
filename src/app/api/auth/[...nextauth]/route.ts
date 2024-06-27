import { db } from "@/db";
import { authConfig } from "@/lib/auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";
import Google from "next-auth/providers/google";

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
