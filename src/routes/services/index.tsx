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

  head: () => ({ meta: [{ title: "Scrapnity | Service" }] }),
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
