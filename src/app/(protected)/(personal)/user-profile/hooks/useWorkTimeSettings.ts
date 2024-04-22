import { useList, type BaseRecord, type GetListResponse } from "@refinedev/core";

export function useWorkTimeSettings<T extends BaseRecord>({ branchId, day }: { branchId: number[], day: string }): GetListResponse<T> | typeof defaultData {
  const { data } = useList<T>({
    resource: "branch/work-time-settings",
    filters: [
      { field: "branch", operator: "eq", value: branchId?.join() },
      { field: "day_of_week", operator: "eq", value: day },
    ],
    errorNotification: false,
  });
  const defaultData = {
    data: [],
    total: 0,
  };
  return data ?? defaultData;
}
