"use client";
import { useList, type BaseRecord, type GetListResponse } from "@refinedev/core";
import { type IProfile } from "../../interface/model";

export function useProfileIds(profile: IProfile[]) {
  const profileId = profile.map((item) => item.id);
  if (profileId) {
    return profileId;
  }
  return [];
}

export function UseUserProfile<T extends BaseRecord>({ profileIds }: { profileIds: number[] }): GetListResponse<T> | typeof defaultData {
  const { data } = useList<T>({
    resource: "profile/user-profile",
    filters: [
      { field: "profile", operator: "eq", value: profileIds?.join() },
      { field: "expand", operator: "eq", value: "user" },
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
