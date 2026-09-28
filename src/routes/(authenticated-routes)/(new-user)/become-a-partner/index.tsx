import { BecomePartner } from "@/components/main/authenticated-routes/become-a-partner/become-a-partner";
import { env } from "@/utils/env/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(authenticated-routes)/(new-user)/become-a-partner/",
)({
  component: RouteComponent,

  head: () => {
    const title = "Become a Scrapnity Partner | Join Our Network";
    const description =
      "Join Scrapnity as a partner and be part of a reliable, sustainable scrap recycling network. Get started with Scrapnity today.";

    return {
      meta: [
        { title: title },
        { content: description, name: "description" },
        { content: title, name: "og:title" },
        { content: title, name: "twitter:title" },
        { content: description, name: "og:description" },
        { content: description, name: "twitter:description" },
        {
          content: `${env.VITE_APP_HOST}/become-a-partner`,
          name: "og:url",
        },
        {
          content: `${env.VITE_APP_HOST}/become-a-partner`,
          name: "twitter:url",
        },
      ],
    };
  },
});

function RouteComponent() {
  return (
    <>
      <BecomePartner />
    </>
  );
}
