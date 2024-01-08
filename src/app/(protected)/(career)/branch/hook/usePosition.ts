import { useList } from "@refinedev/core";
import type { IPosition, IBranch } from "../interface";

interface UseSectorProps {
  sectorIs: number[]
  branch: IBranch[]
}

export function usePosition({ sectorIs, branch }: UseSectorProps): {
  data: IPosition[]
} {
  const { data, error, isError } = useList<IPosition>({
    resource: "position",
    errorNotification: false,
    filters: [
      {
        field: "sector_id",
        operator: "eq",
        value: sectorIs,
      },
    ],
    queryOptions: {
      enabled: branch.length > 0,
    },
  });
  if (isError) {
    console.error("Error fetching position data:", error);
  }
  return { data: (data as unknown as IPosition[]) ?? [] };
}

export function useBranchID(branch: IBranch[]) {
  return branch.flatMap((item) => (item?.id !== undefined ? [item.id] : [0]));
}
