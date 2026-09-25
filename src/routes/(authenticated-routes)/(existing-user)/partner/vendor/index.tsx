import { VendorPage } from "@/components/main/authenticated-routes/partner/vendor/vendor";
import { read__AllServiceablePincodes } from "@/integrations/server-function/serviceable-pincodes";
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
