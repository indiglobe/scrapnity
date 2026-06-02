import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { DevTool } from "@/integrations/tanstack-query/devtools";
import appCss from "@/styles.css?url";
import type { QueryClient } from "@tanstack/react-query";
import Header from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { NotFound } from "@/components/main/not-found";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Scrapnity",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,

  notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <DevTool />
        <Scripts />
      </body>
    </html>
  );
}
