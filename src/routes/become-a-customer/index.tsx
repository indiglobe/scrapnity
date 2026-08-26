import { BecomeCustomer } from "@/components/main/become-a-customer/become-a-customer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/become-a-customer/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <BecomeCustomer />
    </>
  );
}
