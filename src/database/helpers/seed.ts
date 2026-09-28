import { db } from "@/database/index";
import { faker } from "@faker-js/faker";
import {
  Table__ScrapItem,
  Table__VendorUser,
  Table__CustomerUser,
  Table__ServiceablePincode,
  Table__ScrapCollectionProcess,
  Table__State,
  Table__District,
  Table__VendorScrapItem,
  SCRAP_COLLECTION_STATUS,
  Table__Payment,
  PRICE_UNIT,
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

  await db.delete(Table__Payment);
  await db.delete(Table__ScrapCollectionProcess);
  await db.delete(Table__ScrapItem);
  await db.delete(Table__District);
  await db.delete(Table__State);
  await db.delete(Table__VendorScrapItem);
  await db.delete(Table__ServiceablePincode);
  await db.delete(Table__CustomerUser);
  await db.delete(Table__VendorUser);

  console.log("✅ Tables cleared");
}

/* -------------------------------------------------------- */
/*                   Table__VendorUser                        */
/* -------------------------------------------------------- */

async function seedVendorUserTable() {
  console.log("🔃 Seeding Table__VendorUser...");

  const __dummyVendorUsers = Array.from({ length: 20 }).map<
    typeof Table__VendorUser.$inferInsert
  >(() => {
    const fullName = faker.person.fullName();

    return {
      aadhaarNumber: faker.string.numeric({ length: 12 }),
      address: faker.location.streetAddress({ useFullAddress: true }),
      city: faker.location.city(),
      district: faker.location.city(),
      email: faker.internet.email().toLowerCase(),
      name: fullName,
      phoneNumber: faker.string.numeric({ length: 10 }),
      state: faker.location.state(),
      pinCode: faker.string.numeric({ length: 6 }),
    };
  });

  await db.insert(Table__VendorUser).values([...__dummyVendorUsers]);

  console.log("✅ Table__VendorUser seeded");
}

/* -------------------------------------------------------- */
/*                 Table__CustomerUser                        */
/* -------------------------------------------------------- */

async function seedCustomerUserTable() {
  console.log("🔃 Seeding Table__CustomerUser...");

  const __dummyCustomerUsers = Array.from({ length: 20 }).map<
    typeof Table__CustomerUser.$inferInsert
  >(() => {
    const fullName = faker.person.fullName();

    return {
      address: faker.location.streetAddress({ useFullAddress: true }),
      pinCode: faker.string.numeric({ length: 6 }),
      email: faker.internet.email().toLowerCase(),
      name: fullName,
      phoneNumber: faker.string.numeric({ length: 10 }),
    };
  });

  await db.insert(Table__CustomerUser).values([...__dummyCustomerUsers]);

  console.log("✅ Table__CustomerUser seeded");
}

/* -------------------------------------------------------- */
/*                         Table__ScrapItem                  */
/* -------------------------------------------------------- */

async function seedScrapItemTable() {
  console.log("🔃 Seeding Table__ScrapItem...");

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
  ].map<typeof Table__ScrapItem.$inferInsert>((item) => {
    return {
      customerPrice: item.price.customerPrice,
      priceUnit: faker.helpers.arrayElement(PRICE_UNIT()),
      productName: item.item,
      vendorPrice: item.price.vendorPrice,
    };
  });

  await db.insert(Table__ScrapItem).values([...__dummyScrapItemss]);

  console.log("✅ Table__ScrapItem seeded");
}

/* -------------------------------------------------------- */
/*                      Table__VendorScrapItem                */
/* -------------------------------------------------------- */

async function seedVendorScrapItemTable() {
  console.log("🔃 Seeding Table__VendorScrapItem...");

  const vendors = await db.select().from(Table__VendorUser);
  const scraps = await db.select().from(Table__ScrapItem);

  const __dummyVendorScrapItem: (typeof Table__VendorScrapItem.$inferInsert)[] =
    [] satisfies (typeof Table__VendorScrapItem.$inferInsert)[];

  vendors.forEach((v) => {
    scraps.forEach((s) => {
      if (randomInt(0, 10) > 5) {
        __dummyVendorScrapItem.push({ scrapItemId: s.id, vendorId: v.id });
      }
    });
  });

  await db.insert(Table__VendorScrapItem).values([...__dummyVendorScrapItem]);

  console.log("✅ Table__VendorScrapItem seeded");
}

/* -------------------------------------------------------- */
/*                Table__ServiceablePincode                  */
/* -------------------------------------------------------- */

async function seedServiceablePincodeTable() {
  console.log("🔃 Seeding Table__ServiceablePincode...");

  const vendors = await db.select().from(Table__VendorUser);

  const uniquePincodesPool = new Set<string>();
  while (uniquePincodesPool.size < 10) {
    uniquePincodesPool.add(faker.string.numeric({ length: 6 }));
  }
  const pincodes = Array.from(uniquePincodesPool);

  const __dummyServiceablePincodess: (typeof Table__ServiceablePincode.$inferInsert)[] =
    [];

  vendors.forEach((vendor) => {
    const assignedPins = faker.helpers.arrayElements(pincodes, {
      min: 1,
      max: 3,
    });

    assignedPins.forEach((pin) => {
      __dummyServiceablePincodess.push({
        pinCode: pin,
        vendorId: vendor.id,
      });
    });
  });

  if (__dummyServiceablePincodess.length > 0) {
    await db
      .insert(Table__ServiceablePincode)
      .values(__dummyServiceablePincodess); // No need to spread into a new array
  }

  console.log("✅ Table__ServiceablePincode seeded");
}

/* -------------------------------------------------------- */
/*                Table__ServiceablePincode                  */
/* -------------------------------------------------------- */

async function seedScrapCollectionProcessTable() {
  console.log("🔃 Seeding Table__ScrapCollectionProcess...");

  const scrapItems = await db.select().from(Table__ScrapItem);
  const customerUser = await db.select().from(Table__CustomerUser);
  const vendorUser = await db.select().from(Table__VendorUser);

  const __dummyScrapCollectionProcesss = Array.from({ length: 20 }).map<
    typeof Table__ScrapCollectionProcess.$inferInsert
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
      scrapCollectionstatus: faker.helpers.arrayElement(
        SCRAP_COLLECTION_STATUS(),
      ),
    };
  });

  await db
    .insert(Table__ScrapCollectionProcess)
    .values([...__dummyScrapCollectionProcesss]);

  console.log("✅ Table__ScrapCollectionProcess seeded");
}

/* -------------------------------------------------------- */
/*                       Table__State                         */
/* -------------------------------------------------------- */

async function seedStates() {
  console.log("🔃 Seeding Table__State...");

  const states = ["West Bengal"];

  const __dummyStates = states.map((state) => {
    return {
      id: state.toLowerCase().split(" ").join("-"),
      stateName: state,
    } satisfies typeof Table__State.$inferInsert;
  });

  await db.insert(Table__State).values([...__dummyStates]);

  console.log("✅ Table__State seeded");
}

/* -------------------------------------------------------- */
/*                      Table__District                       */
/* -------------------------------------------------------- */

async function seedDistricts() {
  console.log("🔃 Seeding Table__District...");

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

  const states = await db.select().from(Table__State);

  const __dummyDistricts = districts.map((district) => {
    return {
      id: district.toLowerCase().split(" ").join("-"),
      districtName: district,
      associatedState: faker.helpers.arrayElement(states).id,
    } satisfies typeof Table__District.$inferInsert;
  });

  await db.insert(Table__District).values([...__dummyDistricts]);

  console.log("✅ Table__District seeded");
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
