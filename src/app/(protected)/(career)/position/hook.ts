import { useList } from "@refinedev/core";
import type { IPosition } from "./interface";
import { type ISector, type IBranch } from "..";

interface UseSectorProps {
  sectorId: Array<number | number[]>
  branch: IBranch[]
}

export function usePosition({ sectorId, branch }: UseSectorProps): {
  data: IPosition[]
} {
  const { data, error, isError } = useList<IPosition>({
    resource: "position",
    errorNotification: false,
    filters: [
      {
        field: "sector_id",
        operator: "eq",
        value: sectorId.join(),
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

export function useSectorID(sectorData: ISector[]) {
  return (sectorData as { data?: ISector[] })?.data?.map((item) => item?.id !== undefined ? item.id : [0],
  ) ?? [];
}

