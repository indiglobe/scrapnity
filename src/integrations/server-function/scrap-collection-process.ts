import { db } from "@/database";
import {
  Table__CustomerUser,
  Table__ScrapCollectionProcess,
  Table__ScrapItem,
  Table__VendorUser,
  SCRAP_COLLECTION_STATUS,
} from "@/database/schema";
import { id } from "@/utils/id";
import { tryCatch } from "@/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";
import { and, asc, eq, getTableColumns, inArray, isNull } from "drizzle-orm";
import z from "zod";
import { read__AllServiceablePincodes } from "./serviceable-pincodes";

export const create__OneScrapCollectionProcess = createServerFn({
  method: "POST",
})
  .validator(
    z.object({
      customerId: z.string(),
      scrapItemId: z.string(),
      floor: z.string(),
      landmark: z.string(),
      collectionDateTime: z.coerce.date(),
    }),
  )
  .handler(async ({ data }) => {
    const generatedId = id();

    const baseQuery = db
      .insert(Table__ScrapCollectionProcess)
      .values({ ...data, id: generatedId });

    const [baseQueryError, baseQueryData] = await tryCatch(baseQuery);

    if (baseQueryError) {
      console.log(
        `Error in baseQueryError in create__OneScrapCollectionProcess`,
      );
      throw new Error(
        `Error in baseQueryError in create__OneScrapCollectionProcess`,
      );
    }

    const [queryRes] = baseQueryData;

    if (queryRes.affectedRows === 1) {
      const [insertedProcessFetchError, insertedProcessFetchedData] =
        await tryCatch(
          db
            .select()
            .from(Table__ScrapCollectionProcess)
            .where(eq(Table__ScrapCollectionProcess.id, generatedId))
            .limit(1),
        );

      if (insertedProcessFetchError) {
        console.log(
          `Error in insertedProcessFetchError in create__OneScrapCollectionProcess`,
        );
        throw new Error(
          `Error in insertedProcessFetchError in create__OneScrapCollectionProcess`,
        );
      }

      const [insertedProcess] = insertedProcessFetchedData;

      return insertedProcess;
    }

    console.log(
      `Error while inserting data in create__OneScrapCollectionProcess`,
    );
    throw new Error(
      `Error while inserting data in create__OneScrapCollectionProcess`,
    );
  });

export const read__AllVendorScrapCollectionProcesses = createServerFn({
  method: "GET",
})
  .validator(
    z.object({
      identifier: z.object({
        vendorEmail: z.string(),
        status: z
          .enum(["all", "accepted"])
          .catch("all")
          .default("all")
          .optional(),
        pinCode: z
          .union([z.array(z.string()), z.literal("all")])
          .catch("all")
          .default("all")
          .optional(),
      }),
    }),
  )
  .handler(async ({ data }) => {
    const scrapCollectionProcessColumns = getTableColumns(
      Table__ScrapCollectionProcess,
    );
    const customerUserColumns = getTableColumns(Table__CustomerUser);
    const vendorUserColumns = getTableColumns(Table__VendorUser);
    const scrapItemColumns = getTableColumns(Table__ScrapItem);

    const vendorServiceablePinCodes =
      !data.identifier.pinCode || data.identifier.pinCode === "all"
        ? (
            await read__AllServiceablePincodes({
              data: {
                identifier: { vendorEmail: data.identifier.vendorEmail },
              },
            })
          ).map((p) => p.pinCode)
        : data.identifier.pinCode;

    const baseQuery = db
      .select({
        ...scrapCollectionProcessColumns,
        customer: { ...customerUserColumns },
        vendor: { ...vendorUserColumns },
        scrap: { ...scrapItemColumns },
      })
      .from(Table__ScrapCollectionProcess)
      .innerJoin(
        Table__CustomerUser,
        and(
          eq(Table__CustomerUser.id, Table__ScrapCollectionProcess.customerId),
          inArray(Table__CustomerUser.pinCode, vendorServiceablePinCodes),
        ),
      )
      .leftJoin(
        Table__VendorUser,
        eq(Table__ScrapCollectionProcess.vendorId, Table__VendorUser.id),
      )
      .innerJoin(
        Table__ScrapItem,
        eq(Table__ScrapItem.id, Table__ScrapCollectionProcess.scrapItemId),
      );

    if (!data.identifier.status || data.identifier.status === "all") {
      baseQuery.where(isNull(Table__ScrapCollectionProcess.vendorId));
    }

    if (data.identifier.status === "accepted") {
      baseQuery.where(
        eq(Table__ScrapCollectionProcess.vendorId, Table__VendorUser.id),
      );
    }

    const [baseQueryError, baseQueryData] = await tryCatch(baseQuery);

    if (baseQueryError) {
      console.log(
        `Error in baseQueryError in "read__AllVendorScrapCollectionProcesses"`,
      );
      throw new Error(
        `Error in baseQueryError in "read__AllVendorScrapCollectionProcesses"`,
      );
    }

    return baseQueryData;
  });

