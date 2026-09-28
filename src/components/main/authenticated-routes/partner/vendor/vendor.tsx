import { cn } from "@/lib/utils/cn";
import { createPortal } from "react-dom";
import {
  scrapCollectionProcessKeys,
  useVendorScrapCollectionProcesses,
} from "@/integrations/tanstack/react-query/scrap-collection-process";
import {
  useLoaderData,
  useNavigate,
  useRouteContext,
  useSearch,
} from "@tanstack/react-router";
import {
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Loader2,
  Mail,
  MapPin,
  Package,
  Phone,
  Search,
  Store,
  Truck,
  User,
  X,
} from "lucide-react";
import { Button } from "@/ui/button";
import { payment__createPaymentOrderForVendor } from "@/integrations/payment/vendor-order-accepting";
import { useServerFn } from "@tanstack/react-start";
import { useRazorpayClient } from "@/integrations/razorpay/client";
import { read__OneVendorUser } from "@/integrations/server-function/vendor-user";
import { create__Payment } from "@/integrations/server-function/payment";
import {
  read__OneScrapCollectionProcess,
  update__OneScrapCollectionProcess,
} from "@/integrations/server-function/scrap-collection-process";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

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
        </div>
      </div>
    </section>
  );
}

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

  const orderStatus = search?.orders ?? "all";

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

              <div className={cn(`flex w-full gap-2 sm:w-auto`)}>
                <Button
                  type="button"
                  onClick={() => filterOrderStatus("all")}
                  className={cn(
                    `mt-2 rounded-none border transition-all duration-300`,
                    {
                      "border-primary-500 bg-primary-500 text-primary-50 hover:bg-primary-600":
                        orderStatus === "all",
                      "border-primary-500 text-primary-600 hover:bg-primary-500/10 bg-transparent":
                        !(orderStatus === "all"),
                    },
                  )}
                >
                  All
                </Button>

                <Button
                  type="button"
                  onClick={() => filterOrderStatus("accepted")}
                  className={cn(
                    `mt-2 rounded-none border transition-all duration-300`,
                    {
                      "border-primary-500 bg-primary-500 text-primary-50 hover:bg-primary-600":
                        orderStatus === "accepted",
                      "border-primary-500 text-primary-600 hover:bg-primary-500/10 bg-transparent":
                        !(orderStatus === "accepted"),
                    },
                  )}
                >
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
  const {
    session: {
      user: { email },
    },
  } = useRouteContext({
    from: "/(authenticated-routes)/(existing-user)/partner/vendor/",
  });

  const queryParams = useSearch({
    from: "/(authenticated-routes)/(existing-user)/partner/vendor/",
  });

  const query = useVendorScrapCollectionProcesses({
    vendorEmail: email,
    status: queryParams?.orders,
    pinCode: queryParams?.["pin-code"]
      ? [queryParams["pin-code"].toString()]
      : "all",
  });

  const { data: scrapCollectionProcesses, isLoading, isError } = query;

  if (isLoading) {
    return <VendorOrdersLoading />;
  }

  if (isError) {
    return <VendorOrdersError />;
  }

  return (
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
                    const {
                      id,
                      collectionDateTime,
                      floor,
                      landmark,
                      scrap,
                      customer,
                      vendor,
                    } = scrapCollectionProcess;

                    return (
                      <VendorOrderCard
                        key={id}
                        collectionProcessId={id}
                        collectionDateTime={new Date(collectionDateTime)}
                        productName={scrap.productName}
                        floor={floor}
                        landmark={landmark}
                        productVendorPrice={scrap.vendorPrice}
                        platformFee={
                          (scrap.vendorPrice * scrap.commisionRate) / 100
                        }
                        pincode={customer.pinCode}
                        vendor={vendor}
                        customer={{
                          address: customer.address,
                          email: customer.email,
                          name: customer.name,
                          phoneNumber: customer.phoneNumber,
                        }}
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

function VendorOrderCard({
  productName,
  collectionProcessId,
  productVendorPrice,
  platformFee,
  pincode,
  floor,
  landmark,
  collectionDateTime,
  customer,
  vendor,
}: {
  collectionProcessId: string;
  productName: string;
  productVendorPrice: number;
  platformFee: number;
  pincode: number | string;
  floor: string;
  landmark: string;
  collectionDateTime: Date;
  vendor: unknown | null;
  customer: {
    email: string;
    name: string;
    phoneNumber: string;
    address: string;
  };
}) {
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);

  const amount = productVendorPrice + platformFee;

  return (
    <>
      {/* ORDER CARD */}

      <article
        className={cn(
          `group border-foreground/10 hover:border-primary-500/25 relative overflow-hidden border bg-white/65 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_55px_rgba(25,60,20,0.08)] sm:p-6 dark:bg-white/5`,
        )}
      >
        <div
          aria-hidden
          className={cn(
            `bg-primary-500/8 pointer-events-none absolute top-0 right-0 h-36 w-36 rounded-full blur-3xl`,
          )}
        />

        <div
          className={cn(
            `relative z-10 flex flex-col gap-7 xl:flex-row xl:items-center xl:justify-between`,
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
              <div className={cn(`flex flex-wrap items-center gap-3`)}>
                <h3 className={cn(`text-foreground text-lg font-black`)}>
                  {productName}
                </h3>

                <span className={cn(`font-bold`)}>₹{amount}</span>
              </div>

              <p className={cn(`text-foreground/40 mt-1 text-xs`)}>
                Vendor price ₹{productVendorPrice}, Platform fee ₹{platformFee}
              </p>

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

                <span className={cn(`flex items-center gap-2`)}>
                  <CalendarDays className={cn(`text-primary-500 h-4 w-4`)} />
                  {collectionDateTime.toLocaleDateString()}
                </span>

                <span className={cn(`flex items-center gap-2`)}>
                  <Clock3 className={cn(`text-primary-500 h-4 w-4`)} />
                  {collectionDateTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
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

          {/* ACTION */}

          {vendor ? (
            <div className={cn(`w-full shrink-0 xl:w-auto xl:min-w-62.5`)}>
              <div className={cn(`flex flex-col items-stretch xl:items-end`)}>
                <p
                  className={cn(
                    `text-foreground/35 mb-2 text-xs font-medium xl:text-right`,
                  )}
                >
                  Order accepted
                </p>

                <button
                  type="button"
                  onClick={() => setIsCustomerModalOpen(true)}
                  className={cn(
                    `border-primary-500 text-primary-600 flex w-full items-center justify-center gap-2 border px-6 py-3 text-sm font-black transition-all duration-300 xl:w-auto`,
                    `hover:bg-primary-500 hover:text-primary-50`,
                  )}
                >
                  <User className={cn(`h-4 w-4`)} />
                  View Customer Details
                </button>
              </div>
            </div>
          ) : (
            <AcceptOrderButton
              amount={amount}
              collectionProcessId={collectionProcessId}
            />
          )}
        </div>
      </article>

      {/* 
        IMPORTANT:
        Modal is OUTSIDE the article.
        Therefore article's overflow-hidden cannot clip it.
      */}

      {isCustomerModalOpen && (
        <div
          className={cn(
            `fixed inset-0 z-9999 flex items-center justify-center bg-black/50 p-4`,
          )}
          onClick={() => setIsCustomerModalOpen(false)}
        >
          <div
            className={cn(
              `relative w-full max-w-md bg-white p-6 shadow-2xl dark:bg-neutral-950`,
            )}
            onClick={(event) => event.stopPropagation()}
          >
            {/* CLOSE */}

            <button
              type="button"
              onClick={() => setIsCustomerModalOpen(false)}
              aria-label="Close"
              className={cn(
                `text-foreground/50 hover:bg-foreground/5 hover:text-foreground absolute top-4 right-4 flex h-9 w-9 items-center justify-center`,
              )}
            >
              <X className={cn(`h-5 w-5`)} />
            </button>

            {/* HEADER */}

            <div className={cn(`mb-6 pr-10`)}>
              <div
                className={cn(
                  `bg-primary-500/10 border-primary-500/20 mb-3 flex h-11 w-11 items-center justify-center border`,
                )}
              >
                <User className={cn(`text-primary-600 h-5 w-5`)} />
              </div>

              <h2 className={cn(`text-foreground text-xl font-black`)}>
                Customer Details
              </h2>

              <p className={cn(`text-foreground/45 mt-1 text-sm`)}>
                Contact details for this collection.
              </p>
            </div>

            {/* CUSTOMER DETAILS */}

            <div className={cn(`space-y-5`)}>
              {/* NAME */}

              <div className={cn(`flex items-start gap-3`)}>
                <User
                  className={cn(`text-primary-500 mt-0.5 h-5 w-5 shrink-0`)}
                />

                <div className={cn(`min-w-0`)}>
                  <p className={cn(`text-foreground/40 text-xs`)}>Name</p>

                  <p className={cn(`text-foreground mt-1 font-semibold`)}>
                    {customer.name}
                  </p>
                </div>
              </div>

              {/* EMAIL */}

              <div className={cn(`flex items-start gap-3`)}>
                <Mail
                  className={cn(`text-primary-500 mt-0.5 h-5 w-5 shrink-0`)}
                />

                <div className={cn(`min-w-0`)}>
                  <p className={cn(`text-foreground/40 text-xs`)}>Email</p>

                  <p
                    className={cn(
                      `text-foreground mt-1 font-semibold break-all`,
                    )}
                  >
                    {customer.email}
                  </p>
                </div>
              </div>

              {/* PHONE */}

              <div className={cn(`flex items-start gap-3`)}>
                <Phone
                  className={cn(`text-primary-500 mt-0.5 h-5 w-5 shrink-0`)}
                />

                <div className={cn(`min-w-0`)}>
                  <p className={cn(`text-foreground/40 text-xs`)}>Phone</p>

                  <p className={cn(`text-foreground mt-1 font-semibold`)}>
                    {customer.phoneNumber}
                  </p>
                </div>
              </div>

              {/* ADDRESS */}

              <div className={cn(`flex items-start gap-3`)}>
                <MapPin
                  className={cn(`text-primary-500 mt-0.5 h-5 w-5 shrink-0`)}
                />

                <div className={cn(`min-w-0`)}>
                  <p className={cn(`text-foreground/40 text-xs`)}>Address</p>

                  <p className={cn(`text-foreground mt-1 font-semibold`)}>
                    {customer.address}
                  </p>
                </div>
              </div>
            </div>

            {/* FOOTER */}

            <div
              className={cn(
                `border-foreground/10 mt-7 flex justify-end border-t pt-5`,
              )}
            >
              <button
                type="button"
                onClick={() => setIsCustomerModalOpen(false)}
                className={cn(
                  `bg-primary-500 text-primary-50 hover:bg-primary-600 px-6 py-2.5 text-sm font-bold`,
                )}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function AcceptOrderButton({
  amount,
  collectionProcessId,
}: {
  amount: number;
  collectionProcessId: string;
}) {
  const [showProcessingModal, setShowProcessingModal] = useState(false);

  const createPaymentOrderForVendor = useServerFn(
    payment__createPaymentOrderForVendor,
  );

  const queryClient = useQueryClient();

  const readOneVendorUser = useServerFn(read__OneVendorUser);
  const createPayment = useServerFn(create__Payment);
  const updateOneScrapCollectionProcess = useServerFn(
    update__OneScrapCollectionProcess,
  );
  const readOneScrapCollectionProcess = useServerFn(
    read__OneScrapCollectionProcess,
  );

  const { session } = useRouteContext({
    from: "/(authenticated-routes)/(existing-user)/partner/vendor/",
  });

  const { createRazorpayInstance } = useRazorpayClient();

  async function initiatePayment() {
    const collectionProcess = await readOneScrapCollectionProcess({
      data: { scrapCollectionProcessId: collectionProcessId },
    });

    if (!collectionProcess) {
      return;
    }

    if (collectionProcess.status === "payment-processing") {
      setShowProcessingModal(true);
      return;
    }

    if (collectionProcess.vendorId) {
      return;
    }

    await updateOneScrapCollectionProcess({
      data: {
        identifier: {
          id: collectionProcessId,
        },
        dataToUpdate: {
          scrapCollectionstatus: "payment-processing",
        },
      },
    });

    const paymentOrder = await createPaymentOrderForVendor({
      data: {
        productPrice: amount,
      },
    });

    const razorpay = createRazorpayInstance({
      amount: Number(paymentOrder.amount),
      order_id: paymentOrder.id,
      handler: async (response) => {
        const vendor = await readOneVendorUser({
          data: {
            identifier: { email: session.user.email },
          },
        });

        if (!vendor) {
          return;
        }

        await updateOneScrapCollectionProcess({
          data: {
            identifier: {
              id: collectionProcessId,
            },
            dataToUpdate: {
              vendorId: vendor.id,
              scrapCollectionstatus: "order-accepted",
            },
          },
        });

        await createPayment({
          data: {
            vendorId: vendor.id,
            razorpayOrderId: response.razorpay_order_id,
            scrapOrderId: collectionProcessId,
          },
        });

        queryClient.invalidateQueries({
          queryKey: scrapCollectionProcessKeys().all(),
        });
      },
    });

    razorpay.open();
  }

  return (
    <div className={cn(`w-full shrink-0 xl:w-auto xl:min-w-62.5`)}>
      <div className={cn(`flex flex-col items-stretch xl:items-end`)}>
        <p
          className={cn(
            `text-foreground/35 mb-2 text-xs font-medium xl:text-right`,
          )}
        >
          Pay the ₹{amount} to see the customer details
        </p>

        <button
          onClick={initiatePayment}
          type="button"
          className={cn(
            `bg-primary-500 text-primary-50 flex w-full items-center justify-center gap-2 rounded-none px-6 py-3 text-sm font-black transition-all duration-300 xl:w-auto`,
            `hover:bg-primary-600 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(64,164,4,0.22)]`,
          )}
        >
          <Check className={cn(`h-4 w-4`)} />
          Accept Order with ₹{amount}
        </button>
      </div>

      {showProcessingModal &&
        createPortal(
          <div
            className="fixed inset-0 z-9999 flex min-h-screen w-screen items-center justify-center bg-black/50 px-4"
            onClick={() => setShowProcessingModal(false)}
          >
            <div
              className="bg-background w-full max-w-md rounded-lg p-6 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-100">
                  <span className="text-lg">!</span>
                </div>

                <h2 className="text-lg font-bold">
                  Order Already Being Processed
                </h2>
              </div>

              <p className="text-foreground/60 text-sm">
                Another vendor is already processing this order. You cannot
                accept this order while the payment is being processed.
              </p>

              <button
                type="button"
                onClick={() => setShowProcessingModal(false)}
                className={cn(
                  `bg-primary-500 text-primary-50 mt-6 w-full rounded-md px-4 py-3 text-sm font-bold`,
                  `hover:bg-primary-600 transition-colors`,
                )}
              >
                Okay
              </button>
            </div>
          </div>,
          document.body,
        )}
    </div>
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
