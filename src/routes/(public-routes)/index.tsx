import { HomePage } from "@/components/main/public-routes/home/home";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public-routes)/")({
  component: RouteComponent,

  head: () => {
    const title = "Scrapnity | Easy & Reliable Scrap Collection";
    const description =
      "Turn your scrap into value with Scrapnity. Schedule easy scrap collection and help build a cleaner, greener future.";

    return {
      meta: [
        { title: title },
        { content: description, name: "description" },
        { content: title, name: "og:title" },
        { content: title, name: "twitter:title" },
        { content: description, name: "og:description" },
        { content: description, name: "twitter:description" },
        { content: "https://scrapnity.in", name: "og:url" },
        { content: "https://scrapnity.in", name: "twitter:url" },
      ],
    };
  },
});

function RouteComponent() {
  return (
    <>
      <HomePage />
    </>
  );
}
