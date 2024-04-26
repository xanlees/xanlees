import { useList, type BaseRecord, type GetListResponse } from "@refinedev/core";
import { type IEmployeeExpand } from "@src/app/(protected)/(career)/employee/interface";

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

export function useSectorId(employees: IEmployeeExpand[]) {
  const positionIds: number[] = employees
    .filter((employee) => employee.positionId?.sectorId)
    .map((employee) => employee.positionId.sectorId.id);

  const filteredPositionIds: number[] = positionIds.filter((id) => id !== 0);
  const uniquePositionIds: number[] = [...new Set(filteredPositionIds)];
  return uniquePositionIds;
}
