import { db } from "@/database/index";
import { faker } from "@faker-js/faker";
import {
  ScrapItemTable,
  VendorUserTable,
  CustomerUserTable,
  ServiceablePincodeTable,
  ScrapCollectionProcessTable,
  StateTable,
  DistrictTable,
  VendorScrapItemTable,
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

  await db.delete(DistrictTable);
  await db.delete(StateTable);
  await db.delete(VendorScrapItemTable);
  await db.delete(ScrapCollectionProcessTable);
  await db.delete(ServiceablePincodeTable);
  await db.delete(ScrapItemTable);
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
/*                         ScrapItemTable                  */
/* -------------------------------------------------------- */

async function seedScrapItemTable() {
  console.log("🔃 Seeding ScrapItemTable...");

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
  ].map<typeof ScrapItemTable.$inferInsert>((item) => {
    return {
      customerPrice: item.price.customerPrice,
      priceUnit: "piece",
      productName: item.item,
      vendorPrice: item.price.vendorPrice,
    };
  });

  await db.insert(ScrapItemTable).values([...__dummyScrapItemss]);

  console.log("✅ ScrapItemTable seeded");
}

/* -------------------------------------------------------- */
/*                      VendorScrapItemTable                */
/* -------------------------------------------------------- */

async function seedVendorScrapItemTable() {
  console.log("🔃 Seeding VendorScrapItemTable...");

  const vendors = await db.select().from(VendorUserTable);
  const scraps = await db.select().from(ScrapItemTable);

  const __dummyVendorScrapItem: (typeof VendorScrapItemTable.$inferInsert)[] =
    [] satisfies (typeof VendorScrapItemTable.$inferInsert)[];

  vendors.forEach((v) => {
    scraps.forEach((s) => {
      if (randomInt(0, 10) > 5) {
        __dummyVendorScrapItem.push({ scrapItemId: s.id, vendorId: v.id });
      }
    });
  });

  await db.insert(VendorScrapItemTable).values([...__dummyVendorScrapItem]);

  console.log("✅ VendorScrapItemTable seeded");
}

/* -------------------------------------------------------- */
/*                ServiceablePincodeTable                  */
/* -------------------------------------------------------- */

async function seedServiceablePincodeTable() {
  console.log("🔃 Seeding ServiceablePincodeTable...");

  const vendors = await db.select().from(VendorUserTable);
  const pincodes = Array.from({ length: 10 }, () => {
    return faker.string.numeric({ length: 6 });
  });

  const __dummyServiceablePincodess: (typeof ServiceablePincodeTable.$inferInsert)[] =
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
    .insert(ServiceablePincodeTable)
    .values([...__dummyServiceablePincodess]);

  console.log("✅ ServiceablePincodeTable seeded");
}

/* -------------------------------------------------------- */
/*                ServiceablePincodeTable                  */
/* -------------------------------------------------------- */

async function seedScrapCollectionProcessTable() {
  console.log("🔃 Seeding ScrapCollectionProcessTable...");

  const scrapItems = await db.select().from(ScrapItemTable);
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
      scrapItemId: faker.helpers.arrayElement(scrapItems.map((s) => s.id)),
      scrapCollectionstatus: faker.helpers.arrayElement([
        "order_placed",
        "order_accepted",
        "order_recived",
        "payment_completed",
        "process_completed",
      ]),
    };
  });

  await db
    .insert(ScrapCollectionProcessTable)
    .values([...__dummyScrapCollectionProcesss]);

  console.log("✅ ScrapCollectionProcessTable seeded");
}

/* -------------------------------------------------------- */
/*                       StateTable                         */
/* -------------------------------------------------------- */

async function seedStates() {
  console.log("🔃 Seeding States...");

  const states = ["West Bengal"];

  const __dummyStates = states.map((state) => {
    return {
      id: state.toLowerCase().split(" ").join("-"),
      stateName: state,
    } satisfies typeof StateTable.$inferInsert;
  });

  await db.insert(StateTable).values([...__dummyStates]);

  console.log("✅ States seeded");
}

/* -------------------------------------------------------- */
/*                      DistrictTable                       */
/* -------------------------------------------------------- */

async function seedDistricts() {
  console.log("🔃 Seeding Districts...");

  const districts = [
    "Alipurduar",
    "Bankura",
    "Birbhum",
    "Cooch Behar",
    "Dakshin Dinajpur",
    "Darjeeling",
    "Hooghly",
    "Howrah",
    "Jalpaiguri",
    "Jhargram",
    "Kalimpong",
    "Kolkata",
    "Malda",
    "Murshidabad",
    "Nadia",
    "North 24 Parganas",
    "Paschim Bardhaman",
    "Paschim Medinipur",
    "Purba Bardhaman",
    "Purba Medinipur",
    "Purulia",
    "South 24 Parganas",
    "Uttar Dinajpur",
  ];

  const states = await db.select().from(StateTable);

  const __dummyDistricts = districts.map((district) => {
    return {
      id: district.toLowerCase().split(" ").join("-"),
      districtName: district,
      associatedState: faker.helpers.arrayElement(states).id,
    } satisfies typeof DistrictTable.$inferInsert;
  });

  await db.insert(DistrictTable).values([...__dummyDistricts]);

  console.log("✅ Districts seeded");
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
    await seedScrapItemTable();
    await seedVendorScrapItemTable();
    await seedServiceablePincodeTable();
    await seedScrapCollectionProcessTable();
    await seedStates();
    await seedDistricts();

    console.log("🎉 SEEDING COMPLETED");

    process.exit(0);
  } catch (err) {
    console.error("❌ SEED FAILED", err);
    process.exit(1);
  }
}

seed();
