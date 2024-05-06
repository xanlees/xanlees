import { type CrudFilter, useList, type BaseRecord, type GetListResponse } from "@refinedev/core";

export function useProfile<T extends BaseRecord>({ profileId }: { profileId: number }): GetListResponse<T> | typeof defaultData {
  const { data } = useList<T>({
    resource: "profile",
    filters: [
      { field: "id", operator: "eq", value: profileId },
    ],
    errorNotification: false,
  });
  const defaultData = {
    data: [],
    total: 0,
  };
  return data ?? defaultData;
}

export function useProfileUser<T extends BaseRecord>({ userId, filterField, profileId }: { userId?: number, filterField: string, profileId?: number }): GetListResponse<T> | typeof defaultData {
  const permanent: CrudFilter[] = [
    { field: "expand", operator: "eq", value: "user" },
  ];
  if (filterField === "profile" && profileId !== undefined && profileId > 0) {
    permanent.push({ field: "profile", operator: "eq", value: profileId });
  }
  if (filterField === "userId" && userId !== undefined && userId > 0) {
    permanent.push({ field: "user", operator: "eq", value: userId });
  }
  const { data } = useList<T>({
    resource: "profile",
    filters: permanent,
    errorNotification: false,
  });
  const defaultData = {
    data: [],
    total: 0,
  };
  return data ?? defaultData;
}
