import { defineConfig } from "taskforge-cli/config";
import { env } from "node:process";

export default defineConfig({
  envDir: "./",
  scripts: {
    dev: {
      execute: "vite dev --open",
      envFile:
        env.PLATFORM === "devcontainer"
          ? ".env.devcontainer"
          : ".env.development",
      envValues: {
        PORT: 19913,
      },
    },
    build: {
      execute: "vite build",
      envFile: ".env.production",
    },
    serve: {
      execute: "node dist/server/index.mjs",
      envFile: ".env.production",
    },
    "sb:dev": {
      execute: "storybook dev -p 17818",
      envFile:
        env.PLATFORM === "devcontainer"
          ? ".env.devcontainer"
          : ".env.development",
    },
    "sb:build": {
      execute: "storybook build",
      envFile: ".env.production",
    },
    "db:dev": {
      execute: "pnpm db:dev:setup && pnpm db:dev:push && pnpm db:dev:seed",
      envValues: {
        STRICT: false,
        VERBOSE: false,
      },
    },
    "db:dev:seed": {
      execute: "tsx ./src/database/helpers/seed.ts",
      envFile: ".env.development",
    },
    "db:dev:setup": {
      execute: "tsx ./src/database/helpers/setup-db.ts",
      envFile: ".env.development",
    },
    "db:dev:push": {
      execute: "drizzle-kit push",
      envFile: ".env.development",
    },
    "db:dev:studio": {
      execute: "drizzle-kit studio",
      envFile: ".env.development",
    },
  },
});
