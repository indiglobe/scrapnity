import { db } from "@/database";
import { Table__ScrapItem } from "@/database/schema";
import { tryCatch } from "@/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";

export const read__AllScrapItems = createServerFn({ method: "GET" }).handler(
  async () => {
    const baseQuery = db.select().from(Table__ScrapItem);

    const [baseQueryError, baseQueryData] = await tryCatch(baseQuery);

    if (baseQueryError) {
      console.log(`Error in baseQueryError in "read__AllScrapItems"`);
      throw new Error(`Error in baseQueryError in "read__AllScrapItems"`);
    }

    return baseQueryData;
  },
);
