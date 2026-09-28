import {
  create__OneScrapCollectionProcess,
  read__AllCustomerScrapCollectionProcesses,
  read__AllVendorScrapCollectionProcesses,
} from "@/integrations/server-function/scrap-collection-process";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useVendorScrapCollectionProcesses(identifier: {
  vendorEmail: string;
  status?: "all" | "accepted";
  pinCode?: string[] | "all";
}) {
  return useQuery({
    queryKey: scrapCollectionProcessKeys().vendorList(identifier),

    queryFn: () =>
      read__AllVendorScrapCollectionProcesses({ data: { identifier } }),
  });
}

export function useCustomerScrapCollectionProcesses(identifier: {
  customerEmail: string;
}) {
  return useQuery({
    queryKey: scrapCollectionProcessKeys().customerList({
      customerEmail: identifier.customerEmail,
    }),

    queryFn: async () => {
      return await read__AllCustomerScrapCollectionProcesses({
        data: { identifier: { customerEmail: identifier.customerEmail } },
      });
    },
  });
}

export function useCreateScrapCollectionProcess() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: create__OneScrapCollectionProcess,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: scrapCollectionProcessKeys().all(),
      });
    },
  });
}

export function scrapCollectionProcessKeys() {
  return {
    all: () => ["scrapCollectionProcesses"] as const,

    lists: () => [...scrapCollectionProcessKeys().all(), "list"] as const,

    vendorList: (identifier: {
      vendorEmail: string;
      status?: "all" | "accepted";
      pinCode?: string[] | "all";
    }) => [...scrapCollectionProcessKeys().all(), "list", identifier] as const,

    customerList: (identifier: { customerEmail: string }) =>
      [...scrapCollectionProcessKeys().all(), "list", identifier] as const,

    details: () => [...scrapCollectionProcessKeys().all(), "detail"] as const,

    detail: (id: string) =>
      [...scrapCollectionProcessKeys().details(), id] as const,
  };
}
