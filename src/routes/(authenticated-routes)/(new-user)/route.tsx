import { read__OneCustomerUser } from "@/integrations/server-function/customer-user";
import { read__OneVendorUser } from "@/integrations/server-function/vendor-user";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated-routes)/(new-user)")({
  component: RouteComponent,

  beforeLoad: async ({ context }) => {
    const { session } = context;

    const {
      user: { email },
    } = session;

    const vendorDetails = await read__OneVendorUser({ data: { email: email } });

    const customerDetails = await read__OneCustomerUser({
      data: { email: email },
    });

    if (vendorDetails || customerDetails) {
      throw redirect({ to: "/partner" });
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
