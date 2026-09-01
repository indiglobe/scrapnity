import { createFileRoute } from "@tanstack/react-router";
import Main from "@/components/main/main";
import {
  CTASection,
  Hero,
  ServicesGrid,
  WhyChooseScrapnity,
} from "@/components/main/services/services";
import { ProcessSection } from "@/components/scrap-processing";

export const Route = createFileRoute("/services/")({
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
        { content: "/logo512.png", name: "og:image" },
        { content: "https://scrapnity.in/services", name: "og:url" },

        { content: title, name: "twitter:title" },
        { content: description, name: "twitter:description" },
        { content: "/logo512.png", name: "twitter:image" },
        { content: "https://scrapnity.in/services", name: "twitter:url" },
      ],
    };
  },
});

function RouteComponent() {
  return (
    <Main>
      <Hero />

      <ServicesGrid />

      <WhyChooseScrapnity />

      <ProcessSection />

      <CTASection />
    </Main>
  );
}
