import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/main/services/services";

export const Route = createFileRoute("/(public-routes)/services/")({
  component: RouteComponent,

  head: () => {
    const title = "Scrap Collection Services | Scrapnity";
    const description =
      "Explore Scrapnity's reliable scrap collection services. Schedule convenient pickup for recyclable scrap and turn your unwanted materials into value.";

    return {
      meta: [
        { title },
        { content: description, name: "description" },

        { content: title, name: "og:title" },
        { content: description, name: "og:description" },
        { content: "https://scrapnity.in/services", name: "og:url" },
        { content: title, name: "twitter:title" },
        { content: description, name: "twitter:description" },
        { content: "https://scrapnity.in/services", name: "twitter:url" },
      ],
    };
  },
});

function RouteComponent() {
  return <ServicePage />;
}
