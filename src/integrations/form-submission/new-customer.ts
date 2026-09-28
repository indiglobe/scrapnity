import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { create__OneCustomerUser } from "../server-function/customer-user";

export const formSubmission__newCustomer = createServerFn({ method: "POST" })
  .validator(
    z.object({
      address: z.string(),
      pinCode: z.string(),
      email: z.string(),
      name: z.string(),
      phoneNumber: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    return await create__OneCustomerUser({ data });
  });
