import { useList } from "@refinedev/core";
import type { IBranch } from "../interface";
import { type ISector } from "../../sector/interface";

interface UseSectorProps {
  branchId: number[]
  branch: IBranch[]
}

export function useSector({ branchId, branch }: UseSectorProps): { data: ISector[] } {
  const { data, error, isError } = useList<ISector>({
    resource: "sector",
    errorNotification: false,
    filters: [
      {
        field: "branch_id",
        operator: "eq",
        value: branchId,
      },
    ],
    queryOptions: {
      enabled: branch.length > 0,
    },
  });

  if (isError) {
    console.error("Error fetching sector data:", error);
  }

  return { data: (data as unknown as ISector[]) ?? [] };
}

export function useBranchID(branch: IBranch[]) {
  return branch.flatMap((item) => (item?.id !== undefined ? [item.id] : [0]));
}

