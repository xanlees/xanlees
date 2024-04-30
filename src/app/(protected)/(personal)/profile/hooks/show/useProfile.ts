import { useList, type BaseRecord, type GetListResponse } from "@refinedev/core";

export function useProfile<T extends BaseRecord>({ profileId }: { profileId: number }): GetListResponse<T> | typeof defaultData {
  const { data } = useList<T>({
    resource: "profile",
    filters: [
      {
        field: "id",
        operator: "eq",
        value: profileId,
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
