import { cn } from "@/lib/utils/cn";
import { useVendorScrapCollectionProcesses } from "@/integrations/tanstack/react-query/scrap-collection-process";
import {
  useLoaderData,
  useNavigate,
  useRouteContext,
  useSearch,
} from "@tanstack/react-router";
import {
  Building2,
  CalendarDays,
  ChevronDown,
  Clock3,
  Loader2,
  MapPin,
  Package,
  Search,
  Store,
  Truck,
} from "lucide-react";
import { Button } from "@/ui/button";

export function VendorPage() {
  return (
    <div
      className={cn(
        `from-background via-primary-50/40 to-accent-50/40 dark:from-background min-h-svh bg-linear-to-br`,
      )}
    >
      <VendorHeading />

      <VendorOrderHeading />

      <VendorOrderList />
    </div>
  );
}

function VendorHeading() {
  // const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <section>
      <div className={cn(`mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8`)}>
        <div
          className={cn(
            `flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between`,
          )}
        >
          <div>
            <div
              className={cn(
                `border-primary-500/20 bg-primary-500/10 text-primary-600 inline-flex items-center gap-2 border px-4 py-2 text-xs font-black tracking-[0.18em] uppercase`,
              )}
            >
              <Building2 className={cn(`h-4 w-4`)} />
              Vendor Dashboard
            </div>
            <h1
              className={cn(
                `text-foreground mt-5 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl`,
              )}
            >
              Manage scrap
              <span className={cn(`text-primary-500`)}> collections.</span>
            </h1>

            <p
              className={cn(
                `text-foreground/60 mt-4 max-w-2xl text-sm leading-relaxed sm:text-base`,
              )}
            >
              View customer pickup requests, manage your service information,
              and handle scrap collections.
            </p>
          </div>

          {/* <button
            type="button"
            onClick={() => setIsEditOpen((previous) => !previous)}
            className={cn(
              `group flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-black transition-all duration-300`,
              {
                "border-primary-500/20 bg-primary-500/10 text-primary-700":
                  isEditOpen,
                "bg-primary-500 text-primary-50 hover:bg-primary-600 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(126,57,10,0.20)]":
                  !isEditOpen,
              },
            )}
          >
            {isEditOpen ? (
              <>
                <X className={cn(`h-4 w-4`)} />
                Close
              </>
            ) : (
              <>
                <Edit3 className={cn(`h-4 w-4`)} />
                Edit Vendor Details
              </>
            )}
          </button> */}
        </div>

        {/* {isEditOpen && (
          <div className={cn(`mt-10`)}>
            <VendorDetailsForm onClose={() => setIsEditOpen(false)} />
          </div>
        )} */}
      </div>
    </section>
  );
}

// function VendorDetailsForm({ onClose }: { onClose: () => void }) {
//   const { session } = useRouteContext({
//     from: "/(authenticated-routes)/(existing-user)/partner/vendor/",
//   });

//   const readOneVendorUser = useServerFn(read__OneVendorUser);

//   const [isReadingVendor, setIsReadingVendor] = useState(false);

//   const form = useForm({
//     defaultValues: {
//       phone: "",
//       serviceablePincodes: "",
//     },

//     onSubmit: async ({ value }) => {
//       if (!value.phone.trim() || !value.serviceablePincodes.trim()) {
//         console.error("Phone number and serviceable pincodes are required");

//         return;
//       }

//       setIsReadingVendor(true);

//       const [vendorError, vendor] = await tryCatch(
//         readOneVendorUser({
//           data: {
//             email: session.user.email,
//           },
//         }),
//       );

//       setIsReadingVendor(false);

//       if (vendorError) {
//         console.error(vendorError);
//         return;
//       }

//       if (!vendor) {
//         console.error("Vendor user not found");
//         return;
//       }

//       const serviceablePincodes = value.serviceablePincodes
//         .split(",")
//         .map((pincode) => pincode.trim())
//         .filter(Boolean);

//       /*
//        * You still need your real UPDATE vendor server function here.
//        *
//        * Example once you have it:
//        *
//        * await updateVendorUser({
//        *   data: {
//        *     id: vendor.id,
//        *     phone: value.phone.trim(),
//        *     serviceablePincodes,
//        *   },
//        * });
//        */

//       console.log({
//         vendorId: vendor.id,
//         phone: value.phone.trim(),
//         serviceablePincodes,
//       });

