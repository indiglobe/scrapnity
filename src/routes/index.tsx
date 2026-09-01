import {
  FinalCTA,
  Hero,
  ScrapTypes,
  ServicesWeOffer,
} from "@/components/main/home/home";
import Main from "@/components/main/main";
import { ProcessSection } from "@/components/scrap-processing";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
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
        { content: "/logo512.png", name: "og:image" },
        { content: "/logo512.png", name: "twitter:image" },
        { content: "https://scrapnity.in", name: "og:url" },
        { content: "https://scrapnity.in", name: "twitter:url" },
      ],
    };
  },
});

function RouteComponent() {
  return (
    <Main>
      <Hero />

      <ServicesWeOffer />

      <ScrapTypes />

      <ProcessSection />

      <FinalCTA />
    </Main>
  );
}
