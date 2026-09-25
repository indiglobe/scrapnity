import {
  create__OneScrapCollectionProcess,
  read__AllVendorScrapCollectionProcesses,
} from "@/integrations/server-function/scrap-collection-process";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useVendorScrapCollectionProcesses(identifier: {
  vendorEmail: string;
}) {
  return useQuery({
    queryKey: scrapCollectionProcessKeys().vendorList({
      vendorEmail: identifier.vendorEmail,
    }),

    queryFn: async () => {
      return await read__AllVendorScrapCollectionProcesses({
        data: { identifier: { vendorEmail: identifier.vendorEmail } },
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
    vendorList: (identifier: { vendorEmail?: string }) =>
      [...scrapCollectionProcessKeys().all(), "list", identifier] as const,
    details: () => [...scrapCollectionProcessKeys().all(), "detail"] as const,
    detail: (id: string) =>
      [...scrapCollectionProcessKeys().details(), id] as const,
  };
}