//       /*
//        * Do not call create__OneVendorUser here.
//        *
//        * This is an edit form. Calling a create function when updating an
//        * existing vendor can create duplicate vendor records.
//        */

//       onClose();
//     },
//   });

//   return (
//     <div
//       className={cn(
//         `border-secondary-500/15 relative overflow-hidden border bg-white/70 p-6 shadow-[0_20px_60px_rgba(60,30,10,0.08)] backdrop-blur-xl sm:p-8 dark:bg-white/5`,
//       )}
//     >
//       <div
//         className={cn(
//           `bg-secondary-500/10 pointer-events-none absolute -top-20 right-0 h-48 w-48 rounded-full blur-3xl`,
//         )}
//       />

//       <div className={cn(`relative z-10`)}>
//         <div
//           className={cn(
//             `flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between`,
//           )}
//         >
//           <div>
//             <p
//               className={cn(
//                 `text-primary-600 text-xs font-black tracking-[0.18em] uppercase`,
//               )}
//             >
//               Vendor Settings
//             </p>

//             <h2 className={cn(`text-foreground mt-2 text-2xl font-black`)}>
//               Update service details
//             </h2>

//             <p className={cn(`text-foreground/50 mt-2 text-sm`)}>
//               Update your phone number and serviceable pincodes.
//             </p>
//           </div>

//           <div
//             className={cn(
//               `border-primary-500/20 bg-primary-500/10 flex h-12 w-12 items-center justify-center border`,
//             )}
//           >
//             <Store className={cn(`text-primary-600 h-5 w-5`)} />
//           </div>
//         </div>

//         <form
//           className={cn(`mt-8 grid gap-6 md:grid-cols-2`)}
//           onSubmit={(event) => {
//             event.preventDefault();
//             event.stopPropagation();

//             void form.handleSubmit();
//           }}
//         >
//           {/* PHONE */}

//           <form.Field name="phone">
//             {(field) => (
//               <div className={cn(`space-y-2`)}>
//                 <label
//                   htmlFor={field.name}
//                   className={cn(`text-foreground text-sm font-bold`)}
//                 >
//                   Phone Number
//                 </label>

//                 <div className={cn(`relative`)}>
//                   <Phone
//                     className={cn(
//                       `text-foreground/40 pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2`,
//                     )}
//                   />

//                   <input
//                     required
//                     id={field.name}
//                     name={field.name}
//                     type="tel"
//                     value={field.state.value}
//                     onBlur={field.handleBlur}
//                     onChange={(event) => field.handleChange(event.target.value)}
//                     placeholder="Enter phone number"
//                     className={cn(
//                       `border-foreground/10 bg-background/70 text-foreground placeholder:text-foreground/30 w-full border py-3.5 pr-4 pl-11 text-sm transition-all outline-none`,
//                       `focus:border-secondary-500/50 focus:ring-secondary-500/10 focus:ring-4`,
//                     )}
//                   />
//                 </div>
//               </div>
//             )}
//           </form.Field>

//           {/* PINCODES */}

//           <form.Field name="serviceablePincodes">
//             {(field) => (
//               <div className={cn(`space-y-2`)}>
//                 <label
//                   htmlFor={field.name}
//                   className={cn(`text-foreground text-sm font-bold`)}
//                 >
//                   Serviceable Pincodes
//                 </label>

//                 <div className={cn(`relative`)}>
//                   <MapPin
//                     className={cn(
//                       `text-foreground/40 pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2`,
//                     )}
//                   />

//                   <input
//                     required
//                     id={field.name}
//                     name={field.name}
//                     type="text"
//                     value={field.state.value}
//                     onBlur={field.handleBlur}
//                     onChange={(event) => field.handleChange(event.target.value)}
//                     placeholder="700001, 700002, 700003"
//                     className={cn(
//                       `border-foreground/10 bg-background/70 text-foreground placeholder:text-foreground/30 w-full border py-3.5 pr-4 pl-11 text-sm transition-all outline-none`,
//                       `focus:border-secondary-500/50 focus:ring-secondary-500/10 focus:ring-4`,
//                     )}
//                   />
//                 </div>

//                 <p className={cn(`text-foreground/40 text-xs`)}>
//                   Separate multiple pincodes using commas.
//                 </p>
//               </div>
//             )}
//           </form.Field>

//           {/* SUBMIT */}

