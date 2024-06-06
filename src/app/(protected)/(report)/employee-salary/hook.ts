import { useList } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { type IProfile } from "@personal";
import { type IEmployee } from "@career";

export interface AttendanceDataItem {
  user: number
  value: number
}

interface IUserProfileExpand {
  id: number
  user: number
  profile: IProfile
}

export const useAttendanceAggregationTable = () => {
  const table = useTable<AttendanceDataItem>({
    columns: [],
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: {
      errorNotification: false,
      resource: "attendance/aggregation",
      filters: {
        permanent: [
          { field: "aggregation", operator: "eq", value: "count" },
          { field: "aggregationField", operator: "eq", value: "user" },
          { field: "check_in_month", operator: "eq", value: "2024-06" },
          { field: "check_in_out_same_day", operator: "eq", value: true },
          { field: "type", operator: "eq", value: "ot,on_time,quit" },
          { field: "has_check_out", operator: "eq", value: true },
          { field: "latest_for_date", operator: "eq", value: true },
          { field: "groupBy", operator: "eq", value: "user" },
        ],
      },
    },
  });
  return { table };
};

export function useUserProfile({ userIds }: { userIds?: string }) {
  const fields = "profile.id,profile.fullname,profile.nickname,profile.phone_number,id,user";
  return useList<IUserProfileExpand>({
    resource: "profile/user-profile",
    filters: [
      { field: "fields", operator: "eq", value: fields },
      { field: "expand", operator: "eq", value: "profile" },
      { field: "user", operator: "eq", value: userIds },
      { field: "paginate", operator: "eq", value: false },
    ],
    errorNotification: false,
  });
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
