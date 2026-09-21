import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

const config = defineConfig(({ mode }) => {
  const isProd = mode === "production";

  return {
    resolve: { tsconfigPaths: true },
    plugins: [
      devtools(),
      tailwindcss(),
      tanstackStart(
        // { prerender: { enabled: true } }
      ),
      isProd &&
        nitro({
          rollupConfig: { external: [/^@sentry\//] },
          output: { dir: "dist" },
        }),

      viteReact(),
      babel({ presets: [reactCompilerPreset()] }),
    ],

    server: {
      host: "0.0.0.0",
      port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
      allowedHosts: !isProd ? true : undefined,
    },
  };
});

export default config;
