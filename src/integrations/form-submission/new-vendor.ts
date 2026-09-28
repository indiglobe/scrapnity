import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { create__OneVendorUser } from "../server-function/vendor-user";

export const formSubmission__newVendor = createServerFn({ method: "POST" })
  .validator(
    z.object({
      email: z.string(),
      aadhaarNumber: z.string(),
      address: z.string(),
      city: z.string(),
      district: z.string(),
      name: z.string(),
      phoneNumber: z.string(),
      state: z.string(),
      pinCode: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    return await create__OneVendorUser({ data });
  });
