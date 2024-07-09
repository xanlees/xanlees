import { useTable } from "@refinedev/react-table";
import { type IAttendance, type IUserProfile } from "./interface";
import { type BaseRecord, type GetListResponse, useList } from "@refinedev/core";
import { type IEmployee } from "@career";
import { useMemo } from "react";

export const useTableUserProfile = () => {
  const columns = useMemo(() => [], []);
  const table = useTable<IUserProfile>({
    columns,
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: {
      errorNotification: false,
      resource: "profile/user-profile",
      filters: {
        permanent: [
          { field: "expand", operator: "eq", value: "profile" },
          { field: "ordering", operator: "eq", value: "latest_check_in" },
          { field: "profile_type", operator: "eq", value: "EMPLOYEE" },
          { field: "user_is_active", operator: "eq", value: true },
        ],
      },
    },
  });
  return { table };
};
export function useAttendanceList({ userIds, checkInDate }: { userIds: number[], checkInDate: string }) {
  return useList<IAttendance>({
    resource: "attendance",
    filters: [
      { field: "check_in_date", operator: "eq", value: checkInDate },
      { field: "user", operator: "eq", value: userIds.join() },
      { field: "paginate", operator: "eq", value: false },
    ],
    queryOptions: {
      enabled: userIds.length > 0,
    },
    errorNotification: false,
  });
}
export function useEmployeeIsLatest<T extends BaseRecord>({ profileId }: { profileId: number[] }): GetListResponse<T> | typeof defaultData {
  const { data } = useList<T>({
    resource: "employee",
    filters: [
      { field: "profile_id", operator: "eq", value: profileId?.join() },
      { field: "expand", operator: "eq", value: "branch_id" },
      { field: "is_latest", operator: "eq", value: true },
    ],
    errorNotification: false,
  });
  const defaultData = {
    data: [],
    total: 0,
  };
  return data ?? defaultData;
}
export function useWorkTimeSettings<T extends BaseRecord>({ branchId, day }: { branchId: number[], day: string }): GetListResponse<T> | typeof defaultData {
  const { data } = useList<T>({
    resource: "branch/work-time-settings",
    filters: [
      { field: "branch", operator: "eq", value: branchId?.join() },
      { field: "day_of_week", operator: "eq", value: day },
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
export function useUserIDs(user: IUserProfile[]) {
  const userId = user.map((item) => item.user);
  if (userId) {
    return userId;
  }
  return [];
}
export function useProfileIDs(profiles: IUserProfile[]): number[] {
  const profileIDs = profiles.map((profile) => profile.profile.id);
  const uniqueProfileIDs = findUniqueProfiles(profileIDs);
  return uniqueProfileIDs;
}
function findUniqueProfiles(ids: number[]): number[] {
  const uniqueIDs = new Set(ids);
  return Array.from(uniqueIDs);
}
export function useBranchId(emp: IEmployee[]): number[] {
  const branchIds = emp
    .map((employee) => {
      if (typeof employee.branchId === "object" && employee.branchId !== null) {
        return (employee.branchId as { id: number }).id;
      }
      return employee.branchId as number;
    }).filter((id) => id != null);
  const uniqueBranchIds = new Set(branchIds);
  return Array.from(uniqueBranchIds);
}
