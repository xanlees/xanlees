import { useList } from "@refinedev/core";
import type { IPhysicalProfile } from "../interface";

export function useProfile({ profileID }: { profileID: number }): { data: IPhysicalProfile[] } {
  const { data, error, isError } = useList<IPhysicalProfile>({
    resource: "physical_profile",
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
  return { data: (data as unknown as IPhysicalProfile[]) ?? [] };
}