export const read__AllCustomerScrapCollectionProcesses = createServerFn({
  method: "GET",
})
  .validator(
    z.object({
      identifier: z.union([
        z.object({
          customerEmail: z.string(),
        }),
      ]),
    }),
  )
  .handler(async ({ data }) => {
    const scrapCollectionProcessColumns = getTableColumns(
      Table__ScrapCollectionProcess,
    );
    const customerUserColumns = getTableColumns(Table__CustomerUser);
    const vendorUserColumns = getTableColumns(Table__VendorUser);
    const scrapItemColumns = getTableColumns(Table__ScrapItem);

    const baseQuery = db
      .select({
        ...scrapCollectionProcessColumns,
        customer: { ...customerUserColumns },
        vendor: { ...vendorUserColumns },
        scrap: { ...scrapItemColumns },
      })
      .from(Table__ScrapCollectionProcess)
      .innerJoin(
        Table__ScrapItem,
        eq(Table__ScrapItem.id, Table__ScrapCollectionProcess.scrapItemId),
      )
      .innerJoin(
        Table__CustomerUser,
        eq(Table__CustomerUser.id, Table__ScrapCollectionProcess.customerId),
      )
      .leftJoin(
        Table__VendorUser,
        eq(Table__VendorUser.id, Table__ScrapCollectionProcess.vendorId),
      )
      .where(eq(Table__CustomerUser.email, data.identifier.customerEmail))
      .orderBy(asc(Table__ScrapCollectionProcess.collectionDateTime));

    const [baseQueryError, baseQueryData] = await tryCatch(baseQuery);

    if (baseQueryError) {
      console.log(
        `Error in baseQueryError in "read__AllCustomerScrapCollectionProcesses"`,
      );
      throw new Error(
        `Error in baseQueryError in "read__AllCustomerScrapCollectionProcesses"`,
      );
    }

    return baseQueryData;
  });

export const read__OneScrapCollectionProcess = createServerFn()
  .validator(z.object({ scrapCollectionProcessId: z.string() }))
  .handler(async ({ data }) => {
    const { scrapCollectionProcessId } = data;

    const baseQuery = db
      .select()
      .from(Table__ScrapCollectionProcess)
      .where(eq(Table__ScrapCollectionProcess.id, scrapCollectionProcessId))
      .limit(1);

    const [baseQueryError, baseQueryData] = await tryCatch(baseQuery);

    if (baseQueryError) {
      console.log(
        `Error in baseQueryError in "read__OneScrapCollectionProcess"`,
      );
      throw new Error(
        `Error in baseQueryError in "read__OneScrapCollectionProcess"`,
      );
    }

    const [queryRes] = baseQueryData;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return queryRes ? queryRes : null;
  });

export const update__OneScrapCollectionProcess = createServerFn({
  method: "POST",
})
  .validator(
    z.object({
      identifier: z.object({ id: z.string() }),
      dataToUpdate: z
        .object({
          customerId: z.string().min(1),
          scrapItemId: z.string().min(1),
          floor: z.string(),
          landmark: z.string(),
          collectionDateTime: z.coerce.date(),
          scrapCollectionstatus: z.enum(SCRAP_COLLECTION_STATUS()),
          vendorId: z.string(),
        })
        .partial(),
    }),
  )
  .handler(async ({ data }) => {
    const updateData = Object.fromEntries(
      Object.entries(data.dataToUpdate).filter(
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        ([, value]) => value !== undefined,
      ),
    );

    const baseQuery = db
      .update(Table__ScrapCollectionProcess)
      .set({
        ...updateData,
      })
      .where(eq(Table__ScrapCollectionProcess.id, data.identifier.id));

    const [baseQueryError, baseQueryData] = await tryCatch(baseQuery);

    if (baseQueryError) {
      console.log(
        `Error in baseQueryError in "update__OneScrapCollectionProcess"`,
      );
      throw new Error(
        `Error in baseQueryError in "update__OneScrapCollectionProcess"`,
      );
    }

    if (baseQueryData[0].affectedRows === 1) {
      const [
        updatedScrapCollectionProcessError,
        updatedScrapCollectionProcessFetchedData,
      ] = await tryCatch(
        db
          .select()
          .from(Table__ScrapCollectionProcess)
          .where(eq(Table__ScrapCollectionProcess.id, data.identifier.id))
          .limit(1),
      );

      if (updatedScrapCollectionProcessError) {
        console.log(
          `Error in updatedScrapCollectionProcessError in "update__OneScrapCollectionProcess"`,
        );
        throw new Error(
          `Error in updatedScrapCollectionProcessError in "update__OneScrapCollectionProcess"`,
        );
      }

      const [updatedScrapCollectionProcess] =
        updatedScrapCollectionProcessFetchedData;

      return updatedScrapCollectionProcess;
    }

    console.log(
      `Error while inserting data in update__OneScrapCollectionProcess`,
    );
    throw new Error(
      `Error while inserting data in update__OneScrapCollectionProcess`,
    );
  });
