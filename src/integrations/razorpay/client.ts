import { env } from "@/utils/env/client";
import type { RazorpayOrderOptions } from "react-razorpay";
import { useRazorpay } from "react-razorpay";

/**
 * Extract consistent and a default of options
 */
export type DefaultRazorpayOptions = Pick<
  RazorpayOrderOptions,
  "key" | "currency" | "name" | "theme"
>;

/**
 * Extract variable options
 */
export type RazorpayOptions = Omit<
  RazorpayOrderOptions,
  "key" | "currency" | "name" | "theme"
>;

/**
 * This is custom hook, wrapped around `useRazorpay` because the `currency`, `name`, `key`, `theme` is consistent across the application, so we do not need to
 * use them again and again everywhere we use razorpay.
 *
 * They are declare once in the wrapper so, you do not need to pass them multiple times.
 */
export function useRazorpayClient() {
  const { Razorpay, error, isLoading } = useRazorpay();

  const DEFAULT_OPTIONS: DefaultRazorpayOptions = {
    key: env.VITE_RAZOR_PAY_KEY,
    currency: "INR",
    name: "Scrapnity",
    theme: {
      color: "#3399cc",
    },
  };

  /**
   * Create a razorpay instance with some values provided by default.
   * You can change the values if you want by providing values when calling the function.
   */
  function createRazorpayInstance(options: RazorpayOptions) {
    return new Razorpay({
      ...DEFAULT_OPTIONS,
      ...options,
    });
  }

  return {
    /**
     * Provide the default options for the instance
     */
    createRazorpayInstance,
    error,
    isLoading,
  };
}
