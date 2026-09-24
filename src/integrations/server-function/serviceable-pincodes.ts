import { db } from "@/database";
import { ServiceablePincodeTable } from "@/database/schema";
import { createServerFn } from "@tanstack/react-start";
import { desc, getTableColumns, inArray } from "drizzle-orm";
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
