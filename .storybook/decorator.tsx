import { withThemeByClassName } from "@storybook/addon-themes";
import type { Decorator, ReactRenderer } from "@storybook/react-vite";
import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";

export const ThemeDecorator = withThemeByClassName<ReactRenderer>({
  themes: {
    light: "",
    dark: "dark",
  },
  defaultTheme: "light",
});

export const RouterDecorator: Decorator = (Story) => {
  const rootRoute = createRootRoute({ component: () => <Story /> });
  const routeTree = rootRoute;
  const router = createRouter({ routeTree });
  return <RouterProvider router={router} />;
};
