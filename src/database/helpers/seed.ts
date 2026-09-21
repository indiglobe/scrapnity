import { db } from "@/database/index";
import { faker } from "@faker-js/faker";
import {
  ScrapItemsTable,
  VendorUserTable,
  CustomerUserTable,
  ServiceablePincodesTable,
  ScrapCollectionProcessTable,
} from "@/database/schema";

/* -------------------------------------------------------- */
/*                          HELPERS                         */
/* -------------------------------------------------------- */

function randomInt(min: number, max: number) {
  return faker.number.int({ min, max });
}

// function roundToClosest9(n: number): number {
//   return n % 10 === 9 ? n : Math.floor(n / 10) * 10 + 9;
// }

/* -------------------------------------------------------- */
/*                      CLEAR DATABASE                      */
/* -------------------------------------------------------- */

async function clearTables() {
  console.log("🧹 Clearing tables...");

  await db.delete(ScrapCollectionProcessTable);
  await db.delete(ServiceablePincodesTable);
  await db.delete(ScrapItemsTable);
  await db.delete(CustomerUserTable);
  await db.delete(VendorUserTable);

  console.log("✅ Tables cleared");
}

/* -------------------------------------------------------- */
/*                   VendorUserTable                        */
/* -------------------------------------------------------- */

async function seedVendorUserTable() {
  console.log("🔃 Seeding VendorUserTable...");

  const __dummyVendorUsers = Array.from({ length: 20 }).map<
    typeof VendorUserTable.$inferInsert
  >(() => {
    const fullName = faker.person.fullName();

    return {
      aadharNo: faker.string.numeric({ length: 12 }),
      address: faker.location.streetAddress({ useFullAddress: true }),
      city: faker.location.city(),
      district: faker.location.city(),
      email: faker.internet.email().toLowerCase(),
      name: fullName,
      phoneNumber: faker.string.numeric({ length: 10 }),
      state: faker.location.state(),
      vendorPinCode: faker.string.numeric({ length: 6 }),
    };
  });

  await db.insert(VendorUserTable).values([...__dummyVendorUsers]);

  console.log("✅ VendorUserTable seeded");
}

/* -------------------------------------------------------- */
/*                 CustomerUserTable                        */
/* -------------------------------------------------------- */

async function seedCustomerUserTable() {
  console.log("🔃 Seeding CustomerUserTable...");

  const __dummyCustomerUsers = Array.from({ length: 20 }).map<
    typeof CustomerUserTable.$inferInsert
  >(() => {
    const fullName = faker.person.fullName();

    return {
      address: faker.location.streetAddress({ useFullAddress: true }),
      customerPinCode: faker.string.numeric({ length: 6 }),
      email: faker.internet.email().toLowerCase(),
      name: fullName,
      phoneNumber: faker.string.numeric({ length: 10 }),
    };
  });

  await db.insert(CustomerUserTable).values([...__dummyCustomerUsers]);

  console.log("✅ CustomerUserTable seeded");
}

/* -------------------------------------------------------- */
/*                         ScrapItemsTable                  */
/* -------------------------------------------------------- */

