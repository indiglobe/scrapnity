import { Partner } from "@/components/main/authenticated-routes/partner/partner";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(authenticated-routes)/(existing-user)/partner/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Partner />
    </>
  );
}
