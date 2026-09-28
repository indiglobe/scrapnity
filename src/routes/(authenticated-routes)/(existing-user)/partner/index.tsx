import { Partner } from "@/components/main/authenticated-routes/partner/partner";
import { read__OneCustomerUser } from "@/integrations/server-function/customer-user";
import { read__OneVendorUser } from "@/integrations/server-function/vendor-user";
import { env } from "@/utils/env/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(authenticated-routes)/(existing-user)/partner/",
)({
  component: RouteComponent,

  head: () => {
    const title = "Scrapnity Partner Dashboard | Manage Your Account";
    const description =
      "Access your Scrapnity partner dashboard to manage your scrap recycling activities, account, and partnership with Scrapnity.";

    return {
      meta: [
        { title: title },
        { content: description, name: "description" },
        { content: title, name: "og:title" },
        { content: title, name: "twitter:title" },
        { content: description, name: "og:description" },
        { content: description, name: "twitter:description" },
        {
          content: `${env.VITE_APP_HOST}/partner`,
          name: "og:url",
        },
        {
          content: `${env.VITE_APP_HOST}/partner`,
          name: "twitter:url",
        },
      ],
    };
  },

  loader: async ({ context }) => {
    const {
      session: {
        user: { email },
      },
    } = context;

    const customer = await read__OneCustomerUser({
      data: { identifier: { email } },
    });
    const vendor = await read__OneVendorUser({
      data: { identifier: { email } },
    });

    const data = { customerType: null } as {
      customerType: null | "vendor" | "customer";
    };

    if (vendor && !customer) {
      data.customerType = "vendor";
    }

    if (!vendor && customer) {
      data.customerType = "customer";
    }

    return data;
  },
});

function RouteComponent() {
  return (
    <>
      <Partner />
    </>
  );
}
