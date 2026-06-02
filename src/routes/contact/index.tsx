import { createFileRoute } from "@tanstack/react-router";
import Main from "@/components/main/main";
import { ContactFormSection } from "@/components/main/contact/contact";

export const Route = createFileRoute("/contact/")({
  component: RouteComponent,

  head: () => ({ meta: [{ title: "Scrapnity | Contact" }] }),
});

function RouteComponent() {
  return (
    <Main>
      <ContactFormSection />
    </Main>
  );
}
