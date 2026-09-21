import { env } from "@/utils/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/database/schema.ts",
  dialect: "mysql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  strict: process.env.STRICT === "false" ? false : true,
  verbose: process.env.VERBOSE === "false" ? false : true,
});
