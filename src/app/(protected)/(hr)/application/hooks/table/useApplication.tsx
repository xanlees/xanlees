import type { IApplication } from "../../interface";
import { type IWorkExperience } from "../../../work-experience/interface";
import { useList, type BaseRecord, type GetListResponse } from "@refinedev/core";

interface UseSectorProps {
  applicationID: Array<number | number[]>
  application: IApplication[]
}

export function useApplication({ applicationID, application }: UseSectorProps): {
  data: IWorkExperience[]
} {
  const { data, error, isError } = useList<IWorkExperience>({
    resource: "work_experience",
    errorNotification: false,
    filters: [
      {
        field: "application_id",
        operator: "eq",
        value: applicationID,
      },
    ],
    queryOptions: {
      enabled: application.length > 0,
    },
  });
  if (isError) {
    console.error("Error fetching position data:", error);
  }
  return { data: (data as unknown as IWorkExperience[]) ?? [] };
}

export function useApplicationBranch<T extends BaseRecord>({ id }: { id: number }): GetListResponse<T> | typeof defaultData {
  const { data } = useList<T>({
    resource: "branch",
    filters: [
      { field: "expand", operator: "eq", value: "province" },
      { field: "id", operator: "eq", value: id },
    ],
    errorNotification: false,
  });
  const defaultData = {
    data: [],
    total: 0,
  };
  return data ?? defaultData;
}

