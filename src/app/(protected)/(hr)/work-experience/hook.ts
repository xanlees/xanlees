import { useList, type BaseRecord, type GetListResponse } from "@refinedev/core";

export function useWorkExperience<T extends BaseRecord>({ application }: { application: number }): GetListResponse<T> | typeof defaultData {
  const { data } = useList<T>({
    resource: "work_experience",
    filters: [
      {
        field: "application_id",
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
