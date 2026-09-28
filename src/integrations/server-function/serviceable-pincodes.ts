import { db } from "@/database";
import {
  Table__ServiceablePincode,
  Table__VendorUser,
} from "@/database/schema";
import { tryCatch } from "@/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";
import { desc, eq, getTableColumns, inArray } from "drizzle-orm";
import z from "zod";

export const create__ManyServiceablePincodes = createServerFn({
  method: "POST",
})
  .validator(z.array(z.object({ pinCode: z.string(), vendorId: z.string() })))
  .handler(async ({ data }) => {
    const baseQuery = db.insert(Table__ServiceablePincode).values(data);

    const [baseQueryError, baseQueryData] = await tryCatch(baseQuery);

    if (baseQueryError) {
      console.log(
        `Error in baseQueryError in "create__ManyServiceablePincodes"`,
      );
      throw new Error(
        `Error in baseQueryError in "create__ManyServiceablePincodes"`,
      );
    }

    const [queryResponse] = baseQueryData;

    if (queryResponse.affectedRows === data.length) {
      const vendorIds = [...new Set(data.map((d) => d.vendorId))];

      const serviceablePincodeColumns = getTableColumns(
        Table__ServiceablePincode,
      );

      const [
        insertedServiceablePinCodeFetchError,
        insertedServiceablePinCodeFetchedData,
      ] = await tryCatch(
        db
          .select({ ...serviceablePincodeColumns })
          .from(Table__ServiceablePincode)
          .where(inArray(Table__ServiceablePincode.vendorId, vendorIds))
          .orderBy(desc(Table__ServiceablePincode.createdAt))
          .limit(data.length),
      );

      if (insertedServiceablePinCodeFetchError) {
        console.log(
          `Error in "insertedServiceablePinCodeFetchError" in create__ManyServiceablePincodes`,
        );
        throw new Error(
          `Error in "insertedServiceablePinCodeFetchError" in create__ManyServiceablePincodes`,
        );
      }

      return insertedServiceablePinCodeFetchedData;
    }

    console.log(
      `Error while inserting data in create__ManyServiceablePincodes`,
    );
    throw new Error(
      `Error while inserting data in create__ManyServiceablePincodes`,
    );
  });

export const read__AllServiceablePincodes = createServerFn({
  method: "GET",
})
  .validator(
    z
      .object({
        identifier: z.object({
          vendorEmail: z.string(),
        }),
      })
      .optional(),
  )
  .handler(async ({ data }) => {
    const serviceablePincodeColumns = getTableColumns(
      Table__ServiceablePincode,
    );

    const baseQuery = db
      .select({ ...serviceablePincodeColumns })
      .from(Table__ServiceablePincode);

    if (data?.identifier) {
      switch (true) {
        case "vendorEmail" in data.identifier:
          baseQuery.innerJoin(
            Table__VendorUser,
            eq(Table__ServiceablePincode.vendorId, Table__VendorUser.id),
          );
          baseQuery.where(
            eq(Table__VendorUser.email, data.identifier.vendorEmail),
          );
          break;
      }
    }

    const [baseQueryError, baseQueryData] = await tryCatch(baseQuery);

    if (baseQueryError) {
      console.log("Error in baseQuery in read__AllServiceablePincodes");
      throw new Error("Error in baseQuery in read__AllServiceablePincodes");
    }

    return baseQueryData;
  });
