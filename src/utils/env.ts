/// <reference types="vite/client" />

import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_URL: z.string(),

    DATABASE_URL: z.string(),

    APP_HOST: z.string(),

    GOOGLE_CLIENT_SECRET: z.string(),
    GOOGLE_CLIENT_ID: z.string(),

    RAZOR_PAY_KEY: z.string(),
    RAZOR_PAY_SECRET: z.string(),
  },

  /**
   * The prefix that client-side variables must have. This is enforced both at
   * a type-level and at runtime.
   */
  clientPrefix: "VITE_",

  client: {
    VITE_APP_HOST: z.string(),
  },

  /**
   * What object holds the environment variables at runtime. This is usually
   * `process.env` or `import.meta.env`.
   */
  runtimeEnv: runtimeEnv(),

  /**
   * By default, this library will feed the environment variables directly to
   * the Zod validator.
   *
   * This means that if you have an empty string for a value that is supposed
   * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
   * it as a type mismatch violation. Additionally, if you have an empty string
   * for a value that is supposed to be a string with a default value (e.g.
   * `DOMAIN=` in an ".env" file), the default value will never be applied.
   *
   * In order to solve these issues, we recommend that all new projects
   * explicitly specify this option as true.
   */
  emptyStringAsUndefined: true,
});

/**
 * Normalize runtime env so it works in:
 * - Vite (import.meta.env)
 * - Node.js (process.env)
 */
function runtimeEnv() {
  // eslint-disable-next-line no-shadow
  const env: Record<string, string | undefined> = {};

  // Node (real env)
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (typeof process !== "undefined" && process.env) {
    Object.assign(env, process.env);
  }

  // Vite (client + SSR)
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (typeof import.meta !== "undefined" && import.meta.env) {
    Object.assign(env, import.meta.env);
  }

  return env;
}
