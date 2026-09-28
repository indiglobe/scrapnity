import { eq, getTableColumns } from "drizzle-orm";
import { db } from "..";
import {
  Table__CustomerUser,
  Table__ScrapCollectionProcess,
  Table__ScrapItem,
  Table__VendorUser,
} from "../schema";

(async (email) => {
  const columns__scrapCollectionProcess = getTableColumns(
    Table__ScrapCollectionProcess,
  );
  const columns__customerUser = getTableColumns(Table__CustomerUser);
  const columns__vendorUser = getTableColumns(Table__VendorUser);
  const columns__scrapItem = getTableColumns(Table__ScrapItem);

  const query = db
    .select({
      ...columns__scrapCollectionProcess,
      customer: { ...columns__customerUser },
      vendor: { ...columns__vendorUser },
      scrap: { ...columns__scrapItem },
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
    .where(eq(Table__CustomerUser.email, email));

  console.log(await query);
})("debobratapurkait25@gmail.com");
