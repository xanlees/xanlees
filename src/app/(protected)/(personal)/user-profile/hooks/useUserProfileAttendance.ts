import { useList, type BaseRecord, type GetListResponse } from "@refinedev/core";
import { type IUserProfile } from "../interface";

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

export function useAttendance<T extends BaseRecord>({ userIds, checkInDate }: { userIds: number[], checkInDate: string }): GetListResponse<T> | typeof defaultData {
  const { data } = useList<T>({
    resource: "attendance",
    filters: [
      { field: "user", operator: "eq", value: userIds?.join() },
      { field: "paginate", operator: "eq", value: false },
      { field: "check_in_date", operator: "eq", value: checkInDate },
    ],
    errorNotification: false,
  });
  const defaultData = {
    data: [],
    total: 0,
  };
  return data ?? defaultData;
}
