import { createFileRoute } from "@tanstack/react-router";
import Main from "@/components/main/main";
import { ContactFormSection } from "@/components/main/contact/contact";

export const Route = createFileRoute("/(public-routes)/contact/")({
  component: RouteComponent,

  head: () => {
    const title = "Contact Scrapnity | Schedule Scrap Collection";
    const description =
      "Get in touch with Scrapnity to schedule convenient scrap collection, ask questions, or learn more about our reliable recycling services.";

    return {
      meta: [
        { title },
        { content: description, name: "description" },

        { content: title, name: "og:title" },
        { content: description, name: "og:description" },
        { content: "https://scrapnity.in/contact", name: "og:url" },
        { content: "summary_large_image", name: "twitter:card" },
        { content: title, name: "twitter:title" },
        { content: description, name: "twitter:description" },
        { content: "https://scrapnity.in/contact", name: "twitter:url" },
      ],
    };
  },
});

function RouteComponent() {
  return (
    <Main>
      <ContactFormSection />
    </Main>
  );
}
