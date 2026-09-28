import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/main/public-routes/about/about";
import { env } from "@/utils/env/client";

export const Route = createFileRoute("/(public-routes)/about/")({
  component: RouteComponent,

  head: () => {
    const title = "About Scrapnity | Making Scrap Recycling Simple";
    const description =
      "Learn about Scrapnity and our mission to make scrap collection simple, reliable, and eco-friendly while helping turn everyday scrap into value.";

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
      <AboutPage />
    </>
  );
}
