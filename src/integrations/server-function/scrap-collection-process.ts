import { db } from "@/database";
import {
  CustomerUserTable,
  ScrapCollectionProcessTable,
  VendorUserTable,
} from "@/database/schema";
import { id } from "@/utils/id";
import { createServerFn } from "@tanstack/react-start";
import { eq, getTableColumns } from "drizzle-orm";
import z from "zod";

export const create__OneScrapCollectionProcess = createServerFn({
  method: "POST",
})
  .validator(
    z.object({
      customerId: z.string().min(1),
      scrapItemId: z.string().min(1),
      floor: z.string(),
      landmark: z.string(),
      collectionDateTime: z.coerce.date(),
    }),
  )
  .handler(async ({ data }) => {
    const { customerId, scrapItemId, floor, landmark, collectionDateTime } =
      data;

    const generatedId = id();

    await db.insert(ScrapCollectionProcessTable).values({
      id: generatedId,
      customerId,
      scrapItemId,
      floor,
      landmark,
      collectionDateTime,
    });

    const [insertedProcess] = await db
      .select()
      .from(ScrapCollectionProcessTable)
      .where(eq(ScrapCollectionProcessTable.id, generatedId))
      .limit(1);

    return insertedProcess;
  });

export const read__AllScrapCollectionProcesses = createServerFn({
  method: "GET",
})
  .validator(
    z
      .object({
        identifier: z.union([
          z.object({
            customerId: z.string(),
          }),
          z.object({
            vendorId: z.string(),
          }),
          z.object({
            customerEmail: z.string(),
          }),
          z.object({
            vendorEmail: z.string(),
          }),
        ]),
      })
      .optional(),
  )
  .handler(async ({ data }) => {
    const scrapCollectionProcessColumns = getTableColumns(
      ScrapCollectionProcessTable,
    );

    const baseQuery = db
      .select({ ...scrapCollectionProcessColumns })
      .from(ScrapCollectionProcessTable);

    if (data?.identifier) {
      if ("customerId" in data.identifier) {
        baseQuery.where(
          eq(
            ScrapCollectionProcessTable.customerId,
            data.identifier.customerId,
          ),
        );
      }

      if ("vendorId" in data.identifier) {
        baseQuery.where(
          eq(ScrapCollectionProcessTable.vendorId, data.identifier.vendorId),
        );
      }

      if ("customerEmail" in data.identifier) {
        baseQuery
          .innerJoin(
            CustomerUserTable,
            eq(CustomerUserTable.id, ScrapCollectionProcessTable.customerId),
          )
          .where(eq(CustomerUserTable.email, data.identifier.customerEmail));
      }

      if ("vendorEmail" in data.identifier) {
        baseQuery
          .innerJoin(
            VendorUserTable,
            eq(VendorUserTable.id, ScrapCollectionProcessTable.vendorId),
          )
          .where(eq(VendorUserTable.email, data.identifier.vendorEmail));
      }
    }

    const allProcesses = await baseQuery;

    return allProcesses;
  });

// export const update__OneScrapCollectionProces = createServerFn({
//   method: "POST",
// })
//   .validator(
//     z.object({
//       identifier: z.object({
//         id: z.string(),
//       }),
//       dataToUpdate: z.object({
//         vendorId: z.string().optional(),
//         scrapItem: z.string().optional(),
//         floor: z.string().optional(),
//         landmark: z.string().optional(),
//         collectionDateTime: z.date().optional(),
//       }),
//     }),
//   )
//   .handler(async ({ data }) => {
//     const { identifier, dataToUpdate } = data;

//     const filteredData = Object.fromEntries(
//       // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
//       Object.entries(dataToUpdate).filter(([_, v]) => v !== undefined),
//     );

//     await db
//       .update(ScrapCollectionProcessTable)
//       .set(filteredData)
//       .where(eq(ScrapCollectionProcessTable.id, identifier.id));

//     const [updatedProcess] = await db
//       .select()
//       .from(ScrapCollectionProcessTable)
//       .where(eq(ScrapCollectionProcessTable.id, identifier.id))
//       .limit(1);

//     return updatedProcess;
//   });

// export const delete__OneScrapCollectionProces = createServerFn({
//   method: "POST",
// })
//   .validator(
//     z.object({
//       identifier: z.object({
//         id: z.string(),
//       }),
//     }),
//   )
//   .handler(async ({ data }) => {
//     const { identifier } = data;

//     await db
//       .delete(ScrapCollectionProcessTable)
//       .where(eq(ScrapCollectionProcessTable.id, identifier.id));

//     return { success: true, id: identifier.id };
//   });
