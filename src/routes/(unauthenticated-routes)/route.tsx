import { fetchSession } from "@/lib/auth/session";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(unauthenticated-routes)")({
  component: RouteComponent,

  beforeLoad: async () => {
    const session = await fetchSession();

    if (session) {
      throw redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
