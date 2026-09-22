import { SigninPage } from "@/components/main/unauthenticated-routes/signin/signin";
import { signinPageSearchParams } from "@/utils/zod-schema/search-params-schema/signin-page";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

export const Route = createFileRoute("/(unauthenticated-routes)/sign-in/")({
  component: RouteComponent,

  /**
   * Validates and parses the URL search parameters
   * using the Zod schema before rendering the route.
   */
  validateSearch: zodValidator(signinPageSearchParams),
});

function RouteComponent() {
  return (
    <>
      <SigninPage />
    </>
  );
}
