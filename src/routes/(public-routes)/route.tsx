import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(public-routes)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
