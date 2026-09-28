import { CustomerPage } from "@/components/main/authenticated-routes/partner/customer/customer";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { SCRAP_COLLECTION_STATUS } from "@/database/schema";
import { env } from "@/utils/env/client";

export const Route = createFileRoute(
  "/(authenticated-routes)/(existing-user)/partner/customer/",
)({
  component: RouteComponent,

  head: () => {
    const title =
      "Scrapnity Customer Dashboard | Manage Your Scrap Collections";
    const description =
      "Manage your scrap collections with Scrapnity. Track collection requests, view their status, and easily manage your scrap recycling activities.";

    return {
      meta: [
        { title: title },
        { content: description, name: "description" },
        { content: title, name: "og:title" },
        { content: title, name: "twitter:title" },
        { content: description, name: "og:description" },
        { content: description, name: "twitter:description" },
        {
          content: `${env.VITE_APP_HOST}/partner/customer`,
          name: "og:url",
        },
        {
          content: `${env.VITE_APP_HOST}/partner/customer`,
          name: "twitter:url",
        },
      ],
    };
  },

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
