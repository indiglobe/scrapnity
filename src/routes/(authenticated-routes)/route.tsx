import { fetchSession } from "@/lib/auth/session";
import { env } from "@/utils/env";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated-routes)")({
  component: RouteComponent,

  beforeLoad: async ({ location }) => {
    const session = await fetchSession();

    const redirectUrl = new URL(
      location.pathname,
      env.VITE_APP_HOST,
    ).toString();

    if (!session) {
      throw redirect({ to: "/sign-in", search: { redirectUrl: redirectUrl } });
    }

    return { session };
  },
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
