import { db } from "@/database";
import { Table__State } from "@/database/schema";
import { tryCatch } from "@/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";

export const read__AllStates = createServerFn({ method: "GET" }).handler(
  async () => {
    const baseQuery = db.select().from(Table__State);

    const [baseQueryError, baseQueryData] = await tryCatch(baseQuery);

    if (baseQueryError) {
      console.log("Error in baseQuery in read__AllStates");
      throw new Error("Error in baseQuery in read__AllStates");
    }

    return baseQueryData;
  },
);
