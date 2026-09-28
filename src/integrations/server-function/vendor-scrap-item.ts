import { db } from "@/database";
import { Table__VendorScrapItem } from "@/database/schema";
import { tryCatch } from "@/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";
import { desc, getTableColumns, inArray } from "drizzle-orm";
import z from "zod";

export const create__ManyVendorScrapItem = createServerFn({ method: "POST" })
  .validator(
    z.array(z.object({ scrapItemId: z.string(), vendorId: z.string() })),
  )
  .handler(async ({ data }) => {
    const baseQuery = db.insert(Table__VendorScrapItem).values(data);

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

      const vendorScrapItemColumns = getTableColumns(Table__VendorScrapItem);

      const [
        insertedServiceablePinCodeFetchError,
        insertedServiceablePinCodeFetchedData,
      ] = await tryCatch(
        db
          .select({ ...vendorScrapItemColumns })
          .from(Table__VendorScrapItem)
          .where(inArray(Table__VendorScrapItem.vendorId, vendorIds))
          .orderBy(desc(Table__VendorScrapItem.createdAt))
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
