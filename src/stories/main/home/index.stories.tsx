import type { TypedMetaOptions } from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Hero } from "@/components/main/home/home";
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import type { FileRouteTypes } from "@/routeTree.gen";

function HomeComp() {
  return (
    <>
      <Hero />
    </>
  );
}

const meta: Meta<typeof HomeComp> & TypedMetaOptions = {
  component: HomeComp,
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

type Story = StoryObj<typeof HomeComp>;

export const HomeCompStory: Story = {
  args: {},
};
