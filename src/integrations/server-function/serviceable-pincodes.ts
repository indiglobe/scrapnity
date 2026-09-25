import { db } from "@/database";
import { ServiceablePincodeTable, VendorUserTable } from "@/database/schema";
import { createServerFn } from "@tanstack/react-start";
import { desc, eq, getTableColumns, inArray } from "drizzle-orm";
import z from "zod";

export const create__ManyServiceablePincodes = createServerFn({
  method: "POST",
})
  .validator(z.array(z.object({ pinCode: z.string(), vendorId: z.string() })))
  .handler(async ({ data }) => {
    await db.insert(ServiceablePincodeTable).values(data);

    const vendorIds = [...new Set(data.map((d) => d.vendorId))];

    const { pinCode, vendorId } = getTableColumns(ServiceablePincodeTable);

    const createdServiceablePincodes = await db
      .select({ pinCode, vendorId })
      .from(ServiceablePincodeTable)
      .where(inArray(ServiceablePincodeTable.vendorId, vendorIds))
      .orderBy(desc(ServiceablePincodeTable.createdAt))
      .limit(data.length);

    return createdServiceablePincodes;
  });

export const read__AllServiceablePincodes = createServerFn({
  method: "GET",
})
  .validator(
    z
      .object({
        identifier: z.union([
          z.object({
            vendorId: z.string(),
          }),
          z.object({
            vendorEmail: z.string(),
          }),
        ]),
      })
      .optional(),
  )
  .handler(async ({ data }) => {
    const { pinCode, vendorId } = getTableColumns(ServiceablePincodeTable);

    const baseQuery = db
      .select({
        pinCode,
        vendorId,
      })
      .from(ServiceablePincodeTable);

    if (data?.identifier) {
      switch (true) {
        case "vendorId" in data.identifier:
          baseQuery.where(
            eq(ServiceablePincodeTable.vendorId, data.identifier.vendorId),
          );
          break;

        case "vendorEmail" in data.identifier:
          baseQuery.innerJoin(
            VendorUserTable,
            eq(ServiceablePincodeTable.vendorId, VendorUserTable.id),
          );
          baseQuery.where(
            eq(VendorUserTable.email, data.identifier.vendorEmail),
          );
          break;
      }
    }

    const serviceablePincodes = await baseQuery;
    return serviceablePincodes;
  });
