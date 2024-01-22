import { useList } from "@refinedev/core";
import type { IDocument } from "../interface";

export function useDocument({ profileID }: { profileID: number }): { data: IDocument[] } {
  const { data, error, isError } = useList<IDocument>({
    resource: "document",
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
  return { data: (data as unknown as IDocument[]) ?? [] };
}
