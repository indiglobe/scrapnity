import { db } from "@/database";
import { CustomerUserTable } from "@/database/schema";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import z from "zod";

export const create__OneCustomerUser = createServerFn({ method: "POST" })
  .validator(
    z.object({
      address: z.string(),
      customerPinCode: z.string(),
      email: z.string(),
      name: z.string(),
      phoneNumber: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { address, customerPinCode, email, name, phoneNumber } = data;

    await db.insert(CustomerUserTable).values({
      address: address,
      customerPinCode: customerPinCode,
      email: email,
      name: name,
      phoneNumber: phoneNumber,
    });

    const [insertedCustomerUser] = await db
      .select()
      .from(CustomerUserTable)
      .where(eq(CustomerUserTable.email, email))
      .limit(1);

    return insertedCustomerUser;
  });

export const read__OneCustomerUser = createServerFn({ method: "GET" })
  .validator(z.object({ email: z.string() }))
  .handler(async ({ data }) => {
    const { email } = data;

    const [customerUser] = await db
      .select()
      .from(CustomerUserTable)
      .where(eq(CustomerUserTable.email, email))
      .limit(1);

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return customerUser ? customerUser : null;
  });
