import { db } from "@/database";
import { VendorUserTable } from "@/database/schema";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import z from "zod";

export const create__OneVendorUser = createServerFn({ method: "POST" })
  .validator(
    z.object({
      email: z.string(),
      aadharNo: z.string(),
      address: z.string(),
      city: z.string(),
      district: z.string(),
      name: z.string(),
      phoneNumber: z.string(),
      state: z.string(),
      vendorPinCode: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const {
      email,
      aadharNo,
      address,
      city,
      district,
      name,
      phoneNumber,
      state,
      vendorPinCode,
    } = data;

    await db.insert(VendorUserTable).values({
      email: email,
      aadharNo: aadharNo,
      address: address,
      city: city,
      district: district,
      name: name,
      phoneNumber: phoneNumber,
      state: state,
      vendorPinCode: vendorPinCode,
    });

    const [insertedvendorUser] = await db
      .select()
      .from(VendorUserTable)
      .where(eq(VendorUserTable.email, email))
      .limit(1);

    return insertedvendorUser;
  });

export const read__OneVendorUser = createServerFn({ method: "GET" })
  .validator(z.object({ email: z.string() }))
  .handler(async ({ data }) => {
    const { email } = data;

    const [vendorUser] = await db
      .select()
      .from(VendorUserTable)
      .where(eq(VendorUserTable.email, email))
      .limit(1);

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return vendorUser ? vendorUser : null;
  });
