import { useList, type BaseRecord, type GetListResponse } from "@refinedev/core";

export function useEmployees<T extends BaseRecord>({ profileId }: { profileId: number }): GetListResponse<T> | typeof defaultData {
  const { data } = useList<T>({
    resource: "employee",
    filters: [
      {
        field: "profile_id",
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

