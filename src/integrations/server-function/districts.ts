import { db } from "@/database";
import { DistrictTable } from "@/database/schema";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import z from "zod";

export const read__AllDistricts = createServerFn({ method: "GET" })
  .validator(z.object({ stateId: z.string() }).optional())
  .handler(async ({ data }) => {
    const baseQuery = db.select().from(DistrictTable);

    if (data?.stateId) {
      baseQuery.where(eq(DistrictTable.associatedState, data.stateId));
    }

    const districts = await baseQuery;

    return districts;
  });