//           <form.Subscribe
//             selector={(state) => ({
//               values: state.values,
//               isSubmitting: state.isSubmitting,
//             })}
//           >
//             {({ values, isSubmitting }) => {
//               const isComplete =
//                 values.phone.trim() !== "" &&
//                 values.serviceablePincodes.trim() !== "";

//               const disabled = !isComplete || isSubmitting || isReadingVendor;

//               return (
//                 <div className={cn(`md:col-span-2`)}>
//                   <button
//                     type="submit"
//                     disabled={disabled}
//                     className={cn(
//                       `flex w-full items-center justify-center gap-2 px-6 py-4 text-sm font-black transition-all duration-300`,

//                       disabled
//                         ? `bg-primary-500/20 text-foreground/35 cursor-not-allowed`
//                         : `bg-primary-500 text-primary-50 hover:bg-primary-600 hover:-translate-y-0.5`,
//                     )}
//                   >
//                     {isSubmitting || isReadingVendor ? (
//                       <Loader2 className={cn(`h-4 w-4 animate-spin`)} />
//                     ) : (
//                       <Check className={cn(`h-4 w-4`)} />
//                     )}

//                     {isSubmitting || isReadingVendor
//                       ? "Checking..."
//                       : "Save Changes"}
//                   </button>
//                 </div>
//               );
//             }}
//           </form.Subscribe>
//         </form>
//       </div>
//     </div>
//   );
// }

