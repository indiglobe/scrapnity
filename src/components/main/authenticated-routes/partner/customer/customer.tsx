import { read__OneCustomerUser } from "@/integrations/server-function/customer-user";
import {
  useCreateScrapCollectionProcess,
  useScrapCollectionProcesses,
} from "@/integrations/tanstack/react-query/scrap-collection-process";
import { tryCatch } from "@/utils/try-catch";
import { useForm } from "@tanstack/react-form";
import {
  useLoaderData,
  useRouteContext,
  useSearch,
} from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";

export function Customer() {
  return (
    <div>
      <div>
        <button>add new pickup</button>
        <PicupForm />
      </div>
      <div>
        <PicupOrderList />
        this section will show all the orders and their status with filtering,
        it can also show the vendor details to the customer if the scrap item is
        choosen by any vendor
        <br />
        filtering will be based on status
      </div>
    </div>
  );
}

function PicupForm() {
  const { mutate } = useCreateScrapCollectionProcess();

  const readOneCustomerUser = useServerFn(read__OneCustomerUser);

  const { session } = useRouteContext({
    from: "/(authenticated-routes)/(existing-user)/partner/customer/",
  });

  const { scraps } = useLoaderData({
    from: "/(authenticated-routes)/(existing-user)",
  });

  const form = useForm({
    defaultValues: {
      collectionDateTime: new Date(Date.now()),
      floor: Math.random().toString(),
      landmark: Math.random().toString(),
      scrapItemId: scraps[Math.floor(Math.random() * (scraps.length - 1))].id,
    },
    onSubmit: async ({ value }) => {
      const {
        user: { email },
      } = session;

      const [readOneCustomerUserError, readOneCustomerUserResult] =
        await tryCatch(readOneCustomerUser({ data: { email: email } }));

      if (readOneCustomerUserError) {
        console.log(readOneCustomerUserError);
        return;
      }

      if (!readOneCustomerUserResult) {
        console.log("No user", readOneCustomerUserResult);
        return;
      }

      mutate({
        data: {
          collectionDateTime: new Date(value.collectionDateTime),
          customerId: readOneCustomerUserResult.id,
          floor: value.floor,
          landmark: value.landmark,
          scrapItemId: value.scrapItemId,
        },
      });
    },
  });

  return <form></form>;
}

function PicupOrderList() {
  const { session } = useRouteContext({
    from: "/(authenticated-routes)/(existing-user)/partner/customer/",
  });

  const {
    data: pickUpOrders,
    isLoading: isPickUpOrdersLoading,
    isPending: isPickUpOrdersError,
  } = useScrapCollectionProcesses({
    customerEmail: session.user.email,
  });

  const search = useSearch({
    from: "/(authenticated-routes)/(existing-user)/partner/customer/",
  });

  if (isPickUpOrdersLoading) {
    return <>Loading...</>;
  }

  if (isPickUpOrdersError) {
    return <>Error...</>;
  }

  return (
    <>
      {pickUpOrders && (
        <>{pickUpOrders.length === 0 ? <>Empty comp</> : <>all data tabel</>}</>
      )}
    </>
  );
}
