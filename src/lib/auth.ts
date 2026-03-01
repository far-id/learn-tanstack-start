import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { sendResetPasswordEmail } from './email/send-reset-password-email';
import { sendVerificationEmail } from './email/send-verification-email';

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      sendResetPasswordEmail({ user, url });
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      sendVerificationEmail({ user, url });
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
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
