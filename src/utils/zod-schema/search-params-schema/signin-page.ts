import type { FileRouteTypes } from "@/routeTree.gen";
import { z } from "zod";

/**
 * Allowed URLs by the framework
 */
export type TRedirectUrl = FileRouteTypes["to"];

export const signinPageSearchParams = z.object({
  /**
   * The URL where the user should go after a successful signin.
   *
   * **Most of the time you don't have to provide any value for this field,** as this has a default value.
   *
   * If you do need to provide a value, make sure
   * you know what you are doing.
   * @default `/redirection`
   */
  callbackUrl: z
    .custom<TRedirectUrl>()
    .catch("/redirection")
    .default("/redirection")
    .optional(),
  /**
   * Some predefined initiator, Based on this the content of the sign in page can change
   */
  initiator: z
    .enum(["partner-page"])
    .catch("partner-page")
    .optional(),
  /**
   * ### This should be considered as final url after all the necessary task performed
   * After a successful signin, some tasks are performed.
   * After those tasks performed, where the user should be redirected as final redirection.
   */
  redirectUrl: z.union([z.custom<TRedirectUrl>(), z.url()]).optional(),
  /**
   * The URL from where request is initiated
   */
  requestInitiatedFrom: z.string().optional(),
  /**
   * The referral code when someone is invited through referral
   */
  referralCode: z.string().optional(),
});

/**
 * Inferred type for signin search schema
 */
export type TSigninPageSearchParams = z.infer<typeof signinPageSearchParams>;
