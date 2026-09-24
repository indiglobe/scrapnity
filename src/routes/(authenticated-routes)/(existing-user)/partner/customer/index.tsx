import { CustomerPage } from "@/components/main/authenticated-routes/partner/customer/customer";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { SCRAP_COLLECTION_STATUS } from "@/database/schema";

export const Route = createFileRoute(
  "/(authenticated-routes)/(existing-user)/partner/customer/",
)({
  component: RouteComponent,

  validateSearch: z
    .object({ status: z.enum(SCRAP_COLLECTION_STATUS()).optional() })
    .optional(),
});

function RouteComponent() {
  return (
    <>
      <CustomerPage />
    </>
  );
}
