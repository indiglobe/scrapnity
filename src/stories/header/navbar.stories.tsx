import Header from "@/components/header/header";
import type { TypedMetaOptions } from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import type { FileRouteTypes } from "@/routeTree.gen";

function HeaderComp() {
  return <Header />;
}

const meta: Meta<typeof HeaderComp> & TypedMetaOptions = {
  component: HeaderComp,
  decorators: (Story) => {
    const rootRoute = createRootRoute();

    const route = createRoute({
      getParentRoute: () => rootRoute,
      id: "/" satisfies FileRouteTypes["id"],
      component: Story,
    });

    const routeTree = rootRoute.addChildren([route]);

    const router = createRouter({
      routeTree,
      history: createMemoryHistory({
        initialEntries: ["/"],
      }),
    });
    return <RouterProvider router={router} />;
  },
};

export default meta;

type Story = StoryObj<typeof HeaderComp>;

export const HeaderCompStory: Story = {
  args: {},
};
