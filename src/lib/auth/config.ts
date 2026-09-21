import { betterAuth } from "better-auth";
import { env } from "@/utils/env";

const isProd = process.env.NODE_ENV === "production";
const baseHost = env.APP_HOST.replace(/^https?:\/\//, "");

export const auth = betterAuth({
  baseURL: env.APP_HOST,
  secret: env.BETTER_AUTH_SECRET,

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 7 * 24 * 60 * 60,
      strategy: "jwt",
      refreshCache: true,
    },
  },

  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      redirectURI: `${env.APP_HOST}/api/auth/callback/google`,
    },
  },

  advanced: {
    useSecureCookies: isProd,
    trustHostHeader: true,
    defaultCookieAttributes: {
      sameSite: "lax",
      secure: isProd,
      httpOnly: true,
      domain: isProd ? `.${baseHost}` : undefined,
      path: "/",
    },
  },
});