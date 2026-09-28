import { db } from "@/database";
import { Table__CustomerUser } from "@/database/schema";
import { tryCatch } from "@/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import z from "zod";

export const create__OneCustomerUser = createServerFn({ method: "POST" })
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
    const { address, pinCode, email, name, phoneNumber } = data;

    const baseQuery = db.insert(Table__CustomerUser).values({
      address: address,
      email: email,
      name: name,
      phoneNumber: phoneNumber,
      pinCode: pinCode,
    });

    const [baseQueryError, baseQueryData] = await tryCatch(baseQuery);

    if (baseQueryError) {
      console.log("Error in baseQueryError in create__OneCustomerUser");
      throw new Error("Error in baseQueryError in create__OneCustomerUser");
    }

    if (baseQueryData[0].affectedRows === 1) {
      const [insertedCustomerUserFetchError, insertedCustomerUserFetchedData] =
        await tryCatch(
          db
            .select()
            .from(Table__CustomerUser)
            .where(eq(Table__CustomerUser.email, email))
            .limit(1),
        );

      if (insertedCustomerUserFetchError) {
        console.log(
          `Error in "insertedCustomerUserFetchError" in create__OneCustomerUser`,
        );
        throw new Error(
          `Error in "insertedCustomerUserFetchError" in create__OneCustomerUser`,
        );
      }

      const [insertedCustomerUser] = insertedCustomerUserFetchedData;

      return insertedCustomerUser;
    }

    console.log(`Error while inserting data in create__OneCustomerUser`);
    throw new Error(`Error while inserting data in create__OneCustomerUser`);
  });

export const read__OneCustomerUser = createServerFn({ method: "GET" })
  .validator(z.object({ identifier: z.object({ email: z.string() }) }))
  .handler(async ({ data }) => {
    const {
      identifier: { email },
    } = data;
    const baseQuery = db
      .select()
      .from(Table__CustomerUser)
      .where(eq(Table__CustomerUser.email, email))
      .limit(1);

    const [baseQueryError, baseQueryData] = await tryCatch(baseQuery);

    if (baseQueryError) {
      console.log("Error in baseQuery in read__OneCustomerUser");
      throw new Error("Error in baseQuery in read__OneCustomerUser");
    }

    const [customerUser] = baseQueryData;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return customerUser ? customerUser : null;
  });
