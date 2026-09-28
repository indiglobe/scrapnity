import { db } from "@/database";
import { Table__Payment } from "@/database/schema";
import { id } from "@/utils/id";
import { tryCatch } from "@/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import z from "zod";

export const create__Payment = createServerFn({ method: "GET" })
  .validator(
    z.object({
      scrapOrderId: z.string(),
      vendorId: z.string(),
      razorpayOrderId: z.string(),
      razorpayPaymentId: z.string().optional(),
      razorpaySignature: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const generatedId = id();

    const baseQuery = db
      .insert(Table__Payment)
      .values({ ...data, id: generatedId });

    const [baseQueryError, baseQueryData] = await tryCatch(baseQuery);

    if (baseQueryError) {
      console.log(`Error in baseQueryError in create__Payment`);
      throw new Error(`Error in baseQueryError in create__Payment`);
    }

    const [queryRes] = baseQueryData;

    if (queryRes.affectedRows === 1) {
      const [insertedCustomerUserFetchError, insertedCustomerUserFetchedData] =
        await tryCatch(
          db
            .select()
            .from(Table__Payment)
            .where(eq(Table__Payment.id, generatedId))
            .limit(1),
        );

      if (insertedCustomerUserFetchError) {
        console.log(
          `Error in insertedCustomerUserFetchError in create__Payment`,
        );
        throw new Error(
          `Error in insertedCustomerUserFetchError in create__Payment`,
        );
      }

      const [userData] = insertedCustomerUserFetchedData;

      return userData;
    }

    console.log(`Error while inserting data in create__Payment`);
    throw new Error(`Error while inserting data in create__Payment`);
  });
