import { db } from "@/database";
import { StateTable } from "@/database/schema";
import { createServerFn } from "@tanstack/react-start";

export const read__AllStates = createServerFn({ method: "GET" }).handler(
  async () => {
    const states = await db.select().from(StateTable);

    return states;
  },
);
