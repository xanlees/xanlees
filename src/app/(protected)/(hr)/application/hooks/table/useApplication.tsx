import { useList } from "@refinedev/core";
import type { IApplication } from "../../interface";
import { type IWorkExperience } from "../../../work-experience/interface";

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

