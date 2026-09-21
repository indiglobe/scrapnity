import { RedirectOnlyPage } from "@/components/main/redirect-signin";
import { signinPageSearchParams } from "@/utils/zod-schema/search-params-schema/signin-page";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { read__OneCustomerUser } from "@/integrations/server-function/customer-user";
import { read__OneVendorUser } from "@/integrations/server-function/vendor-user";

export const Route = createFileRoute("/(authenticated-routes)/redirection/")({
  component: RouteComponent,

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
    const customerUser = await read__OneCustomerUser({ data: { email } });
    const vendorUser = await read__OneVendorUser({ data: { email } });

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
