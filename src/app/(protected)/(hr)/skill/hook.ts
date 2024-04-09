import { useList, type BaseRecord, type GetListResponse } from "@refinedev/core";

export function useSkill<T extends BaseRecord>({ application }: { application: number }): GetListResponse<T> | typeof defaultData {
  const { data } = useList<T>({
    resource: "skill",
    filters: [
      {
        field: "application",
        operator: "eq",
        value: application,
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
