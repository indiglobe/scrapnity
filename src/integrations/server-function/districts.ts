import { db } from "@/database";
import { Table__District } from "@/database/schema";
import { tryCatch } from "@/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import z from "zod";

export const read__AllDistricts = createServerFn({ method: "GET" })
  .validator(z.object({ stateId: z.string() }).optional())
  .handler(async ({ data }) => {
    const baseQuery = db.select().from(Table__District);

    if (data?.stateId) {
      baseQuery.where(eq(Table__District.associatedState, data.stateId));
    }

    const [baseQueryError, baseQueryData] = await tryCatch(baseQuery);

    if (baseQueryError) {
      console.log(`Error in baseQueryError in "read__AllDistricts"`);
      throw new Error(`Error in baseQueryError in "read__AllDistricts"`);
    }

    return baseQueryData;
  });
