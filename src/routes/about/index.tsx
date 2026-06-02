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

  head: () => ({ meta: [{ title: "Scrapnity | About" }] }),
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
