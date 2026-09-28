import { read__OneCustomerUser } from "@/integrations/server-function/customer-user";
import {
  useCreateScrapCollectionProcess,
  useCustomerScrapCollectionProcesses,
} from "@/integrations/tanstack/react-query/scrap-collection-process";
import { tryCatch } from "@/utils/try-catch";
import { cn } from "@/lib/utils/cn";
import { useForm } from "@tanstack/react-form";
import { useLoaderData, useRouteContext } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  CalendarDays,
  ChevronDown,
  Clock3,
  Mail,
  MapPin,
  Package,
  PersonStanding,
  Phone,
  Plus,
  Recycle,
  Store,
  Truck,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import z from "zod";

export function CustomerPage() {
  return (
    <div>
      <CustomerHeading />
      <PickupOrderList />
    </div>
  );
}

export function CustomerHeading() {
  const [isPickupFormOpen, setIsPickupFormOpen] = useState(false);

  return (
    <section
      className={cn(
        `from-background via-primary-50/40 to-accent-50/40 dark:from-background bg-linear-to-br`,
      )}
    >
      <div className={cn(`mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8`)}>
        {/* HEADER */}
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
              <Recycle className={cn(`h-4 w-4`)} />
              Customer Dashboard
            </div>

            <h1
              className={cn(
                `text-foreground mt-5 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl`,
              )}
            >
              Manage your scrap
              <span className={cn(`text-primary-500`)}> pickups.</span>
            </h1>

            <p
              className={cn(
                `text-foreground/60 mt-4 max-w-2xl text-sm leading-relaxed sm:text-base`,
              )}
            >
              Create new scrap pickup requests and keep track of every
              collection from request to completion.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsPickupFormOpen((previous) => !previous)}
            className={cn(
              `group bg-primary-500 text-primary-50 hover:bg-primary-600 flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(64,164,4,0.25)]`,
            )}
          >
            {isPickupFormOpen ? (
              <>
                <X className={cn(`h-4 w-4`)} />
                Close Form
              </>
            ) : (
              <>
                <Plus
                  className={cn(
                    `h-4 w-4 transition-transform duration-300 group-hover:rotate-90`,
                  )}
                />
                Add New Pickup
              </>
            )}
          </button>
        </div>

        {/* PICKUP FORM */}
        {isPickupFormOpen && (
          <div className={cn(`mt-10`)}>
            <PickupForm
              onSuccess={() => {
                setIsPickupFormOpen(false);
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}

function PickupForm({ onSuccess }: { onSuccess?: () => void }) {
  const { mutate, isPending } = useCreateScrapCollectionProcess();

  const readOneCustomerUser = useServerFn(read__OneCustomerUser);

  const { session } = useRouteContext({
    from: "/(authenticated-routes)/(existing-user)/partner/customer/",
  });

  const { scraps } = useLoaderData({
    from: "/(authenticated-routes)/(existing-user)",
  });

  const [selectedScrapId, setSelectedScrapId] = useState("");

  const selectedScrap = scraps.find((scrap) => scrap.id === selectedScrapId);

  const form = useForm({
    defaultValues: {
      scrapItemId: "",
      collectionDate: "",
      collectionTime: "",
      floor: "",
      landmark: "",
    },

    validators: {
      onChange: z.object({
        scrapItemId: z.string().min(1, { error: "All fields are required." }),
        collectionDate: z
          .string()
          .min(1, { error: "All fields are required." }),
        collectionTime: z
          .string()
          .min(1, { error: "All fields are required." }),
        floor: z.string().min(1, { error: "All fields are required." }),
        landmark: z.string().min(1, { error: "All fields are required." }),
      }),
    },

    onSubmit: async ({ value }) => {
      const {
        user: { email },
      } = session;

      const [readOneCustomerUserError, readOneCustomerUserResult] =
        await tryCatch(
          readOneCustomerUser({
            data: {
              identifier: { email },
            },
          }),
        );

      if (readOneCustomerUserError) {
        console.error(readOneCustomerUserError);
        return;
      }

      if (!readOneCustomerUserResult) {
        console.error("Customer user not found");
        return;
      }

      const collectionDateTime = new Date(
        `${value.collectionDate}T${value.collectionTime}`,
      );

      if (Number.isNaN(collectionDateTime.getTime())) {
        console.error("Invalid collection date or time");
        return;
      }

      mutate(
        {
          data: {
            collectionDateTime,
            customerId: readOneCustomerUserResult.id,
            floor: value.floor.trim(),
            landmark: value.landmark.trim(),
            scrapItemId: value.scrapItemId,
          },
        },

        {
          onSuccess: () => {
            form.reset();
            setSelectedScrapId("");
            onSuccess?.();
          },
        },
      );
    },
  });

  return (
    <div
      className={cn(
        `relative overflow-hidden border border-white/50 bg-white/70 p-6 shadow-[0_20px_70px_rgba(25,60,20,0.08)] backdrop-blur-2xl sm:p-8 dark:border-white/10 dark:bg-white/5`,
      )}
    >
      {/* Background decoration */}
      <div
        className={cn(
          `bg-primary-500/10 pointer-events-none absolute -top-20 right-0 h-48 w-48 rounded-full blur-3xl`,
        )}
      />

      <div className={cn(`relative z-10`)}>
        {/* HEADER */}
        <div
          className={cn(
            `flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between`,
          )}
        >
          <div>
            <p
              className={cn(
                `text-primary-600 text-xs font-black tracking-[0.18em] uppercase`,
              )}
            >
              Pickup Request
            </p>

            <h2 className={cn(`text-foreground mt-2 text-2xl font-black`)}>
              Schedule a new pickup
            </h2>

            <p className={cn(`text-foreground/50 mt-2 text-sm`)}>
              Select your scrap and choose a convenient collection time.
            </p>
          </div>

          <div
            className={cn(
              `border-primary-500/20 bg-primary-500/10 flex h-12 w-12 items-center justify-center border`,
            )}
          >
            <Truck className={cn(`text-primary-600 h-5 w-5`)} />
          </div>
        </div>

        <form
          className={cn(`mt-8 grid gap-6 md:grid-cols-2`)}
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();

            void form.handleSubmit();
          }}
        >
          <form.Field name="scrapItemId">
            {(field) => (
              <div className={cn(`space-y-2`)}>
                <label
                  htmlFor={field.name}
                  className={cn(`text-foreground text-sm font-bold`)}
                >
                  Scrap Type
                </label>

                <div className={cn(`relative`)}>
                  <Recycle
                    className={cn(
                      `text-primary-500 pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2`,
                    )}
                  />

                  <select
                    required
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => {
                      const value = event.target.value;

                      field.handleChange(value);
                      setSelectedScrapId(value);
                    }}
                    className={cn(
                      `border-foreground/10 bg-background/70 text-foreground focus:border-primary-500/50 focus:ring-primary-500/10 w-full appearance-none border py-3.5 pr-11 pl-11 text-sm font-medium transition-all outline-none focus:ring-4`,
                    )}
                  >
                    <option value="">Select scrap type</option>

                    {scraps.map((scrap) => (
                      <option key={scrap.id} value={scrap.id}>
                        {scrap.productName}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    className={cn(
                      `text-foreground/40 pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2`,
                    )}
                  />
                </div>

                <p className={cn(`text-foreground/40 text-xs`)}>
                  Choose the material you want us to collect.
                </p>
              </div>
            )}
          </form.Field>

          <div className={cn(`space-y-2`)}>
            <label className={cn(`text-foreground text-sm font-bold`)}>
              Current Scrap Price
            </label>

            <div
              className={cn(
                `border-foreground/10 bg-background/70 flex min-h-13 items-center justify-between border px-4 py-3`,
              )}
            >
              {selectedScrap ? (
                <>
                  <div className={cn(`flex items-center gap-3`)}>
                    <div
                      className={cn(
                        `border-primary-500/20 bg-primary-500/10 flex h-9 w-9 items-center justify-center border`,
                      )}
                    >
                      <Package className={cn(`text-primary-600 h-4 w-4`)} />
                    </div>

                    <div>
                      <p
                        className={cn(
                          `text-foreground/45 text-[10px] font-bold tracking-[0.12em] uppercase`,
                        )}
                      >
                        Customer Price
                      </p>

                      <p
                        className={cn(
                          `text-primary-600 mt-0.5 text-lg font-black`,
                        )}
                      >
                        ₹{selectedScrap.customerPrice}
                      </p>
                    </div>
                  </div>

                  <div
                    className={cn(
                      `border-primary-500/15 bg-primary-500/5 text-primary-700 border px-3 py-1.5 text-xs font-bold`,
                    )}
                  >
                    {selectedScrap.priceUnit === "kilo"
                      ? "per kg"
                      : "per piece"}
                  </div>
                </>
              ) : (
                <div
                  className={cn(
                    `text-foreground/40 flex items-center gap-3 text-sm`,
                  )}
                >
                  <Package className={cn(`h-4 w-4`)} />
                  Select a scrap type to view its price
                </div>
              )}
            </div>

            <p className={cn(`text-foreground/40 text-xs`)}>
              Price shown is the current customer rate.
            </p>
          </div>

          <div className={cn(`space-y-2`)}>
            <label className={cn(`text-foreground text-sm font-bold`)}>
              Collection Schedule
            </label>

            <div className={cn(`grid gap-3 sm:grid-cols-2`)}>
              {/* DATE */}
              <form.Field name="collectionDate">
                {(field) => (
                  <div className={cn(`relative`)}>
                    <CalendarDays
                      className={cn(
                        `text-foreground/40 pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2`,
                      )}
                    />

                    <input
                      required
                      id={field.name}
                      name={field.name}
                      type="date"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      className={cn(
                        `border-foreground/10 bg-background/70 text-foreground focus:border-primary-500/50 focus:ring-primary-500/10 w-full border py-3.5 pr-3 pl-11 text-sm transition-all outline-none focus:ring-4`,
                      )}
                    />
                  </div>
                )}
              </form.Field>

              {/* TIME */}
              <form.Field name="collectionTime">
                {(field) => (
                  <div className={cn(`relative`)}>
                    <Clock3
                      className={cn(
                        `text-foreground/40 pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2`,
                      )}
                    />

                    <input
                      required
                      id={field.name}
                      name={field.name}
                      type="time"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      className={cn(
                        `border-foreground/10 bg-background/70 text-foreground focus:border-primary-500/50 focus:ring-primary-500/10 w-full border py-3.5 pr-3 pl-11 text-sm transition-all outline-none focus:ring-4`,
                      )}
                    />
                  </div>
                )}
              </form.Field>
            </div>

            <p className={cn(`text-foreground/40 text-xs`)}>
              Choose your preferred pickup date and time.
            </p>
          </div>

          <form.Field name="floor">
            {(field) => (
              <div className={cn(`space-y-2`)}>
                <label
                  htmlFor={field.name}
                  className={cn(`text-foreground text-sm font-bold`)}
                >
                  Floor
                </label>

                <div className={cn(`relative`)}>
                  <Store
                    className={cn(
                      `text-foreground/40 pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2`,
                    )}
                  />

                  <input
                    required
                    id={field.name}
                    name={field.name}
                    type="text"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Example: 2nd Floor"
                    className={cn(
                      `border-foreground/10 bg-background/70 text-foreground placeholder:text-foreground/30 focus:border-primary-500/50 focus:ring-primary-500/10 w-full border py-3.5 pr-4 pl-11 text-sm transition-all outline-none focus:ring-4`,
                    )}
                  />
                </div>
              </div>
            )}
          </form.Field>

          <form.Field name="landmark">
            {(field) => (
              <div className={cn(`space-y-2 md:col-span-2`)}>
                <label
                  htmlFor={field.name}
                  className={cn(`text-foreground text-sm font-bold`)}
                >
                  Landmark
                </label>

                <div className={cn(`relative`)}>
                  <MapPin
                    className={cn(
                      `text-foreground/40 pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2`,
                    )}
                  />

                  <input
                    required
                    id={field.name}
                    name={field.name}
                    type="text"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Example: Near City Mall, beside SBI"
                    className={cn(
                      `border-foreground/10 bg-background/70 text-foreground placeholder:text-foreground/30 focus:border-primary-500/50 focus:ring-primary-500/10 w-full border py-3.5 pr-4 pl-11 text-sm transition-all outline-none focus:ring-4`,
                    )}
                  />
                </div>
              </div>
            )}
          </form.Field>

          <form.Subscribe
            selector={(state) => ({
              values: state.values,
              isSubmitting: state.isSubmitting,
            })}
          >
            {({ values, isSubmitting }) => {
              const isFormComplete =
                values.scrapItemId.trim() !== "" &&
                values.collectionDate.trim() !== "" &&
                values.collectionTime.trim() !== "" &&
                values.floor.trim() !== "" &&
                values.landmark.trim() !== "";

              const isButtonDisabled =
                !isFormComplete || isPending || isSubmitting;

              return (
                <div className={cn(`md:col-span-2`)}>
                  <button
                    type="submit"
                    disabled={isButtonDisabled}
                    className={cn(
                      `flex w-full items-center justify-center gap-2 px-6 py-4 text-sm font-black transition-all duration-300`,

                      isButtonDisabled
                        ? `bg-primary-500/25 text-foreground/35 cursor-not-allowed`
                        : `bg-primary-500 text-primary-50 hover:bg-primary-600 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(64,164,4,0.25)]`,
                    )}
                  >
                    <Truck className={cn(`h-4 w-4`)} />

                    {isPending || isSubmitting
                      ? "Creating Pickup..."
                      : "Schedule Pickup"}
                  </button>
                </div>
              );
            }}
          </form.Subscribe>
        </form>
      </div>
    </div>
  );
}

function PickupOrderList() {
  const { session } = useRouteContext({
    from: "/(authenticated-routes)/(existing-user)/partner/customer/",
  });

  const {
    data: pickUpOrders,
    isLoading: isPickUpOrdersLoading,
    isError: isPickUpOrdersError,
  } = useCustomerScrapCollectionProcesses({
    customerEmail: session.user.email,
  });

  if (isPickUpOrdersLoading) {
    return (
      <section
        className={cn(
          `from-background via-primary-50/40 to-accent-50/40 dark:from-background bg-linear-to-br`,
        )}
      >
        <div className={cn(`mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8`)}>
          <PickupLoading />
        </div>
      </section>
    );
  }

  if (isPickUpOrdersError) {
    return (
      <section
        className={cn(
          `from-background via-primary-50/40 to-accent-50/40 dark:from-background bg-linear-to-br`,
        )}
      >
        <div className={cn(`mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8`)}>
          <PickupError />
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        `from-background via-primary-50/40 to-accent-50/40 dark:from-background bg-linear-to-br pb-16`,
      )}
    >
      <div className={cn(`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`)}>
        {/* TOP DIVIDER */}
        <div className={cn(`border-foreground/10 border-t pt-10`)}>
          {/* HEADER */}
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
                Pickup History
              </div>

              <h2
                className={cn(
                  `text-foreground mt-4 text-2xl font-black tracking-tight sm:text-3xl`,
                )}
              >
                Your pickup requests
              </h2>

              <p
                className={cn(
                  `text-foreground/50 mt-2 max-w-xl text-sm leading-relaxed`,
                )}
              >
                Track your current and previous scrap collection requests.
              </p>
            </div>

            {pickUpOrders && (
              <>
                {pickUpOrders.length > 0 && (
                  <div
                    className={cn(
                      `border-primary-500/15 flex min-w-36 items-center gap-3 border bg-white/60 px-4 py-3 backdrop-blur-xl dark:bg-white/5`,
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
                          `text-foreground/40 text-[10px] font-bold tracking-[0.12em] uppercase`,
                        )}
                      >
                        Total Pickups
                      </p>

                      <p
                        className={cn(
                          `text-foreground mt-0.5 text-lg font-black`,
                        )}
                      >
                        {pickUpOrders.length}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* STATUS FILTER */}
          {pickUpOrders && (
            <>
              {pickUpOrders.length > 0 && (
                <div
                  className={cn(
                    `mt-8 flex flex-col gap-3 sm:flex-row sm:items-center`,
                  )}
                >
                  <p
                    className={cn(
                      `text-foreground/45 text-xs font-bold tracking-[0.12em] uppercase`,
                    )}
                  >
                    Filter by status
                  </p>

                  {/* <div className={cn(`flex flex-wrap items-center gap-2`)}>
                    {statuses.map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setStatusFilter(status)}
                        className={cn(
                          `border px-4 py-2 text-xs font-bold transition-all duration-300`,

                          statusFilter === status
                            ? `border-primary-500 bg-primary-500 text-primary-50 shadow-[0_8px_20px_rgba(64,164,4,0.16)]`
                            : `border-foreground/10 text-foreground/55 hover:border-primary-500/30 hover:bg-primary-500/10 hover:text-primary-600 bg-white/60 dark:bg-white/5`,
                        )}
                      >
                        {formatStatus(status)}
                      </button>
                    ))}
                  </div> */}
                </div>
              )}
            </>
          )}

          {/* ORDER CONTENT */}
          {pickUpOrders && (
            <>
              {pickUpOrders.length === 0 ? (
                <EmptyPickupOrders />
              ) : (
                <div className={cn(`mt-8 grid gap-4`)}>
                  {pickUpOrders.map((order) => {
                    const {
                      id,
                      collectionDateTime,
                      scrap: { customerPrice, productName },
                      floor,
                      landmark,
                      vendor,
                    } = order;

                    return (
                      <PickupOrderCard
                        key={id}
                        collectionDateTime={collectionDateTime}
                        customerPrice={customerPrice}
                        floor={floor}
                        landmark={landmark}
                        productName={productName}
                        vendor={
                          vendor
                            ? {
                                email: vendor.email,
                                name: vendor.name,
                                phoneNumber: vendor.phoneNumber,
                              }
                            : null
                        }
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
  );
}

function PickupOrderCard({
  productName,
  customerPrice,
  collectionDateTime,
  floor,
  landmark,
  vendor,
}: {
  floor: string;
  landmark: string;
  productName: string;
  customerPrice: number;
  collectionDateTime: Date;
  vendor: { name: string; email: string; phoneNumber: string } | null;
}) {
  const [showVendorModal, setShowVendorModal] = useState(false);

  return (
    <>
      <article
        className={cn(
          `group border-foreground/10 hover:border-primary-500/25 relative overflow-hidden border bg-white/65 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_55px_rgba(25,60,20,0.08)] sm:p-6 dark:bg-white/5`,
        )}
      >
        <div
          className={cn(
            `bg-primary-500/8 pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-full blur-3xl`,
          )}
        />

        <div
          className={cn(
            `relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between`,
          )}
        >
          {/* ORDER DETAILS */}
          <div className={cn(`flex min-w-0 items-start gap-4`)}>
            <div
              className={cn(
                `border-primary-500/20 bg-primary-500/10 flex h-12 w-12 shrink-0 items-center justify-center border`,
              )}
            >
              <Package className={cn(`text-primary-600 h-5 w-5`)} />
            </div>

            <div className={cn(`min-w-0`)}>
              <h3 className={cn(`text-foreground text-lg font-black`)}>
                {productName}
              </h3>

              <p className={cn(`text-foreground/40 mt-1 text-xs`)}>
                You can get maximum of ₹{customerPrice}
              </p>

              <div
                className={cn(
                  `text-foreground/55 mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm`,
                )}
              >
                <span className={cn(`flex items-center gap-2`)}>
                  <CalendarDays className="text-primary-500 h-4 w-4" />
                  {new Date(collectionDateTime).toLocaleString()}
                </span>

                <span className={cn(`flex items-center gap-2`)}>
                  <Store className="text-primary-500 h-4 w-4" />
                  {floor}
                </span>

                <span className={cn(`flex items-center gap-2`)}>
                  <MapPin className="text-primary-500 h-4 w-4" />
                  {landmark}
                </span>
              </div>
            </div>
          </div>

          {/* VENDOR DETAILS */}
          {vendor ? (
            <div
              className={cn(
                `border-secondary-500/20 bg-secondary-500/5 min-w-57.5 border p-4`,
              )}
            >
              <div className={cn(`flex items-center gap-3`)}>
                <div
                  className={cn(
                    `border-secondary-500/20 bg-secondary-500/10 flex h-10 w-10 items-center justify-center border`,
                  )}
                >
                  <UserRound className="text-secondary-600 h-4 w-4" />
                </div>

                <div>
                  <p
                    className={cn(
                      `text-foreground/40 text-[10px] font-black tracking-[0.15em] uppercase`,
                    )}
                  >
                    Assigned Vendor
                  </p>

                  <p className={cn(`text-foreground mt-1 text-sm font-black`)}>
                    {vendor.name}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowVendorModal(true)}
                className={cn(
                  `group bg-primary-500 text-primary-50 hover:bg-primary-600 mt-4 flex w-full items-center justify-center gap-2 px-6 py-3.5 text-sm font-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(64,164,4,0.25)]`,
                )}
              >
                <PersonStanding className="h-4 w-4" />
                <span>See Vendor Details</span>
              </button>
            </div>
          ) : (
            <div
              className={cn(
                `border-foreground/10 bg-background/60 min-w-57.5 border p-4`,
              )}
            >
              <div className={cn(`flex items-center gap-3`)}>
                <Clock3 className="text-foreground/35 h-5 w-5" />

                <div>
                  <p className="text-foreground text-sm font-bold">
                    Waiting for vendor
                  </p>

                  <p className="text-foreground/45 mt-1 text-xs">
                    No vendor has selected this pickup yet.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </article>

      {/* VENDOR MODAL */}
      {showVendorModal && vendor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setShowVendorModal(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="vendor-details-title"
            onClick={(event) => event.stopPropagation()}
            className={cn(
              `border-foreground/10 bg-background relative w-full max-w-md border p-6 shadow-2xl`,
            )}
          >
            {/* CLOSE */}
            <button
              type="button"
              onClick={() => setShowVendorModal(false)}
              aria-label="Close vendor details"
              className="text-foreground/50 hover:bg-foreground/5 hover:text-foreground absolute top-4 right-4 flex h-9 w-9 items-center justify-center transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* HEADER */}
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  `border-primary-500/20 bg-primary-500/10 flex h-14 w-14 shrink-0 items-center justify-center border`,
                )}
              >
                <UserRound className="text-primary-600 h-6 w-6" />
              </div>

              <div className="min-w-0">
                <p className="text-primary-600 text-[10px] font-black tracking-[0.18em] uppercase">
                  Assigned Vendor
                </p>

                <h2
                  id="vendor-details-title"
                  className="text-foreground mt-1 text-xl font-black"
                >
                  {vendor.name}
                </h2>
              </div>
            </div>

            {/* DETAILS */}
            <div className="mt-6 space-y-3">
              <div className="border-foreground/10 bg-foreground/2 flex items-center gap-4 border p-4">
                <div className="bg-primary-500/10 flex h-10 w-10 shrink-0 items-center justify-center">
                  <Mail className="text-primary-600 h-4 w-4" />
                </div>

                <div className="min-w-0">
                  <p className="text-foreground/40 text-[10px] font-black tracking-wider uppercase">
                    Email
                  </p>

                  <a
                    href={`mailto:${vendor.email}`}
                    className="text-foreground mt-1 block truncate text-sm font-semibold hover:underline"
                  >
                    {vendor.email}
                  </a>
                </div>
              </div>

              <div className="border-foreground/10 bg-foreground/2 flex items-center gap-4 border p-4">
                <div className="bg-primary-500/10 flex h-10 w-10 shrink-0 items-center justify-center">
                  <Phone className="text-primary-600 h-4 w-4" />
                </div>

                <div>
                  <p className="text-foreground/40 text-[10px] font-black tracking-wider uppercase">
                    Phone
                  </p>

                  <a
                    href={`tel:${vendor.phoneNumber}`}
                    className="text-foreground mt-1 block text-sm font-semibold hover:underline"
                  >
                    {vendor.phoneNumber}
                  </a>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <button
              type="button"
              onClick={() => setShowVendorModal(false)}
              className="bg-primary-500 text-primary-50 hover:bg-primary-600 mt-6 w-full px-5 py-3 text-sm font-black transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function EmptyPickupOrders() {
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
        No pickups yet
      </h3>

      <p
        className={cn(
          `text-foreground/50 mt-2 max-w-md text-sm leading-relaxed`,
        )}
      >
        Your pickup requests will appear here after you schedule your first
        scrap collection.
      </p>
    </div>
  );
}

function PickupLoading() {
  return (
    <div
      className={cn(
        `border-foreground/10 flex min-h-56 items-center justify-center border bg-white/50 backdrop-blur-xl dark:bg-white/5`,
      )}
    >
      <div className={cn(`text-center`)}>
        <div
          className={cn(
            `border-primary-500/20 border-t-primary-500 mx-auto h-9 w-9 animate-spin rounded-full border-4`,
          )}
        />

        <p className={cn(`text-foreground/50 mt-4 text-sm font-medium`)}>
          Loading your pickups...
        </p>
      </div>
    </div>
  );
}

function PickupError() {
  return (
    <div
      className={cn(
        `flex min-h-48 items-center justify-center border border-red-500/20 bg-red-500/5 p-6 text-center`,
      )}
    >
      <div>
        <p className={cn(`font-black text-red-600`)}>Unable to load pickups</p>

        <p className={cn(`text-foreground/50 mt-2 text-sm`)}>
          Something went wrong while loading your pickup requests.
        </p>
      </div>
    </div>
  );
}
