import { useList } from "@refinedev/core";
import { type IEmployee } from "@career";

export interface AttendanceDataItem {
  user: number
  value: number
}

export function useAttendanceAggregationList({ type, aggregation, aggregationField, checkInMonth }: { type: string, aggregation: string, aggregationField: string, checkInMonth: string }) {
  return useList<AttendanceDataItem>({
    resource: "attendance/aggregation",
    filters: [
      { field: "check_in_month", operator: "eq", value: checkInMonth },
      { field: "aggregation", operator: "eq", value: aggregation },
      { field: "aggregationField", operator: "eq", value: aggregationField },
      { field: "type", operator: "eq", value: type },
      { field: "has_check_out", operator: "eq", value: true },
      { field: "latest_for_date", operator: "eq", value: true },
      { field: "check_in_out_same_day", operator: "eq", value: true },
      { field: "groupBy", operator: "eq", value: "user" },
      { field: "paginate", operator: "eq", value: false },
    ],
    errorNotification: false,
  });
}

export function useEmployee({ userIds }: { userIds?: string }) {
  return useList<IEmployee>({
    resource: "employee",
    filters: [
      { field: "fields", operator: "eq", value: "profile_id,salary" },
      { field: "is_latest", operator: "eq", value: true },
      { field: "user", operator: "eq", value: userIds },
      { field: "paginate", operator: "eq", value: false },
    ],
    errorNotification: false,
  });
}
