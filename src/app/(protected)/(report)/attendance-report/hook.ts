import { useList } from "@refinedev/core";
import { type IProfile } from "@personal";

export interface AttendanceDataItem {
  user: number
  value: number
}

interface IUserProfileExpand {
  id: number
  user: number
  profile: IProfile
}

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

export function fetchAttendanceData(state: { selectedMonth: string, branch: number }) {
  const attendanceDataTypeOnTime = useAttendanceAggregationList({ type: "on_time,ot", aggregation: "count", aggregationField: "user", checkInMonth: state.selectedMonth })?.data?.data ?? [];
  const attendanceDataTypeLate = useAttendanceAggregationList({ type: "late,late_early", aggregation: "count", aggregationField: "user", checkInMonth: state.selectedMonth })?.data?.data ?? [];
  const attendanceDataTypeOt = useAttendanceAggregationList({ type: "ot", aggregation: "sum", aggregationField: "ot", checkInMonth: state.selectedMonth })?.data?.data ?? [];
  return { attendanceDataTypeOnTime, attendanceDataTypeLate, attendanceDataTypeOt };
}
