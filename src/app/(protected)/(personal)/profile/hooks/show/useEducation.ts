import { useList, type BaseRecord, type GetListResponse } from "@refinedev/core";

export function useEducation<T extends BaseRecord>({ profileId }: { profileId: number }): GetListResponse<T> | typeof defaultData {
  const { data } = useList<T>({
    resource: "education",
    filters: [
      {
        field: "profile_id",
        operator: "eq",
        value: profileId,
      },
      {
        field: "expand",
        operator: "eq",
        value: "graduation_id",
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

