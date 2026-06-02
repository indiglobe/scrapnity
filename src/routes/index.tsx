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

  head: () => ({ meta: [{ title: "Scrapnity | Home" }] }),
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
