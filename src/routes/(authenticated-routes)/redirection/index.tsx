import { RedirectOnlyPage } from "@/components/main/authenticated-routes/redirection";
import { signinPageSearchParams } from "@/utils/zod-schema/search-params-schema/signin-page";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { read__OneCustomerUser } from "@/integrations/server-function/customer-user";
import { read__OneVendorUser } from "@/integrations/server-function/vendor-user";
import { env } from "@/utils/env/client";

export const Route = createFileRoute("/(authenticated-routes)/redirection/")({
  component: RouteComponent,

  head: () => {
    const title = "Redirecting | Scrapnity";
    const description =
      "Please wait while Scrapnity redirects you to the appropriate page for your account.";

    return {
      meta: [
        { title: title },
        { content: description, name: "description" },
        { content: title, name: "og:title" },
        { content: title, name: "twitter:title" },
        { content: description, name: "og:description" },
        { content: description, name: "twitter:description" },
        { content: `${env.VITE_APP_HOST}/redirection`, name: "og:url" },
        { content: `${env.VITE_APP_HOST}/redirection`, name: "twitter:url" },
        { content: "noindex, nofollow", name: "robots" },
      ],
    };
  },

  /**
   * Validates the incoming search parameters before
   * the route guard executes.
   */
  validateSearch: zodValidator(signinPageSearchParams),

  /**
   * ## Route Guard
   *
   * This is a redirect-only route and is never intended to render UI.
   * Its sole responsibility is to determine the user's final destination
   * based on their authentication and onboarding state.
   *
   * Flow:
   * 1. No active session -> Redirect to the sign-in page.
   * 2. Authenticated but onboarding incomplete -> Redirect to /welcome.
   * 3. Authenticated and onboarding complete -> Allow navigation to continue.
   */
  beforeLoad: async ({ context }) => {
    // Check whether the user has an active session.
    const session = context.session;

    const {
      user: { email },
    } = session;

    // Verify that the authenticated user has completed
    // the application's onboarding/profile creation.
    const customerUser = await read__OneCustomerUser({
      data: { identifier: { email } },
    });
    const vendorUser = await read__OneVendorUser({
      data: { identifier: { email } },
    });

    if (!customerUser && !vendorUser) {
      throw redirect({ to: "/become-a-partner" });
    }

    if (customerUser) {
      throw redirect({ to: "/partner/customer" });
    }

    if (vendorUser) {
      throw redirect({ to: "/partner/vendor" });
    }

    throw redirect({ to: "/partner" });
  },
});

function RouteComponent() {
  return (
    <>
      <RedirectOnlyPage />
    </>
  );
}