async function seedScrapItemsTable() {
  console.log("🔃 Seeding ScrapItemsTable...");

  const __dummyScrapItemss = [
    {
      item: "Water Purifier",
      price: { vendorPrice: 150, customerPrice: 150, quantityUnit: "Piece" },
    },
    {
      item: "Music System and Radio DVD Sound box",
      price: { vendorPrice: 200, customerPrice: 200, quantityUnit: "Piece" },
    },
    {
      item: "Music System (big)",
      price: { vendorPrice: 500, customerPrice: 500, quantityUnit: "Piece" },
    },
    {
      item: "Chimney",
      price: { vendorPrice: 300, customerPrice: 300, quantityUnit: "Piece" },
    },
    {
      item: "CPU",
      price: { vendorPrice: 500, customerPrice: 500, quantityUnit: "Piece" },
    },
    {
      item: "Monitor",
      price: { vendorPrice: 150, customerPrice: 150, quantityUnit: "Piece" },
    },
    {
      item: "UPS",
      price: { vendorPrice: 250, customerPrice: 250, quantityUnit: "Piece" },
    },
    {
      item: "Battery (Small)",
      price: { vendorPrice: 100, customerPrice: 100, quantityUnit: "Piece" },
    },
    {
      item: "Battery (Big)",
      price: { vendorPrice: 200, customerPrice: 200, quantityUnit: "Piece" },
    },
    {
      item: "Washing machine (top load)",
      price: { vendorPrice: 500, customerPrice: 500, quantityUnit: "Piece" },
    },
    {
      item: "Washing machine (front load)",
      price: { vendorPrice: 650, customerPrice: 650, quantityUnit: "Piece" },
    },
    {
      item: "BOX TV",
      price: { vendorPrice: 200, customerPrice: 200, quantityUnit: "Piece" },
    },
    {
      item: "LED/LCD TV",
      price: { vendorPrice: 250, customerPrice: 250, quantityUnit: "Piece" },
    },
    {
      item: "IRON / Copper / Brus / Adamson",
      price: { vendorPrice: 250, customerPrice: 250, quantityUnit: "Piece" },
    },
  ].map<typeof ScrapItemsTable.$inferInsert>((item) => {
    return {
      customerPrice: item.price.customerPrice,
      priceUnit: "piece",
      productName: item.item,
      vendorPrice: item.price.vendorPrice,
    };
  });

  await db.insert(ScrapItemsTable).values([...__dummyScrapItemss]);

  console.log("✅ ScrapItemsTable seeded");
}

/* -------------------------------------------------------- */
/*                ServiceablePincodesTable                  */
/* -------------------------------------------------------- */

async function seedServiceablePincodesTable() {
  console.log("🔃 Seeding ServiceablePincodesTable...");

  const vendors = await db.select().from(VendorUserTable);
  const pincodes = Array.from({ length: 10 }, () => {
    return faker.string.numeric({ length: 6 });
  });

  const __dummyServiceablePincodess: (typeof ServiceablePincodesTable.$inferInsert)[] =
    [];

  vendors.forEach((vendor) => {
    faker.helpers.arrayElements(pincodes, { min: 1, max: 3 }).forEach((pin) => {
      __dummyServiceablePincodess.push({
        pinCode: pin,
        vendorId: vendor.id,
      });
    });
  });

  await db
    .insert(ServiceablePincodesTable)
    .values([...__dummyServiceablePincodess]);

  console.log("✅ ServiceablePincodesTable seeded");
}

/* -------------------------------------------------------- */
/*                ServiceablePincodesTable                  */
/* -------------------------------------------------------- */

async function seedScrapCollectionProcessTable() {
  console.log("🔃 Seeding ScrapCollectionProcessTable...");

  const scrapItems = await db.select().from(ScrapItemsTable);
  const customerUser = await db.select().from(CustomerUserTable);
  const vendorUser = await db.select().from(VendorUserTable);

  const __dummyScrapCollectionProcesss = Array.from({ length: 20 }).map<
    typeof ScrapCollectionProcessTable.$inferInsert
  >(() => {
    return {
      collectionDateTime: faker.date.anytime(),
      customerId: faker.helpers.arrayElement(customerUser.map((c) => c.id)),
      vendorId:
        randomInt(0, 10) > 5
          ? faker.helpers.arrayElement(vendorUser.map((v) => v.id))
          : null,
      floor: faker.helpers.arrayElement([
        "Gound floor",
        "1st Floor",
        "2nd Floor",
        "3rd Floor",
        "Others",
      ]),
      landmark: faker.location.postalAddress(),
      scrapItem: faker.helpers.arrayElement(scrapItems.map((s) => s.id)),
    };
  });

  await db
    .insert(ScrapCollectionProcessTable)
    .values([...__dummyScrapCollectionProcesss]);

  console.log("✅ ScrapCollectionProcessTable seeded");
}

/* -------------------------------------------------------- */
/*                           MAIN                           */
/* -------------------------------------------------------- */

export async function seed() {
  try {
    console.log("🚀 SEEDING STARTED");

    await clearTables();

    await seedVendorUserTable();
    await seedCustomerUserTable();
    await seedScrapItemsTable();
    await seedServiceablePincodesTable();
    await seedScrapCollectionProcessTable();

    console.log("🎉 SEEDING COMPLETED");

    process.exit(0);
  } catch (err) {
    console.error("❌ SEED FAILED", err);
    process.exit(1);
  }
}

seed();
