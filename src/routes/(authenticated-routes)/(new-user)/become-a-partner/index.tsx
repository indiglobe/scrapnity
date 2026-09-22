import { BecomePartner } from "@/components/main/authenticated-routes/become-a-partner/become-a-partner";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(authenticated-routes)/(new-user)/become-a-partner/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <BecomePartner />
    </>
  );
}
