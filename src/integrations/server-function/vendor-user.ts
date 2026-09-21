import { db } from "@/database";
import { VendorUserTable } from "@/database/schema";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import z from "zod";

export const read__OneVendorUser = createServerFn()
  .validator(z.object({ email: z.string() }))
  .handler(async ({ data }) => {
    const { email } = data;

    const [vendorUser] = await db
      .select()
      .from(VendorUserTable)
      .where(eq(VendorUserTable.email, email));

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return vendorUser ? vendorUser : null;
  });
