// .storybook/main.ts
import type { StorybookConfig } from "@storybook/react-vite";
import type { InlineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

const config: StorybookConfig = {
  stories: ["../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-themes",
  ],

  framework: "@storybook/react-vite",

  core: {
    enableCrashReports: false,
    disableWhatsNewNotifications: true,
  },

  async viteFinal(inlineConfig: InlineConfig) {
    /**
     * Keep only Storybook's own plugins, then add back the safe ones we need
     */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const storybookPlugins = (inlineConfig.plugins ?? [])
      .flat(Infinity)

      .filter((plugin: any) => {
        if (!plugin?.name) return false;
        return (
          plugin.name.startsWith("storybook:") ||
          plugin.name === "plugin-csf" ||
          plugin.name === "storybook:react-docgen-plugin" ||
          plugin.name === "storybook:package-deduplication"
        );
      });

    inlineConfig.plugins = [...storybookPlugins, tailwindcss()];

    return inlineConfig;
  },
};

export default config;
