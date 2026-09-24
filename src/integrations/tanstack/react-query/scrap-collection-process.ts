import {
  create__OneScrapCollectionProcess,
  // delete__OneScrapCollectionProces,
  read__AllScrapCollectionProcesses,
  // update__OneScrapCollectionProces,
} from "@/integrations/server-function/scrap-collection-process";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useScrapCollectionProcesses(
  identifier?:
    | { customerId?: string }
    | { vendorId?: string }
    | { customerEmail?: string }
    | { vendorEmail?: string },
) {
  let activeIdentifier:
    | { customerId: string }
    | { vendorId: string }
    | { customerEmail: string }
    | { vendorEmail: string }
    | undefined;

  if (!identifier) {
    activeIdentifier = undefined;
  } else {
    switch (true) {
      case "customerId" in identifier && !!identifier.customerId:
        activeIdentifier = { customerId: identifier.customerId };
        break;

      case "vendorId" in identifier && !!identifier.vendorId:
        activeIdentifier = { vendorId: identifier.vendorId };
        break;

      case "customerEmail" in identifier && !!identifier.customerEmail:
        activeIdentifier = { customerEmail: identifier.customerEmail };
        break;

      case "vendorEmail" in identifier && !!identifier.vendorEmail:
        activeIdentifier = { vendorEmail: identifier.vendorEmail };
        break;

      default:
        activeIdentifier = undefined;
    }
  }

  return useQuery({
    queryKey: scrapCollectionProcessKeys().list(activeIdentifier),
    queryFn: async () => {
      return await read__AllScrapCollectionProcesses({
        data: activeIdentifier ? { identifier: activeIdentifier } : undefined,
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

// export function useUpdateScrapCollectionProcess() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: update__OneScrapCollectionProces,

//     onSuccess: (updatedProcess) => {
//       queryClient.invalidateQueries({
//         queryKey: scrapCollectionProcessKeys().all,
//       });

//       if (updatedProcess.id) {
//         queryClient.setQueryData(
//           scrapCollectionProcessKeys().detail(updatedProcess.id),
//           updatedProcess,
//         );
//       }
//     },
//   });
// }

// export function useDeleteScrapCollectionProcess() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: delete__OneScrapCollectionProces,

//     onSuccess: ({ id }) => {
//       queryClient.invalidateQueries({
//         queryKey: scrapCollectionProcessKeys().all,
//       });

//       queryClient.removeQueries({
//         queryKey: scrapCollectionProcessKeys().detail(id),
//       });
//     },
//   });
// }

export function scrapCollectionProcessKeys() {
  return {
    all: () => ["scrapCollectionProcesses"] as const,
    lists: () => [...scrapCollectionProcessKeys().all(), "list"] as const,
    list: (identifier?: {
      customerId?: string;
      vendorId?: string;
      customerEmail?: string;
      vendorEmail?: string;
    }) => [...scrapCollectionProcessKeys().all(), "list", identifier] as const,
    details: () => [...scrapCollectionProcessKeys().all(), "detail"] as const,
    detail: (id: string) =>
      [...scrapCollectionProcessKeys().details(), id] as const,
  };
}
