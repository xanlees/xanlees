import { useList, type BaseRecord, type GetListResponse } from "@refinedev/core";

export function useProfile<T extends BaseRecord>({ profileId }: { profileId: number }): GetListResponse<T> | typeof defaultData {
  const { data } = useList<T>({
    resource: "profile",
    filters: [
      { field: "id", operator: "eq", value: profileId },
      { field: "user", operator: "eq", value: "user" },
    ],
    errorNotification: false,
  });
  const defaultData = {
    data: [],
    total: 0,
  };
  return data ?? defaultData;
}

export function useProfileUser<T extends BaseRecord>({ userId }: { userId: number }): GetListResponse<T> | typeof defaultData {
  console.log("userId", userId);
  const { data } = useList<T>({
    resource: "profile",
    filters: [
      { field: "user", operator: "eq", value: userId },
      { field: "user", operator: "eq", value: "user" },
    ],
    errorNotification: false,
  });
  const defaultData = {
    data: [],
    total: 0,
  };
  return data ?? defaultData;
}
