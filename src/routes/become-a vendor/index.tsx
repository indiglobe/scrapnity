import { BecomeVendor } from "@/components/main/become-a vendor/become-a vendor";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/become-a vendor/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <BecomeVendor />
    </>
  );
}
