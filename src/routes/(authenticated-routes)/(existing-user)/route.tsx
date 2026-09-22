import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated-routes)/(existing-user)")(
  {
    component: RouteComponent,

    beforeLoad: async () => {
      throw redirect({ to: "/become-a-partner" });
    },
  },
);

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
