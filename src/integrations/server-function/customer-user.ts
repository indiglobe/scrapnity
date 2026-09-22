import { db } from "@/database";
import { CustomerUserTable } from "@/database/schema";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import z from "zod";

export const read__OneCustomerUser = createServerFn({ method: "GET" })
  .validator(z.object({ email: z.string() }))
  .handler(async ({ data }) => {
    const { email } = data;

    const [customerUser] = await db
      .select()
      .from(CustomerUserTable)
      .where(eq(CustomerUserTable.email, email));

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return customerUser ? customerUser : null;
  });
