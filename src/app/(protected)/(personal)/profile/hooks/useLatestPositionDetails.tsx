import { useMany } from "@refinedev/core";
import { type IPosition, type IProfile } from "../../../(career)/employee/interface";

export function useLatestPositionDetail(positionId: number[], employees: IProfile[]): { data: any } {
  const nonZeroPositionId = positionId.filter((id) => id !== 0);
  return useMany<IPosition>({
    resource: "position",
    ids: nonZeroPositionId,
    queryOptions: {
      enabled: employees.length > 0,
    },
  });
}
