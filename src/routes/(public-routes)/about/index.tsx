import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/main/public-routes/about/about";

export const Route = createFileRoute("/(public-routes)/about/")({
  component: RouteComponent,

  head: () => {
    const title = "About Scrapnity | Making Scrap Recycling Simple";
    const description =
      "Learn about Scrapnity and our mission to make scrap collection simple, reliable, and eco-friendly while helping turn everyday scrap into value.";

    return {
      meta: [
        { title },
        { content: description, name: "description" },
        { content: title, name: "og:title" },
        { content: description, name: "og:description" },
        { content: title, name: "twitter:title" },
        { content: description, name: "twitter:description" },
        { content: "https://scrapnity.in/about", name: "og:url" },
        { content: "https://scrapnity.in/about", name: "twitter:url" },
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
