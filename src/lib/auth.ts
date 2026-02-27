import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { tanstackStartCookies } from "better-auth/tanstack-start";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 30 // 30 minutes
    }
  },
  plugins: [tanstackStartCookies()] // make sure tanstackStartCookies is in the last plugin in the array
});
