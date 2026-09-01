import { BecomeVendor } from "@/components/main/become-a-vendor/become-a-vendor";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/become-a-vendor/")({
  component: RouteComponent,

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
