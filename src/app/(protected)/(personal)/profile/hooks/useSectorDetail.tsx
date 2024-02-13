import { useList } from "@refinedev/core";
import type { IPosition } from "../../../(career)/employee/interface";

export function usePositionDetail({ sectorId }: { sectorId: number[] }): { data: IPosition[] } {
  const { data, error, isError } = useList<IPosition>({
    resource: "position",
    errorNotification: false,
    filters: [
      {
        field: "position_id",
        operator: "eq",
        value: sectorId,
      },
    ],
  });

  if (isError) {
    console.error("Error fetching position data:", error);
  }
  const copiedData = { ...data };
  return { data: (copiedData as IPosition[]) ?? [] };
}
