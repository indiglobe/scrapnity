import { db } from "@/database";
import { Table__VendorUser } from "@/database/schema";
import { id } from "@/utils/id";
import { tryCatch } from "@/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";
import { eq, getTableColumns } from "drizzle-orm";
import z from "zod";

export const create__OneVendorUser = createServerFn({ method: "POST" })
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
    const generatedId = id();
    const baseQuery = db
      .insert(Table__VendorUser)
      .values({ ...data, id: generatedId });

    const [baseQueryError, baseQueryData] = await tryCatch(baseQuery);

    if (baseQueryError) {
      console.log(`Error in baseQueryError in "create__OneVendorUser"`);
      throw new Error(`Error in baseQueryError in "create__OneVendorUser"`);
    }

    const [queryResponse] = baseQueryData;

    if (queryResponse.affectedRows === 1) {
      const [
        insertedServiceablePinCodeFetchError,
        insertedServiceablePinCodeFetchedData,
      ] = await tryCatch(
        db
          .select()
          .from(Table__VendorUser)
          .where(eq(Table__VendorUser.id, generatedId))
          .limit(1),
      );

      if (insertedServiceablePinCodeFetchError) {
        console.log(
          `Error in "insertedServiceablePinCodeFetchError" in create__OneVendorUser`,
        );
        throw new Error(
          `Error in "insertedServiceablePinCodeFetchError" in create__OneVendorUser`,
        );
      }

      return insertedServiceablePinCodeFetchedData;
    }

    console.log(`Error while inserting data in create__OneVendorUser`);
    throw new Error(`Error while inserting data in create__OneVendorUser`);
  });

export const read__OneVendorUser = createServerFn({ method: "GET" })
  .validator(z.object({ identifier: z.object({ email: z.string() }) }))
  .handler(async ({ data }) => {
    const {
      identifier: { email },
    } = data;

    const vendorUserColumns = getTableColumns(Table__VendorUser);

    const baseQuery = db
      .select({ ...vendorUserColumns })
      .from(Table__VendorUser)
      .where(eq(Table__VendorUser.email, email))
      .limit(1);

    const [baseQueryError, baseQueryData] = await tryCatch(baseQuery);

    if (baseQueryError) {
      console.log("Error in baseQuery in read__OneVendorUser");
      throw new Error("Error in baseQuery in read__OneVendorUser");
    }

    const [vendorUser] = baseQueryData;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return vendorUser ? vendorUser : null;
  });
