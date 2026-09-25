import { db } from "@/database";
import {
  CustomerUserTable,
  ScrapCollectionProcessTable,
  VendorUserTable,
} from "@/database/schema";
import { id } from "@/utils/id";
import { createServerFn } from "@tanstack/react-start";
import { eq, getTableColumns, isNull, or } from "drizzle-orm";
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

export const read__AllVendorScrapCollectionProcesses = createServerFn({
  method: "GET",
})
  .validator(
    z.object({
      identifier: z.union([
        z.object({
          vendorEmail: z.string(),
        }),
      ]),
    }),
  )
  .handler(async ({ data }) => {
    const scrapCollectionProcessColumns = getTableColumns(
      ScrapCollectionProcessTable,
    );
    const customerUserColumns = getTableColumns(CustomerUserTable);
    const vendorUserColumns = getTableColumns(VendorUserTable);
    // const serviceablePincodeColumns = getTableColumns(ServiceablePincodeTable);

    // const vendorPincodeQuery = db
    //   .select({
    //     id: vendorUserColumns.id,
    //     pinCodes: sql<string[]>`
    //       JSON_ARRAYAGG(${serviceablePincodeColumns.pinCode})
    //     `.as("pin_codes"),
    //   })
    //   .from(VendorUserTable)
    //   .leftJoin(
    //     ServiceablePincodeTable,
    //     eq(VendorUserTable.email, data.identifier.vendorEmail),
    //   )
    //   .innerJoin(
    //     VendorScrapItemTable,
    //     eq(VendorScrapItemTable.vendorId, VendorUserTable.id),
    //   )
    //   .where(
    //     or(
    //       eq(VendorUserTable.email, data.identifier.vendorEmail),
    //       isNull(ScrapCollectionProcessTable.vendorId),
    //     ),
    //   )
    //   .groupBy(vendorUserColumns.id);

    // const [vendorPincode] = await vendorPincodeQuery;

    const scrapFilteringQuery = db
      .select({
        ...scrapCollectionProcessColumns,
        customer: { ...customerUserColumns },
        vendor: { ...vendorUserColumns },
      })
      .from(ScrapCollectionProcessTable)
      .innerJoin(
        CustomerUserTable,
        eq(CustomerUserTable.id, ScrapCollectionProcessTable.customerId),
      )
      .leftJoin(
        VendorUserTable,
        eq(ScrapCollectionProcessTable.vendorId, VendorUserTable.id),
      )
      .where(
        or(
          eq(VendorUserTable.email, data.identifier.vendorEmail),
          isNull(ScrapCollectionProcessTable.vendorId),
        ),
      );

    const filteredScraps = await scrapFilteringQuery;

    return filteredScraps;
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
