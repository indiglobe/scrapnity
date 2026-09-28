import { createServerFn } from "@tanstack/react-start";
import { razorpay } from "@/integrations/razorpay/server";
import z from "zod";

export const payment__createPaymentOrderForVendor = createServerFn()
  .validator(z.object({ productPrice: z.number() }))
  .handler(async ({ data }) => {
    const { productPrice } = data;

    return await razorpay.orders.create({
      amount: productPrice * 100,
      currency: "INR",
    });
  });
