import { useList, type BaseRecord, type GetListResponse } from "@refinedev/core";

export function usePersonalAddress<T extends BaseRecord>({ profileId }: { profileId: number }): GetListResponse<T> | typeof defaultData {
  const { data } = useList<T>({
    resource: "personal_address",
    filters: [
      {
        field: "profile_id",
        operator: "eq",
        value: profileId,
      },
      {
        field: "expand",
        operator: "eq",
        value: "district",
      },
    ],
    errorNotification: false,
  });
  const defaultData = {
    data: [],
    total: 0,
  };
  return data ?? defaultData;
}
