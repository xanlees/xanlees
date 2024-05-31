import { useList, type BaseRecord, type GetListResponse } from "@refinedev/core";

export function useAttendance<T extends BaseRecord>({ userIds, checkInDate }: { userIds: number[], checkInDate: string }): GetListResponse<T> | typeof defaultData {
  const { data } = useList<T>({
    resource: "attendance",
    filters: [
      { field: "user", operator: "eq", value: userIds?.join() },
      { field: "paginate", operator: "eq", value: false },
      { field: "check_in_month", operator: "eq", value: checkInDate },
      { field: "has_check_out", operator: "eq", value: true },
      { field: "latest_for_date", operator: "eq", value: true },
    ],
    errorNotification: false,
  });
  const defaultData = {
    data: [],
    total: 0,
  };
  return data ?? defaultData;
}

export function useWorkTimeSettings<T extends BaseRecord>({ branchId }: { branchId: number[] }): GetListResponse<T> | typeof defaultData {
  const { data } = useList<T>({
    resource: "branch/work-time-settings",
    filters: [
      { field: "branch", operator: "eq", value: branchId?.join() },
      { field: "paginate", operator: "eq", value: false },
    ],
    errorNotification: false,
  });
  const defaultData = {
    data: [],
    total: 0,
  };
  return data ?? defaultData;
}
