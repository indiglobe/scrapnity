import { db } from "@/database";
import { VendorScrapItemTable } from "@/database/schema";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";

export const create__ManyVendorScrapItem = createServerFn({ method: "POST" })
  .validator(
    z.array(z.object({ scrapItemId: z.string(), vendorId: z.string() })),
  )
  .handler(async ({ data }) => {
    await db.insert(VendorScrapItemTable).values(data);
  });
