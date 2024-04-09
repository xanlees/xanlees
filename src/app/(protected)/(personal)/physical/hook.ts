import { useList, type BaseRecord, type GetListResponse } from "@refinedev/core";

export function usePhysical<T extends BaseRecord>({ profileId }: { profileId: number }): GetListResponse<T> | typeof defaultData {
  const { data } = useList<T>({
    resource: "physical_profile",
    filters: [
      {
        field: "profileId_id",
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
