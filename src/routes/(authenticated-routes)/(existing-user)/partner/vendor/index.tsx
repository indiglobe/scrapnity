import { VendorPage } from "@/components/main/authenticated-routes/partner/vendor/vendor";
import { read__AllServiceablePincodes } from "@/integrations/server-function/serviceable-pincodes";
import { env } from "@/utils/env/client";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

const vendorPageSearchParamsSchema = z
  .object({
    "pin-code": z.string().or(z.number()).optional(),
    orders: z.enum(["all", "accepted"]).catch("all").optional(),
  })
  .optional();

export const Route = createFileRoute(
  "/(authenticated-routes)/(existing-user)/partner/vendor/",
)({
  component: RouteComponent,

  head: () => {
    const title = "Scrapnity Vendor Dashboard | Manage Scrap Collections";
    const description =
      "Manage your scrap collection orders with Scrapnity. View customer requests, manage serviceable areas, and keep your scrap recycling business running smoothly.";

    return {
      meta: [
        { title: title },
        { content: description, name: "description" },
        { content: title, name: "og:title" },
        { content: title, name: "twitter:title" },
        { content: description, name: "og:description" },
        { content: description, name: "twitter:description" },
        {
          content: `${env.VITE_APP_HOST}/partner/vendor`,
          name: "og:url",
        },
        {
          content: `${env.VITE_APP_HOST}/partner/vendor`,
          name: "twitter:url",
        },
      ],
    };
  },

  validateSearch: vendorPageSearchParamsSchema,

  loader: async ({ context }) => {
    const {
      session: {
        user: { email },
      },
    } = context;

    const [serviceablePincodesByVendor] = await Promise.all([
      read__AllServiceablePincodes({
        data: { identifier: { vendorEmail: email } },
      }),
    ]);

    return { serviceablePincodesByVendor };
  },
});

function RouteComponent() {
  return (
    <>
      <VendorPage />
    </>
  );
}
