import { createFileRoute } from "@tanstack/react-router";
import Main from "@/components/main/main";
import {
  AboutHero,
  FinalCTA,
  OurMission,
  StatsSection,
  WhoWeAre,
  WhyChooseUs,
} from "@/components/main/about/about";

export const Route = createFileRoute("/about/")({
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
        { content: "/logo512.png", name: "og:image" },
        { content: "/logo512.png", name: "twitter:image" },
        { content: "https://scrapnity.in/about", name: "og:url" },
        { content: "https://scrapnity.in/about", name: "twitter:url" },
      ],
    };
  },
});

function RouteComponent() {
  return (
    <Main>
      <AboutHero />

      <StatsSection />

      <WhoWeAre />

      <OurMission />

      <WhyChooseUs />

      <FinalCTA />
    </Main>
  );
}
