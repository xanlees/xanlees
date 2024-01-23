import { useList } from "@refinedev/core";
import type { IEducation } from "../interface";

export function useEducation({ profileID }: { profileID: number }): { data: IEducation[] } {
  const { data, error, isError } = useList<IEducation>({
    resource: "education",
    errorNotification: false,
    filters: [
      {
        field: "profile_id",
        operator: "eq",
        value: profileID,
      },
    ],
  });
  if (isError) {
    console.error("Error fetching position data:", error);
  }
  return { data: (data as unknown as IEducation[]) ?? [] };
}
