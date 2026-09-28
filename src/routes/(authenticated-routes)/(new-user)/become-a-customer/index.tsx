import { BecomeCustomer } from "@/components/main/authenticated-routes/become-a-customer/become-a-customer";
import { read__AllScrapItems } from "@/integrations/server-function/scrap-items";
import { env } from "@/utils/env/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(authenticated-routes)/(new-user)/become-a-customer/",
)({
  component: RouteComponent,

  head: () => {
    const title = "Become a Scrapnity Customer | Sell Your Scrap Easily";
    const description =
      "Join Scrapnity as a customer and turn your everyday scrap into value with easy, reliable, and convenient scrap collection.";

    return {
      meta: [
        { title: title },
        { content: description, name: "description" },
        { content: title, name: "og:title" },
        { content: title, name: "twitter:title" },
        { content: description, name: "og:description" },
        { content: description, name: "twitter:description" },
        {
          content: `${env.VITE_APP_HOST}/become-a-customer`,
          name: "og:url",
        },
        {
          content: `${env.VITE_APP_HOST}/become-a-customer`,
          name: "twitter:url",
        },
      ],
    };
  },

  loader: async () => {
    const scraps = await read__AllScrapItems();

    return { scraps };
  },
});

function RouteComponent() {
  return (
    <>
      <BecomeCustomer />
    </>
  );
}
