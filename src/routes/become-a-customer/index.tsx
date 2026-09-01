import { BecomeCustomer } from "@/components/main/become-a-customer/become-a-customer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/become-a-customer/")({
  component: RouteComponent,

  head: () => {
    const title = "Become a Scrapnity Customer | Easy Scrap Collection";
    const description =
      "Join Scrapnity for easy and reliable scrap collection. Schedule a convenient pickup and turn your unwanted scrap into value.";

    return {
      meta: [
        { title },
        { content: description, name: "description" },

        { content: title, name: "og:title" },
        { content: description, name: "og:description" },
        { content: "/logo512.png", name: "og:image" },
        {
          content: "https://scrapnity.in/become-a-customer",
          name: "og:url",
        },

        { content: "summary_large_image", name: "twitter:card" },
        { content: title, name: "twitter:title" },
        { content: description, name: "twitter:description" },
        { content: "/logo512.png", name: "twitter:image" },
        {
          content: "https://scrapnity.in/become-a-customer",
          name: "twitter:url",
        },
      ],
    };
  },
});

function RouteComponent() {
  return (
    <>
      <BecomeCustomer />
    </>
  );
}
