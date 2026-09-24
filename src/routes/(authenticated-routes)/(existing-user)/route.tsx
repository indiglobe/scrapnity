import { read__OneCustomerUser } from "@/integrations/server-function/customer-user";
import { read__AllScrapItems } from "@/integrations/server-function/scrap-items";
import { read__OneVendorUser } from "@/integrations/server-function/vendor-user";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated-routes)/(existing-user)")(
  {
    component: RouteComponent,

    beforeLoad: async ({ context }) => {
      const { session } = context;

      const {
        user: { email },
      } = session;

      const vendorDetails = await read__OneVendorUser({
        data: { email: email },
      });

      const customerDetails = await read__OneCustomerUser({
        data: { email: email },
      });

      if (!vendorDetails && !customerDetails) {
        throw redirect({ to: "/become-a-partner" });
      }
    },

    loader: async () => {
      const scraps = await read__AllScrapItems();

      return { scraps };
    },
  },
);

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
