import { z } from "zod";

export const welcomePageSearchParams = z.object({
  /**
   * The referral code when someone is invited through referral
   */
  referralCode: z.string().optional(),
});

/**
 * Inferred type for signin search schema
 */
export type TWelcomePageSearchParams = z.infer<typeof welcomePageSearchParams>;
