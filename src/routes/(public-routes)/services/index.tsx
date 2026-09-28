import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/main/public-routes/services/services";
import { env } from "@/utils/env/client";

export const Route = createFileRoute("/(public-routes)/services/")({
  component: RouteComponent,

  head: () => {
    const title = "Scrap Collection Services | Scrapnity";
    const description =
      "Explore Scrapnity's reliable scrap collection services. Schedule convenient pickup for recyclable scrap and turn your unwanted materials into value.";

    return {
      meta: [
        { title: title },
        { content: description, name: "description" },
        { content: title, name: "og:title" },
        { content: title, name: "twitter:title" },
        { content: description, name: "og:description" },
        { content: description, name: "twitter:description" },
        { content: `${env.VITE_APP_HOST}/services`, name: "og:url" },
        { content: `${env.VITE_APP_HOST}/services`, name: "twitter:url" },
      ],
    };
  },
});

function RouteComponent() {
  return (
    <>
      <ServicePage />
    </>
  );
}
