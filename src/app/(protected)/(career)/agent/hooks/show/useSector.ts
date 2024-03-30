import { useList, type BaseRecord, type GetListResponse } from "@refinedev/core";
import { type IEmployee } from "@career";

export function useSector<T extends BaseRecord>({ sectorId }: { sectorId: number[] }): GetListResponse<T> | typeof defaultData {
  const { data } = useList<T>({
    resource: "sector",
    filters: [
      {
        field: "id",
        operator: "eq",
        value: sectorId,
      },
      {
        field: "expand",
        operator: "eq",
        value: "branch_id",
      },
    ],
    errorNotification: false,
  });
  const defaultData = {
    data: [],
    total: 0,
  };
  return data ?? defaultData;
}

export function useSectorId(employees: IEmployee[]) {
  const positionIds: number[] = employees?.map((employee) =>
    employee?.positionId?.sectorId ?? 0,
  );
  const uniquePositionIds: number[] = [...new Set(positionIds)].filter((id) => id !== 0);
  return uniquePositionIds;
}
