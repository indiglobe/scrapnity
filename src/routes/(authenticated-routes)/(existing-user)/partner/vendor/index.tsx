import { Vendor } from "@/components/main/authenticated-routes/partner/vendor/vendor";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(authenticated-routes)/(existing-user)/partner/vendor/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Vendor />
    </>
  );
}
