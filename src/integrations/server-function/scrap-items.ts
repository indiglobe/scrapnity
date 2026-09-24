import { db } from "@/database";
import { ScrapItemTable } from "@/database/schema";
import { createServerFn } from "@tanstack/react-start";

export const read__AllScrapItems = createServerFn({ method: "GET" }).handler(
  async () => {
    const scraps = await db.select().from(ScrapItemTable);

    return scraps;
  },
);
