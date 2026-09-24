import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(authenticated-routes)/(existing-user)/partner/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div>make a component for navigating to customer and vendor page</div>
    </>
  );
}
