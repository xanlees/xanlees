import { useList } from "@refinedev/core";
import type { IWorkExperience, IApplication } from "../interface";

interface UseSectorProps {
  applicationID: Array<number | number[]>
  application: IApplication[]
}

export function useWorkExperience({ applicationID, application }: UseSectorProps): {
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

