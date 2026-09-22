import { db } from "@/database";
import { ScrapItemsTable } from "@/database/schema";
import { createServerFn } from "@tanstack/react-start";

export const read__AllScrapItems = createServerFn({ method: "GET" }).handler(
  async () => {
    const scraps = await db.select().from(ScrapItemsTable);

    return scraps;
  },
);
