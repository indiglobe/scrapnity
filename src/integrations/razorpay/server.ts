import { env } from "@/utils/env/server";
import Razorpay from "razorpay";

/**
 * Razorpay instance for servers.
 * You need to call it from server side code and not client side code.
 */
export const razorpay = new Razorpay({
  key_id: env.RAZOR_PAY_KEY,
  key_secret: env.RAZOR_PAY_SECRET,
});