function VendorOrderHeading() {
  const { session } = useRouteContext({
    from: "/(authenticated-routes)/(existing-user)/partner/vendor/",
  });

  const { serviceablePincodesByVendor } = useLoaderData({
    from: "/(authenticated-routes)/(existing-user)/partner/vendor/",
  });

  const search = useSearch({
    from: "/(authenticated-routes)/(existing-user)/partner/vendor/",
  });

  const { data: scrapCollectionProcessesData } =
    useVendorScrapCollectionProcesses({
      vendorEmail: session.user.email,
    });

  const navigate = useNavigate();

  function filterPincode(filteringToken: string) {
    if (filteringToken === "all") {
      return navigate({
        to: ".",
        search: (prev) => {
          if (prev?.["pin-code"]) {
            delete prev["pin-code"];
          }
          return {
            ...prev,
          };
        },
        resetScroll: false,
      });
    }

    return navigate({
      to: ".",
      search: (prev) => ({
        ...prev,
        "pin-code": Number(filteringToken),
      }),
      resetScroll: false,
    });
  }

  function filterOrderStatus(filteringToken: "all" | "accepted") {
    if (filteringToken === "all") {
      return navigate({
        to: ".",
        search: (prev) => {
          if (prev?.["orders"]) {
            delete prev["orders"];
          }
          return {
            ...prev,
          };
        },
        resetScroll: false,
      });
    }

    return navigate({
      to: ".",
      search: (prev) => ({
        ...prev,
        orders: filteringToken,
      }),
      resetScroll: false,
    });
  }

  return (
    <section className={cn(`mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8`)}>
      <div
        className={cn(
          `flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between`,
        )}
      >
        <div>
          <div
            className={cn(
              `border-primary-500/20 bg-primary-500/10 text-primary-600 inline-flex items-center gap-2 border px-3 py-1.5 text-[11px] font-black tracking-[0.18em] uppercase`,
            )}
          >
            <Package className={cn(`h-3.5 w-3.5`)} />
            Available Orders
          </div>

          <h2
            className={cn(
              `text-foreground mt-4 text-2xl font-black tracking-tight sm:text-3xl`,
            )}
          >
            Customer pickup requests
          </h2>

          <p
            className={cn(
              `text-foreground/50 mt-2 max-w-xl text-sm leading-relaxed`,
            )}
          >
            Browse scrap collection requests and filter them according to
            pincode.
          </p>
        </div>

        {scrapCollectionProcessesData && (
          <>
            <div
              className={cn(
                `border-primary-500/15 flex items-center gap-3 border bg-white/60 px-4 py-3 backdrop-blur-xl dark:bg-white/5`,
              )}
            >
              <div
                className={cn(
                  `border-primary-500/20 bg-primary-500/10 flex h-10 w-10 items-center justify-center border`,
                )}
              >
                <Truck className={cn(`text-primary-600 h-4 w-4`)} />
              </div>

              <div>
                <p
                  className={cn(
                    `text-foreground/40 text-[10px] font-bold tracking-wider uppercase`,
                  )}
                >
                  Total Orders
                </p>

                <p className={cn(`text-foreground text-lg font-black`)}>
                  {scrapCollectionProcessesData.length}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* FILTER */}

      {scrapCollectionProcessesData && (
        <>
          {" "}
          <div
            className={cn(
              `mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between`,
            )}
          >
            <div>
              <div className={cn(`flex items-center gap-2`)}>
                <Search className={cn(`text-foreground/40 h-4 w-4`)} />

                <p
                  className={cn(
                    `text-foreground/45 text-xs font-black tracking-[0.12em] uppercase`,
                  )}
                >
                  Filter by order status
                </p>
              </div>

              <div className={cn(`relative w-full sm:w-56`)}>
                <Button onClick={() => filterOrderStatus("all")}>All</Button>
                <Button onClick={() => filterOrderStatus("accepted")}>
                  Accepted
                </Button>
              </div>
            </div>

            <div>
              <div className={cn(`flex items-center gap-2`)}>
                <Search className={cn(`text-foreground/40 h-4 w-4`)} />

                <p
                  className={cn(
                    `text-foreground/45 text-xs font-black tracking-[0.12em] uppercase`,
                  )}
                >
                  Filter by pincode
                </p>
              </div>

              <div className={cn(`relative w-full sm:w-56`)}>
                <MapPin
                  className={cn(
                    `text-primary-500 pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2`,
                  )}
                />

                <select
                  defaultValue={search?.["pin-code"] ?? "all"}
                  onChange={(e) => filterPincode(e.target.value)}
                  className={cn(
                    `border-foreground/10 text-foreground w-full appearance-none border bg-white/60 py-3 pr-10 pl-11 text-sm font-bold transition-all outline-none dark:bg-white/5`,
                    `focus:border-primary-500/40 focus:ring-primary-500/10 focus:ring-4`,
                  )}
                >
                  <option value={"all"}>All</option>
                  {serviceablePincodesByVendor.map(({ pinCode }) => (
                    <option key={pinCode} value={pinCode}>
                      {pinCode}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  className={cn(
                    `text-foreground/40 pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2`,
                  )}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

function VendorOrderList() {
  const { session } = useRouteContext({
    from: "/(authenticated-routes)/(existing-user)/partner/vendor/",
  });

  const query = useVendorScrapCollectionProcesses({
    vendorEmail: session.user.email,
  });

  const { data: scrapCollectionProcesses, isLoading, isError } = query;

  if (isLoading) {
    return <VendorOrdersLoading />;
  }

  if (isError) {
    return <VendorOrdersError />;
  }

  return (
    <>
      <section className={cn(`pb-16`)}>
        <div className={cn(`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`)}>
          <div className={cn(`border-foreground/10 border-t pt-10`)}>
            {scrapCollectionProcesses && (
              <>
                {scrapCollectionProcesses.length === 0 ? (
                  <VendorEmptyOrders />
                ) : (
                  <div className={cn(`mt-8 grid gap-5`)}>
                    {scrapCollectionProcesses.map((scrapCollectionProcess) => {
                      const { id, collectionDateTime, floor, landmark } =
                        scrapCollectionProcess;
                      return (
                        <VendorOrderCard
                          key={id}
                          collectionDateTime={new Date(collectionDateTime)}
                          productName="fdfd"
                          floor={floor}
                          landmark={landmark}
                          productVendorPrice={500}
                          platformFee={50}
                          pincode={700000}
                        />
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function VendorOrderCard({
  productName = "fdfd",
  floor = "fdfd",
  landmark = "fdfd",
  productVendorPrice = 500,
  platformFee = 50,
  pincode = 700000,
  collectionDateTime = new Date(Date.now()),
}: {
  productName: string;
  productVendorPrice: number;
  platformFee: number;
  pincode: number;
  floor: string;
  landmark: string;
  collectionDateTime: Date;
}) {
  return (
    <article
      className={cn(
        `group border-foreground/10 hover:border-primary-500/25 relative overflow-hidden border bg-white/65 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_55px_rgba(25,60,20,0.08)] sm:p-6 dark:bg-white/5`,
      )}
    >
      <div
        aria-hidden
        data-decoration
        className={cn(
          `bg-primary-500/8 pointer-events-none absolute top-0 right-0 h-36 w-36 rounded-full blur-3xl`,
        )}
      />

      <div
        className={cn(
          `relative z-10 flex flex-col gap-7 xl:flex-row xl:items-center xl:justify-between`,
        )}
      >
        {/* DETAILS */}

        <div className={cn(`flex min-w-0 items-start gap-4`)}>
          <div
            className={cn(
              `border-primary-500/20 bg-primary-500/10 flex h-12 w-12 shrink-0 items-center justify-center border`,
            )}
          >
            <Package className={cn(`text-primary-600 h-5 w-5`)} />
          </div>

          <div className={cn(`min-w-0`)}>
            <div className={cn(`flex flex-wrap items-center gap-3`)}>
              <h3 className={cn(`text-foreground text-lg font-black`)}>
                {productName}
              </h3>

              <span>₹{productVendorPrice + platformFee}</span>
            </div>

            <p className={cn(`text-foreground/40 mt-1 text-xs`)}>
              Vendor price ₹{productVendorPrice}, Platform fee ₹{platformFee}
            </p>

            {/* {order.scrapItem?.vendorPrice !== undefined && (
              <div className={cn(`mt-4`)}>
                <p
                  className={cn(
                    `text-foreground/40 text-[10px] font-bold tracking-[0.12em] uppercase`,
                  )}
                >
                  Vendor Price
                </p>

                <p className={cn(`text-secondary-600 mt-1 text-lg font-black`)}>
                  ₹{order.scrapItem.vendorPrice} /{" "}
                  {order.scrapItem.priceUnit === "kilo" ? "kg" : "piece"}
                </p>
              </div>
            )} */}

            <div
              className={cn(
                `text-foreground/55 mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm`,
              )}
            >
              <span className={cn(`flex items-center gap-2`)}>
                <MapPin className={cn(`text-primary-500 h-4 w-4`)} />
                {pincode}
              </span>

              <span className={cn(`flex items-center gap-2`)}>
                <Store className={cn(`text-primary-500 h-4 w-4`)} />
                {floor}
              </span>

              <>
                <span className={cn(`flex items-center gap-2`)}>
                  <CalendarDays className={cn(`text-primary-500 h-4 w-4`)} />
                  {new Date(collectionDateTime).toLocaleDateString()}
                </span>

                <span className={cn(`flex items-center gap-2`)}>
                  <Clock3 className={cn(`text-primary-500 h-4 w-4`)} />
                  {new Date(collectionDateTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </>
            </div>

            <p
              className={cn(
                `text-foreground/50 mt-3 flex items-center gap-2 text-sm`,
              )}
            >
              <MapPin className={cn(`text-primary-500 h-4 w-4`)} />
              {landmark}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function VendorEmptyOrders() {
  return (
    <div
      className={cn(
        `border-foreground/10 mt-8 flex flex-col items-center justify-center border bg-white/50 px-6 py-16 text-center backdrop-blur-xl dark:bg-white/5`,
      )}
    >
      <div
        className={cn(
          `border-primary-500/20 bg-primary-500/10 flex h-16 w-16 items-center justify-center border`,
        )}
      >
        <Truck className={cn(`text-primary-500 h-7 w-7`)} />
      </div>

      <h3 className={cn(`text-foreground mt-5 text-xl font-black`)}>
        No pickup requests
      </h3>

      <p
        className={cn(
          `text-foreground/50 mt-2 max-w-md text-sm leading-relaxed`,
        )}
      >
        No customer scrap pickup requests are currently available.
      </p>
    </div>
  );
}

function VendorOrdersLoading() {
  return (
    <section className={cn(`pb-16`)}>
      <div className={cn(`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`)}>
        <div
          className={cn(
            `border-foreground/10 flex min-h-56 items-center justify-center border bg-white/50 backdrop-blur-xl dark:bg-white/5`,
          )}
        >
          <div className={cn(`text-center`)}>
            <Loader2
              className={cn(`text-primary-500 mx-auto h-8 w-8 animate-spin`)}
            />

            <p className={cn(`text-foreground/50 mt-4 text-sm font-medium`)}>
              Loading pickup requests...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function VendorOrdersError() {
  return (
    <section className={cn(`pb-16`)}>
      <div className={cn(`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`)}>
        <div
          className={cn(
            `flex min-h-48 items-center justify-center border border-red-500/20 bg-red-500/5 p-6 text-center`,
          )}
        >
          <div>
            <p className={cn(`font-black text-red-600`)}>
              Unable to load pickup requests
            </p>

            <p className={cn(`text-foreground/50 mt-2 text-sm`)}>
              Something went wrong while loading available orders.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
