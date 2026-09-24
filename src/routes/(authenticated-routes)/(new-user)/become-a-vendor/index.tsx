import { BecomeVendor } from "@/components/main/authenticated-routes/become-a-vendor/become-a-vendor";
import { read__AllScrapItems } from "@/integrations/server-function/scrap-items";
import { read__AllStates } from "@/integrations/server-function/states";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(authenticated-routes)/(new-user)/become-a-vendor/",
)({
  component: RouteComponent,

  loader: async () => {
    const scraps = await read__AllScrapItems();
    const states = await read__AllStates();

    return { scraps, states };
  },

  head: () => {
    const title = "Become a Scrapnity Vendor | Partner With Us";
    const description =
      "Partner with Scrapnity as a vendor and grow your scrap recycling business. Join our network and build a reliable, long-term partnership.";

    return {
      meta: [
        { title },
        { content: description, name: "description" },

        { content: title, name: "og:title" },
        { content: description, name: "og:description" },
        { content: "/logo512.png", name: "og:image" },
        {
          content: "https://scrapnity.in/become-a-vendor",
          name: "og:url",
        },

        { content: "summary_large_image", name: "twitter:card" },
        { content: title, name: "twitter:title" },
        { content: description, name: "twitter:description" },
        { content: "/logo512.png", name: "twitter:image" },
        {
          content: "https://scrapnity.in/become-a-vendor",
          name: "twitter:url",
        },
      ],
    };
  },
});

function RouteComponent() {
  return (
    <>
      <BecomeVendor />
    </>
  );
}
