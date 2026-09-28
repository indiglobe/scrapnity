import { createFileRoute } from "@tanstack/react-router";
import { ContactFormSection } from "@/components/main/public-routes/contact/contact";
import { env } from "@/utils/env/client";

export const Route = createFileRoute("/(public-routes)/contact/")({
  component: RouteComponent,

  head: () => {
    const title = "Contact Scrapnity | Schedule Scrap Collection";
    const description =
      "Get in touch with Scrapnity to schedule convenient scrap collection, ask questions, or learn more about our reliable recycling services.";

    return {
      meta: [
        { title: title },
        { content: description, name: "description" },
        { content: title, name: "og:title" },
        { content: title, name: "twitter:title" },
        { content: description, name: "og:description" },
        { content: description, name: "twitter:description" },
        { content: `${env.VITE_APP_HOST}/contact`, name: "og:url" },
        { content: `${env.VITE_APP_HOST}/contact`, name: "twitter:url" },
      ],
    };
  },
});

function RouteComponent() {
  return (
    <>
      <ContactFormSection />
    </>
  );
}
