import { useList } from "@refinedev/core";
import type { IWorkExperience } from "../interface";

export function useWorkExperience({ applicationID }: { applicationID: number }): {
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
  });
  if (isError) {
    console.error("Error fetching position data:", error);
  }
  return { data: (data as unknown as IWorkExperience[]) ?? [] };
}
